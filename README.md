# Golden Grill 🍔



## Overview

**Golden Grill** is a modern, premium restaurant web application built with **Next.js**, **Tailwind CSS**, and **TypeScript**. It showcases a sleek, glass‑morphism design with vibrant gradients, smooth micro‑animations, and a fully responsive layout. The app features a dynamic navigation bar, an eye‑catching hero section, interactive menu previews, a shopping cart, and a checkout flow.
Live demo: https://goldengrill.vercel.app/ (deployed on Vercel)

## Features

- **Responsive UI** – Works flawlessly on mobile, tablet, and desktop.
- **Glass‑morphism & Dark Mode** – Premium visual aesthetics with subtle translucency and gradient accents.
- **Dynamic Menu** – Load menu categories and items from a JSON data source.
- **Cart System** – Add, remove, and update items with a sliding drawer UI.
- **Checkout Page** – Simple checkout flow with placeholder payment integration.
- **Custom Cursor & Magnetic Effects** – Engaging micro‑interactions for a modern feel.
- **Tailwind Integration** – Utility‑first styling with custom configurations.
- **VS Code Settings** – Configured to ignore Tailwind `@tailwind` at‑rule warnings.

## Tech Stack

- **Framework**: Next.js (React) with TypeScript
- **Styling**: Tailwind CSS (custom `tailwind.config.ts`)
- **State Management**: React Context API (`CartContext`)
- **Animations**: Framer Motion & CSS transitions
- **Build & Deploy**: Vercel (or any Node.js hosting)

## Getting Started

### Prerequisites

- **Node.js** (v18 or later)
- **npm** (or `pnpm` / `yarn`)
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/AREEBA-13/Golden_Grill.git
cd Golden_Grill

# Install dependencies
npm install
```

### Development

```bash
# Run the development server
npm run dev
```

Open <http://localhost:3000> in your browser to view the app. The site will hot‑reload as you edit files.

### Build for Production

```bash
npm run build   # Generate an optimized production build
npm start       # Start the production server
```

## Project Structure (high‑level)

```
.
├─ app/                 # Next.js route handlers and pages
│   ├─ globals.css      # Global Tailwind styles
│   ├─ layout.tsx       # Root layout with Navbar
│   └─ ...
├─ components/          # Reusable UI components
│   ├─ Navbar.tsx
│   ├─ Magnetic.tsx
│   ├─ CustomCursor.tsx
│   └─ ...
├─ context/             # React context (CartContext)
├─ public/              # Static assets (images, fonts)
├─ .vscode/            # VS Code config to silence Tailwind warnings
│   └─ settings.json
├─ tailwind.config.ts   # Tailwind custom config
├─ next.config.mjs      # Next.js configuration
└─ README.md            # You are reading it!
```

## VS Code Configuration

The repository includes a `.vscode/settings.json` file that disables the "unknown at‑rule @tailwind" warnings introduced by the CSS language server:

```json
{
  "css.lint.unknownAtRules": "ignore"
}
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository.
2. Create a feature branch (`git checkout -b my-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to your fork (`git push origin my-feature`).
5. Open a Pull Request.

## License

This project is licensed under the **MIT License** – see the `LICENSE` file for details.
