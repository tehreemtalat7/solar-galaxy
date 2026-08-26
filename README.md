# ☀️ Solar Galaxy

A full-stack solar energy business platform designed to showcase solar solutions, generate customer leads, provide installation estimates, and manage business content through an administrative dashboard.

🌐 **Live Website:** [Solar Galaxy Live Demo](https://isolargalaxy.netlify.app/?utm_source=chatgpt.com)

---

## 🚀 Overview

Solar Galaxy is a modern web application for a solar energy company. It provides a public-facing platform where customers can explore solar services, browse completed projects, read industry content, request quotes, and contact the business.

The application also includes backend functionality and an administrative interface for managing business content and customer interactions.

---

## ✨ Features

### 🌞 Public Website

* Responsive solar energy business website
* Residential and commercial solar service information
* Solar project portfolio
* Customer testimonials
* Blog and industry insights
* Interactive quote calculator
* Customer quote requests
* Contact and inquiry forms
* WhatsApp customer communication
* Google Analytics integration
* Modern responsive user interface

### 🔐 Admin Functionality

* Secure authentication
* Content management for:

  * Blog posts
  * Testimonials
  * Solar projects
* Customer quote management
* Contact submission management
* Business and engagement analytics

---

## 🛠️ Tech Stack

### Frontend

* **React 18**
* **TypeScript**
* **Vite**
* **Tailwind CSS**
* **Radix UI**
* **shadcn/ui**
* **TanStack Query**
* **Wouter**
* **Framer Motion**

### Backend

* **Node.js**
* **Express.js**
* **REST API**
* **WebSocket support**

### Database

* **PostgreSQL**
* **Drizzle ORM**
* **Neon Serverless PostgreSQL**

### Authentication & Sessions

* **Passport.js**
* **OpenID Connect**
* **Express Sessions**
* **PostgreSQL session storage**

---

## 📁 Project Structure

```text
solar-galaxy/
│
├── client/                 # React frontend
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Application pages
│       ├── hooks/          # Custom React hooks
│       └── lib/            # Frontend utilities
│
├── server/                 # Express backend
│   ├── index.ts            # Application entry point
│   ├── routes.ts           # API routes
│   └── storage.ts          # Data access layer
│
├── shared/                 # Shared frontend/backend code
│   └── schema.ts           # Database schema and types
│
├── data/                   # Application data
│
├── drizzle.config.ts       # Drizzle configuration
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind configuration
├── package.json            # Dependencies and scripts
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* PostgreSQL database, or a compatible Neon PostgreSQL database

### 1. Clone the repository

```bash
git clone https://github.com/tehreemtalat7/solar-galaxy.git
```

### 2. Navigate into the project

```bash
cd solar-galaxy
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file and configure the required environment variables for your database and authentication setup.

For example:

```env
DATABASE_URL=your_postgresql_connection_string
```

Additional authentication or third-party service variables may be required depending on the features you enable.

### 5. Set up the database

Apply the database schema using Drizzle:

```bash
npm run db:push
```

### 6. Start the development server

```bash
npm run dev
```

The application will start the frontend and backend development environment.

---

## 📜 Available Scripts

### Start development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Start production server

```bash
npm start
```

### Type checking

```bash
npm run check
```

### Push database schema changes

```bash
npm run db:push
```

---

## 🏗️ Application Architecture

The project follows a full-stack architecture:

```text
                 ┌─────────────────────┐
                 │     React Client    │
                 │                     │
                 │  Pages & Components │
                 └──────────┬──────────┘
                            │
                            │ HTTP / REST API
                            ▼
                 ┌─────────────────────┐
                 │   Express Server    │
                 │                     │
                 │ Authentication      │
                 │ API Routes          │
                 │ Business Logic      │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │    PostgreSQL DB    │
                 │                     │
                 │ Drizzle ORM         │
                 └─────────────────────┘
```

---

## 🌱 Core Functionality

Solar Galaxy supports the following business workflow:

1. A visitor explores available solar solutions.
2. The visitor can review projects, testimonials, and educational content.
3. A quote calculator helps estimate solar installation requirements.
4. Customers can submit quote requests or contact inquiries.
5. Data is processed through the Express backend.
6. Business data and customer submissions are stored in PostgreSQL.
7. Administrators can manage content and customer requests.

---

## 🎨 UI & Design

The frontend is built with a responsive, solar-themed design system using:

* Tailwind CSS
* Radix UI primitives
* shadcn/ui components
* Framer Motion animations

The application is designed to work across desktop, tablet, and mobile devices.

---

## 🚧 Future Improvements

Potential future enhancements include:

* [ ] Advanced solar savings calculator
* [ ] Real-time energy production estimates
* [ ] Interactive solar panel visualization
* [ ] Customer account portal
* [ ] Email notifications for quote requests
* [ ] Enhanced analytics dashboard
* [ ] Role-based admin permissions
* [ ] Automated appointment scheduling
* [ ] Multi-language support
* [ ] Improved SEO and performance optimization

---

## 📦 Deployment

The project includes a production build process using Vite and ESBuild.

Build the application with:

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes

```bash
git commit -m "Add your feature"
```

4. Push your branch

```bash
git push origin feature/your-feature-name
```

5. Open a Pull Request

---

## 👩‍💻 Author

**Tehreem Talat**

GitHub: [@tehreemtalat7](https://github.com/tehreemtalat7?utm_source=chatgpt.com)

---

## 📄 License

This project is available for educational and portfolio purposes.

---

<p align="center">
  Built with ☀️ React, TypeScript, Express, and PostgreSQL
</p>
