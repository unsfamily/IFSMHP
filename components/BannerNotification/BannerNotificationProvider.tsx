"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import BannerNotification from "./BannerNotification";

export interface BannerConfig {
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  duration?: number;
  imageUrl?: string;
  actionLabel?: string;
  onAction?: () => void;
}

interface BannerNotificationContextType {
  showBanner: (config: BannerConfig) => void;
  hideBanner: () => void;
}

const BannerNotificationContext = createContext<
  BannerNotificationContextType | undefined
>(undefined);

export const useBannerNotification = () => {
  const context = useContext(BannerNotificationContext);
  if (!context) {
    throw new Error(
      "useBannerNotification must be used within BannerNotificationProvider"
    );
  }
  return context;
};

export const BannerNotificationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [bannerConfig, setBannerConfig] = useState<BannerConfig | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showBanner = useCallback((config: BannerConfig) => {
    setBannerConfig(config);
    setIsVisible(true);
  }, []);

  const hideBanner = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => setBannerConfig(null), 300);
  }, []);

  return (
    <BannerNotificationContext.Provider value={{ showBanner, hideBanner }}>
      {bannerConfig && (
        <BannerNotification
          {...bannerConfig}
          isVisible={isVisible}
          onClose={hideBanner}
        />
      )}
      {children}
    </BannerNotificationContext.Provider>
  );
};
