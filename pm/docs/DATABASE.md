# Database Architecture & Schema Specification

## Overview

The Kanban Project Management application uses a local SQLite database (`data/pm.db`) managed via `better-sqlite3`. It provides fast, zero-configuration local persistence with full schema initialization on startup.

## SQLite Tables

### 1. `users` Table
Stores user accounts. While the MVP defaults to the single user (`user`), the table is modeled to support multiple users seamlessly in future phases.

```sql
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
```

### 2. `boards` Table
Stores each user's Kanban board state as JSON text. In accordance with the MVP requirements (1 board per user), each user has a dedicated row with a foreign key to `users(id)`.

```sql
CREATE TABLE IF NOT EXISTS boards (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  data TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_boards_user_id ON boards(user_id);
```

## JSON Board Data Schema (`boards.data`)

The `data` column contains a serialized JSON string following the `BoardData` structure:

```json
{
  "columns": [
    {
      "id": "col-backlog",
      "title": "Backlog",
      "cardIds": ["card-1", "card-2"]
    },
    {
      "id": "col-discovery",
      "title": "Discovery",
      "cardIds": ["card-3"]
    },
    {
      "id": "col-progress",
      "title": "In Progress",
      "cardIds": ["card-4", "card-5"]
    },
    {
      "id": "col-review",
      "title": "Review",
      "cardIds": ["card-6"]
    },
    {
      "id": "col-done",
      "title": "Done",
      "cardIds": ["card-7", "card-8"]
    }
  ],
  "cards": {
    "card-1": {
      "id": "card-1",
      "title": "Align roadmap themes",
      "details": "Draft quarterly themes with impact statements and metrics."
    }
  }
}
```

## Initialization & Lifecycle

- When the backend starts up, `initDatabase()` ensures the `data/` directory exists and creates `pm.db` if missing.
- Default user `user` (`id: "user-default"`) and their initial 5-column Kanban board are seeded if not already present.
- Transactions are used for atomic updates when saving modified board state.
