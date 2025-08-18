# 🧠 AI Reviewer Assistant

AI Reviewer Assistant automatically generates structured code reviews for GitHub repositories using OpenAI.

## 🚀 Features

- Parses GitHub repository content via GitHub API
- Sends code to OpenAI (GPT-4o)
- Receives a structured review:
  - **Overall Summary**
  - **Strengths**
  - **Issues & Recommendations**
  - **Score (0–100)**
- Stores the review and score in a database
- Authentication via Auth0

## 🛠️ Stack

- **Node.js + Express** – backend server
- **PostgreSQL** – data storage
- **OpenAI API** – code review generation
- **Auth0** – user authentication
- **Zod** – data validation
- **Octokit** – GitHub API integration

## ▶️ Getting Started

```bash
git clone https://github.com/TuringCollegeSubmissions/dsedus-WD2.3.4.5.git
npm install
npm run dev
````

## 📁 Project Structure

```
server/
  src/
    controllers/       → Express route handlers
    services/          → Business logic
    models/            → Database access
    middleware/        → Auth & validation
    clients/           → External API clients (OpenAI, GitHub)
    utils/             → Helpers (parsers, formatters)
    config/            → Configuration and constants
```

