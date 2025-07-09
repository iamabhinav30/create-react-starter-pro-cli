# 🚀 react-starter-pro

A modern, scalable React + TypeScript + Vite starter template designed for real-world applications. This project comes preloaded with clean architecture, reusable hooks, global state management, typed API service, and a modular file structure ready for enterprise use.

---

## ⚙️ Tech Stack

- **React 18**
- **TypeScript 5+**
- **Vite 5+**
- **React Router v6**
- **Axios** (typed HTTP client)
- **ESLint + Prettier** (code linting and formatting)
- **UUID** (for generating request IDs)
- **Context + useReducer** (global state management)

---

## 📁 Folder Structure

src/
├── assets/ # Static images/icons
├── components/ # UI components (Data.tsx, etc.)
├── enums/ # Enum values like EActions
├── hooks/ # Custom React hooks (useQuery, useApiService)
├── interface/ # TypeScript interfaces
├── providers/ # Global state (context, reducer, defaultState)
├── utils/ # Constants and helpers
└── main.tsx # App entry point

markdown
Copy
Edit

---

## ✅ Functionalities

### 🌐 API Layer (Reusable with Axios)
- Dynamic headers support: `application/json`, `x-www-form-urlencoded`, CDN (empty headers)
- Global request/response interceptors
- Runtime `uuid` for unique `request-id`
- Fully typed `get<T>` and `post<T, R>` methods

### 🧠 Global State with useReducer + Context
- `IState`, `IAction`, `actionCreator` pattern for scalable reducer logic
- Enum-based action types (`EActions`)
- Typed context with auto-fallback
- `AppContentProvider` wraps the app with state & dispatch

### 🔁 Action Creator Utility
- Generic action factory
- Ensures `type` and `payload` are tightly coupled
- Prevents typos and boilerplate in dispatch logic

### 🔍 Custom Hooks
- `useApiService()` — Axios client instance based on headers
- `useQuery()` — Parse query params and `;`-separated pathname values from URL

### 🧰 Utility Functions
- `hasDataInObject(obj)` — Check if object contains any keys
- `appConstants.ts` — Centralized constants, header factories, and URLs

### 📦 Built-in Examples
- `Data.tsx` — Component that calls API on mount and renders data with state-handling

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/react-starter-pro.git
cd react-starter-pro
2. Install dependencies
bash
Copy
Edit
npm install
3. Start development server
bash
Copy
Edit
npm run dev
📦 Scripts
Script	Description
npm run dev	Start the development server with Vite
npm run build	Build the app for production
npm run preview	Preview production build
npm run lint	Run ESLint on the codebase

🔒 Environment Variables
Create a .env file in the root (optional):

env
Copy
Edit
VITE_API_BASE_URL=https://api.example.com
And in useApiService, replace hardcoded baseURL with:

ts
Copy
Edit
const baseURL = import.meta.env.VITE_API_BASE_URL;
🧪 Coming Soon (Suggestions)
✅ Unit Testing with Jest + React Testing Library

✅ React Query / SWR support

✅ Theme provider and layout shell

✅ GitHub Actions CI/CD

✅ Internationalization (i18n)

📄 License
This project is licensed under the MIT License. Feel free to use it as a boilerplate in personal or commercial projects.

👨‍💻 Author
Abhinav Singh
Senior UI Engineer | React + Angular | TypeScript Enthusiast
GitHub • LinkedIn