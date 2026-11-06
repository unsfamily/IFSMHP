"use client";

import { useState } from "react";
import NotificationSystem from "@/components/NotificationSystem";
import { NotificationProvider, useNotification } from "@/components/NotificationContext";

function DemoPage() {
  const { showNotification } = useNotification();

  const notifications = [
    {
      title: "🎉 Success!",
      message: "Your action was completed successfully",
      type: "success" as const,
    },
    {
      title: "⚠️ Warning",
      message: "Please review this important information",
      type: "warning" as const,
    },
    {
      title: "ℹ️ Information",
      message: "Here's something you should know about",
      type: "info" as const,
    },
    {
      title: "❌ Error",
      message: "Something went wrong, please try again",
      type: "error" as const,
    },
    {
      title: "🚀 Achievement Unlocked!",
      message: "You've mastered the art of notifications",
      type: "achievement" as const,
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <NotificationSystem />
      
      <div className="z-10 max-w-5xl w-full items-center justify-center text-center">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-pulse-slow">
          World-Class Notifications
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          The most attractive notification system with stunning animations
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {notifications.map((notif, index) => (
            <button
              key={index}
              onClick={() => showNotification(notif.title, notif.message, notif.type)}
              className="glass-effect p-6 rounded-2xl hover:scale-105 transform transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {notif.title.split(" ")[0]}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">
                {notif.title.substring(notif.title.indexOf(" ") + 1)}
              </h3>
              <p className="text-sm text-gray-400">{notif.message}</p>
            </button>
          ))}
          
          <button
            onClick={() => {
              showNotification(
                "🎊 Multiple Notifications",
                "Testing stacked notifications!",
                "info"
              );
              setTimeout(() => {
                showNotification(
                  "✨ Stacked!",
                  "See how they stack beautifully?",
                  "success"
                );
              }, 300);
            }}
            className="glass-effect p-6 rounded-2xl hover:scale-105 transform transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 group"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
              🎊
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">
              Test Multiple
            </h3>
            <p className="text-sm text-gray-400">Show stacked notifications</p>
          </button>
        </div>

        <div className="glass-effect p-8 rounded-3xl">
          <h2 className="text-2xl font-bold mb-4 text-white">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
              <div className="text-3xl mb-2">🎨</div>
              <h3 className="font-semibold mb-1">Beautiful Design</h3>
              <p className="text-sm text-gray-400">Glassmorphism with gradient accents</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold mb-1">Smooth Animations</h3>
              <p className="text-sm text-gray-400">Spring physics with Framer Motion</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-xl">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold mb-1">Smart Stacking</h3>
              <p className="text-sm text-gray-400">Intelligent notification management</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <NotificationProvider>
      <DemoPage />
    </NotificationProvider>
  );
}
