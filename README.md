## To-do List SPA

Simple single-page todo list built with React (Vite) that persists data in `localStorage`.

## Stack

- React 19 + Vite (bundler + dev server)
- Custom hook `useTasks` for state instead of Redux
- `localStorage` persistence via `taskStorage` service
- SCSS modules composed through `src/styles/app.scss`
- ESLint + Prettier for linting/formatting, bundled via custom config

## Features

- Task creation with deadline, priority, and local state persistence.
- Filters for status, priority, and text search.
- Task editing mode with inline textarea and priority pickup.
- Counters for total/active/completed tasks, plus batch “delete completed”.
- Responsive layout managed via SCSS partials.

## Architecture

- `src/App.jsx` serves as the layout/root component that pulls in styles and passes data/handlers to the child components.
- `src/hooks/useTasks.js` is the main custom hook that keeps task/filter/edit states, syncs with `localStorage`, and exposes counts/operations.
- `src/services/taskStorage.js` handles serialization/deserialization for persistence.
- `src/utils/taskFilters.js` contains the helpers that apply status/priority/search filters.
- `src/components/` hosts presentational pieces: task form, filters, counter, and task list/card.
- `src/styles/` contains modular SCSS partials that are composed via `src/styles/app.scss`.

## Scripts

- `npm run dev` – starts the Vite dev server  
- `npm run build` – creates a production build  
- `npm run preview` – serves the production bundle locally  
- `npm run lint` – runs ESLint (includes Prettier rules)  
- `npm run format` – formats `src/**/*.js|jsx|scss` files via Prettier
