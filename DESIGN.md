# Milestone 1

## Team Members

- Salih Mohamed
- Habso Anis
- Yuval Ashkenazi

## Github Repository

[Github Repository](https://github.com/salih004/Expense-Tracker)

## Project Board

<< link here >>

## Database Schema
![Database Schema](<database schema.png>)

## API Specification

|         Route          |  Method  |                       Request                      |                      Response                        |             Notes             |
| ---------------------- | -------- | -------------------------------------------------- | ---------------------------------------------------- | ----------------------------- |
| /Expense/{UserId}      | GET      | `{}`                                               | `{[{title: '', date: '', amount: 0}]}`               | Get all user's expenses       |
| /Expense/{ExpenseId}   | GET      | `{}`                                               | `{title: '', date: '', amount: 0}`                   | Get a single expense          |
| /Expense/{UserId}      | POST     | `{title: '', date: '', amount: 0}`                 | `{message: 'success/error'}`                         | Create a new expense          |
| /Expense/{ExpenseId}   | DELETE   | `{}`                                               | `{message: 'success/error'}`                         | Delete an expense             |
| /User/{UserId}         | GET      | `{}`                                               | `{username: '', date: '', amount: 0}`                | Get user data                 |
| /User                  | POST     | `{username: '', password: ''}`                     | `{message: 'success/error'}`                         | Create a new user             |
| /Category/{UserId}     | GET      | `{}`                                               | `[{name: '', description: '', date: '', amount: 0}]` | Get all categories for user   |
| /Category              | POST     | `{name: '', description: '', date: '', amount: 0}` | `{message: 'success/error'}`                         | Create a new category         |
| /Category/{CategoryId} | DELETE   | `{}`                                               | `{message: 'success/error'}`                         | Delete a category             |
| /LinkExpense           | POST     | `{ExpenseId: 123, CategoryId: 123}`                | `{message: 'success/error'}`                         | Link an expense to a category |
