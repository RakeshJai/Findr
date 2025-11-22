# Findr - Lost & Found App

A React-based lost and found application for schools, built with TypeScript and Vite.

Findr allows students to view and claim lost items, and teachers to add and manage lost items. The app supports dark mode, uses local storage for data persistence, and is fully responsive with Tailwind CSS.

## Prerequisites
You need Node.js (version 16 or higher recommended) and npm (comes with Node.js) or yarn installed on your system.

## Installation
First, clone or download this repository. Then, navigate to the project directory by running `cd Findr` in your terminal. Once inside the project folder, install all dependencies by running `npm install`. This will install all production and development packages needed to run the app.

## Running the Application
To start the development server, run `npm run dev`. The app will be available at `http://localhost:5173` (or another port if 5173 is already in use). To create a production build, run `npm run build`. To preview the production build locally, run `npm run preview`.

## Project Structure
The project folder is structured as follows:

Findr/
├── components/ # React components
│ ├── Layout.tsx
│ ├── Login.tsx
│ ├── StudentPortal.tsx
│ └── TeacherPortal.tsx
├── services/ # Service modules
│ ├── firebase.ts
│ ├── geminiService.ts
│ └── storageService.ts
├── App.tsx # Main app component
├── index.tsx # Entry point
├── index.html # HTML template
├── types.ts # TypeScript type definitions
├── vite.config.ts # Vite configuration
└── package.json # Dependencies and scripts

markdown
Copy code

## Dependencies
The app uses the following dependencies:

**Production Dependencies:**  
- `react` ^18.2.0 – React library  
- `react-dom` ^18.2.0 – React DOM rendering  
- `lucide-react` ^0.344.0 – Icon library  

**Development Dependencies:**  
- `@types/react` ^18.2.64 – TypeScript types for React  
- `@types/react-dom` ^18.2.21 – TypeScript types for React DOM  
- `@vitejs/plugin-react` ^4.2.1 – Vite plugin for React  
- `autoprefixer` ^10.4.18 – CSS autoprefixer  
- `postcss` ^8.4.35 – CSS post-processor  
- `tailwindcss` ^3.4.1 – Utility-first CSS framework  
- `typescript` ^5.2.2 – TypeScript compiler  
- `vite` ^5.1.6 – Build tool and dev server  

## Features
- Student portal to view and claim lost items  
- Teacher portal to add and manage lost items (login required)  
- Dark mode support  
- Local storage for data persistence  
- Responsive design with Tailwind CSS  

## Notes
- The app currently uses localStorage for data persistence  
- Firebase integration is available but not required for local development  
- Tailwind CSS is loaded via CDN in the HTML file
