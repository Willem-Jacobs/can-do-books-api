# Can Do Books API - Backend

**Author**: Willem Jacobs
**Version**: 1.0.1 (increment the patch/fix version number if you make more commits past your first submission)
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
