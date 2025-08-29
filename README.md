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

# To run this application locally, you must configure the following:

- ✅ Auth0 (authentication)
- ✅ GitHub token (repo access)
- ✅ OpenAI API key (code review generation)
- ✅ PostgreSQL database

> **Note:** Without these, the app won’t function properly — mock mode is not fully supported yet.

> However, if you just want to test the basic functionality, I suggest skipping this part and dive into the code

```bash
git clone https://github.com/TuringCollegeSubmissions/dsedus-WD2.3.4.5.git
npm install
configure server/.env (see .env.example)
1. cd server
npm run dev
2. cd client
npm run dev
```

> Check out the `server/endpoints.guide.md`

## 📁 Project Structure

### Server

```
server/
  src/
    controllers/       → Express route handlers
    services/          → Business logic
    models/            → Database access
    middleware/        → Auth & validation
    clients/           → External API clients (OpenAI, GitHub)
    utils/
```

### Client

```
client/
  src/ in development

```
