# Feedback Management System

This is a simple Feedback Management System where users can add feedback, which is stored in the backend.

Features Provided:

-   Add Feedback
-   See all Feedbacks

Functions Used:
-   Web workers and fetch to get all feedbacks
-   Sipmple form to submit feedback
-   JSON file to store feedbacks

# How to Set Up Locally

1. Clone the repository:

```sh
   git clone https://github.com/muditchoudhary/feedback-management-system.git
```

2. Change directory to the project:

```sh
   cd feedback-management-system
```

3. Install frontend dependencies:

```sh
   cd frontend
   npm install
```

(Ensure you have Node.js version v20.11.1 or at least Node.js 18)

4. Install backend dependencies:

```sh
    cd backend
    npm install
```

(Ensure you have Node.js version v20.11.1 or at least Node.js 18)

# Running the Application

1. Start the frontend development server:

```sh
    cd frontend
    npm run dev
```

2. Start the backend development server:

```sh
    cd backend
    npm run dev
```

3. Setup env variable

Rename the `.env-example` file to `.env` in both frontend and backend folder

# Project Structure

- The project is divided into frontend and backend seperately
- The backend folder contains:
    - `routes`: Storing all the routes file
    - `controllers`: Storing all the functions that will run when a request hit to a route
    - `model`: Include functions to initialize the JSON file and reading, writing into that JSON file.
- The frontend folder contains:
    - `components`: Providing different components like Form etc.
    - `web-workdrs`: Providing a web workder, with a method to fetch all feedbacks.

