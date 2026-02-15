# Frontend: Comments Feature Implementation Plan

## Overview

- Add comments UI under the article detail view.
- Components: `CommentForm`, `CommentItem`, `CommentList`.
- `CommentService` will handle HTTP calls to backend endpoints.

## Data model (frontend)

- `Comment` interface to mirror backend:

  ```ts
  export interface Comment {
    _id?: string;
    text: string;
    authorId: string;
    articleId: string;
    createdAt: string;
    updatedAt?: string;
  }
  ```

## Files to add

- `src/app/comments/comment.model.ts`
- `src/app/comments/comment.service.ts`
- `src/app/comments/comment-form/comment-form.component.ts/.html/.scss`
- `src/app/comments/comment-item/comment-item.component.ts/.html/.scss`
- `src/app/comments/comment-list/comment-list.component.ts/.html/.scss`
- `src/app/comments/*.spec.ts` — unit tests for service and components

Follow the project's existing component style and test patterns.

## UX and behavior

- On article page show a `CommentForm` (textarea + submit) above comment list.
- `CommentList` displays `CommentItem` for each comment.
- Each `CommentItem` shows text, author, timestamps, and `Edit` / `Delete` buttons.
- Edit toggles an in-place textarea prefilled with current text and `Save`/`Cancel`.
- After create/update/delete the list refreshes (optimistic update or re-fetch).

## API mapping

- `list(articleId)` -> GET `/articles/:articleId/comments`
- `create(articleId, {text, authorId})` -> POST `/articles/:articleId/comments`
- `update(id, {text})` -> PUT `/comments/:id`
- `delete(id)` -> DELETE `/comments/:id`

Note: if the app obtains `authorId` from auth context, `CommentService.create` should omit passing `authorId` and let the backend infer it.

## State management

- Keep comment list state local to `CommentList` using `Observables` returned by `CommentService`.
- If the app uses a global store (NgRx), adapt to dispatch actions and selectors instead.

## Testing (unit)

- `comment.service.spec.ts`
  - Mock `HttpClient` and assert correct URLs/methods and proper params.
  - Test success and error handling for list/create/update/delete.

- `comment-form.component.spec.ts`
  - Renders textarea and submit; blocks empty submissions; emits create/save events with payload.

- `comment-item.component.spec.ts`
  - Renders comment content and author.
  - Clicking `Edit` shows textarea with existing text.
  - `Save` emits update event; `Delete` emits delete event.

- `comment-list.component.spec.ts`
  - Renders `CommentForm` and `CommentItem` list.
  - On create: item added to list (simulate service).
  - On update/delete: list updates accordingly.

## Accessibility & styling

- `textarea` elements must have `aria-label` and visible labels where appropriate.
- Match existing app styles; keep SCSS minimal and reusable.

## Integration

- Update the article detail component template to include:

  ```html
  <app-comment-list [articleId]="article._id"></app-comment-list>
  ```

- Ensure `CommentService` is provided in the correct module and HTTP interceptors/auth flow still apply.

## Deliverables

- `src/app/comments/` components + `comment.service.ts` + specs.
- Article detail view updated to include `CommentList`.

---

Timestamp: 2026-02-15
