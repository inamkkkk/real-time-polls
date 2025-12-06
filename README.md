# Real-time Polls Application

A simple real-time poll application built with Node.js, Express, Socket.IO, and MongoDB.

## Features

*   Create new polls with options.
*   Vote on existing polls.
*   See real-time results updates.

## Technologies Used

*   Node.js
*   Express.js
*   Socket.IO
*   MongoDB
*   Mongoose
*   JSON Web Tokens (JWT) for Authentication

## Project Structure


.
├── README.md
├── server.js
├── routes
│   └── pollRoutes.js
│   └── userRoutes.js
├── controllers
│   └── pollController.js
│   └── userController.js
├── models
│   └── Poll.js
│   └── User.js
├── middlewares
│   └── authMiddleware.js
├── utils
│   └── generateToken.js


## Installation

1.  Clone the repository:

    
    git clone <repository_url>
    cd real-time-polls
    

2.  Install dependencies:

    
    npm install
    

3.  Configure MongoDB:

    *   Make sure you have MongoDB installed and running.
    *   Update the MongoDB connection string in `server.js` with your MongoDB URI.

4. Configure Environment Variables

 * Create a `.env` file in the root directory.
 * Add the following variables:


MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000



## Running the Application


node server.js


The server will start running on port 5000 (or the port specified in your .env file).

## API Endpoints

### User Routes

*   `POST /api/users/register`: Register a new user.
*   `POST /api/users/login`: Login an existing user.

### Poll Routes

*   `POST /api/polls`: Create a new poll (requires authentication).
*   `GET /api/polls`: Get all polls.
*   `GET /api/polls/:id`: Get a specific poll by ID.
*   `PUT /api/polls/:id/vote`: Vote on a poll option (requires authentication).

## Real-time Updates

*   The application uses Socket.IO to provide real-time updates to clients when votes are cast.

