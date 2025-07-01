# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run start:dev` - Run development server with hot reload
- `npm run start:debug` - Run with debug mode and hot reload
- `npm run build` - Build the application
- `npm run start:prod` - Run production build

### Code Quality
- `npm run lint` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage report
- `npm run test:e2e` - Run end-to-end tests

## Architecture

This is a NestJS application following Clean Architecture principles with these key layers:

### Core Modules
- **AuthModule** (`src/auth/`) - Complete authentication system with JWT and local strategies, including signup/signin/forgot-password flows
- **UserModule** (`src/user/`) - User management services
- **AppModule** (`src/app.module.ts`) - Root module orchestrating all features

### Authentication System
- Uses Passport.js with JWT and Local strategies
- JWT tokens for stateless authentication
- Guards: `JwtAuthGuard`, `LocalAuthGuard`
- Strategies: `jwt.strategy.ts`, `local.strategy.ts`
- Password hashing with bcrypt
- DTOs for signup, signin, and forgot-password

### Database
- **Prisma ORM** with PostgreSQL
- Schema: `prisma/schema.prisma` 
- Simple User model with email/password/timestamps
- Prisma service: `src/prisma.service.ts`

### Security Features
- Rate limiting (RateLimiterModule) - 10 requests per 60 seconds
- Helmet for security headers
- Input validation with class-validator and ValidationPipe
- Password hashing with bcrypt

### Project Standards
- **Test-Driven Development (TDD)** - All features require comprehensive tests
- **Clean Architecture** - Controllers handle HTTP, Services contain business logic
- **Module-based organization** - Each feature in its own module
- High test coverage expectation
- ESLint and Prettier for code consistency

### Testing Structure
- Unit tests alongside source files (`.spec.ts`)
- E2E tests in `test/` directory
- Jest configuration for both unit and e2e tests
- Coverage reporting available

## Key Files
- `src/main.ts` - Application entry point
- `src/prisma.service.ts` - Database service wrapper
- `prisma/schema.prisma` - Database schema
- `docker-compose.yml` - Local development setup