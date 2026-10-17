# RAKSHAK Backend Subsystem

The **RAKSHAK Backend** is a high-performance Express REST API that powers the disaster relief, food rescue, and real-time fleet tracking operations.

---

## Directory Structure

```
backend/
├── config/
│   └── env.js            # Environment configuration & defaults
├── controllers/          # Business logic handlers
│   ├── authController.js
│   ├── foodController.js
│   ├── disasterController.js
│   ├── trackingController.js  # Live GPS telemetry & route checkpoints
│   ├── volunteerController.js
│   ├── karmaController.js
│   ├── certificateController.js
│   └── paymentController.js
├── middleware/
│   ├── authMiddleware.js # JWT validation & demo role fallbacks
│   └── errorMiddleware.js# 404 and global exception handlers
├── routes/               # Modular Express routers
│   ├── authRoutes.js
│   ├── foodRoutes.js
│   ├── disasterRoutes.js
│   ├── trackingRoutes.js # /api/tracking
│   ├── volunteerRoutes.js
│   ├── karmaRoutes.js
│   ├── certificateRoutes.js
│   └── paymentRoutes.js
├── server.js             # Main server bootstrap
├── package.json          # Backend package manifest ("rakshak-backend")
└── .env                  # Environment variables
```

---

## Running the Backend

From the workspace root:
```bash
npm run server
```
Or with auto-restart on file changes:
```bash
npm run server:dev
```

---

## Key API Endpoints

- `GET  /api/health` - API uptime & active services check
- `POST /api/auth/login` - Authenticate user / demo credentials
- `POST /api/auth/register` - Register new user account
- `GET  /api/tracking/missions` - Active real-time tracking missions with route waypoints
- `GET  /api/tracking/mission/:id` - Detailed telemetry for specific mission
- `PATCH /api/tracking/mission/:id/telemetry` - Update driver coordinates in real time
- `GET  /api/food` - All surplus food rescue listings
- `POST /api/food/donate` - Create surplus food donation
- `GET  /api/disasters` - Active emergency missions
- `POST /api/disasters/:id/join` - Volunteer for disaster relief mission
