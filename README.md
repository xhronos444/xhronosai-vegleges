# XHRONOS AI Chatbot

This project hosts a small Express server that proxies requests to the OpenAI API and serves a simple webpage with a chatbot interface.

## Setup
1. Install dependencies with `npm install` (if `node_modules` is not already present).
2. Copy `.env.example` to `.env` and add your `OPENAI_API_KEY`.
3. Start the server with `npm start` and open `index.html` in your browser.

The chatbot sends messages to `/api/chat` on the same server, so both the frontend and backend need to run for it to function.
