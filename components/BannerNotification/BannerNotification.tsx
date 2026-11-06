"use client";

import React, { useEffect, useState } from "react";
import {
  X,
  Info,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";

interface BannerNotificationProps {
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  duration?: number;
  imageUrl?: string;
  actionLabel?: string;
  onAction?: () => void;
  isVisible: boolean;
  onClose: () => void;
}

const BannerNotification: React.FC<BannerNotificationProps> = ({
  type,
  title,
  message,
  duration = 5000,
  imageUrl,
  actionLabel,
  onAction,
  isVisible,
  onClose,
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / duration) * 50;
        return newProgress > 0 ? newProgress : 0;
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isVisible, duration, onClose]);

  useEffect(() => {
    if (isVisible) {
      setProgress(100);
    }
  }, [isVisible]);

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-gradient-to-r from-green-500 to-emerald-600",
          icon: <CheckCircle className="w-6 h-6" />,
          progressBg: "bg-green-300",
        };
      case "warning":
        return {
          bg: "bg-gradient-to-r from-orange-500 to-amber-600",
          icon: <AlertTriangle className="w-6 h-6" />,
          progressBg: "bg-orange-300",
        };
      case "error":
        return {
          bg: "bg-gradient-to-r from-red-500 to-rose-600",
          icon: <AlertCircle className="w-6 h-6" />,
          progressBg: "bg-red-300",
        };
      default:
        return {
          bg: "bg-gradient-to-r from-blue-600 to-indigo-700",
          icon: <Info className="w-6 h-6" />,
          progressBg: "bg-blue-300",
        };
    }
  };

  const styles = getTypeStyles();

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 ${
        isVisible ? "animate-slide-down" : "animate-slide-up"
      }`}
    >
      <div className={`${styles.bg} text-white shadow-2xl`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4 gap-4">
            {imageUrl && (
              <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-white/20 backdrop-blur-sm border-2 border-white/30">
                <Image
                  src={imageUrl}
                  alt="Notification banner"
                  fill
                  className="object-cover"
                  sizes="64px"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>
            )}

            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg border border-white/30">
                {styles.icon}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold mb-1 truncate">{title}</h3>
              <p className="text-sm text-white/90 line-clamp-2">{message}</p>
            </div>

            {actionLabel && onAction && (
              <button
                onClick={() => {
                  onAction();
                  onClose();
                }}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-medium transition-all border border-white/30 whitespace-nowrap"
              >
                {actionLabel}
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
              aria-label="Close notification"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="h-1 bg-white/20">
          <div
            className={`h-full ${styles.progressBg} transition-all duration-50 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default BannerNotification;
