# RAKSHAK — The Helping Hand 🌱

<p align="center">
  <strong>Connecting surplus food with those who need it.</strong><br>
  A community-focused platform for food rescue, donations, and disaster relief.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Project-Codeathon%205.0-00A63E" alt="Codeathon 5.0">
  <img src="https://img.shields.io/badge/Organised%20by-ABESIT-166534" alt="Organised by ABESIT">
  <img src="https://img.shields.io/badge/Focus-Food%20Rescue%20%26%20Disaster%20Relief-16A34A" alt="Food Rescue and Disaster Relief">
</p>

## About the Project

**RAKSHAK** is a web platform designed to reduce food waste and make community support easier to coordinate. It connects food donors—including restaurants, caterers, and households—with NGOs and people who need assistance. The platform also supports monetary contributions and disaster-relief coordination.

This project was developed for **Codeathon 5.0, organised by ABES Institute of Technology (ABESIT)**.

## Screenshots

### Homepage
![RAKSHAK Homepage](public/Screenshot%202026-10-17%20133117.png)

### Donate Food
![Food Donation Form](public/Screenshot%202026-10-17%20133137.png)

### Donate Money
![Monetary Donation Page](public/Screenshot%202026-10-17%20133218.png)

### Contact
![Contact Page](public/Screenshot%202026-10-17%20133233.png)

### Donor Dashboard
![Donor Dashboard](public/Screenshot%202026-10-17%20133256.png)

### User Profile
![User Profile](public/Screenshot%202026-10-17%20133327.png)

## Key Features

- **Food donation listings:** Submit surplus food details, categories, quantities, expiry dates, and pickup information.
- **Monetary donations:** Choose a contribution amount and support a cause through Stripe Checkout.
- **Disaster relief:** Access disaster-relief missions and emergency support features.
- **Donor dashboard:** Track donation activity, estimated meals, Karma points, pending pickups, and recent donations.
- **Karma rewards and leaderboard:** Recognise participation through contribution points and rankings.
- **Donation certificates:** Access certificates associated with eligible donations.
- **User profiles:** View and manage account information and contribution statistics.
- **Contact and support:** Contact form and information for general enquiries and partnerships.
- **Role-aware experience:** Navigation and dashboards tailored to the signed-in user's role.

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, React Router |
| Styling and UI | Tailwind CSS, Lucide React, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JSON Web Tokens (JWT), bcryptjs |
| Payments | Stripe Checkout |
| Maps and charts | Leaflet, Recharts |
| PDF generation | jsPDF, PDFKit |

## Run Locally

### Prerequisites

- Node.js and npm
- MongoDB local instance or MongoDB Atlas database
- Stripe test credentials for testing payments

### 1. Clone the repository

```bash
git clone https://github.com/stackdev-ash/Rakshak.git
cd Rakshak
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Check `backend/config/env.js` and the backend configuration files to identify the exact environment variable names required by the application.

Configure the required values, including your MongoDB URI, JWT secret, frontend URL, and Stripe credentials where applicable.

**Never commit `.env` files, database credentials, API keys, or Stripe secrets to GitHub.**

### 4. Start the backend

```bash
npm run server
```

For development with automatic restarts:

```bash
npm run server:dev
```

### 5. Start the frontend

Open a separate terminal in the project root:

```bash
npm run dev
```

Open the local URL displayed by Vite in your terminal.

### Other available scripts

```bash
npm run build
npm run lint
npm run db:seed
npm run db:init
```

Check `package.json` before running optional database setup or seed commands.

## Project Purpose

RAKSHAK aims to redirect surplus food to people who need it while providing a digital platform for donations and disaster-relief initiatives. By bringing food donors, monetary contributors, and relief activities together, it seeks to make community support more accessible and organised.

## Event Credits

- **Project:** RAKSHAK — The Helping Hand
- **Event:** Codeathon 5.0
- **Organised by:** ABES Institute of Technology (ABESIT)

## Future Scope

- Verified NGO onboarding and verification workflows
- Real-time pickup updates and notifications
- Improved accessibility and multilingual support
- More detailed impact analytics for meals rescued and people supported
- Automated testing and production monitoring

---

<p align="center">
  Built for <strong>Codeathon 5.0</strong> at <strong>ABES Institute of Technology</strong>.
</p>
