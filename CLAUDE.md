# CLAUDE.md - AI Assistant Guide for RFA Frontend

## 📋 Project Overview

**RFA Frontend** is a modern React-based web application built with Vite, TypeScript, and React Router v7. The application provides player information lookup functionality through API integration with a game server backend.

**Key Information:**
- **Project Name:** rfa-frontend-vite
- **Tech Stack:** React 18 + Vite 6 + TypeScript + React Router v7
- **Working Directory:** `/home/user/rfa-frontend/rfa-frontend-vite/`
- **Repository Root:** `/home/user/rfa-frontend/`
- **Development Server:** `http://localhost:5173`

---

## 🏗️ Architecture & Structure

### Directory Layout

```
rfa-frontend/
├── README.md                      # Project documentation (at repo root)
└── rfa-frontend-vite/             # Main application directory
    ├── dist/                      # Production build output (gitignored)
    ├── public/                    # Static assets
    │   ├── icon.png
    │   ├── help.txt
    │   └── vite.svg
    ├── src/                       # Source code
    │   ├── api/                   # Axios configuration
    │   │   └── axios.ts           # API client setup
    │   ├── assets/                # Images and static resources
    │   │   └── Colors/            # Color palette images
    │   ├── components/            # Reusable React components
    │   │   ├── index.tsx          # Component barrel exports
    │   │   ├── PlayerForm/
    │   │   ├── NotFound/
    │   │   └── AddToCartButtons/
    │   ├── contexts/              # React Context providers
    │   │   └── CartContext.tsx    # Shopping cart state (legacy/unused)
    │   ├── hooks/                 # Custom React hooks
    │   │   ├── usePlayer.ts       # Player data fetching hook
    │   │   └── useCustomer.ts     # Customer hook (commented out)
    │   ├── layouts/               # Page layout components
    │   │   ├── Layout.tsx
    │   │   └── Layout.module.css
    │   ├── models/                # TypeScript interfaces/types
    │   │   ├── IPlayer.ts
    │   │   ├── ICart.ts
    │   │   └── css.d.ts           # CSS module type declarations
    │   ├── pages/                 # Route-level page components
    │   │   └── Homepage/
    │   ├── services/              # Business logic and API calls
    │   │   ├── playerService.ts
    │   │   └── customersService.ts (commented out)
    │   ├── App.tsx                # Root component
    │   ├── main.tsx               # Application entry point
    │   ├── Router.tsx             # Route configuration
    │   ├── index.css              # Global styles
    │   └── vite-env.d.ts          # Vite type definitions
    ├── index.html                 # HTML template
    ├── vite.config.ts             # Vite configuration
    ├── tsconfig.json              # TypeScript base config
    ├── tsconfig.app.json          # App-specific TypeScript config
    ├── tsconfig.node.json         # Node-specific TypeScript config
    ├── eslint.config.js           # ESLint configuration
    ├── package.json               # Dependencies and scripts
    └── .gitignore                 # Git ignore rules
```

---

## 🔧 Tech Stack

### Core Dependencies
- **React:** 18.0.0 - UI library
- **React DOM:** 18.0.0 - React rendering
- **React Router DOM:** 7.5.3 - Client-side routing
- **Vite:** 6.3.5 - Build tool and dev server
- **TypeScript:** 5.8.3 - Type safety
- **Axios:** 1.9.0 - HTTP client
- **MD5:** 2.3.0 - Hashing for API signatures

### Development Tools
- **ESLint:** 9.25.0 - Linting
- **@vitejs/plugin-react:** 4.4.1 - React plugin for Vite
- **typescript-eslint:** 8.30.1 - TypeScript ESLint support

---

## 🚀 Development Setup

### Prerequisites
- Node.js v18+
- npm v9+

### Starting Development

```bash
# Navigate to the project directory
cd rfa-frontend-vite

# Install dependencies (if needed)
npm install

# Start development server
npm run dev
# Server runs at: http://localhost:5173
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 📐 Code Conventions & Patterns

### 1. Component Structure

**Pattern: Co-located Component Files**

Each component lives in its own directory with its styles:

```
ComponentName/
├── ComponentName.tsx
└── ComponentName.module.css
```

**Example:**
```tsx
// src/components/PlayerForm/PlayerForm.tsx
import classes from './PlayerForm.module.css';

const PlayerForm = () => {
  return <div className={classes.container}>...</div>;
};

export default PlayerForm;
```

### 2. Component Exports

Use barrel exports in `components/index.tsx`:

```tsx
// src/components/index.tsx
export { default as PlayerForm } from './PlayerForm/PlayerForm';
export { default as NotFound } from './NotFound/NotFound';
```

Then import as:
```tsx
import { PlayerForm, NotFound } from './components';
```

### 3. Styling Conventions

**CSS Modules:** All component styles use CSS Modules (`.module.css`)

```tsx
import classes from './Component.module.css';

<div className={classes.wrapper}>
  <nav className={`${classes.nav} ${classes.active}`}>...</nav>
