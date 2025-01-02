# Uber Clone Backend

## Description
This backend service is designed for an Uber clone application. It includes functionalities for user registration, authentication, profile management, and logout. The service is built using Node.js and Express, with MongoDB as the database. It uses JWT for authentication and bcrypt for password hashing.

## Data Requirements
### User
- `username`: String, required, minimum length of 3 characters
- `email`: String, required, unique, minimum length of 5 characters
- `password`: String, required, minimum length of 5 characters
- `socketId`: String, optional

## Endpoints

### Register User
**URL:** `/user/register`

**Method:** `POST`

**Description:** Registers a new user with the provided username, email, and password.

**Request Body:**
```json
{
  "username": "exampleUser",
  "email": "user@example.com",
  "password": "examplePassword"
}
```

**Response:**
- **Success (201):**
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "username": "exampleUser",
      "email": "user@example.com",
      "socketId": "socket_id_here"
    }
  }
  ```
- **Error (400):**
  ```json
  {
    "errors": [
      {
        "msg": "error_message_here",
        "param": "field_name_here",
        "location": "body"
      }
    ]
  }
  ```

### Login User
**URL:** `/user/login`

**Method:** `POST`

**Description:** Authenticates a user with the provided email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "examplePassword"
}
```

**Response:**
- **Success (200):**
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "username": "exampleUser",
      "email": "user@example.com",
      "socketId": "socket_id_here"
    }
  }
  ```
- **Error (400):**
  ```json
  {
    "errors": [
      {
        "msg": "error_message_here",
        "param": "field_name_here",
        "location": "body"
      }
    ]
  }
  ```
- **Error (401):**
  ```json
  {
    "error": "Invalid credentials"
  }
  ```

### Get Profile
**URL:** `/user/profile`

**Method:** `GET`

**Description:** Retrieves the profile of the authenticated user.

**Headers:**
- `Authorization`: Bearer `jwt_token_here`

**Response:**
- **Success (200):**
  ```json
  {
    "_id": "user_id_here",
    "username": "exampleUser",
    "email": "user@example.com",
    "socketId": "socket_id_here"
  }
  ```
- **Error (401):**
  ```json
  {
    "error": "Unauthorized"
  }
  ```

### Logout User
**URL:** `/user/logout`

**Method:** `GET`

**Description:** Logs out the authenticated user by blacklisting the JWT token.

**Headers:**
- `Authorization`: Bearer `jwt_token_here`

**Response:**
- **Success (200):**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```
- **Error (401):**
  ```json
  {
    "error": "Unauthorized"
  }
  ```

## Setup Instructions
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file and add the following environment variables:
   ```
   Port=your_port_number
   JWT_SECRET=your_jwt_secret
   MONGO_URI=your_mongodb_uri
   ```
4. Start the server using `npm start`.

## Project Structure
- `controllers/`: Contains the user controller.
- `models/`: Contains the user model.
- `routes/`: Contains the user routes.
- `services/`: Contains the user service.
- `db/`: Contains the database connection file.
- `middlewares/`: Contains the authentication middleware.

## Dependencies
- `express`: Web framework for Node.js
- `mongoose`: MongoDB object modeling tool
- `jsonwebtoken`: JSON Web Token implementation
- `bcrypt`: Library to hash passwords
- `express-validator`: Middleware for validating request bodies
- `dotenv`: Module to load environment variables
- `cookie-parser`: Middleware to parse cookies
