# SolarTech Solutions - Solar Business Website

## Overview

This is a full-stack web application for a solar energy company, built with React, TypeScript, Express, and PostgreSQL. The system provides both a public-facing website and an admin panel for managing content, quotes, and customer interactions.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and production builds
- **Styling**: Tailwind CSS with custom solar-themed design system
- **UI Components**: Radix UI primitives with shadcn/ui components
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Analytics**: Google Analytics integration for tracking user interactions

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Auth with OpenID Connect
- **Session Management**: Express sessions with PostgreSQL storage
- **API Design**: RESTful API with separate public and admin endpoints

### Database Design
- **ORM**: Drizzle ORM with TypeScript schema definitions
- **Tables**: Users, testimonials, quotes, blog posts, projects, contact submissions, sessions
- **Relationships**: Proper foreign key relationships between entities
- **Migrations**: Database schema versioning with Drizzle Kit

## Key Components

### Public Website Features
- **Landing Page**: Hero section with solar energy messaging and call-to-action
- **Services**: Residential and commercial solar services information
- **Portfolio**: Showcase of completed solar projects
- **Blog**: Solar energy articles and industry insights
- **Quote Calculator**: Interactive tool for solar installation estimates
- **Contact Forms**: Lead capture and customer inquiry handling
- **Testimonials**: Customer reviews and success stories

### Admin Panel Features
- **Authentication**: Secure admin access with Replit Auth
- **Content Management**: CRUD operations for blog posts, testimonials, and projects
- **Quote Management**: Review and process customer quote requests
- **Analytics Dashboard**: Basic metrics and user engagement tracking

### Widget System
- **WhatsApp Chat**: Direct messaging integration for customer support
- **Sticky Contact**: Persistent contact button for easy customer engagement
- **Quote Calculator**: Embedded calculator for quick estimates

## Data Flow

1. **User Interaction**: Visitors interact with the public website
2. **Lead Capture**: Forms collect customer information and send to backend
3. **Data Storage**: PostgreSQL stores all user data, quotes, and content
4. **Admin Review**: Authenticated admins manage content and respond to quotes
5. **Analytics**: User interactions are tracked and sent to Google Analytics

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL database connection
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/react-***: Accessible UI component primitives
- **drizzle-orm**: Type-safe database queries and migrations
- **express**: Web server framework
- **passport**: Authentication middleware
- **connect-pg-simple**: PostgreSQL session storage

### Development Dependencies
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: JavaScript bundler for production builds

### Third-party Services
- **Replit Auth**: Authentication service integration
- **Google Analytics**: Website analytics and user tracking
- **Neon Database**: Managed PostgreSQL hosting

## Deployment Strategy

### Development Environment
- **Local Development**: `npm run dev` starts both frontend and backend
- **Hot Reload**: Vite provides fast refresh for frontend changes
- **Database**: Development database with automatic migrations

### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Database**: Production PostgreSQL with connection pooling
- **Environment**: Production environment variables for security

### Database Management
- **Migrations**: `npm run db:push` applies schema changes
- **Schema**: Centralized schema definitions in `shared/schema.ts`
- **Type Safety**: Drizzle generates TypeScript types from database schema

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

```
Changelog:
- July 03, 2025. Initial setup
```