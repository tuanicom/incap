# Backend: Comments Feature Implementation Plan

## Overview

- Add a `comments` domain mirroring patterns used by `articles` and `users`.
- Comment fields: `text`, `authorId`, `articleId`, `createdAt`, `updatedAt`.
- Expose REST endpoints for CRUD operations, scoped to articles when appropriate.

## Data model

- TypeScript interface:

  ```ts
  interface Comment {
    _id?: string;
    text: string;
    authorId: string;
    articleId: string;
    createdAt: string;
    updatedAt?: string;
  }
  ```
- Validation rules: `text` non-empty, `authorId` present, `articleId` present.
- Index `articleId` for fast retrieval.

## Files to add

- `backend/comments/comment.model.ts` — TS interface + any schema helpers
- `backend/comments/comment.process.ts` — business logic and DB access (CRUD)
- `backend/comments/comment.controller.ts` — HTTP handlers calling `process`
- `backend/comments/comment.routes.ts` — route definitions and wiring
- `backend/comments/*.spec.ts` — unit tests for model/process/controller

Follow the same structure and coding conventions as `backend/articles` and `backend/users`.

## Routes / HTTP contract

- `GET /articles/:articleId/comments` — list comments for an article (200)
- `POST /articles/:articleId/comments` — create comment (201)
- `PUT /comments/:id` — update comment text (200)
- `DELETE /comments/:id` — delete comment (204)

Request/response notes:
- POST body: `{ text, authorId }` (backend may infer `authorId` from auth later)
- PUT body: `{ text }` (only `text` editable)

## Business rules / Implementation details

- Creation sets server-side `createdAt`.
- Update sets `updatedAt` and only allows changing `text`.
- Deletion performs a hard delete (match existing models). Consider soft-delete later.
- Support optional pagination query params on list: `?limit=&skip=`.
- Return consistent error codes: 400 validation, 404 not found, 500 server error.

## Testing (unit)

- `comment.model.spec.ts`
  - validate schema rejects empty `text`, missing `articleId`/`authorId`.

- `comment.process.spec.ts`
  - create -> returns persisted comment with `createdAt`.
  - list by `articleId` returns created comments.
  - update `text` sets new value and `updatedAt`.
  - delete removes comment; subsequent read returns not found.
  - use DB mocking or in-memory test DB consistent with project tests.

- `comment.controller.spec.ts`
  - POST creates and returns 201; validation failures return 400.
  - GET lists comments and supports pagination.
  - PUT updates and returns 200; 404 when not found.
  - DELETE returns 204; 404 when not found.

## Integration / CI

- Register `comment.routes.ts` in server bootstrap similar to `article.routes.ts`.
- Add indexes/migrations if project uses DB migrations.
- Ensure new tests run in existing CI and aim for high coverage on new files.

## Deliverables

- `backend/comments/` folder with model, process, controller, routes and specs.
- Tests passing in the existing test environment.

---

Timestamp: 2026-02-15
