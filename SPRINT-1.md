# Milestone 2

## Team Members

- Salih Mohamed
- Habso Anis
- Yuval Ashkenazi

## Github Repository

[Github Repository](https://github.com/salih004/Expense-Tracker)

## Project Board

[Project Board](https://github.com/users/salih004/projects/2)

## Agile Practice

## Progress Summary



Sprint Update — Agile Practice

Team: Salih, Habso, Yuval
Sprint Goal: Build the backend server, connect the database, and implement user authentication.

⸻

What We Planned
    •    Salih: Build backend server.
    •    Habso: Set up the database connection.
    •    Yuval: Implement user authentication.

⸻

What We Completed
    •    Backend Server (Salih): Completed and running.
    •    Database Connection (Habso):
    •    Problem: MySQL Workbench reported it was running on an unsupported server.
    •    Solution: Switched to PostgreSQL and successfully established a stable connection.
    •    Server Setup (Me): Fixed port conflicts and resolved package.json request errors.
    •    Yuval: Timezone issue was happening when the expense item was added to the DB. Resolved by switching DB field to text in format of 'YYYY-MM-DD', and converting that to a Date object on the frontend
⸻

Blockers
    •    Port and request dependency issues preventing server startup.
    •    MySQL Workbench server compatibility error, resolved by switching to PostgreSQL.
    •    Timezone issue was happening when the expense item was added to the DB. Resolved by switching DB field to text in format of 'YYYY-MM-DD', and converting that to a Date object on the frontend

⸻

Successes
    •    Server now runs without errors.
    •    PostgreSQL is fully connected after the transition.
    •    Environment is set up and ready for authentication work.
    •    Team communicated consistently and resolved blockers quickly.

⸻

Sprint Summary

We sprinted effectively, addressed blockers early, and kept steady momentum. Everyone completed their part, the database and backend are functioning, and the workflow stayed aligned with agile practices. The sprint went well overall, and the project is on track.



Login
![Alt text](./screenshots/login.png?raw=true "Login")

Register
![Alt text](./screenshots/register.png?raw=true "Register")

Add Expense
![Alt text](./screenshots/add-expense.png?raw=true "Add Expense")

DB Confirmation
![Alt text](./screenshots/database-confirmation.png?raw=true "DB Confirmation")
