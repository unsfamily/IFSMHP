"use client";

import { useBannerNotification } from "@/components/BannerNotification/BannerNotificationProvider";
import { Heart, Users, Shield, Sparkles } from "lucide-react";

export default function Home() {
  const { showBanner } = useBannerNotification();

  const handleConnectIFSMHP = async () => {
    try {
      const response = await fetch("/api/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "demo-user",
          action: "connect",
        }),
      });

      const data = await response.json();

      if (data.success) {
        showBanner({
          type: "success",
          title: "Successfully Connected to IFSMHP!",
          message: `Connection established. ${data.data.services.length} services are now available.`,
          duration: 5000,
          actionLabel: "View Services",
          onAction: () => {
            console.log("Services:", data.data.services);
          },
        });
      }
    } catch (error) {
      showBanner({
        type: "error",
        title: "Connection Failed",
        message: "Unable to connect to IFSMHP services. Please try again.",
        duration: 5000,
      });
    }
  };

  const handleShowAnnouncement = () => {
    showBanner({
      type: "info",
      title: "New Mental Health Resources Available",
      message: "We've added comprehensive guides and support materials for families.",
      duration: 5000,
      imageUrl: "/images/mental-health-banner.svg",
      actionLabel: "Learn More",
      onAction: () => {
        console.log("Action clicked");
      },
    });
  };

  const handleShowSuccess = () => {
    showBanner({
      type: "success",
      title: "Account Activated!",
      message: "Your IFSMHP account is now active and ready to use.",
      duration: 4000,
    });
  };

  const handleShowWarning = () => {
    showBanner({
      type: "warning",
      title: "Upcoming Maintenance",
      message: "System maintenance scheduled for this weekend. Services may be briefly unavailable.",
      duration: 6000,
      imageUrl: "/images/maintenance-banner.svg",
    });
  };

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to IFSMHP
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Integrated Family & Social Mental Health Program - Supporting mental
            health and wellbeing for families and communities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Mental Health Support
            </h3>
            <p className="text-gray-600">
              Comprehensive mental health resources and professional support
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Family Programs
            </h3>
            <p className="text-gray-600">
              Tailored programs designed to strengthen family bonds
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Safe Environment
            </h3>
            <p className="text-gray-600">
              Secure and confidential services for all participants
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Community Connection
            </h3>
            <p className="text-gray-600">
              Building stronger, more resilient communities together
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Connect to IFSMHP Services
          </h2>
          <p className="text-blue-100 mb-6">
            Experience our new banner notification system with improved design and proper image handling
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleConnectIFSMHP}
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-all shadow-lg transform hover:scale-105"
            >
              Connect to IFSMHP
            </button>
            <button
              onClick={handleShowAnnouncement}
              className="px-6 py-3 bg-blue-500/30 backdrop-blur-sm text-white border-2 border-white/50 rounded-lg font-semibold hover:bg-blue-500/50 transition-colors shadow-lg"
            >
              Show Info Banner
            </button>
            <button
              onClick={handleShowSuccess}
              className="px-6 py-3 bg-green-500/30 backdrop-blur-sm text-white border-2 border-white/50 rounded-lg font-semibold hover:bg-green-500/50 transition-colors shadow-lg"
            >
              Show Success Banner
            </button>
            <button
              onClick={handleShowWarning}
              className="px-6 py-3 bg-orange-500/30 backdrop-blur-sm text-white border-2 border-white/50 rounded-lg font-semibold hover:bg-orange-500/50 transition-colors shadow-lg"
            >
              Show Warning Banner
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            IFSMHP is dedicated to providing integrated mental health services
            that support families and strengthen social connections. We believe
            in a holistic approach to mental wellbeing, combining professional
            support with community resources to create lasting positive change.
          </p>
        </div>
      </div>
    </main>
  );
}
