# Scroll Report

A modern, responsive news website frontend built with React, TypeScript, and Tailwind CSS. This application provides a clean interface for browsing news articles with user authentication and personalization features.

## 🚀 Features

- **User Authentication**: Firebase-based login/signup system with protected routes
- **News Browsing**: Browse latest news articles from various sources
- **Personalization**: Save favorite articles and view trending news
- **Dark/Light Theme**: Toggle between winter (light) and dim (dark) themes
- **Responsive Design**: Modern UI built with DaisyUI and Tailwind CSS
- **Infinite Scrolling**: Paginated news loading with React Query
- **User Profile**: Manage user account and preferences

## 🛠️ Tech Stack

### Core Technologies

- **React 19** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing

### Styling & UI

- **Tailwind CSS 4** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS component library
- **Lucide React** - Beautiful icon library

### State Management & Data Fetching

- **Zustand** - Lightweight state management
- **TanStack React Query** - Server state management and caching
- **Axios** - HTTP client for API requests

### Authentication & Backend

- **Firebase** - Authentication and database
- **News API** - External news data source

### Additional Libraries

- **React Toastify** - Toast notifications
- **React Intersection Observer** - Viewport intersection detection
- **JS Cookie** - Cookie management

## 📁 Project Structure

```
src/
├── api/                    # API layer and data fetchers
│   └── fetchers.ts
├── components/             # Reusable UI components
│   ├── common/            # Shared components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── ThemeController.tsx
│   ├── home/              # Home-specific components
│   │   ├── Article.tsx
│   │   └── PageHeader.tsx
│   └── routes/            # Route protection components
│       └── AuthRoute.tsx
├── config/                # Configuration files
│   ├── axiosInstance.ts   # Axios configuration
│   └── firebase.ts        # Firebase setup
├── context/               # React context providers
│   ├── AuthContext.ts
│   └── AuthProvider.tsx
├── hooks/                 # Custom React hooks
│   └── useAuth.ts
├── layouts/               # Page layouts
│   ├── AuthLayout.tsx
│   └── HomeLayout.tsx
├── pages/                 # Page components
│   ├── auth/             # Authentication pages
│   │   ├── Login.tsx
│   │   └── Signup.tsx
│   ├── common/           # Common pages
│   │   ├── Loading.tsx
│   │   └── NotFound.tsx
│   └── home/             # Main application pages
│       ├── Home.tsx
│       ├── Profile.tsx
│       ├── Saved.tsx
│       └── Trending.tsx
├── store/                # Zustand stores
│   └── NewsStore.tsx
├── types/                # TypeScript type definitions
│   └── news.ts
└── utils/                # Utility functions
    ├── cookies.ts
    └── index.ts
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm
- Firebase project setup
- News API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd News-Website/frontend
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   VITE_NEWS_API_KEY=your_news_api_key
   FIREBASE_API_KEY=your_firebase_api_key
   ```

4. **Firebase Configuration**
   Update the Firebase configuration in `src/config/firebase.ts` with your project details.

5. **Start the development server**

   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:5173`

## 📜 Available Scripts

- **`pnpm dev`** - Start the development server
- **`pnpm build`** - Build the application for production
- **`pnpm preview`** - Preview the production build
- **`pnpm lint`** - Run ESLint for code quality

## 🔧 Configuration

### Firebase Setup

The application uses Firebase for authentication. Configure your Firebase project:

1. Create a Firebase project
2. Enable Authentication with Email/Password
3. Update the configuration in `src/config/firebase.ts`

### News API

The application fetches news from NewsAPI.org:

1. Get an API key from [NewsAPI](https://newsapi.org/)
2. Add it to your `.env` file as `VITE_NEWS_API_KEY`

### Theming

The application supports two themes:

- **Winter** (Light theme) - Default
- **Dim** (Dark theme)

Theme preference is persisted in localStorage and can be toggled using the theme controller in the header.

## 🎨 UI Components

The application uses DaisyUI components for consistent styling:

- Cards for article display
- Navigation components
- Form elements
- Buttons and interactive elements
- Theme switching

## 🔐 Authentication Flow

1. **Public Routes**: Login and Signup pages (accessible only when not authenticated)
2. **Protected Routes**: Home, Saved, Trending, Profile (require authentication)
3. **Route Guards**: Automatic redirection based on authentication status
4. **Persistent Auth**: Firebase handles authentication persistence

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop computers
- Tablets
- Mobile devices

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

### Deployment Options

- Vercel
- Netlify
- Firebase Hosting
- GitHub Pages
- Any static hosting provider

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔗 External APIs

- **[NewsAPI](https://newsapi.org/)** - News articles and data
- **[Firebase](https://firebase.google.com/)** - Authentication and database services

---

Built with ❤️ using React, TypeScript, and modern web technologies.
