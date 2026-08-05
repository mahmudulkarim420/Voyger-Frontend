rea# 🛍️ Voyger — Premium Lifestyle & Apparel E-Commerce

**Voyger** is a modern, high-performance, and responsive e-commerce web application built for premium apparel and lifestyle shopping. Designed with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS, Voyger offers an intuitive shopping experience with dynamic product filtering, slide-over cart management, secure session handling with device limit enforcement, and smooth Framer Motion animations.

---

## ✨ Features

- **🎨 Modern & Responsive Storefront**: Optimized UI for mobile, tablet, and desktop views with smooth micro-animations.
- **🏷️ Product Catalog & Categorization**: Browse products across various categories including Shirts, Panjabis, Pants, Jackets, T-Shirts, and seasonal collections.
- **🛒 Dynamic Shopping Cart**: Interactive slide-out cart drawer (`CartContext`), size/quantity selection, and order summary calculation.
- **🔐 Secure Authentication & Session Management**: Built with `better-auth` integration supporting user registration, login, and profile management.
- **📱 Device Limit Enforcement**: Custom Next.js middleware detecting active sessions and redirecting to a dedicated `/device-limit` management interface when device thresholds are exceeded.
- **📊 User & Admin Dashboard**: Dedicated dashboard layout with structured navigation for managing user settings and orders.
- **📍 Store Locator & Info Pages**: Integrated store finder (`/find-store`), FAQ, contact form, and customer policy pages.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & PostCSS
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **Utility Helpers**: `clsx`, `tailwind-merge`

---

## 📁 Project Structure

```text
Voyger-Frontend/
├── public/                 # Static assets & public images
├── src/
│   ├── app/                # Next.js App Router pages & layouts
│   │   ├── (auth)/         # Login & Register routes
│   │   ├── (main)/         # Main storefront routes (shop, products, cart, checkout, profile, etc.)
│   │   ├── dashboard/      # User/Admin dashboard routes
│   │   ├── device-limit/   # Device management route
│   │   ├── globals.css     # Global styles & Tailwind CSS imports
│   │   ├── layout.tsx      # Root layout
│   │   └── middleware.ts   # Device limit & auth middleware
│   ├── components/         # Reusable UI components
│   │   ├── layout/         # Navbar, Footer, MobileNav, DashboardNav
│   │   ├── shared/         # CartDrawer, BrandPillars, PageHero
│   │   └── ui/             # Reusable primitives (Buttons, Inputs, Loaders, Animations)
│   ├── features/           # Feature-specific logic & components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Auth client setup, navigation helpers, and utility functions
│   ├── store/              # Context providers (e.g., CartContext)
│   └── types/              # TypeScript interfaces & type definitions
├── .env                    # Environment variables configuration
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies & npm scripts
└── tsconfig.json           # TypeScript configuration
```

---

## ⚙️ Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.x` or higher
- **npm**, **pnpm**, or **yarn**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mahmudulkarim420/Voyger-Frontend.git
   cd Voyger-Frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory (or update the existing one) with your backend API URL:

   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5001/api/v1/auth
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode on `http://localhost:3000` |
| `npm run build` | Builds the application for production deployment |
| `npm run start` | Starts the production server after building |
| `npm run lint` | Runs ESLint to check for code formatting and quality issues |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a pull request.

---

## 📄 License

This project is private and proprietary.
