# Shyam's Portfolio - macOS Desktop Edition

An interactive macOS-style desktop portfolio built with Svelte, featuring a fully responsive design that works beautifully on both desktop and mobile devices.

## ✨ Features

- 🍎 **Authentic macOS Experience**: Complete with boot animation, startup sound, and glassmorphism effects
- 🌙 **Dark Mode**: Toggle between light and dark themes via Control Center
- 🪟 **Window Management**: Draggable, minimizable, and maximizable windows
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- 🎨 **Interactive UX Orbit Widget**: Showcases skills with orbiting icons
- 💬 **iMessage-style Chatbot**: Interactive contact form with auto-replies
- 🚀 **Smooth Animations**: Fluid transitions and hover effects throughout

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd shyam_portfolio

# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## 📱 Responsive Design

- **Desktop (1024px+)**: Full macOS desktop experience with draggable windows and dock magnification
- **Tablet (768-1023px)**: Simplified desktop view with adjusted sizing
- **Mobile (<768px)**: Optimized mobile view with full-screen windows and bottom navigation

## 🎵 Adding Custom Startup Sound

1. Download your preferred Mac startup sound as MP3
2. Rename it to `mac-startup.mp3`
3. Place it in `public/sounds/mac-startup.mp3`
4. Rebuild the project

See `AUDIO_SETUP.md` for detailed instructions.

## 🛠️ Tech Stack

- **Framework**: Svelte
- **Build Tool**: Vite
- **Runtime**: Bun
- **Styling**: Vanilla CSS with CSS Variables
- **Fonts**: Inter (Google Fonts)

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will auto-detect Vite and deploy

### Manual Build

```bash
bun run build
# Deploy the `dist` folder to your hosting provider
```

## 📄 License

MIT

## 👤 Author

**Shyam Prasadh**
- UX Researcher & Design Strategist
- Associate Software Engineer at Accenture

---

Built with ❤️ using Svelte and macOS design principles
