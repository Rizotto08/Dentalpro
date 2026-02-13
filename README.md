# DentalPro

Cross-platform dental clinic management app with NestJS backend and Expo React Native mobile client.

## Project Structure

```
DentalPro/
├─ mobile/
│  ├─ App.js
│  ├─ package.json
│  └─ src/
│     ├─ api/
│     ├─ screens/
│     └─ navigation/
└─ server/
   ├─ src/
   │  ├─ modules/
   │  │  ├─ auth/
   │  │  ├─ patients/
   │  │  ├─ visits/
   │  │  └─ dashboard/
   │  └─ main.ts
   ├─ prisma/
   │  ├─ schema.prisma
   │  └─ migrations/
   └─ package.json
```

## Backend Setup (`server/`)

1. Install dependencies:
   ```bash
   cd server
   npm install
   ```
2. Configure environment:
   ```bash
   cp .env.example .env
   ```
3. Run migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```
4. Start API:
   ```bash
   npm run start:dev
   ```

### Environment Variables

- `DATABASE_URL`: PostgreSQL connection URL
- `JWT_SECRET`: JWT signing secret
- `PORT`: API port (default 3000)

### API Routes

- `POST /auth/signup`
- `POST /auth/login`
- `GET /patients`
- `POST /patients`
- `GET /patients/:id`
- `PUT /patients/:id`
- `DELETE /patients/:id`
- `GET /visits`
- `POST /visits`
- `GET /visits/:id`
- `PUT /visits/:id`
- `DELETE /visits/:id`
- `GET /dashboard`

### Testing

```bash
npm test
npm run test:e2e
```

## Mobile Setup (`mobile/`)

1. Install dependencies:
   ```bash
   cd mobile
   npm install
   ```
2. Update API URL in `src/api/client.js` for your device/network.
3. Start Expo:
   ```bash
   npm run start
   ```
4. Open on iOS/Android emulator or Expo Go app.

## Dashboard Response

`GET /dashboard` returns JSON:

```json
{
  "totalPatients": 0,
  "upcomingVisitsToday": 0,
  "revenueToday": 0
}
```
