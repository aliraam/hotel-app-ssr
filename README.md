# Hotels Explorer

<p align="center">
  <sub>React • TypeScript • Vite • SSR • React Query • Tailwind CSS • PWA</sub>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18+-61DAFB.svg?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5+-3178C6.svg?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-4+-646CFF.svg?logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/SSR-Enabled-success" alt="SSR" />
  <img src="https://img.shields.io/badge/PWA-Supported-blue" alt="PWA" />
</p>

---

## 📍 Overview

A high-performance SSR application for exploring hotels, featuring:

- Server-Side Rendering with Vite
- Progressive Web App (PWA) capabilities
- Map integration with hotel locations
- Real-time search and filtering
- Type-safe codebase with SOLID principles
- Optimized React rendering cycles

## 🛠 Installation

### Prerequisites

- Node.js ≥18
- Yarn ≥1.22

# Clone repository

```
git clone https://github.com/aliraam/hotel-app-ssr.git
```

# Install dependencies

```
yarn install
```

# Start development servers (App + JSON Server)

```
yarn dev:server /// for mock server
yarn server
App is listening on http://localhost:7456

```

# Build production image

```
docker build -t hotels .
```

# Run container

```
docker run -p 7456:7456 hotels
```
