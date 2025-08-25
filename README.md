# Calories Information

CalorieAI is a production-ready web application that provides AI-powered calorie and nutrition estimations for any food item. Users can input meals or ingredients to receive instant macronutrient breakdowns with confidence scores.

![Elixir](https://img.shields.io/badge/Elixir-1.16-%234B275F?logo=elixir)
![React](https://img.shields.io/badge/React-18.2-%2361DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.x-%23646CFF?logo=vite)
![Status](https://img.shields.io/badge/Status-Development-informational)
![OpenAI](https://auth.openai.com/log-in)

# Features

## Core Functionality

- **AI-Powered Estimation:** Utilizes OpenAI GPT-3.5 to analyze food items and provide accurate nutrition data.
- **Comprehensive Breakdown:** Returns calories, protein, carbs, fat, serving size, and confidence level.
- **Real-time Processing:** Instant responses with clean, modern UI.

## Technical Features

- **RESTful API:** Clean Elixir/Phoenix backend with JSON API
- **React Frontend:** Responsive ChatGPT-style interface
- **CORS Enabled:** Proper cross-origin request handling
- **Error Handling:** Comprehensive error management and user feedback.
- **Production Ready:** Includes testing, security considerations, and scalability

## User Experience

- **Chat-like Interface:** Familiar ChatGPT-style interaction
- **Responsive Design:** Works seamlessly on desktop and mobile devices
- **Conversation History:** Maintains chat history for multiple queries
- **One-click Clearing:** Easy conversation reset
- **Beautiful UI:** Modern gradient design with smooth animations

# Architecture

## Backend **Elixir/Phoenix**
lib/
├── calories/
│ ├── ai/
│ │ └── openai_client.ex # OpenAI API integration
│ └── calorie_estimator.ex # Business logic layer
├── calories_web/
│ ├── controllers/
│ │ └── calorie_controller.ex # API endpoint handler
│ └── router.ex # Route configuration

## Frontend **React**

frontend/
├── src/
│ ├── App.jsx # Main application component
│ ├── App.css # Main style component
│ └── index.css # Tailwind CSS styles
└── public/
└── index.html # HTML template

# Quick Start

## Prerequisites

- Elixir 1.14+
- PostgreSQL
- Node.js 18+
- OpenAI API key

## Installation

1. Clone and setup backend

```
git clone <repository>
cd calories

# Setup environment
mix deps.get
mix ecto.create

# Set OpenAI API key
export OPENAI_API_KEY=your_api_key_here

# Start server
mix phx.server
```

2. Setup frontend

```
cd frontend
npm install
npm run dev
```

3. Access the application

# API Usage

## Endpoint
POST /api/estimate-calories

## Request
{
  "food_item": "chicken breast"
}

## Response
{
  "data": {
    "calories": 165,
    "protein": 31,
    "carbs": 0,
    "fat": 3.6,
    "estimated_serving": "100g cooked",
    "confidence": 0.85
  }
}

# Testing

## Run the test suite
### Backend tests
mix test

### Frontend tests
cd frontend
npm test

# Configuration

## Environment Variables
export OPENAI_API_KEY=your_openai_api_key
export DATABASE_URL=postgres://user:pass@localhost:5432/calories_dev

# Database Setup
mix ecto.create
mix ecto.migrate

# Acknowledgments
OpenAI for the GPT-3.5 API

Phoenix Framework team for the excellent Elixir web framework

React and Tailwind CSS communities for frontend tools
