# LinkedIn Job Analyzer API

Backend API for the LinkedIn Job Analyzer Chrome Extension.

The API receives job-posting information extracted by the Chrome extension, analyzes the content using Google's Gemini API, and returns structured job information such as skills, experience, qualifications, seniority, company, and other relevant details.

---

## Features

- LinkedIn job description analysis
- AI-powered job information extraction
- Structured JSON responses
- Google Gemini API integration
- Request validation using Zod
- CORS configuration
- HTTP security headers with Helmet
- HTTP request logging with Morgan
- TypeScript-based Express API
- Production-ready build
- PM2 process management
- Nginx reverse proxy
- HTTPS with Let's Encrypt
- Deployed on AWS EC2

---

## Architecture

```mermaid
flowchart LR
    A[LinkedIn Job Page] --> B[Chrome Extension]
    B -->|HTTPS Request| C[DuckDNS Domain]
    C --> D[Nginx]
    D -->|Proxy| E[Node.js + Express API]
    E --> F[Gemini API]
    F --> E
    E --> B
