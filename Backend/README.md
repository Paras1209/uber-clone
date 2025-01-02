# Uber Clone Backend

## Description
This backend service is designed for an Uber clone application. It includes functionalities for user and captain registration, authentication, profile management, and logout. The service is built using Node.js and Express, with MongoDB as the database. It uses JWT for authentication and bcrypt for password hashing.

## Data Requirements
### User
- `username`: String, required, minimum length of 3 characters
- `email`: String, required, unique, minimum length of 5 characters
- `password`: String, required, minimum length of 5 characters
- `socketId`: String, optional

### Captain
- `username`: String, required, minimum length of 3 characters
- `email`: String, required, unique, minimum length of 5 characters
- `password`: String, required, minimum length of 5 characters
- `socketId`: String, optional
- `status`: String, enum ["active", "inactive"], default "inactive"
- `vehicle`: Object, required
  - `color`: String, required, minimum length of 3 characters
  - `plate`: String, required, minimum length of 3 characters
  - `capacity`: Number, required, minimum 1
  - `vehicleType`: String, required, enum ["car", "motorcycle", "auto"]
- `location`: Object, optional
  - `latitude`: Number
  - `longitude`: Number

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

### Register Captain
**URL:** `/captain/register`

**Method:** `POST`

**Description:** Registers a new captain with the provided username, email, password, and vehicle details.

**Request Body:**
```json
{
  "username": "exampleCaptain",
  "email": "captain@example.com",
  "password": "examplePassword",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Response:**
- **Success (201):**
  ```json
  {
    "captain": {
      "_id": "captain_id_here",
      "username": "exampleCaptain",
      "email": "captain@example.com",
      "socketId": "socket_id_here",
      "status": "inactive",
      "vehicle": {
        "color": "red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "location": {
        "latitude": null,
        "longitude": null
      }
    },
    "token": "jwt_token_here"
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
- `controllers/`: Contains the user and captain controllers.
- `models/`: Contains the user and captain models.
- `routes/`: Contains the user and captain routes.
- `services/`: Contains the user and captain services.
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
