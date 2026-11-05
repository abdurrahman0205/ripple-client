# 🌊 Ripple — Social Development Events Platform

### Check Our Site
**Live Website:** [https://ripple-ar.vercel.app/](https://ripple-ar.vercel.app/)

---

## About the Project

Ripple is a community-driven social development events platform designed to connect people with meaningful community service opportunities.

The platform allows users to create social development events, explore upcoming activities, join events, and manage their own events. It encourages people to participate in local initiatives and contribute to positive changes in their communities.

Whether it's distributing winter clothes, providing blankets to people in need, organizing cleanup campaigns, or planting trees, Ripple makes it easier for people to discover opportunities and take action.

## Project Overview

Ripple provides a simple and interactive platform where users can organize and participate in community service activities.

Users can create events with relevant information, including event details, location, event type, and date. Other users can explore upcoming events and join activities that interest them.

The platform also provides personalized event management features, allowing users to track joined events and manage events they have created.

## Key Features

- **User Authentication:** Register and log in using email and password, with Google or GitHub authentication support.
- **Create Events:** Authenticated users can create community service events with titles, descriptions, event types, locations, images, and future event dates.
- **Explore Upcoming Events:** Browse upcoming community service events and discover opportunities to participate.
- **Event Details:** View detailed information about individual events, including their location, date, description, and organizer.
- **Join Events:** Logged-in users can join events and save their participation in the database.
- **Joined Events:** View and track events joined by the logged-in user, organized by event date.
- **Manage Events:** View, update, and delete events created by the logged-in user.
- **Protected Routes:** Secure private pages and event management functionality through authentication and authorization.
- **Responsive Design:** Enjoy a consistent experience across desktop, tablet, and mobile devices.
- **Theme Customization:** Switch between light and dark themes.
- **Community Gallery:** Explore photographs showcasing community service activities.
- **Newsletter Section:** Discover the newsletter subscription section designed to keep visitors connected with community initiatives.

## Tech Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Shadcn UI

### Backend
- Node.js
- Express.js
- MongoDB

### Authentication & Authorization
- Better Auth
- MongoDB Adapter
- JWT

## Installation & Setup

Follow these steps to run Ripple locally.

### 1. Clone the Repository

```bash
git clone YOUR_CLIENT_REPOSITORY_URL
```

### 2. Navigate to the Project Directory

```bash
cd ripple
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory and configure the required environment variables for authentication, database connection, and backend API communication.

```env
# Backend API URL
NEXT_PUBLIC_API_URL=YOUR_BACKEND_API_URL

# Configure your authentication and database variables
# according to your project setup
```

### 5. Run the Development Server

```bash
npm run dev
```

### 6. Open the Application

Visit:

```text
http://localhost:3000
```

## Project Structure

```text
ripple/
├── public/
│   ├── images/
│   └── icons/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── ...
│   ├── assets/
│   ├── components/
│   ├── lib/
│   └── ...
├── .env.local
├── package.json
└── README.md
```

## How to Contribute

Contributions, suggestions, and feedback are welcome.

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes.
5. Submit a pull request.

## Contact

**Developer:** Abdur Rahman

**GitHub:** [abdurrahman0205](https://github.com/abdurrahman0205)

**Live Website:** [Ripple](https://ripple-ar.vercel.app/)

---

*Ripple — Explore. Join. Make a Difference.*
