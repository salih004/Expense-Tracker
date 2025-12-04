# Copilot Instructions for Expense Tracker

## Architecture Overview

**Stack**: React 18 frontend + Express.js backend with PostgreSQL + Prisma ORM

**Key Structure**:

- `/client` - React SPA (port 3000)
- `/server` - Express API server (port 5000 by convention)
- **Root `package.json`** - Contains workspace commands for parallel dev

**Data Flow**: Client → JWT-authenticated API → Prisma ORM → PostgreSQL

## Monorepo Setup & Development Workflow

### Installation & Running

```bash
# From workspace root
npm run install-all          # Install client + server deps
npm run client               # Run React dev server (cd client && npm start)
npm run server               # Run Express server in watch mode (cd server && npm run dev)
```

**Critical**: The **root `package.json` has no dependencies** - all deps are in `/client` and `/server`. Always `cd` into subdirectories when installing new packages or running standalone commands.

### Prisma Database Workflow

```bash
cd server
npx prisma migrate dev      # Create + apply migrations after schema changes
npx prisma studio           # GUI for database inspection
npm run postinstall         # Generates Prisma client (auto-runs on npm install)
```

**Convention**: Database schema changes require migrations. Schema lives in `server/prisma/schema.prisma`.

## Authentication & Authorization Pattern

**Implementation**: JWT bearer tokens + Passport.js JWT strategy

**Key Files**:

- `server/src/config/passport.js` - JWT strategy configuration (extracts userId from token)
- `server/src/middleware/auth.js` - `authenticateJWT()` middleware enforces auth on protected routes
- `server/src/routes/expenseRoutes.js` - Example: all routes protected with `router.post('/', authenticateJWT, ...)`

**Token Flow**:

1. User registers/logs in via `POST /auth/register` or `POST /auth/login` (in userController)
2. Server returns JWT in response
3. Client stores token in `localStorage` alongside user object
4. `client/src/services/api.js` adds `Authorization: Bearer {token}` to all requests
5. Server validates token middleware-side before handler execution

**Note**: Client-side persistence uses `localStorage` - check `App.js` useEffect for token/user restoration on mount.

## Database Schema & Relations

**Models** (in `server/prisma/schema.prisma`):

- **User**: `userId` (PK), name, email, passwordHash, timestamps
- **Category**: `categoryId` (PK), name, description, `userId` (FK), timestamp
- **Expense**: `expenseId` (PK), amount (Decimal), title, **date (stored as VARCHAR "YYYY-MM-DD" string**, not Date), `userId` (FK), `categoryId` (FK, nullable), timestamps

**Relations**: User → (one-to-many) Categories, Expenses. Category → (one-to-many) Expenses. Cascading deletes on user deletion.

**Date Handling Convention**: Expenses store dates as `"YYYY-MM-DD"` strings in DB (not JS Date objects) to avoid timezone issues - client converts to JS Date on render. See `client/src/services/expenseService.js` line 12-14.

## API Specification

### Authentication Routes (userController.js)

- `POST /auth/register` - Create user → returns user object + JWT
- `POST /auth/login` - Authenticate → returns user object + JWT
- `GET /user/{userId}` - Fetch user details (JWT required)

### Expense Routes (expenseController.js - all JWT protected)

- `GET /expense/user/:userId` - Fetch all user expenses
- `POST /expense` - Create expense (body: title, date, amount, categoryId?)
- `GET /expense/:expenseId` - Fetch single expense
- `PUT /expense/:expenseId` - Update expense
- `DELETE /expense/:expenseId` - Delete expense

**Note**: Controllers currently have placeholder implementations - implement full Prisma logic.

## Frontend Patterns

### Service Layer (client/src/services/)

- `api.js` - Base `apiFetch()` helper that injects Authorization header + handles API_URL from env
- `expenseService.js` - Domain functions (`get()`, `add()`) wrapping API calls

**Env Config**: `REACT_APP_API_URL` must be set (e.g., `http://localhost:5000` in dev)

### Component Structure (client/src/components/)

- **Auth/Login.js** - Handles registration/login, stores token + user in localStorage
- **Expenses/DisplayExpenses.js** - Lists expenses; child ExpenseItem + ExpenseDate components
- **NewExpense/ExpenseForm.js** - Form for adding expenses with date picker
- **UI/Card.js** - Reusable container component

**Convention**: Components use `.js` files with corresponding `.css` (not styled-components). State lifted to App.js for global expense/user/token management.

## Server Patterns

### Request/Response Convention

- **Success**: `{ success: true, message: "...", data: { ... } }`
- **Error**: `{ success: false, message: "..." }` with appropriate status code (400/401/409/500)
- HTTP status codes: 201 (create), 400 (validation), 401 (auth), 409 (conflict), 500 (server error)

### Controller Implementation

- Import `prisma` from `server/src/config/db.js`
- Use Prisma methods: `prisma.model.create()`, `.findUnique()`, `.findMany()`, `.update()`, `.delete()`
- Always validate request body; handle Prisma errors with try/catch
- Example pattern in `userController.js` - follow naming + error handling style

### Middleware Stack (server/src/server.js)

- CORS enabled for frontend URL
- JSON body parser
- Passport JWT strategy initialized
- Routes mounted at `/auth`, `/expense`, `/user`, `/category`

## Key Conventions & Pitfalls

1. **Date Format**: Always use `"YYYY-MM-DD"` strings for Expense.date field - conversion to Date happens client-side only
2. **Cascade Deletes**: Deleting a user cascades to categories/expenses; deleting a category nullifies expense.categoryId
3. **JWT Expires**: Check if login response includes expiration - may need to refresh/handle token expiry in future sprints
4. **Naming Mismatch**: Prisma uses camelCase (userId, categoryId) but DB columns use snake_case (user_id, category_id) via `@map()` directives
5. **localStorage Persistence**: App.js checks localStorage on mount - modifying token/user format requires corresponding updates in Login component
6. **Env Variables**: Server needs `DATABASE_URL`, `JWT_SECRET`; client needs `REACT_APP_API_URL`. Check `.env` files are excluded from git

## Testing & Debugging

- **React**: `npm test` in `/client` runs Jest tests (setupTests.js configures @testing-library)
- **Prisma**: `npx prisma studio` provides GUI for DB inspection
- **Server Logs**: Check console output; add `console.log()` in controllers for request inspection
- **Network**: Browser DevTools Network tab shows API requests + auth headers

## Resources

- **DB Schema Diagram**: `database schema.png` in root
- **Design Doc**: `DESIGN.md` (API specification table)
- **Sprint Notes**: `SPRINT-1.md` (tech decisions: PostgreSQL chosen over MySQL, date format rationale)