</div>
```

**Global Styles:** Located in `src/index.css`
- CSS reset and box-sizing
- Typography defaults
- Button and form element styles
- Utility classes
- Responsive media queries

### 4. TypeScript Patterns

**Interface Naming:** Prefix with `I`
```typescript
export interface IPlayer {
  id: number;
  name: string;
}
```

**Type Declaration Files:**
- `css.d.ts` - CSS module type declarations
- `vite-env.d.ts` - Vite environment types

**Strict Mode Enabled:**
```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noFallthroughCasesInSwitch": true
}
```

### 5. React Patterns

**Functional Components:** Always use functional components with hooks

**Custom Hooks Pattern:**
```typescript
// hooks/usePlayer.ts
export const usePlayer = () => {
  const [data, setData] = useState<PlayerResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPlayer = async (fid: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchPlayer(fid);
      setData(res);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch player.');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, getPlayer };
};
```

**Context Pattern:**
```typescript
// contexts/CartContext.tsx
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // State and logic
  return <CartContext.Provider value={...}>{children}</CartContext.Provider>;
};

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
```

### 6. Service Layer Pattern

Services handle API calls and business logic:

```typescript
// services/playerService.ts
import axios from 'axios';
import md5 from 'md5';

const API_URL = 'https://wos-giftcode-api.centurygame.com/api/player';
const SECRET = 'tB87#kPtkxqOS2';

export async function fetchPlayer(fid: number): Promise<PlayerResponse> {
  const time = Date.now();
  const form = `fid=${fid}&time=${time}`;
  const sign = md5(form + SECRET);
  const body = `sign=${sign}&${form}`;

  const response = await axios.post<PlayerResponse>(
    API_URL,
    body,
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  return response.data;
}
```

---

## 🔌 API Integration

### Axios Configuration

**Base Configuration:** `src/api/axios.ts`

```typescript
import axios from "axios";

const URL = "https://happy-shop-api.vercel.app/api";

const api = axios.create({
    baseURL: URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
```

### Active API: Player Service

**Endpoint:** `https://wos-giftcode-api.centurygame.com/api/player`

**Authentication:** MD5 signature-based
- Requires `fid` (player ID), `time` (timestamp), and `sign` (MD5 hash)
- Formula: `md5(fid={fid}&time={time} + SECRET)`

**Response Format:**
```typescript
interface PlayerResponse {
  code: number;
  msg: string;
  data: any[];
  err_code?: number;
}
```

---

## 🧭 Routing

**Configuration:** `src/Router.tsx`

Uses React Router v7 with `createBrowserRouter`:

```typescript
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Homepage />
      },
    ],
  },
]);
```

**Layout Pattern:** All routes render within `<Layout>` which provides consistent header/navigation.

---

## 🎨 Styling System

### Global Styles (`index.css`)

**Features:**
- CSS reset with box-sizing
- System font stack: `system-ui, Avenir, Helvetica, Arial, sans-serif`
- Background color: `#ffebdcb2` (light peach)
- Responsive design with `prefers-color-scheme` media query
- Custom scrollbar styling
- Typography utilities (text-wrap, overflow-wrap)
- Accessibility improvements for form elements

### CSS Modules

**Usage Pattern:**
1. Create `.module.css` file alongside component
2. Import as `classes` object
3. Apply using `className={classes.propertyName}`

**Type Safety:** TypeScript declarations in `models/css.d.ts` provide autocomplete.

---

## 🔄 State Management

### Current Implementation

**Local State:** Component-level with `useState`
**Custom Hooks:** Data fetching logic (`usePlayer`)
**Context API:** Shopping cart (currently unused/legacy code)

### Context Provider Usage

When contexts are active, wrap in `main.tsx`:

```typescript
<StrictMode>
  <CartProvider>
    <App />
  </CartProvider>
</StrictMode>
```

---

## 📦 File Organization Rules

### When Creating New Features

1. **Components:**
   - Create directory: `src/components/ComponentName/`
   - Add `ComponentName.tsx` and `ComponentName.module.css`
   - Export from `src/components/index.tsx`

2. **Pages:**
   - Create directory: `src/pages/PageName/`
   - Add `PageName.tsx` and `PageName.module.css`
   - Register route in `src/Router.tsx`

3. **Models/Interfaces:**
   - Add to `src/models/IModelName.ts`
   - Use `I` prefix for interfaces

4. **Services:**
   - Add to `src/services/serviceName.ts`
   - Export async functions for API calls

5. **Hooks:**
   - Add to `src/hooks/useHookName.ts`
   - Use `use` prefix

---

## ⚠️ Important Notes

### Legacy/Commented Code

The codebase contains significant commented-out code for a shopping/customer management system:
- `customersService.ts` - Fully commented out
- `useCustomer.ts` - Fully commented out
- `ICart.ts` - Partially commented
- `CartContext.tsx` - Active but unused

**When to Remove:**
- Ask the user before deleting commented code
- It may represent future features or reference implementation

### API Secrets

**Player Service Secret:** `tB87#kPtkxqOS2` is hardcoded in `playerService.ts`

**Best Practice Note:** For production, move to `.env` file:
```typescript
const SECRET = import.meta.env.VITE_PLAYER_SECRET;
```

### Working Directory Context

Always be aware of the nested structure:
- **Repository root:** `/home/user/rfa-frontend/`
- **Application root:** `/home/user/rfa-frontend/rfa-frontend-vite/`
- **package.json location:** `rfa-frontend-vite/package.json`

---

## 🛠️ Common Tasks

### Adding a New Component

```bash
# 1. Create directory
mkdir src/components/NewComponent

# 2. Create files
touch src/components/NewComponent/NewComponent.tsx
touch src/components/NewComponent/NewComponent.module.css
```

```tsx
// 3. Component code
import classes from './NewComponent.module.css';

const NewComponent = () => {
  return <div className={classes.wrapper}>Content</div>;
};

export default NewComponent;
```

```tsx
// 4. Export from index
export { default as NewComponent } from './NewComponent/NewComponent';
```

### Adding a New Route

```tsx
// Router.tsx
{
  path: "/new-page",
  element: <NewPage />
}
```

### Adding a New API Service

```typescript
// services/newService.ts
import api from '../api/axios';

export async function fetchData(id: number) {
  try {
    const response = await api.get(`/endpoint/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}
```

### Creating a Custom Hook

```typescript
// hooks/useData.ts
import { useState } from 'react';
import { fetchData } from '../services/dataService';

export const useData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getData = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchData(id);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, getData };
};
```

---

## 🐛 Debugging & Troubleshooting

### Common Issues

**1. Import Path Errors**
- Ensure you're using the correct relative paths
- Check that barrel exports in `index.tsx` are up to date

**2. CSS Module Not Working**
- Verify file has `.module.css` extension
- Check import: `import classes from './File.module.css'`

**3. TypeScript Errors**
- Run `npm run lint` to see all errors
- Check that interfaces match expected data shapes

**4. Route Not Found**
- Verify route is registered in `Router.tsx`
- Check that path matches NavLink `to` prop

### Development Server Issues

```bash
# Kill any process on port 5173
npx kill-port 5173

