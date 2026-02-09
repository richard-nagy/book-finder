# 📚 Book Finder v0.1.0

A full-stack application for discovering and managing books using the Google Books API. Built with React, TypeScript, and Node.js, this application allows users to search for books, view detailed information, and interact with their favorite titles through a modern, responsive interface.

<img width="1280" height="640" alt="preview" src="https://github.com/user-attachments/assets/34b00d19-a585-4664-9c97-40ff5a3fe4bf" />

---

## ✨ Features

### Search & Discovery
- **Book Search:** Search for books using the Google Books API with real-time results
- **Detailed Book View:** Access comprehensive information about any book including descriptions, authors, publishers, and more
- **URL-Driven Navigation:** All searches and book details are reflected in the URL for easy sharing and navigation
- **Smart Caching:** Search results are cached to prevent unnecessary API calls when navigating between pages

### User Interaction
- **Book Ratings _(in development)_:** Users will be able to recommend books they love by adding positive ratings (stars/recommendations)
- **Rating Display:** The UI will display aggregated ratings to help users discover popular books
- **Persistent Data:** User ratings and recommendations will be stored and retrieved through the backend API

### User Experience
- **Theme Support:** Switch between light and dark modes for comfortable reading in any environment
- **Responsive Design:** Fully optimized mobile and desktop experiences
- **Error Handling:** Automatic retry logic (up to 3 attempts) with user-friendly error messages
- **Loading States:** Skeleton screens and spinners provide visual feedback during data fetching

---

## 🏗️ Architecture

This is a **monorepo** containing two main applications:

### `/client` - Frontend Application
- **Framework:** Vite + React + TypeScript
- **Styling:** Tailwind CSS with shadcn/ui components
- **Routing:** React Router DOM for client-side navigation
- **API Integration:** Google Books API client

### `/server` - Backend API
- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **Features:** RESTful API for managing user ratings and recommendations _(in development)_

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- pnpm package manager
- Google Books API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd book-finder-react-ts
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `client/` directory:
   ```ini
   VITE_GOOGLE_BOOK_API_KEY="YOUR_API_KEY_HERE"
   ```
   
   Get your API key from the [Google Cloud Console](https://console.cloud.google.com/).

4. **Start the development servers**
   
   For the client:
   ```bash
   cd client
   pnpm dev
   ```
   
   For the server (when implemented):
   ```bash
   cd server
   pnpm dev
   ```

---

## 📖 Documentation

- [Client Documentation](client/README.md) - Detailed frontend architecture and technical implementation
- [Server Documentation](server/README.md) - Backend API specifications and development guide

---

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui (Radix UI)
- React Router DOM

### Backend
- Node.js
- TypeScript
- Express.js
- (Database TBD)
