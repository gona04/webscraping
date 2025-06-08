📰 Fact-Checking Web App
A full-stack MERN application that scrapes news headlines from multiple portals and leverages TensorFlow.js Universal Sentence Encoder to help users fact-check statements in real time.

Features
Web Scraping: Efficiently scrapes news headlines from portals like The Hindu and FactCheck using Cheerio and Axios (no headless browser required).
Semantic Analysis: Utilizes TensorFlow.js and the Universal Sentence Encoder to compare user input with news headlines for semantic similarity and basic fact classification.
React Frontend: Responsive UI with environment-based API switching (development/production) using Webpack and .env files.
Express Backend: REST API for scraping, classification, and serving the frontend in production.
Cloud-Ready: Backend deployed on Render and frontend on Netlify for a seamless, scalable experience.
Monorepo Structure: Single node_modules for both backend and frontend, with scripts for easy builds and deployment.
Challenges & Solutions
Dynamic Scraping: Transitioned from Puppeteer to Cheerio/Axios for static scraping, enabling cloud deployment and reducing resource usage.
Environment Management: Implemented a custom Webpack config for smooth API switching between local and production environments.
Deployment: Unified build and deployment process, serving the frontend from the backend in production for simplicity and efficiency.
TensorFlow.js Integration: First-time use of the Universal Sentence Encoder for real-world semantic comparison, expanding my experience with machine learning in JavaScript.
Getting Started
All dependencies are managed from the project root. No need to run npm install in the frontend folder.

1. Install dependencies (from project root):
2. Start the backend:
3. Start the frontend (development mode):
4. Build the frontend for production:
Production Deployment
Deploy the contents of dist to Netlify, or serve it from your backend.
Backend is ready for deployment on Render or similar Node.js platforms.
Live Demo
Frontend: https://fact-checking-app.netlify.app/
Backend API: https://fact-checking-api.onrender.com
Tech Stack
React, Express, Node.js, Cheerio, Axios, TensorFlow.js, Universal Sentence Encoder, Webpack, Render, Netlify

Note: This is my first project using TensorFlow.js and the Universal Sentence Encoder. The app is a work in progress and open to improvements!

Feel free to fork, contribute, or reach out if you have feedback or opportunities!
