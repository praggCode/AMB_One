# Ambulance Booking - Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)

This repository contains the backend services for the Ambulance Booking application, providing a RESTful API for user management and authentication.

## Project Status

**Stable.** The core user authentication and authorization features are complete, tested, and considered stable.

## Key Features

-   **Secure User Authentication**: Robust user registration and login system using JWTs.
-   **Password Hashing**: Employs `bcrypt` for industry-standard secure password storage.
-   **Secure Logout**: Implements a token blacklist using Redis to immediately invalidate JWTs upon logout.
-   **Input Validation**: All public endpoints use `express-validator` to sanitize and validate user input.
-   **ORM Integration**: Uses Prisma for type-safe and efficient database access.

## Technologies & Architecture

This project is built on a modern Node.js stack, designed for security and scalability.

-   **Core**: [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/) provide the foundation for the RESTful API.
-   **Database**: [MySQL](https://www.mysql.com/) is used as the primary database, managed by the [Prisma](https://www.prisma.io/) ORM for type-safe queries.
-   **Authentication & Token Blacklisting**: User sessions are managed via **JSON Web Tokens (JWT)**. For enhanced security, this project implements a **token blacklist** using [Redis](https://redis.io/).
    -   **Why Blacklist?**: JWTs are stateless; once issued, they remain valid until expiration, even if a user logs out or their token is compromised. A server-side blacklist is essential to immediately invalidate such tokens.
    -   **Why Redis?**: Redis is an in-memory database, offering high-speed performance crucial for checking the blacklist on every authenticated request without performance degradation. It also supports automatic key expiration, preventing the blacklist from growing indefinitely by removing expired tokens.

