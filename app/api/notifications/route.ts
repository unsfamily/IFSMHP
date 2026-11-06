import { NextResponse } from "next/server";

export async function GET() {
  const notifications = [
    {
      id: 1,
      type: "info",
      title: "New Mental Health Resources Available",
      message: "We've added comprehensive guides and support materials for families.",
      imageUrl: "/images/mental-health-banner.svg",
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      type: "success",
      title: "Community Event Success",
      message: "Thank you to everyone who participated in last week's wellness workshop!",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 3,
      type: "warning",
      title: "Upcoming Maintenance",
      message: "System maintenance scheduled for this weekend. Services may be briefly unavailable.",
      imageUrl: "/images/maintenance-banner.svg",
      timestamp: new Date(Date.now() - 172800000).toISOString(),
    },
  ];

  return NextResponse.json({
    success: true,
    notifications,
    count: notifications.length,
  });
}
