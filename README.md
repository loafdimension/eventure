# Welcome to Eventure! 🏃‍♂️🏞️🧗‍♀️

# Table of Contents 📚

- [About](#about)  
- [Live Demo](#live-demo)  
- [How to Install and Run](#how-to-install-and-run)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Future Features](#future-features)  
- [Login Information](#login-information)  
- [Feedback](#feedback)  
- [Credits](#credits)  
- [Contact](#contact)  

---

<a id="about"></a>

# About 📝

**What is Eventure?**

Eventure is an events platform project designed for a small community business to create and share events with members. Events are typically walking, running, swimming, or climbing activities.  

- **Admin users** can create and delete events, and see all the events they have created under the *My Events* section.  
- **Regular users** can book events, which adds them to their personal calendar on the website. If logged in via Google, users can also add events to their Google Calendar.  

**Important Note:**  
The Google Calendar integration uses a sensitive API scope. The app is currently on a Google test account, so only test users that you add via the Google Cloud Console can access this feature.

**Backend & Authentication:**  
Eventure uses Supabase for authentication, database management, and backend logic.

---

<a id="live-demo"></a>

# Live Demo ✨

Experience the hosted version of Eventure here:

- **[Eventure Hosted Site (Netlify)](https://eventureproject.netlify.app/)**

---

<a id="how-to-install-and-run"></a>

# How to Install and Run 🚀

Follow these steps to get a local copy of Eventure running on your machine.

**1 - Prerequisites**

- **Node.js** and **npm** installed (comes with Node.js).  
- **Supabase account** (for connecting to your own instance if desired).

**2 - Clone the Repository**

```bash
git clone https://github.com/loafdimension/eventure.git
```

**3 - Navigate to the Project Directory**

```bash
cd eventure
```

**Install Dependencies**

```bash
npm install
```

**Start the Development Server**

```bash
npm run dev
```

---

<a id="features"></a>

# Features ✨

- **User Authentication:** Sign up / log in via email or Google (Google login only works for test users).  
- **Browse Events:** View all events in the community.  
- **Event Booking:** Book events and add them to your personal calendar.  
- **Google Calendar Integration:** Add booked events to Google Calendar (only for authorized test users).  
- **Admin Features:** Create, update, and delete events. View all events you’ve created.  
- **Live Capacity Tracking:** See remaining spots for each event in real-time.  
- **Activity Icons & Transitions:** Each event displays an activity icon with smooth visual transitions.  

---

<a id="tech-stack"></a>

# Tech Stack 💻

- **Front-end:** React.js + Vite  
- **Styling:** Tailwind CSS  
- **State Management:** React hooks (useState, useEffect)  
- **Routing:** React Router DOM  
- **HTTP Client:** Supabase client  
- **Date Handling:** date-fns  
- **Deployment:** Netlify  
- **Backend:** Supabase (authentication, database, RLS policies, triggers)

---

<a id="future-features"></a>

# Future Features 🛣️

Planned improvements can be tracked on the GitHub [Issues](https://github.com/loafdimension/eventure/issues) page.

---

<a id="login-information"></a>

# Login Information 🔑

For testing purposes, you can use the following accounts:

- **Regular User:**  
  - Email: `user@example.com`  
  - Password: `eventure123`  

- **Admin User:**  
  - Email: `admin@example.com`  
  - Password: `eventure456`  

> **Note:** Google login will not work for external users since the app is on a Google test account with sensitive API scopes. Only designated test users can access the Google Calendar integration.

---

<a id="feedback"></a>

# Feedback 🤝

Feedback is welcome! Please use GitHub Discussions or Issues to share your thoughts. Contributions are not required at this time.  

- [Issues](https://github.com/loafdimension/eventure/issues)  
- [Discussions](https://github.com/loafdimension/eventure/discussions)

---

<a id="credits"></a>

# Credits 🎥

**Development:** Morgan Hewitt  
**Support / Inspiration:** Northcoders & Tech Returners  

---

<a id="contact"></a>

# Contact 📞

- [LinkedIn](https://www.linkedin.com/in/morgan-hewitt-8a68041ab/)  
- [GitHub](https://github.com/loafdimension/eventure)
