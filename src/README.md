# React Todo App

A modern **Todo application built with React + TypeScript**, focused on **clean architecture**, reusable UI components and good separation of concerns.

The project demonstrates **feature-based architecture**, **custom hooks**, and a small **design system**.

---

## Features

- Add / toggle / delete tasks
- Complete all / hide completedtasks
- Form validation with `react-hook-form` + `zod`
- Internationalization (EN / PL / ES)
- Loading & error handling via `AppState`
- Focus & UX improvements
- Design system components (`Button`, `Input`, `Panel`, `PageHeader`)
- Clean semantic HTML

---

## Tech Stack

- **React** + TypeScript
- **React Hook Form** & **Zod** (form validation)
- **React Intl** (internationalization)
- **Tailwind CSS** (styling)
- **Custom Design System components**

---

## Architecture highlights

- **Feature-based structure:** `features/tasks` contains all task logic & components
- **Custom hooks for state & UI logic:**
  - `useTasks` – CRUD state
  - `useTasksQuery` – fetching tasks
  - `useTasksUI` – derived UI state
  - `useTasksActions` – UI actions
- **UI components declarative:** `TasksUI`, `TasksList`, `TasksPanelActions`
- **AppState wrapper** handles loading/error outside of UI

---

## Folder structure

```
src
 ├── design-system
 │    ├── Button.tsx
 │    ├── Input.tsx
 │    ├── Panel.tsx
 │    └── PageHeader.tsx
 │
 ├── components
 │    ├── LanguageSwitcher.tsx
 │    └── app-state
 │         ├── AppState.tsx
 │         ├── LoadingScreen.tsx
 │         └── ErrorScreen.tsx
 │
 ├── features
 │    └── tasks
 │         ├── AddTaskForm.tsx
 │         ├── TaskItem.tsx
 │         ├── TasksList.tsx
 │         ├── TasksPanelActions.tsx
 │         ├── TasksUI.tsx
 │         ├── useTasks.ts
 │         ├── useTasksQuery.ts
 │         ├── useTasksUI.ts
 │         ├── useTasksActions.ts
 │         └── types.ts
 │
 ├── i18n
 │    └── messages.ts
 │
 └── App.tsx
```

### Hooks and Logic Separation

- `useTasks` – main tasks state and CRUD operations
- `useTasksQuery` – fetching tasks from API or mock
- `useTasksUI` – derived UI state (`visibleTasks`, `allCompleted`, `hasUncompleted`)
- `useTasksActions` – actions for buttons (`toggleHideCompleted`, `completeAll`)

**Benefit:** keeps UI components **declarative** and clean.

---

### AppState Wrapper

`AppState` handles:

- Loading screen
- Error screen

Removes conditional rendering (`if(loading)`, `if(error)`) from UI components.

---

## Installation

````bash
npm install

---

## Run the project

```bash
npm run dev

---

## Build

```bash
npm run build

---

### Commit strategy example:

feat(tasks): implement basic todo functionality
feat(i18n): add internationalization with react-intl
feat(tasks): add form validation with react-hook-form and zod
refactor(design-system): introduce reusable Button component
refactor(tasks): replace inline buttons with design-system Button
refactor(app-state): extract AppState wrapper for loading and error handling
refactor(tasks): extract TasksList component
refactor(tasks): extract panel actions to TasksPanelActions
refactor(tasks): move tasks UI logic to useTasksUI hook
refactor(tasks): extract UI actions to useTasksActions hook
chore(tasks): move task types to types.ts


````
