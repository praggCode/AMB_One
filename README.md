# 🏫 IntraNewton: College-Specific Social Media Platform

## 📘 Project Overview
**IntraNewton** is a social media platform exclusively designed for college students within our institution.  
It aims to foster a connected and engaging online community where students can interact, share information, and collaborate in a secure and controlled environment.

This document outlines the project's **scope**, **technical architecture**, and **key features**.

---

## 🎯 Project Goals

1. **Create a dedicated platform for college students:**  
   Provide a safe and exclusive online space for our college community.

2. **Facilitate student interaction and engagement:**  
   Enable students to connect, share updates, and participate in discussions.

3. **Support academic and extracurricular activities:**  
   Offer features that help students collaborate on projects and organize events.

4. **Ensure data security and privacy:**  
   Implement robust authentication and authorization mechanisms to protect user data.

---

## 🧩 Technical Stack

### 🖥 Backend
- **Node.js**
- **Express.js**
- **Prisma ORM**
- **JWT (JSON Web Token)**

### 🗄 Database
- **MySQL**

### 💻 Frontend
- **React.js**
- **React Router**
- **Axios**
- **Context API**

### 🎨 UI & Styling Libraries
- **shadcn/ui**
- **Tailwind CSS**

### 🔐 Authentication & Security
- **JWT Authentication**
- **Bcrypt Password Hashing**
- **HTTPS**
- **Email Verification**

### ☁️ Deployment & DevOps
- **Vercel**

### 🧾 Version Control & Documentation
- **Git**
- **GitHub**

---

## 🚀 Key Features (Stepwise & Concise)

### 1️⃣ User Management
- Signup/login with **college email** only  
- Manage profile, password, and privacy settings

### 2️⃣ Posts & Feed
- Create **text, image, or video posts**
- View a personalized **feed**
- Edit or delete posts
- Control post visibility (public/private)

### 3️⃣ Followers / Connections
- Follow and unfollow students  
- View **followers/following count**
- Get **suggested connections**

### 4️⃣ Comments & Likes
- Like and comment on posts  
- Edit/delete comments  
- Optional **nested replies**

### 5️⃣ Chat / Messaging
- One-on-one chat (real-time)  
- Optional **group chat**  
- Message history support

### 6️⃣ Notifications
- Get notifications for likes, comments, follows, and messages

### 7️⃣ Media Storage
- Upload and store **profile pictures and post media**
- Optimized for fast web performance

### 8️⃣ Search & Discovery
- Search students by **name, department, year, or interests**
- Explore trending content

### 9️⃣ Groups & Events *(Optional)*
- Create **interest or department-based groups**
- Post in groups, **RSVP** to events

### 🔟 Admin / Moderation *(Optional)*
- Manage users and content  
- **Report/block** inappropriate posts  
- View **analytics**

### ⚙️ Advanced / Future Features
- **Stories**
- **Polls**
- **Gamification**
- **Dark Mode**
- **AI Suggestions**
- **Push Notifications**

---

## 📈 Future Scope
The platform can evolve into a **college-wide networking ecosystem**, integrating:
- Alumni connections  
- Career and internship portals  
- College announcements and digital ID integrations

---

## 🧑‍💻 Contributors
- **Project Lead:** Hariksh Mahendra Suryawanashi  
- **Team Members:** (Add names here)

---

## 📄 License
This project is licensed under the **MIT License** — feel free to modify and build upon it responsibly.

---

## 🪄 Getting Started (Optional Section)

```bash
# 1. Clone the repository
git clone https://github.com/your-username/intranewton.git
cd intranewton

# 2. Install dependencies
npm install

# 3. Set up environment variables
# (Create .env file with database URL, JWT_SECRET, etc.)

# 4. Run Prisma migrations
npx prisma migrate dev --name init

# 5. Start the development server
npm run dev
