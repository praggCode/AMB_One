🚑 AMBUGO - Ambulance Booking System 

* The Ambulance Booking System is a Next.js-based web application designed to streamline ambulance booking and emergency response coordination.
* It enables patients and drivers to interact in real time through a secure, intuitive, and responsive platform — ensuring faster and more efficient medical assistance during emergencies.
* The frontend connects with the backend seamlessly via REST APIs and Socket.io, providing real-time driver tracking, instant booking updates, and live trip status monitoring.

💻 Overview:
🧭 Two interfaces: Client Panel and Driver Panel
🚑 Clients can book ambulances, track drivers, and view booking history
👨‍✈️ Drivers can log in, view assigned trips, and update trip statuses
⚡ Real-time tracking and communication powered by Socket.io and Google Maps API
💬 Built with a responsive design for both web and mobile users

⚙️ Key Features:

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


🧰 Tech Stack
Technology	                Purpose
Next.js (React Framework)	Core frontend framework
Axios	                    API communication
Socket.io Client	        Real-time driver and booking updates
Firebase	                Client OTP authentication
Google Maps API	            Location and tracking integration
Tailwind CSS / CSS Modules	Styling and layout management

🔒 Authentication Routes
Endpoint	             | Method | Description         
/api/auth/send-otp       | POST	  | Send OTP to client via Firebase
/api/auth/verify-otp     | POST	  | Verify OTP and generate JWT
/api/driver/register     | POST	  | Register driver with email & password
/api/driver/login	     | POST	  | Driver login with JWT token return

🚑 Booking Routes
Endpoint	             | Method | Description
/api/bookings/create     | POST   |	Creates a new ambulance booking
/api/bookings/:id	     | GET	  | Fetches booking details by ID
/api/bookings/update/:id | PUT	  | Updates booking status (accept, complete, cancel)
/api/bookings	         | GET	  | Retrieves all bookings for a client or driver

⚡ Socket.io Events
booking-request	Triggered by client to request an ambulance
booking-accept	Sent by driver upon accepting a booking
location-update	Continuously transmits driver’s live location
trip-status	Emits booking progress and completion updates

🛠️ Setup & Installation Guide
Follow these steps to set up and run the Ambulance Booking System Frontend locally.

1️⃣ Prerequisites

Ensure the following are installed:

Node.js (v16 or later)

npm (Node Package Manager)

Git

A running backend server for REST API and Socket.io connectivity

2️⃣ Clone the Repository
git clone https://github.com/your-username/ambulance-booking-frontend.git
cd ambulance-booking-frontend

3️⃣ Install Dependencies
npm install

4️⃣ Set Up Environment Variables

Create a .env file in the project root directory and add:

NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key


⚠️ Replace the placeholder values with your actual credentials and backend URL.

5️⃣ Run the Application

Start the development server:

npm run dev


Open your browser and visit:
👉 http://localhost:3000

💡 You should now see the Ambulance Booking System running and connected to your backend services.

🧪 Testing Guide

To verify the system’s functionality:

✅ Test client OTP login using Firebase

✅ Test driver login using email & password

✅ Create and manage ambulance bookings

✅ Monitor real-time booking status and driver tracking

✅ Validate responsiveness across devices

✅ Test Socket.io event flow (booking request → accept → complete)

🌐 Backend Integration

Frontend communicates with backend via /api/... routes

Uses Socket.io for instant updates between drivers and clients

Implements JWT-based authentication for secure requests

🧱 Future Enhancements

📍 Advanced route optimization for drivers

💳 Online Payment Integration (Razorpay / Stripe)

🏥 Hospital Dashboard for centralized booking management

🔊 Voice Alerts for driver notifications

📱 Mobile App version (React Native / Flutter)

