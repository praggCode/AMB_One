# Ambulance Booking - Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

This repository contains the backend services for the Ambulance Booking application, providing a RESTful API for user management and authentication.

## Project Status

**Stable.** The core user authentication and authorization features are complete, tested, and considered stable.

## Key Features

-   **Secure User Authentication**: Robust user registration and login system using JWTs.
-   **Password Hashing**: Employs `bcrypt` for industry-standard secure password storage.
-   **Input Validation**: All public endpoints use `express-validator` to sanitize and validate user input.
-   **ORM Integration**: Uses Mongoose for type-safe and efficient database access.

## Technologies & Architecture

This project is built on a modern Node.js stack, designed for security and scalability.

-   **Core**: [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/) provide the foundation for the RESTful API.
-   **Database**: [MongoDB](https://www.mongodb.com/) is used as the primary database, managed by the [Mongoose](https://mongoosejs.com/) ORM for type-safe queries.

## API Routes

### User Routes

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/users/register` | Register a new user. |
| `POST` | `/users/login` | Login a user. |
| `GET` | `/users/profile` | Get user profile. |
| `POST` | `/users/logout` | Logout a user. |

### Driver Routes

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/driver/register` | Register a new driver. |
| `POST` | `/driver/login` | Login a driver. |
| `GET` | `/driver/profile` | Get driver profile. |
| `POST` | `/driver/logout` | Logout a driver. |

## Testing the API

To test the API endpoints, you can use Postman.

1.  Download and install Postman from [here](https://www.postman.com/downloads/).
2.  Create a new request in Postman.
3.  Set the request method to `POST`.
4.  Set the request URL to `http://localhost:3000/users/register`.
5.  Set the request body to `raw` and `JSON`.
6.  Add the following JSON to the request body:
    ```json
    {
        "email": "test@example.com",
        "password": "password",
        "name": "Test User",
        "phone": "1234567890"
    }
    ```
7.  Click on the `Send` button.
8.  You should receive a response with a status code of `201`.
9.  You can test the other endpoints in a similar way.


