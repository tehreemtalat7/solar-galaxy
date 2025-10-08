# Solar Galaxy - Solar Business Website

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

## Mobile Responsiveness Standards

The application follows consistent mobile-first responsive design patterns across all pages:

### Text Sizing Patterns
- **Hero Headings**: `text-3xl sm:text-4xl md:text-5xl` - Consistent across all pages
- **Section Headings**: `text-3xl sm:text-4xl md:text-5xl` - Standard for all section titles
- **Body Text**: `text-base sm:text-lg md:text-xl` - Readable on all screen sizes

### Spacing Standards
- **Hero Sections**: `py-12 md:py-20` - Consistent padding for all hero sections
- **Regular Sections**: `section-padding` utility class
- **Container Padding**: `px-4` for consistent horizontal spacing

### Grid Layout Patterns
- **Mobile-First**: All grids explicitly start with `grid-cols-1`
- **Responsive Breakpoints**: 
  - `sm:grid-cols-2` for tablets (640px+)
  - `md:grid-cols-3` for desktops (768px+)
  - `lg:grid-cols-2` or `lg:grid-cols-4` for large screens (1024px+)

### Header/Navigation
- **Logo Size**: `h-8 w-8 sm:h-10 sm:w-10` - Scaled for mobile
- **Logo Text**: `text-lg sm:text-xl md:text-2xl` - Responsive typography
- **Mobile Menu**: Slide-out navigation with `w-[280px] sm:w-[350px]`
- **Touch Targets**: All buttons and links properly sized for mobile interaction

### Form Optimization
- **Input Grids**: `grid-cols-1 sm:grid-cols-2` - Stack on mobile, side-by-side on desktop
- **Button Sizing**: `w-full sm:w-auto` - Full width on mobile, auto on desktop
- **Touch-Friendly**: All form controls optimized for mobile interaction

## Changelog

```
Changelog:
- July 03, 2025. Initial setup
- July 03, 2025. Complete UI/UX revamp with modern, sleek design inspired by Tesla's solar website:
  * Added smooth animations (fade-in, slide-up, scale-in, float, hover effects)
  * Implemented glass morphism design elements
  * Updated typography with large, bold headings
  * Added parallax hero sections with full-screen heights
  * Modernized color scheme with gradients and improved contrast
  * Enhanced header with scroll-based transparency and animation
  * Added floating particles and interactive hover effects
  * Improved spacing with modern section layouts
  * Added custom scrollbar styling
- October 08, 2025. Comprehensive mobile responsiveness optimization:
  * Normalized all hero headings to text-3xl sm:text-4xl md:text-5xl pattern
  * Standardized hero section spacing to py-12 md:py-20 across all pages
  * Implemented mobile-first grid layouts with explicit grid-cols-1 declarations
  * Optimized header/navigation for mobile with responsive logo and menu sizing
  * Enhanced form layouts for touch-friendly mobile interaction
  * Ensured all cards and content stack properly on mobile devices
  * Optimized Portfolio page: responsive stats, project cards, categories, and impact sections
  * Optimized Net Metering page: responsive hero, process steps, benefits, requirements, and DISCO cards
  * Verified mobile responsiveness with e2e testing on iPhone 12 viewport
```