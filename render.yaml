# LatruxTrade – Render Blueprint
# Deploy: https://render.com/deploy

services:
  # --- Frontend (Next.js) ---
  - type: web
    name: latrux-frontend
    runtime: node
    rootDir: frontend
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NEXT_PUBLIC_API_URL
        fromService:
          type: web
          name: latrux-backend
          property: hostport
      - key: NEXTAUTH_URL
        value: "https://latrux-frontend.onrender.com"

  # --- Backend (NestJS API) ---
  - type: web
    name: latrux-backend
    runtime: node
    rootDir: backend
    buildCommand: npm install && npm run build
    startCommand: npm run start:prod
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: latrux-db
          property: connectionString
      - key: REDIS_URL
        fromService:
          type: redis
          name: latrux-redis
          property: connectionString
      - key: WORKER_MODE
        value: "true"
      - key: JWT_SECRET
        value: "change-me-in-production"

  # --- Background Worker (AI / Trading) ---
  - type: worker
    name: latrux-worker
    runtime: node
    rootDir: backend
    buildCommand: npm install && npm run build
    startCommand: npm run start:worker
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: latrux-db
          property: connectionString
      - key: REDIS_URL
        fromService:
          type: redis
          name: latrux-redis
          property: connectionString
      - key: WORKER_MODE
        value: "true"

databases:
  - name: latrux-db
    plan: free
  - name: latrux-redis
    plan: free