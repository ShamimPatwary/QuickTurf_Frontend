# QuickTurf Frontend

> Frontend application for QuickTurf, a turf booking SaaS platform built with React.js and Vite.

QuickTurf Frontend provides the user interface for discovering turfs, viewing turf details, selecting sports and time slots, creating bookings, viewing booking information, and managing turf administration workflows.

Live link = https://quicktruf.onrender.com/
---

## 🚀 Overview

QuickTurf is a web-based turf booking platform designed to make sports-turf discovery and booking simple and efficient.

The frontend communicates with the QuickTurf REST API and provides separate user experiences for customers and turf administrators.

### Core Responsibilities

- Turf discovery and search
- Turf detail presentation
- Sports and time-slot selection
- Booking workflow
- Customer information collection
- Payment information display
- Booking and invoice information
- Turf admin interface
- Authentication UI
- Responsive design
- API integration
- Client-side state and navigation

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React.js |
| Build Tool | Vite |
| Language | JavaScript / JSX |
| Styling | CSS / Utility-first CSS |
| Routing | React Router |
| API Communication | REST API |
| HTTP Client | Axios |
| Development | Node.js + npm |


---

### Main Responsibilities

**Pages**
- Represents complete application screens
- Coordinates page-level data and UI

**Components**
- Provides reusable interface elements
- Reduces duplicated UI code

**Services**
- Handles communication with the backend API
- Keeps API requests separate from UI components

**Routing**
- Controls navigation between application pages
- Supports customer and admin workflows

---

## 📁 Project Structure

A simplified frontend structure:

```text
frontend/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── ...
│   │
│   ├── pages/
│   │   ├── ...
│   │
│   ├── services/
│   │   ├── ...
│   │
│   ├── hooks/
│   │   ├── ...
│   │
│   ├── utils/
│   │   ├── ...
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
│
├── .env
├── package.json
├── vite.config.js
└── ...
```

---

## ✨ Features

### Customer Features

- Browse available turfs
- Search for turfs
- View turf details
- View available sports
- View available time slots
- Select a booking slot
- Enter customer information
- Review booking/payment information
- Submit a booking
- View booking information
- Access invoice information

### Turf Admin Features

- Turf admin login
- Admin dashboard
- Manage turf information
- Manage sports
- Manage time slots
- View bookings
- Manage booking/payment status
- Change password

### UI Features

- Responsive layout
- Reusable components
- Form validation
- Loading states
- Error handling
- Success/error feedback
- Protected admin pages
- Consistent navigation
- Mobile-friendly booking workflow

---

## 📄 Main Application Pages

The application includes pages for the main customer and administrator workflows.

Typical pages include:

```text
Home
Turf Listing
Turf Details
Booking / Payment Information
Booking Confirmation
Invoice
Admin Login
Admin Dashboard
Sports Management
Time Slot Management
Booking Management
Change Password
```

---

## 🔄 Customer Booking Flow

The frontend booking process follows this general flow:

```text
Home
  │
  ▼
Browse Turfs
  │
  ▼
Select Turf
  │
  ▼
Turf Details
  │
  ▼
Select Sport / Time Slot
  │
  ▼
Booking Information
  │
  ▼
Customer Details
  │
  ▼
Payment Information
  │
  ▼
Confirm Booking
  │
  ▼
Booking Result / Invoice
```

---

## 🏟️ Turf Detail Workflow

A customer can:

1. Open the turf listing.
2. Select a turf.
3. View turf information.
4. Select a sport.
5. View available time slots.
6. Select an available slot.
7. Continue to the booking/payment information page.

Example application flow:

```text
TurfDetailPage
      │
      ├── Turf Information
      │
      ├── Sports
      │
      └── Available Time Slots
                │
                ▼
       BookingPaymentInfoPage
                │
                ▼
           Create Booking
```

---

## 🔐 Authentication

The frontend communicates with the backend authentication API.

Typical flow:

```text
Admin Login
    │
    ▼
Submit Credentials
    │
    ▼
Backend Authentication API
    │
    ▼
Access Token
    │
    ▼
Store Authentication State
    │
    ▼
Access Protected Admin Pages
```

