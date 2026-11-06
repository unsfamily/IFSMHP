# Banner Notification System Guide

## Overview

The IFSMHP banner notification system provides a beautiful, animated way to display important messages to users. It supports multiple notification types, images, action buttons, and auto-dismiss functionality.

## Features

- 🎨 **Multiple Types**: Info, Success, Warning, and Error
- 🖼️ **Image Support**: Display images alongside notifications
- ⚡ **Smooth Animations**: Slide-down/slide-up transitions
- ⏱️ **Auto-Dismiss**: Configurable duration with progress bar
- 🎯 **Action Buttons**: Optional call-to-action buttons
- 📱 **Responsive**: Works on all screen sizes
- 🎭 **Glassmorphism**: Modern design with backdrop blur effects

## Quick Start

### 1. Import the Hook

```tsx
import { useBannerNotification } from "@/components/BannerNotification/BannerNotificationProvider";
```

### 2. Use in Your Component

```tsx
function MyComponent() {
  const { showBanner, hideBanner } = useBannerNotification();

  const handleClick = () => {
    showBanner({
      type: "success",
      title: "Success!",
      message: "Your action completed successfully.",
      duration: 5000,
    });
  };

  return <button onClick={handleClick}>Show Notification</button>;
}
```

## Configuration Options

### BannerConfig Interface

```typescript
interface BannerConfig {
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  duration?: number;           // Default: 5000ms
  imageUrl?: string;          // Optional banner image
  actionLabel?: string;       // Optional action button label
  onAction?: () => void;      // Action button callback
}
```

## Notification Types

### Info (Blue)
```tsx
showBanner({
  type: "info",
  title: "New Information",
  message: "Check out our latest resources.",
  imageUrl: "/images/info-banner.svg",
});
```

### Success (Green)
```tsx
showBanner({
  type: "success",
  title: "Success!",
  message: "Your changes have been saved.",
});
```

### Warning (Orange)
```tsx
showBanner({
  type: "warning",
  title: "Warning",
  message: "Please review the changes before proceeding.",
  duration: 7000,
});
```

### Error (Red)
```tsx
showBanner({
  type: "error",
  title: "Error Occurred",
  message: "Unable to complete the action. Please try again.",
  actionLabel: "Retry",
  onAction: () => {
    // Retry logic here
  },
});
```

## Advanced Usage

### With Image and Action Button

```tsx
showBanner({
  type: "info",
  title: "New Mental Health Resources",
  message: "We've added comprehensive guides and support materials.",
  duration: 6000,
  imageUrl: "/images/mental-health-banner.svg",
  actionLabel: "Learn More",
  onAction: () => {
    router.push("/resources");
  },
});
```

### Manual Dismissal

```tsx
const { showBanner, hideBanner } = useBannerNotification();

// Show banner
showBanner({
  type: "info",
  title: "Important Notice",
  message: "This will stay until manually dismissed.",
  duration: 30000, // Long duration
});

// Later, dismiss it manually
setTimeout(() => {
  hideBanner();
}, 10000);
```

### API Integration Example

```tsx
async function connectToService() {
  const { showBanner } = useBannerNotification();
  
  try {
    const response = await fetch("/api/connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "connect" }),
    });
    
    const data = await response.json();
    
    if (data.success) {
      showBanner({
        type: "success",
        title: "Connected Successfully!",
        message: `${data.data.services.length} services are now available.`,
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
      message: "Unable to connect. Please try again.",
      actionLabel: "Retry",
      onAction: () => connectToService(),
    });
  }
}
```

## Customization

### Adding Custom Banner Images

1. Place your image in `/public/images/`
2. Use SVG format for best quality and performance
3. Recommended size: 400x300px or 4:3 aspect ratio
4. Reference it with `/images/your-banner.svg`

### Adjusting Animation Duration

The animations are defined in `tailwind.config.ts`:

```typescript
animation: {
  'slide-down': 'slide-down 0.3s ease-out',
  'slide-up': 'slide-up 0.3s ease-out',
}
```

### Changing Colors

Colors are defined in the `BannerNotification.tsx` component:

```typescript
const getTypeStyles = () => {
  switch (type) {
    case "success":
      return {
        bg: "bg-gradient-to-r from-green-500 to-emerald-600",
        icon: <CheckCircle className="w-6 h-6" />,
        progressBg: "bg-green-300",
      };
    // ... other types
  }
};
```

## Best Practices

1. **Keep messages concise**: Users should understand the notification at a glance
2. **Use appropriate types**: Match the notification type to the message severity
3. **Provide actions when needed**: Include action buttons for actionable notifications
4. **Set reasonable durations**: 
   - Info: 5-6 seconds
   - Success: 4-5 seconds
   - Warning: 6-7 seconds
   - Error: 7-8 seconds or longer
5. **Don't spam**: Avoid showing multiple notifications simultaneously
6. **Use images sparingly**: Images should add value, not clutter
7. **Test on mobile**: Ensure notifications are readable on small screens

## Accessibility

The banner notification system includes:
- Clear visual hierarchy
- Sufficient color contrast
- Close button with aria-label
- Keyboard accessible
- Progress indicator for time remaining

## Troubleshooting

### Banner Not Appearing

1. Ensure `BannerNotificationProvider` wraps your app in `layout.tsx`
2. Check that `showBanner` is called correctly
3. Verify the component is rendered on the client side

### Images Not Loading

1. Check the image path is correct (starts with `/`)
2. Ensure the image exists in `public/images/`
3. Verify Next.js image configuration in `next.config.mjs`
4. Check browser console for errors

### Animation Issues

1. Ensure Tailwind CSS is properly configured
2. Check that custom animations are defined in `tailwind.config.ts`
3. Verify `globals.css` imports Tailwind directives

## Support

For issues or questions, contact the development team or check the main README.md for more information.
