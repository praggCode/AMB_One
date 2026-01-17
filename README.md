# Ambulance Booking System

The **Ambulance Booking System** is a comprehensive web application designed to streamline ambulance booking and emergency response coordination. It features a dual-frontend architecture to cater to different user needs and a robust backend for real-time operations.

It allows patients and drivers to interact in real-time through a **secure, intuitive, and responsive platform**, ensuring faster medical assistance during emergencies.

The system connects seamlessly with the backend via **REST APIs and Socket.io**, providing **real-time driver tracking, instant booking updates, and live trip status monitoring**.

[👉 Know More](https://docs.google.com/document/d/1PusiJMiwpYbAUpjTGTYunxlPW24cd9GQwjgiNjclx7k/edit?tab=t.0#heading=h.namad6nbwei0)

---

## 💻 Overview

- 🧭 **Unified Interface:**
  - **Ambulance Booking App:** A comprehensive Next.js application for both Users and Drivers.
- 🚑 **Clients:** Book ambulances, track drivers, and view booking history.
- 👨‍✈️ **Drivers:** Log in, view assigned trips, and update trip statuses.
- ⚡ **Real-time tracking & communication:** Powered by Socket.io & Google Maps API.
- 💬 **Responsive design:** Optimized for both web and mobile users.

---

## ⚙️ Key Features

### 🔐 Authentication System
**Client Authentication**
- Secure login and registration.
- JWT-based session management.

**Driver Authentication**
- Secure login with hashed passwords (**bcrypt**).
- JWT-based authentication & route protection.

---

### 🚗 Booking Management
- Clients can book ambulances with pickup & destination details.
- System finds the **nearest available driver**.
- Real-time trip updates: *Requested → Accepted → In Progress → Completed → Cancelled*.
- Booking history stored for both clients and drivers.

---

### 💬 Real-time Communication
- Powered by **Socket.io**.
- Real-time updates for:
  - Trip status changes.
  - Driver location updates.
  - Notifications for acceptance, arrival, or cancellations.

---

### 🧾 Admin Capabilities (Optional)
- View all bookings and statuses.
- Manage driver accounts.
- Monitor system analytics.

---


---

## 🧰 Tech Stack

### **Frontend**
| Technology               | Purpose                                  |
|--------------------------|-----------------------------------------|
| **Next.js**              | Core frontend framework                  |
| **Axios**                | API communication                        |
| **Socket.io Client**     | Real-time updates                        |
| **Google Maps API**      | Location tracking and map integration    |
| **Tailwind CSS**         | Styling and responsive layout management |

### **Backend**
| Technology                   | Purpose                                      |
|-------------------------------|---------------------------------------------|
| **Node.js**                   | JavaScript runtime for backend              |
| **Express**                   | Web framework for building REST APIs        |
| **express-validator**         | Validate incoming request data              |
| **jsonwebtoken (JWT)**        | Authentication and route protection         |
| **cors**                      | Enable cross-origin requests                |
| **bcrypt**                    | Secure password hashing                      |
| **MongoDB & Mongoose**        | NoSQL database and ODM                      |
| **Socket.io**                 | Real-time bidirectional communication       |

---

## 📜 API Documentation

### ⚡ Socket.io Events
- **booking request** → Triggered by client to request an ambulance.
- **booking accept** → Sent by driver upon accepting a booking.
- **location update** → Continuously transmits driver’s live location.
- **trip status emits** → Booking progress and completion updates.

---

## 🛠️ Full Setup & Installation Guide

### 1️⃣ Prerequisites
- **Node.js** (v16 or later) → [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** → [Download Git](https://git-scm.com/)
- **MongoDB** → [Download MongoDB](https://www.mongodb.com/try/download/community) or use MongoDB Atlas.

---

### 2️⃣ Clone the Repository
```bash
git clone https://github.com/praggCode/AMB_One.git
cd AMB_One
```

### 3️⃣ Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables (example):
```env
PORT=4000
DB_CONNECT=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run the backend server:
```bash
npm run dev
```

### 4️⃣ Frontend Setup
Navigate to the frontend directory:
```bash
cd ../frontend
npm install
```

Run the development server:
```bash
npm run dev
```

---

### 🧪 Testing Guide

To verify the system’s functionality:
* ✅ Test client login/signup.
* ✅ Test driver login/signup.
* ✅ Create and manage ambulance bookings.
* ✅ Monitor real-time booking status and driver tracking.
* ✅ Validate responsiveness across devices.
* ✅ Test Socket.io event flow (booking request → accept → complete).

---

### 🌐 Backend Integration

 * Frontend communicates with backend via `/api/...` routes.
 * Uses Socket.io for instant updates between drivers and clients.
 * Implements JWT-based authentication for secure requests.

---

### 🧱 Future Enhancements

 * 📍 Advanced route optimization for drivers.
 * 💳 Online Payment Integration (Razorpay / Stripe).
 * 🏥 Hospital Dashboard for centralized booking management.
 * 🔊 Voice Alerts for driver notifications.
 * 📱 Mobile App version (React Native / Flutter).
