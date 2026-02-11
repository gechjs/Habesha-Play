# Habesha Play

A streaming platform clone built with React + Vite, featuring movie and TV show content from TMDB API.

## Features

- Browse trending movies and TV shows
- Watch trailers and view detailed information
- Responsive design with modern UI
- Content categorization (Action, Comedy, Horror, Romance, etc.)
- Search functionality
- User-friendly interface inspired by popular streaming platforms

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: CSS + Material-UI Icons
- **API**: TMDB (The Movie Database)
- **HTTP Client**: Axios

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your TMDB API key:
   ```
   VITE_APIKEY=your_tmdb_api_key_here
   ```
4. Start development server: `npm run dev`

## Build and Deploy

- Build: `npm run build`
- Preview: `npm run preview`

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
