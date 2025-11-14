# Expense Tracker Server

Backend server for the Expense Tracker application built with Express.js, PostgreSQL, and Prisma ORM.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma with @prisma/adapter-pg
- **Database Driver**: node-postgres (pg)
- **Authentication**: JWT (jsonwebtoken) with Passport.js
- **Password Hashing**: bcrypt

## Features

- User registration and authentication
- JWT-based authorization
- Expense tracking and management
- Category support for expenses
- RESTful API endpoints
- Type-safe database operations with Prisma
- Connection pooling with pg

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your PostgreSQL credentials:
```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/expense_tracker?schema=public"
JWT_SECRET=your_jwt_secret_key
```

4. Create the PostgreSQL database:
```sql
CREATE DATABASE expense_tracker;
```

5. Run Prisma migrations to set up the database schema:
```bash
npm run prisma:migrate
```

## Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)

## API Endpoints

### Authentication

#### Register User
```
POST /api/user/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Login
```
POST /api/user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Get User by ID
```
GET /api/user/:userId
Authorization: Bearer <token>
```

### Expenses

#### Get User Expenses
```
GET /api/expense/user/:userId
Authorization: Bearer <token>
```

#### Get Expense by ID
```
GET /api/expense/:expenseId
Authorization: Bearer <token>
```

#### Create Expense
```
POST /api/expense/user/:userId
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 100.50,
  "title": "Groceries",
  "date": "2024-01-15",
  "category_id": 1
}
```

#### Delete Expense
```
DELETE /api/expense/:expenseId
Authorization: Bearer <token>
```

## Database Schema

### User
- `user_id` (Primary Key)
- `name`
- `email` (Unique)
- `password_hash`
- `created_at`
- `updated_at`

### Category
- `category_id` (Primary Key)
- `name`
- `description`
- `user_id` (Foreign Key)
- `created_at`

### Expense
- `expense_id` (Primary Key)
- `amount`
- `title`
- `date`
- `user_id` (Foreign Key)
- `category_id` (Foreign Key, nullable)
- `created_at`
- `updated_at`

## Project Structure

```
server/
├── prisma/
│   ├── schema.prisma       # Prisma schema definition
│   └── migrations/         # Database migrations
├── src/
│   ├── config/
│   │   ├── db.js          # Prisma client with pg adapter
│   │   └── passport.js    # Passport JWT configuration
│   ├── controllers/
│   │   ├── userController.js
│   │   └── expenseController.js
│   ├── middleware/
│   │   └── auth.js        # Authentication middleware
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── expenseRoutes.js
│   └── server.js          # Express server setup
├── .env                   # Environment variables
├── .env.example          # Example environment variables
├── package.json
├── prisma.config.ts      # Prisma configuration
└── README.md

```

## Development

### Using Prisma Studio

Prisma Studio is a visual database browser. To open it:
```bash
npm run prisma:studio
```

This will open a browser window where you can view and edit your database records.

### Making Schema Changes

1. Modify [prisma/schema.prisma](prisma/schema.prisma)
2. Create a migration:
```bash
npm run prisma:migrate
```
3. The Prisma Client will be automatically regenerated

### Resetting the Database

To reset your database (WARNING: This deletes all data):
```bash
npx prisma migrate reset
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment (development/production) | development |
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `JWT_SECRET` | Secret key for JWT signing | Required |
| `JWT_EXPIRES_IN` | JWT expiration time | 7d |

## Migration from MySQL

This project was migrated from MySQL to PostgreSQL with Prisma. See [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) for details.

## License

ISC
