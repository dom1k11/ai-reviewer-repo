# 🧠 AI Reviewer Assistant

AI Reviewer Assistant automatically generates structured code reviews for GitHub repositories using OpenAI.

## 📑 Table of Contents
- [Features](#features)
- [Stack](#stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)


---

## Features

- Parses GitHub repository content via GitHub API  
- Sends code to OpenAI (GPT-4o)  
- Receives a structured review:
  - **Overall Summary**
  - **Strengths**
  - **Issues & Recommendations**
  - **Score (0–100)**
- Stores the review and score in a database  
- Authentication via Auth0  

---

## Stack

- **Node.js + Express** – backend server  
- **PostgreSQL** – data storage  
- **OpenAI API** – code review generation  
- **Auth0** – user authentication  
- **Zod** – data validation  
- **Octokit** – GitHub API integration  

---

## Getting Started

To run this application locally, configure:

- ✅ Auth0 (authentication)  
- ✅ GitHub token (repo access)  
- ✅ OpenAI API key (code review generation)  
- ✅ PostgreSQL database  

> **Note:** Without these, the app won’t function properly — mock mode is not fully supported yet.  
> However, you can still explore the codebase without setting everything up.  

### Clone & Install

```bash
git clone https://github.com/TuringCollegeSubmissions/dsedus-WD2.3.4.5.git
npm install
