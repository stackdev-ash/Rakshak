# RAKSHAK --- The Helping Hand 🌱

```{=html}
<p align="center">
```
`<strong>`{=html}Connecting surplus food with those who need
it.`</strong>`{=html}`<br/>`{=html} A community-focused platform for
food rescue, donations, and disaster relief.
```{=html}
</p>
```
```{=html}
<p align="center">
```
`<img src="https://img.shields.io/badge/Project-Codeathon%205.0-00A63E" alt="Codeathon 5.0"/>`{=html}
`<img src="https://img.shields.io/badge/Organised%20by-ABES%20Institute%20of%20Technology-166534" alt="Organised by ABES Institute of Technology"/>`{=html}
`<img src="https://img.shields.io/badge/Focus-Food%20Rescue%20%26%20Disaster%20Relief-16A34A" alt="Food Rescue and Disaster Relief"/>`{=html}
```{=html}
</p>
```
## About the Project

**RAKSHAK** is a web platform built to help reduce food waste and make
community support easier to coordinate. It connects food
donors---including restaurants, caterers, and households---with NGOs and
people who need assistance. The platform also supports monetary
contributions and disaster-relief coordination.

This project was developed for **Codeathon 5.0, organised by ABES
Institute of Technology (ABESIT)**.

## Screenshots

```{=html}

### Homepage
![RAKSHAK homepage](public/Screenshot%202026-10-17%20133117.png)

### Donate Food
![Food donation form](public/Screenshot%202026-10-17%20133137.png)

### Donate Money
![Monetary donation page](public/Screenshot%202026-10-17%20133218.png)

### Contact
![Contact page](public/Screenshot%202026-10-17%20133233.png)

### Donor Dashboard
![Donor dashboard](public/Screenshot%202026-10-17%20133256.png)

### User Profile
![User profile](public/Screenshot%202026-10-17%20133327.png)

```
## Key Features

-   **Food donation listings:** Submit surplus food details, category,
    quantity, expiry/best-before date, and pickup information.
-   **Monetary donations:** Choose a contribution amount and support a
    listed cause through Stripe Checkout.
-   **Disaster relief:** Dedicated section for disaster-relief missions
    and emergency support.
-   **Donor dashboard:** View donation activity, estimated meals, Karma
    points, pending pickups, and recent donations.
-   **Karma rewards and leaderboard:** Recognise donor and volunteer
    participation through contribution points and rankings.
-   **Donation certificates:** Access certificates associated with
    eligible donations.
-   **User profile:** View and manage account information and
    contribution statistics.
-   **Contact and support:** Contact form and dedicated contact
    information for general enquiries and partnerships.
-   **Role-aware experience:** Navigation and dashboard content are
    tailored to the signed-in user role.

## Tech Stack

The project repository includes a React/Vite frontend and a
Node.js/Express backend. The application uses MongoDB for data storage
and integrates supporting libraries for its UI, maps, charts,
authentication, and payment flow.

  Layer             Technologies
  ----------------- -------------------------------------------
  Frontend          React, Vite, React Router
  Styling and UI    Tailwind CSS, Lucide React, Framer Motion
  Backend           Node.js, Express.js
  Database          MongoDB, Mongoose
  Authentication    JSON Web Tokens (JWT), bcryptjs
  Payments          Stripe Checkout
  Maps and charts   Leaflet, Recharts
  PDF generation    jsPDF, PDFKit

## Run Locally

### Prerequisites

-   Node.js and npm
-   MongoDB local instance or MongoDB Atlas database
-   Stripe test credentials if testing payments

### 1. Clone the repository

``` bash
git clone <https://github.com/stackdev-ash/Rakshak.git>
cd RAKSHAK
```

Replace `<https://github.com/stackdev-ash/Rakshak.git>` with the URL of your GitHub repository.

### 2. Install dependencies

``` bash
npm install
```

### 3. Configure environment variables

Check `backend/config/env.js` and the backend configuration files to
identify the exact environment variable names required by this project.
Add the required values to your local environment file, including the
MongoDB URI, JWT secret, frontend URL, and Stripe credentials where
applicable.

**Do not commit `.env` files, database credentials, API keys, or Stripe
secrets to GitHub.**

### 4. Start the backend

``` bash
npm run server
```

For development with automatic restarts:

``` bash
npm run server:dev
```

### 5. Start the frontend

In a separate terminal, run:

``` bash
npm run dev
```

Use the local URL printed by Vite in the terminal to open the app.

### Other available scripts

``` bash
npm run build
npm run lint
npm run db:seed
npm run db:init
```

Review the scripts in `package.json` before running optional database
setup or seed commands, and use a development database.

## Project Purpose

RAKSHAK aims to make it easier to redirect surplus food to people who
need it while providing a digital place to support donation and
disaster-relief initiatives. It brings food donors, monetary
contributors, and relief-oriented activities into a single application.

## Event Credits

-   **Project:** RAKSHAK --- The Helping Hand
-   **Event:** Codeathon 5.0
-   **Organised by:** ABES Institute of Technology (ABESIT)

## Future Scope

-   Verified NGO onboarding and verification workflows
-   Real-time pickup status and notifications
-   Improved accessibility and multilingual support
-   More detailed impact analytics for meals rescued and people
    supported
-   Automated tests and production monitoring

------------------------------------------------------------------------

```{=html}
<p align="center">
```
Built for Codeathon 5.0 at ABES Institute of Technology.
```{=html}
</p>
```
