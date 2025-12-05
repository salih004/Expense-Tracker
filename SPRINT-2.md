                          Sprint Summary (Weeks 13–15)

Feature: Delete Expense Functionality (Trash Icon Module)
Deployed URL: https://expense-tracker-frontend-production-bfbd.up.railway.app/

            Team Contributions

You (Salih):

Designed and implemented the UI trash-icon delete button.

Fixed icon visibility and rendering issues.

Resolved fetch errors caused by incorrect response format (HTML instead of JSON).

Yuval:

Implemented the delete-expense route logic.

Encountered and resolved duplicated API route issue (/api/expenses/userId vs /api/api/expenses/userId).

Corrected backend response format to JSON.

Habso:

Implemented database-level delete logic.

No major issues.

Weekly Stand-Up Meeting Minutes

                Week 13

Updates

Salih created the initial frontend UI for the delete button.

Yuval started implementing the backend delete route.

Habso set up the database delete function.

      Issues

Trash icon not rendering on the frontend.

Backend route not yet connected to the UI.

        Next Steps

Fix icon rendering.

Integrate route with frontend.

        Week 14

Updates

Salih fixed the trash icon rendering.

Yuval completed the route logic but ran into API path duplication (/api/api/...).

Habso confirmed database delete operations working correctly.

      Issues

Duplicated route prefix caused DELETE calls to fail.

Fetch requests returned HTML instead of JSON.

UI still unable to trigger delete successfully.

        Next Steps

Correct routing paths.

Standardize all JSON responses.

Begin full-stack integration testing.

        Week 15

Updates

Yuval resolved the duplicated route prefix and fixed JSON responses.

Salih addressed the fetch error and ensured successful DELETE API calls.

Habso verified that deleted records were correctly removed from the database.

        Issues

None remaining; all components working together.

Next Steps

Deploy updated version to Railway.

Confirm delete functionality in production environment.

        Sprint Completion Summary

All layers of the delete functionality are complete.

Issues with route duplication and fetch errors were fully resolved.

The frontend, backend, and database were successfully integrated.

The feature is live on the deployed Railway application.
