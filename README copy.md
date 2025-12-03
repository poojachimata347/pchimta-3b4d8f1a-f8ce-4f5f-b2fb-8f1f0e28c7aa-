# Secure Task Management System (NX-style Monorepo)

This repo contains a NestJS API (`apps/api`) and an Angular dashboard (`apps/dashboard`)
with shared libraries for DTOs (`libs/data`) and RBAC helpers (`libs/auth`).

> NOTE: This is a lightweight Nx-style monorepo crafted for the assessment. 
> You may adapt it into a full Nx workspace by running `npx create-nx-workspace`
> and copying the `apps/` and `libs/` contents + root config as needed.

## Setup

```bash
npm install
```

### Backend

```bash
export JWT_SECRET=supersecret
npm run serve:api
```

API runs at `http://localhost:3333`.

### Frontend

```bash
npm run serve:dashboard
```

Dashboard runs at `http://localhost:4200`.

See the in-code comments and structure for more details on entities, RBAC,
and frontend behavior.
