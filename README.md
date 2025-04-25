# Puppeteer
#### A Node.js and Puppeteer-powered API that scrapes GitHub user profile data and returns a structured JSON response containing key profile information and top 3 starred repositories.

## Features
- Scrapes data from any public GitHub profile.
- Returns:
   - Full name
   - Username
   - Bio
   - Number of public repositories
   - Followers count
   - Following count
   - Top 3 repositories (by stars)
- Built with:
   - Node.js
   - Express.js
   - Puppeteer

## Installation:
`npm inint -y`
`npm install express dotenv puppeteer nodemon`

## Usage:

1. **Start the Server**
`npm run start`
_By default, the server runs on http://localhost:5011_

2. **API Endpoint**
`GET /github-user/:username`
Example:
`GET http://localhost:5011/github-user/gaearon`

#### Try the API Live:
[Link] (http://localhost:5011/github-user/Prajakta811)












