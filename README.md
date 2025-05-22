# 🖥️ RFA Frontend

This is the frontend for the **RFA (React + Vite + TypeScript)** application. It is a modern web application built with React 18, Vite 6, and TypeScript, featuring routing and API integration.

---

## 🔧 Tech Stack

- **React 18**
- **Vite 6**
- **TypeScript**
- **React Router v7**
- **Axios** (for API requests)
- **ESLint** (for linting)
- **MD5** (for simple hashing)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **npm** v9+

### Install dependencies

```bash
npm install
```

## START TERMINAL
Right click "rfa-frontend-vite" and click "open in integrated terminal"

## START THE DEVELOPMENT SERVER
npm run dev

the app will start at: http://localhost:5173

## PROJECT STRUCTURE
rfa-frontend-vite/
├── dist/                   # Production build output
├── public/                 # Static public files
├── src/                    # Source code
│   ├── api/                # Axios API functions
│   ├── assets/             # Images and static resources
│   ├── components/         # Shared React components
│   ├── contexts/           # React Contexts for global state
│   ├── hooks/              # Custom React hooks
│   ├── layouts/            # Page layout components
│   ├── models/             # TypeScript models/interfaces
│   ├── pages/              # Route-level components/pages
│   ├── services/           # Business logic and services
│   ├── App.tsx             # Root component
│   ├── main.tsx            # App entry point
│   ├── Router.tsx          # Route configuration
│   └── index.css           # Global styles
├── index.html              # HTML template
├── vite-env.d.ts           # Vite environment types
├── vite.config.ts          # Vite configuration
├── tsconfig*.json          # TypeScript configuration
├── .gitignore              # Git ignored files
├── eslint.config.js        # ESLint configuration
└── README.md               # You're here!