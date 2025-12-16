# 🌱 EcoTrack — Sustainable Living Community

🔗 **Live Site:** https://ecotrack-sustainable.web.app  

---

## 📌 Project Overview

**EcoTrack** is a sustainability-focused community platform where users can discover and join eco-friendly challenges, track their environmental impact, explore community tips, and stay updated on upcoming green events. The platform emphasizes measurable, community-driven progress toward a greener future.

---

## ✨ Key Features

- 🌍 **Sustainability Challenges**
  - Browse and join environmental challenges (Waste Reduction, Energy Conservation, Green Living, etc.)
  - Dynamic participant count and challenge details
  - Challenge data fetched from MongoDB via REST API

- 📊 **Live Community Impact Statistics**
  - Aggregated environmental impact (e.g., kg plastic saved, CO₂ reduced)
  - Calculated dynamically from challenge data stored in the database

- 💡 **Recent Community Tips**
  - Displays latest eco tips shared by users
  - Shows title, author name, category, upvotes, and time preview

- 📅 **Upcoming Green Events**
  - Shows upcoming eco-friendly events
  - Includes event date, location, description, and participant info

- 🔐 **Authentication & Protected Routes**
  - Firebase Authentication (Email/Password + Google Login)
  - Protected routes for authenticated users only
  - Logged-in users remain authenticated even after page reload

---

## 🧭 Routing & Reload Safety

- Built as a **Single Page Application (SPA)** using React Router
- Firebase Hosting configured with rewrite rules:
  - All routes redirect to `/index.html`
  - Prevents 404 errors on page reload
- Fully compliant with assignment requirement:
  > “Ensure that the page doesn't throw any error on reloading from any routes.”

---

## 🛠️ Tech Stack (Client Side)

- **React** (Vite)
- **React Router DOM**
- **Tailwind CSS** + **DaisyUI**
- **Firebase Authentication**
- **Firebase Hosting**
- **Axios** (API communication)

---

## 🔐 Authentication Features

- Email & Password login
- Google Sign-In
- Toast notifications for success & error handling (no browser alerts)
- Redirects users to intended route after login

---

## 🚀 Deployment

- Client hosted on **Firebase Hosting**
- Production build generated using `npm run build`
- Hosting configured with:
  - `dist` as public directory
  - SPA rewrite enabled
- Firebase authorized domain configured for authentication

---

## 📄 Assignment Compliance Checklist

✔ Minimum required GitHub commits on client side  
✔ No lorem ipsum text used  
✔ No default browser alerts used  
✔ Dynamic data loaded from MongoDB  
✔ SPA reload safety ensured  
✔ Firebase authentication configured  
✔ Responsive UI for mobile, tablet, and desktop  

---

## 👤 Author

**Mahmudul Hasan Masum**
Junior Full-Stack JavaScript Developer  
Interested in sustainable technology and data-driven applications

---

💚 *EcoTrack — Small actions, measurable impact.*
