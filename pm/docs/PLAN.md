# High Level Steps and Detailed Implementation Plan

## Overview
This document tracks the execution plan for the Project Management MVP web app across all 10 parts. Each part contains a concrete checklist, designated tests, and clear success criteria.

---

## Part 1: Plan & Alignment
- [x] Create [frontend/AGENTS.md](file:///d:/AI/pm/frontend/AGENTS.md) documenting existing frontend architecture and test suite.
- [x] Enrich [docs/PLAN.md](file:///d:/AI/pm/docs/PLAN.md) with comprehensive checklists, tests, and criteria for Parts 1 through 10.
- [ ] User review and approval of the plan.

**Success Criteria**:
- [docs/PLAN.md](file:///d:/AI/pm/docs/PLAN.md) has explicit, checkable steps for every part.
- [frontend/AGENTS.md](file:///d:/AI/pm/frontend/AGENTS.md) accurately reflects frontend components, libraries, and tests.

---

## Part 2: Scaffolding (Docker & Backend Setup)
- [x] Initialize Node.js TypeScript project in `backend/` with Express.
- [x] Add lightweight SQLite driver (`better-sqlite3`) and dependencies (`express`, `cors`, `dotenv`).
- [x] Configure `backend/tsconfig.json` and basic build/dev scripts (`npm run build`, `npm run dev`).
- [x] Implement Express app in `backend/src/server.ts`:
  - Static file serving for testing (`backend/public/index.html` with a 'hello world' message).
  - Test API endpoint `GET /api/health` returning `{ status: "ok" }`.
- [x] Create multi-stage `Dockerfile` and `.dockerignore` at repo root:
  - Multi-stage build for frontend and backend.
  - Expose default port (3000).
- [x] Write cross-platform server scripts in `scripts/`:
  - `start.sh` and `stop.sh` (Mac/Linux).
  - `start.bat` / `start.ps1` and `stop.bat` / `stop.ps1` (PC / Windows).
- [x] Write backend unit tests in `backend/` verifying health endpoint and static file response.

**Tests**:
- Backend test: `npm test` inside `backend/` testing `GET /api/health`.
- Manual/CLI test: Container build test `docker build -t pm-app .` and execution verification.

**Success Criteria**:
- Container builds cleanly and runs locally.
- Accessing root returns a working hello world page and `/api/health` responds with JSON.
- Start and stop scripts execute reliably.

---

## Part 3: Add in Frontend
- [ ] Configure Next.js in `frontend/next.config.ts` for static export (`output: 'export'`) or static asset build.
- [ ] Add npm build script or Docker pipeline stage that builds frontend into backend static distribution directory (`backend/public`).
- [ ] Ensure Express serves the static Next.js export at `/`.
- [ ] Verify client-side hydration, fonts, and `@dnd-kit` card drag-and-drop operate properly when served from Express.
- [ ] Run unit tests and integration/e2e tests against the served application.

**Tests**:
- `npm run test:unit` in `frontend/` (Vitest).
- `npm run test:e2e` in `frontend/` (Playwright) targeting the Express static server.

**Success Criteria**:
- Visiting `/` in the browser loads the full 5-column Kanban board with all dummy data.
- Cards can be dragged, columns renamed, and new cards added without errors.

---

## Part 4: Add Fake User Sign In Experience
- [ ] Implement auth state management on the client (React context or lightweight hook):
  - Check for authenticated session token/flag in storage or session cookie.
  - Hardcoded credential check: `user` and `password`.
- [ ] Create sleek sign-in view matching visual palette (`#032147`, `#209dd7`, `#753991`, `#ecad0a`):
  - Username & password fields with error feedback on invalid credentials.
- [ ] Add header user profile area on the Kanban page with a prominent "Log out" button.
- [ ] Protect the Kanban view: non-authenticated visits immediately prompt for sign-in; logging out redirects to sign-in.
- [ ] Write unit and E2E tests for successful login, rejected credentials, and logout flow.

**Tests**:
- Unit tests: Sign-in component tests verifying validation and state changes.
- E2E tests: Playwright test verifying `/` prompts for login, accepts `user`/`password`, reveals Kanban, and logs out cleanly.

**Success Criteria**:
- User must enter `user` and `password` to view the Kanban board.
- Logout returns user to sign-in screen.

---

## Part 5: Database Modeling
- [ ] Propose and design SQLite schema for storing Kanban board state:
  - `users` table: `id`, `username`, `created_at`.
  - `boards` table: `id`, `user_id`, `data` (JSON text), `updated_at`.
- [ ] Document the schema and database architecture in `docs/DATABASE.md`.
- [ ] Create migration/initialization module in `backend/src/db.ts`:
  - Automatically initializes SQLite database file (e.g. `data/pm.db`) and tables if not present on startup.
- [ ] Obtain user sign-off on the documented database approach.

**Tests**:
- Unit test for database initializer: verify file and tables are created automatically on clean startup.

**Success Criteria**:
- Schema is documented in `docs/DATABASE.md` and approved.
- Database auto-initializes without manual intervention.

---

## Part 6: Backend Kanban API
- [ ] Implement backend API routes in `backend/src/routes/kanban.ts`:
  - `GET /api/board`: Returns board JSON for authenticated user (creates initial default board if none exists).
  - `PUT /api/board`: Validates and saves updated board JSON state.
- [ ] Implement authentication middleware validating the active user session.
- [ ] Write backend unit/integration tests with Supertest for:
  - Initial board retrieval (returns default columns and cards).
  - Updating board with new state and persisting changes.
  - Invalid payloads or unauthenticated requests.

**Tests**:
- `npm test` in `backend/` testing all `/api/board` routes against in-memory or test SQLite database.

**Success Criteria**:
- API correctly reads, creates defaults for, and saves board data in SQLite.
- Tests pass with 100% route coverage for board endpoints.

---

## Part 7: Frontend + Backend Integration
- [ ] Create API client service in `frontend/src/lib/api.ts` for fetching and updating board state.
- [ ] Update `KanbanBoard` component to:
  - Fetch board data on initial mount from `GET /api/board`.
  - Show smooth loading and optimistic/synchronized updates on card moves, column renames, additions, and deletions via `PUT /api/board`.
- [ ] Test persistence: refresh the page after moving or adding cards and verify state is retained across reloads.
- [ ] Run full E2E test suite with Playwright verifying end-to-end persistence through the API.

**Tests**:
- Playwright E2E test: Add a card, move a card, reload browser, verify changes remain saved.

**Success Criteria**:
- Any board modification made by the user persists across page refreshes.

---

## Part 8: AI Connectivity (OpenRouter)
- [ ] Add OpenRouter client service in `backend/src/services/ai.ts`:
  - Reads `OPENROUTER_API_KEY` from `.env`.
  - Configures model `nemotron-3-ultra-550b-a55b`.
- [ ] Create diagnostic endpoint: `POST /api/ai/test` or a test script to execute a minimal "2+2" prompt.
- [ ] Write unit test mocking and verifying the OpenRouter request formatting and response handling.
- [ ] Validate live connectivity with OpenRouter API.

**Tests**:
- Unit test for AI service request payload structure.
- Diagnostic script / test confirming live "2+2" response from OpenRouter.

**Success Criteria**:
- OpenRouter API responds successfully to the backend using the specified model and credentials.

---

## Part 9: AI Structured Outputs for Kanban Updates
- [ ] Define JSON schema for AI Structured Outputs:
  - `message`: Text response to show the user in chat.
  - `boardUpdate`: Optional updated `BoardData` object (or operations: add, edit, move).
- [ ] Implement backend route `POST /api/ai/chat`:
  - Accepts user prompt, current Kanban board state JSON, and message history.
  - Sends system prompt instructing the model to act as a project manager assistant and return structured JSON.
  - Validates and parses the structured output.
- [ ] Write automated backend tests with mock AI responses verifying:
  - Conversational responses without board modifications.
  - Board modifications (creating a card, moving a card, renaming a column) are valid and well-formed.

**Tests**:
- Backend test suite with simulated AI structured outputs asserting correct board transforms.

**Success Criteria**:
- Backend reliably processes AI structured outputs and returns clean payload with chat message and optional board updates.

---

## Part 10: AI Chat Sidebar UI & Full Integration
- [ ] Build a sleek, modern AI Chat sidebar component in `frontend/src/components/AiChatSidebar.tsx`:
  - Collapsible or docked sidebar with toggle action.
  - Message thread display with timestamps and role badges.
  - Interactive input field with submit button styled in Purple Secondary (`#753991`).
  - Loading indicators and smooth micro-animations.
- [ ] Wire chat messages to `POST /api/ai/chat`:
  - Send current board state with user messages.
  - Render assistant messages in the chat thread.
  - If AI returns a board update, update the board state and trigger seamless UI refresh.
- [ ] Add E2E tests for the AI sidebar:
  - Open sidebar, send message, receive response, verify board state update reflects visually on the board.
- [ ] Verify full application in Docker container using start/stop scripts.

**Tests**:
- `npm run test:all` (unit tests and integration/E2E tests).
- Container validation running `scripts/start.ps1` / `scripts/start.sh`.

**Success Criteria**:
- Polished, responsive UI with functioning AI chat sidebar.
- User can ask the AI to create, move, or rename cards, and the board updates automatically.
- App runs self-contained in Docker and all tests pass.