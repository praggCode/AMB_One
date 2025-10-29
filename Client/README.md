# 🚑 Ambulance Booking System – Frontend

The **frontend** of the Ambulance Booking System is built with **React.js**, providing a user-friendly and responsive interface for both **clients** and **drivers**.  
It connects seamlessly with the backend through REST APIs and Socket.io for real-time updates such as driver tracking and booking status.

---

## 💻 Overview

- Two interfaces: **Client Panel** and **Driver Panel**  
- Clients can **book ambulances**, **track drivers**, and **view booking history**  
- Drivers can **log in**, **view assigned bookings**, and **update trip status**  
- Real-time updates powered by **Socket.io** and **Google Maps API**  

---

## ⚙️ Key Features

- 🔐 **OTP Authentication** for clients via Firebase  
- 👨‍✈️ **Email & Password Login** for drivers  
- 🚑 **Ambulance Booking** with pickup & destination inputs  
- 📍 **Live Tracking** using Google Maps API  
- 🕒 **Real-time Booking Status Updates** via Socket.io  
- 📱 **Responsive Design** for both mobile and desktop users  

---

## 🧰 Tech Stack

| Technology | Purpose |
|-------------|----------|
| **React.js/Next.js** | Frontend library |
| **Axios** | API communication |
| **Socket.io Client** | Real-time updates |
| **Firebase** | OTP authentication |
| **Google Maps API** | Location and tracking |
| **Tailwind CSS / CSS Modules** | Styling and layout |


---

## 🧪 Testing

- Test **client OTP login** using Firebase  
- Test **driver login** using email and password  
- Create and view **ambulance bookings**  
- Check **real-time updates** for booking status and driver location  
- Verify **responsive design** across devices  

---

## 🌐 Connection with Backend

- Frontend communicates with backend APIs hosted at `/api/...`  
- Uses **Socket.io** for real-time driver tracking and status updates  
- Includes **JWT tokens** in headers for authenticated API requests  

---

## 🧱 Future Enhancements

- 📍 Enhanced Google Maps tracking  
- 💳 Online payment integration (Razorpay / Stripe)  
- 🧑‍⚕️ Hospital dashboard interface  
- 🌃 Dark mode theme  
- 🔊 Voice alerts for drivers on new bookings  

---




