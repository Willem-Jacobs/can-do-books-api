# Can Do Books API - Backend

**Author**: Willem Jacobs
**Version**: 1.0.3 (increment the patch/fix version number if you make more commits past your first submission)
**Deployed Site**: NONE
**Backend Server** NONE

## Overview

Backend for Can Do Books. Has a test endpoint to get the JWT from Auth0 and returns it to the client.

## Getting Started

- Clone from repo. [Link to Repo](https://github.com/Willem-Jacobs/can-do-books-api)
- `npm install` or `npm i` to install dependencies.
- `.env` file needed see sample.env for values.

## Architecture

- Trello for Project Management
- Node.JS
- Express
- dotenv
- cors
- Axios
- auth0
- Mongoose/MongoDB
- UML Lab-11 - ![UML](CE-Lab11-UML.png "UML Image")

## Change Log

08.14.2021 7:00pm (EST) (V1.0.0) - First release.
08.19.2021 9:00pm (EST) (V1.0.1) - Added route for `/books` that will use your token to verify your authenticity before providing you the book info located in the mongoDB. Has a route for `/clear & /seed` to clear the database or seed a record into the DB. Messages provided.
08.21.2021 10:00pm (EST) (V1.0.2) - Added additional CRUD routes for create single entry from the front end and the delete by ID. Cleaned up code, refactored. Note that routes are now defiend by item. All current end points are `/books` then add to it `/clear or /seed or /:id` the `/books` gets all books and is used for the GET and the POST verbs.
08.24.2021 10:30pm (EST) (V1.0.3) - Added the route to update a record by ID.

## Credit and Collaborations

No collaborations from others on this project.

### Feature 1 Trello Card #1

**Name of feature:** Basic structure setup

**Estimate of time needed to complete:** 2 hour

**Start time:** 05:00pm

**Finish time:** 07:00pm

**Actual time needed to complete:** 2 hours.

### Lab 12 Trello Card #1

**Name of feature:** Mongoose DB & Route

**Estimate of time needed to complete:** 1 hour

**Start time:** 05:00pm

**Finish time:** 06:00pm

**Actual time needed to complete:** 1 hours.

### Lab 13 Trello Card #1 & 2

**Name of feature:** Mongoose Refactor/Cleanup & added CRUD (Create & Delete)

**Estimate of time needed to complete:** 3 hour

**Start time:** 05:00pm

**Finish time:** 07:00pm

**Actual time needed to complete:** 2 hours. The time seems more but I took long breaks to cook, spend time with kids, eat and code when I can. I am not happy with the final outcome at this time but I will submit this for credit and work more on it as I can.

### Lab 14 Trello Card #1

**Name of feature:** Mongoose Refactor/Cleanup & added CRUD - UPDATE part of CRUD)

**Estimate of time needed to complete:** 30 mins

**Start time:** 09:30pm

**Finish time:** 09:45pm

**Actual time needed to complete:** 15 mins to write and do basic testing. Easy part to add.