# Clear Vite cache
rm -rf node_modules/.vite

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 🔍 Code Quality

### ESLint Configuration

**Active Rules:**
- React Hooks rules (required dependencies, exhaustive deps)
- React Refresh (component export validation)
- TypeScript recommended rules
- JavaScript recommended rules

**Running Linter:**
```bash
npm run lint
```

### TypeScript Strictness

All strict mode options enabled:
- Strict null checks
- No implicit any
- Strict function types
- Strict bind/call/apply

---

## 📝 Git Workflow

### Ignored Files (`.gitignore`)

```
node_modules/
dist/
dist-ssr/
*.local
package-lock.json
.env
logs/
*.log
```

### Branch Strategy

Current active branch: `claude/claude-md-miev82tt3rja4nl2-01DCo3VmVxmvVMdcSjjfdT5P`

**When making changes:**
1. Develop on the designated feature branch
2. Commit with clear, descriptive messages
3. Push to remote: `git push -u origin <branch-name>`

---

## 🤖 AI Assistant Guidelines

### When Working on This Project

1. **Always check working directory:** Commands should run from `rfa-frontend-vite/` unless working with git
2. **Respect patterns:** Follow existing component, styling, and naming patterns
3. **TypeScript first:** Always create properly typed interfaces
4. **Don't delete commented code** without asking - it may be planned features
5. **CSS Modules only:** Never use inline styles or global class names for components
6. **Functional components:** No class components
7. **Export patterns:** Use barrel exports for components
8. **Test before committing:** Run `npm run lint` and `npm run build`

### Before Making Changes

1. Read relevant files to understand current implementation
2. Check for existing patterns in similar components
3. Verify TypeScript interfaces match API responses
4. Ensure routing is properly configured

### After Making Changes

1. Test that application builds: `npm run build`
2. Verify ESLint passes: `npm run lint`
3. Check that dev server runs: `npm run dev`
4. Review TypeScript errors if any

---

## 📚 Additional Resources

### Key Files to Reference

- **Routing Logic:** `src/Router.tsx`
- **Global Styles:** `src/index.css`
- **Type Declarations:** `src/models/css.d.ts`, `src/vite-env.d.ts`
- **API Setup:** `src/api/axios.ts`
- **Example Hook:** `src/hooks/usePlayer.ts`
- **Example Service:** `src/services/playerService.ts`
- **Example Component:** `src/components/PlayerForm/PlayerForm.tsx`

### External Documentation

- [React 18 Docs](https://react.dev)
- [Vite Guide](https://vite.dev)
- [React Router v7](https://reactrouter.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 📊 Project Status

**Current State:**
- ✅ Basic routing configured
- ✅ Player lookup functionality working
- ✅ TypeScript setup complete
- ✅ ESLint configured
- ⚠️ Shopping cart features commented out (future functionality)
- ⚠️ Customer management commented out (future functionality)

**Active Features:**
- Player information lookup via form
- Basic navigation layout
- Error handling (404 page)

**Planned/Incomplete:**
- Shopping cart implementation
- Customer management system
- Additional product pages (commented route exists)

---

*Last Updated: 2025-11-25*
*For questions or clarifications, refer to README.md or explore the codebase.*
