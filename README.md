# survey-engine

A survey platform with React frontend and NestJS backend, built as a TypeScript monorepo.

## Project Structure

```
survey-engine/
├── apps/
│   ├── web/          # React + Vite + styled-components + Apollo Client
│   └── api/          # NestJS + GraphQL + TypeORM + MySQL
├── package.json      # Root workspace configuration
└── tsconfig.json     # Shared TypeScript configuration
```

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- MySQL (for API database)

## Getting Started

### Installation

```bash
npm install
```

### Development

Start both applications in development mode:

```bash
npm run dev
```

Or start them individually:

```bash
# Web app (http://localhost:3000)
npm run dev:web

# API server (http://localhost:4000)
npm run dev:api
```

### Building

Build both applications:

```bash
npm run build
```

Or build them individually:

```bash
npm run build:web
npm run build:api
```

### API Configuration

Copy the example environment file and configure your database:

```bash
cp apps/api/.env.example apps/api/.env
```

Edit `apps/api/.env` with your MySQL credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=survey_engine
```

### GraphQL Playground

Once the API is running, access the GraphQL playground at:
http://localhost:4000/graphql

## Tech Stack

### Web App
- **React** - UI framework
- **Vite** - Build tool and dev server
- **styled-components** - CSS-in-JS styling
- **Apollo Client** - GraphQL client
- **TypeScript** - Type safety

### API
- **NestJS** - Node.js framework
- **GraphQL** - API query language (code-first approach)
- **TypeORM** - Database ORM
- **MySQL** - Database
- **TypeScript** - Type safety
