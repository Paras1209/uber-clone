# Uber Clone Backend

## Description
This backend service is designed for an Uber clone application. It includes user registration, authentication, and other related functionalities.

## Data Requirements
### User
- `username`: String, required, minimum length of 3 characters
- `email`: String, required, unique, minimum length of 5 characters
- `password`: String, required, minimum length of 5 characters
- `socketId`: String, optional

## Endpoints

### Register User
**URL:** `/register`

**Method:** `POST`

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

## Dependencies
- `express`: Web framework for Node.js
- `mongoose`: MongoDB object modeling tool
- `jsonwebtoken`: JSON Web Token implementation
- `bcrypt`: Library to hash passwords
- `express-validator`: Middleware for validating request bodies
- `dotenv`: Module to load environment variables
