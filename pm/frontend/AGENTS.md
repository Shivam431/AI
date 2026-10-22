# Frontend Codebase Documentation

## Overview

The `frontend` directory contains a Next.js 16 application built with React 19, TypeScript, and TailwindCSS v4. It implements an interactive single-board Kanban project management interface.

## Directory Structure

- `src/app/`
  - `layout.tsx`: Root layout configuring fonts (Space Grotesk for display headings, Manrope for body text) and metadata.
  - `page.tsx`: Main page rendering the `<KanbanBoard />` component.
  - `globals.css`: Design tokens and custom theme properties matching the required palette.
- `src/components/`
  - `KanbanBoard.tsx`: Main board container managing board state, dnd-kit sensors, column renaming, card creation, and card deletion.
  - `KanbanColumn.tsx`: Individual column component with droppable target, editable title, card counter, and add card action.
  - `KanbanCard.tsx`: Draggable card component with title, details, and delete action.
  - `KanbanCardPreview.tsx`: Drag overlay preview for cards during active drag events.
  - `NewCardForm.tsx`: Inline collapsible card creation form with validation.
  - `KanbanBoard.test.tsx`: Component tests for rendering, column renaming, adding cards, and deleting cards.
- `src/lib/`
  - `kanban.ts`: Core data structures (`Card`, `Column`, `BoardData`), default initial data (5 fixed columns and 8 initial cards), and helper functions (`moveCard`, `createId`).
  - `kanban.test.ts`: Unit tests validating card movement across and within columns.
- `src/test/`
  - `setup.ts`: Vitest setup file loading `@testing-library/jest-dom`.
- `tests/`
  - `kanban.spec.ts`: Playwright end-to-end tests validating page load, adding cards, and moving cards via drag-and-drop.

## Design Tokens

- Accent Yellow: `#ecad0a` (`--accent-yellow`)
- Blue Primary: `#209dd7` (`--primary-blue`)
- Purple Secondary: `#753991` (`--secondary-purple`)
- Dark Navy: `#032147` (`--navy-dark`)
- Gray Text: `#888888` (`--gray-text`)

## Commands

- `npm run dev`: Start local Next.js development server.
- `npm run build`: Build static / production Next.js bundle.
- `npm run test:unit`: Run Vitest unit tests.
- `npm run test:e2e`: Run Playwright end-to-end tests.
- `npm run test:all`: Run both unit and E2E tests.
