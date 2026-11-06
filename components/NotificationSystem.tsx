"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useNotification, NotificationType } from "./NotificationContext";

const typeStyles: Record<NotificationType, { gradient: string; icon: string; glow: string }> = {
  success: {
    gradient: "from-green-500 to-emerald-600",
    icon: "✓",
    glow: "shadow-green-500/50",
  },
  error: {
    gradient: "from-red-500 to-rose-600",
    icon: "✕",
    glow: "shadow-red-500/50",
  },
  warning: {
    gradient: "from-yellow-500 to-orange-600",
    icon: "⚠",
    glow: "shadow-yellow-500/50",
  },
  info: {
    gradient: "from-blue-500 to-cyan-600",
    icon: "i",
    glow: "shadow-blue-500/50",
  },
  achievement: {
    gradient: "from-purple-500 to-pink-600",
    icon: "★",
    glow: "shadow-purple-500/50",
  },
};

export default function NotificationSystem() {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-6 right-6 z-50 space-y-4 max-w-md w-full pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification, index) => {
          const style = typeStyles[notification.type];
          
          return (
            <motion.div
              key={notification.id}
              layout
              initial={{ 
                opacity: 0, 
                y: -50, 
                x: 100,
                scale: 0.3,
                rotate: 10
              }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                x: 0,
                scale: 1,
                rotate: 0
              }}
              exit={{ 
                opacity: 0, 
                x: 100,
                scale: 0.5,
                transition: { duration: 0.2 }
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 40,
                mass: 1
              }}
              className="pointer-events-auto"
            >
              <motion.div
                className={`relative overflow-hidden glass-effect rounded-2xl shadow-2xl ${style.glow} border-2 border-white/20`}
                whileHover={{ scale: 1.02, rotate: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${style.gradient} opacity-20`}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ backgroundSize: "200% 200%" }}
                />

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 shimmer-effect animate-shimmer opacity-30"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                {/* Particle effects */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-1 h-1 bg-gradient-to-r ${style.gradient} rounded-full`}
                    initial={{ 
                      x: Math.random() * 100 + "%",
                      y: "100%",
                      opacity: 0
                    }}
                    animate={{ 
                      y: "-20%",
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeOut"
                    }}
                  />
                ))}

                <div className="relative p-6 flex items-start gap-4">
                  {/* Animated icon */}
                  <motion.div
                    className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${style.gradient} flex items-center justify-center text-white font-bold text-xl shadow-lg`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                      delay: 0.1
                    }}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 360,
                      transition: { duration: 0.6 }
                    }}
                  >
                    <motion.span
                      animate={{ 
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {style.icon}
                    </motion.span>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <motion.h3
                      className="text-lg font-bold text-white mb-1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {notification.title}
                    </motion.h3>
                    <motion.p
                      className="text-sm text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {notification.message}
                    </motion.p>
                  </div>

                  {/* Close button */}
                  <motion.button
                    onClick={() => removeNotification(notification.id)}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-lg">×</span>
                  </motion.button>
                </div>

                {/* Progress bar */}
                <motion.div
                  className={`h-1 bg-gradient-to-r ${style.gradient}`}
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 5, ease: "linear" }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
