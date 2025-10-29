# 🚑 Ambulance Booking System

An advanced web application for booking ambulances in emergencies — inspired by Uber but designed for healthcare needs.  
The system includes two main roles: **Client (Patient)** and **Driver (Ambulance Driver)**, with a secure **OTP-based login for clients** and **email-password login for drivers**.

---

## 🧠 Project Overview

The Ambulance Booking System allows patients to quickly book nearby ambulances, view live tracking, and communicate with drivers in real-time.  
Drivers can accept bookings, navigate to patient locations, and update trip statuses.  
Admins can optionally monitor trips and manage users.

---

## 🧍 Client Features
- OTP-based mobile authentication  
- Live tracking using Google Maps API  
- Emergency one-tap booking  
- Booking history and trip updates  
- Estimated fare and arrival time  
- Direct call/chat with driver  

---

## 🚘 Driver Features
- Email/password authentication  
- Accept/reject booking requests  
- Real-time trip tracking and navigation  
- Update trip status (Arrived, Started, Completed)  
- View earnings and past trips  

---

## 🏥 Optional Admin Features
- Manage drivers and clients  
- Monitor ongoing bookings  
- Analytics on usage and peak hours  

---

## 🧩 Tech Stack
| Layer | Technology |
|--------|-------------|
| Frontend | React.js |
| Backend | Node.js (Express.js) |
| Database | MongoDB |
| Authentication | Firebase OTP (Client), JWT (Driver) |
| Maps | Google Maps API |
| Real-time Updates | Socket.io |

---
🚀 Future Enhancements

- Payment Gateway Integration
- Hospital Management Panel
- Multi-language support
- Push Notifications for emergency alerts
