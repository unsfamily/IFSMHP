# IFSMHP - Integrated Family & Social Mental Health Program

A modern web application for mental health support services with a beautiful banner notification system.

## Features

- ✨ Modern, responsive design with Tailwind CSS
- 🎨 Beautiful banner notification system with multiple types (info, success, warning, error)
- 🖼️ Image support in banner notifications
- ⚡ Smooth animations and transitions
- 📱 Mobile-friendly interface
- 🎯 TypeScript for type safety
- ⚛️ Built with Next.js 14 and React 18

## Banner Notification System

The banner notification system includes:

- **Multiple notification types**: Info, Success, Warning, and Error
- **Image support**: Display relevant images alongside notifications
- **Action buttons**: Add call-to-action buttons to notifications
- **Auto-dismiss**: Configurable duration with progress indicator
- **Smooth animations**: Slide-down entrance and slide-up exit
- **Responsive design**: Works beautifully on all screen sizes
- **Context API**: Easy to use from any component

### Usage Example

```tsx
import { useBannerNotification } from "@/components/BannerNotification/BannerNotificationProvider";

function MyComponent() {
  const { showBanner } = useBannerNotification();

  const handleClick = () => {
    showBanner({
      type: "success",
      title: "Success!",
      message: "Your action was completed successfully.",
      duration: 5000,
      imageUrl: "/images/success-banner.jpg",
      actionLabel: "View Details",
      onAction: () => {
        // Handle action click
      },
    });
  };

  return <button onClick={handleClick}>Show Notification</button>;
}
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/unsfamily/IFSMHP.git
cd IFSMHP
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout with providers
│   └── page.tsx             # Home page
├── components/
│   └── BannerNotification/
│       ├── BannerNotification.tsx          # Banner component
│       └── BannerNotificationProvider.tsx  # Context provider
├── public/
│   └── images/              # Banner images
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## Customization

### Adding Custom Images

Place your banner images in the `public/images/` directory and reference them:

```tsx
showBanner({
  imageUrl: "/images/your-custom-banner.jpg",
  // ... other config
});
```

### Styling

The banner notification system uses Tailwind CSS. You can customize colors and styles in:
- `tailwind.config.ts` - Theme configuration
- `components/BannerNotification/BannerNotification.tsx` - Component styles

## Technologies Used

- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Next.js Image** - Optimized images

## License

This project is private and maintained by UNS Family.

## Support

For support, please contact the development team at unsdigitaltechnologies@gmail.com