---

## 📡 API Integration

The frontend communicates with the QuickTurf FastAPI backend through REST APIs.

Typical API resources include:

```text
/auth
/turfs
/sports
/time-slots
/bookings
/users
/payments
```

---

## 🧩 Component Architecture

The UI is built from reusable React components.

A simplified structure:

```text
App
│
├── Navigation
│
├── Pages
│   ├── Home
│   ├── Turf Listing
│   ├── Turf Details
│   ├── Booking
│   └── Admin
│
└── Reusable Components
    ├── Buttons
    ├── Forms
    ├── Cards
    ├── Modals
    ├── Tables
    └── Loading / Error States
```

Reusable components help maintain consistency and reduce duplication.

---

## 🎨 UI/UX Principles

QuickTurf follows several UI/UX principles.

### Utility-First

The interface prioritizes important actions such as searching, selecting a turf, selecting a slot, and completing a booking.

### Mobile-First

The application is designed to work across mobile, tablet, and desktop screen sizes.

### Speed & Efficiency

The booking workflow minimizes unnecessary steps so users can complete bookings quickly.

### Clarity Over Content Clutter

Important information such as turf details, time slots, prices, and booking information is presented clearly.

### Predictable Hierarchy

Headings, buttons, forms, cards, prices, and actions use a consistent visual hierarchy.

---

## 📱 Responsive Design

The frontend is designed to support different screen sizes:

```text
┌──────────────────────────────┐
│          Desktop             │
│                              │
│   ┌──────┐  ┌──────┐         │
│   │ Turf │  │ Turf │   ...   │
│   └──────┘  └──────┘         │
└──────────────────────────────┘

┌─────────────────┐
│     Mobile      │
│                 │
│   ┌──────────┐  │
│   │   Turf   │  │
│   └──────────┘  │
│                 │
│   ┌──────────┐  │
│   │   Turf   │  │
│   └──────────┘  │
└─────────────────┘
```

---

## ⚙️ Local Development Setup

### Prerequisites

Install:

- Node.js 18+
- npm
- Git

Check your versions:

```bash
node --version
npm --version
git --version
```

---

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd QuickTurf
```

Navigate to the frontend:

```bash
cd frontend
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Make sure the backend API is running before using API-dependent features.

---

### 4. Start Development Server

```bash
npm run dev
```

Vite will provide a local development URL, commonly:

```text
http://localhost:5173
```

---

## 📦 Available Scripts

Common Vite/React scripts include:

### Start development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Run linting

```bash
npm run lint
```

> Available commands depend on the project's `package.json`.

---

## 🏗️ Production Build

Create an optimized production build:

```bash
npm run build
```

The generated production files are typically placed in:

```text
dist/
```

Preview the production build locally:

```bash
npm run preview
```

---

### Important

Vite exposes variables prefixed with `VITE_` to the client bundle.

Therefore, never place secrets such as:

```text
DATABASE_PASSWORD
JWT_SECRET
PRIVATE_API_KEY
```

---

## 🐛 Troubleshooting

### API Request Fails

Check the API URL:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Make sure the FastAPI backend is running.

### CORS Error

If the browser reports a CORS error, verify that the backend allows the frontend origin.

For local development, the frontend commonly runs at:

```text
http://localhost:5173
```

### Dependency Error

Delete dependencies and reinstall:

```bash
rm -rf node_modules
npm install
```

On Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

### Build Error

Run:

```bash
npm run build
```

and inspect the first error reported by Vite.

---

## 🔮 Future Improvements

Potential frontend improvements include:

- Advanced turf filtering
- Turf ratings and reviews
- Real-time slot availability
- Improved loading skeletons
- Progressive Web App support
- Push notifications
- Improved accessibility
- Dark mode
- Internationalization
- More detailed admin analytics
- Better offline/error recovery

---

### Project

**QuickTurf — Turf Booking SaaS**

The frontend was developed as part of a collaborative software engineering project focused on creating a responsive and user-friendly turf booking experience.

---

---

## ⭐ QuickTurf Frontend

**React.js · Vite · REST API**

**Find. Book. Play.**
