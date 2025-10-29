# 🚑 Ambulance Booking System – Backend

The **Ambulance Booking System** backend powers a real-time ambulance booking platform that connects patients (clients) with nearby ambulance drivers.  
Inspired by Uber’s model, this system is specialized for **medical emergencies**, enabling **quick ambulance booking**, **real-time tracking**, and **secure authentication** for both drivers and clients.

---

## 🧠 Overview

The backend is built using **Node.js (Express.js)** with **MongoDB** as the database and **Socket.io** for real-time communication.  
It provides APIs for:
- OTP-based authentication (for clients)
- Email-password login (for drivers)
- Ambulance booking, tracking, and status updates
- Communication between client and driver in real time

---

## ⚙️ Key Features

### 🔐 Authentication System
- **Client Authentication (OTP-based)** using Firebase or Twilio
  - Clients log in using their mobile number
  - OTP is sent via Firebase Authentication
  - Once verified, a JWT is issued for session management  
- **Driver Authentication (Email + Password)**
  - Drivers register and log in using secure credentials
  - Passwords are hashed using **bcrypt**
  - JWTs are used for authentication and route protection  

---

### 🚗 Booking Management
- Clients can **book** an ambulance by providing pickup and destination details
- System finds **nearest available driver**
- Real-time **trip updates** (Requested → Accepted → In Progress → Completed → Cancelled)
- Booking history is stored for both clients and drivers

---

### 💬 Real-time Communication
- Implemented using **Socket.io**
- Real-time updates for:
  - Trip status changes
  - Driver location updates
  - Notifications for acceptance, arrival, or cancellations

---

### 🧾 Admin Capabilities (Optional Extension)
- View all bookings and their statuses
- Manage driver accounts
- Monitor system analytics

---

## 🧰 Tech Stack

| Component | Technology |
|------------|-------------|
| **Backend Runtime** | Node.js (Express.js) |
| **Database** | MongoDB (Mongoose ORM) |
| **Authentication** | Firebase (OTP), JWT (Driver Auth) |
| **Real-time** | Socket.io |
| **Security** | bcrypt, dotenv, cors |
| **API Testing** | Postman |
| **Hosting (optional)** | Render / Railway / AWS / Vercel (Serverless) |

---

| Endpoint               | Method | Description                           |
| ---------------------- | ------ | ------------------------------------- |
| `/api/auth/send-otp`   | POST   | Send OTP to client via Firebase       |
| `/api/auth/verify-otp` | POST   | Verify OTP and generate JWT           |
| `/api/driver/register` | POST   | Register driver with email & password |
| `/api/driver/login`    | POST   | Driver login with JWT token return    |

| Endpoint                   | Method | Description                                      |
| -------------------------- | ------ | ------------------------------------------------ |
| `/api/bookings/create`     | POST   | Create new booking request                       |
| `/api/bookings/:id`        | GET    | Fetch booking details                            |
| `/api/bookings/update/:id` | PUT    | Update booking status (accept, complete, cancel) |
| `/api/bookings`            | GET    | Get all bookings for a client/driver             |

| Event             | Description                                 |
| ----------------- | ------------------------------------------- |
| `booking-request` | Sent by client to request ambulance         |
| `booking-accept`  | Sent by driver to accept booking            |
| `location-update` | Continuously updates driver’s live location |
| `trip-status`     | Emits trip progress and completion          |






