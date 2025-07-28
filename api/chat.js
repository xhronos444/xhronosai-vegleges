// api/chat.js

import { OpenAI } from 'openai';

// Erstellt ein neues OpenAI-Objekt mit deinem geheimen API-Key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Exportiert die Serverless-API-Funktion für Vercel
export default async function handler(req, res) {
  try {
    const {
      messages,
      model = "gpt-4",               // Standardmodell ist GPT-4 (Turbo)
      temperature = 0.7,
      max_tokens = 500
    } = req.body;

    const completion = await openai.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens
    });

    res.status(200).json(completion);
  } catch (error) {
    console.error("XENOS Backend Error:", error.message);
    res.status(500).json({
      error: "⚠ XENOS connection failure. The Architect has been notified.",
      detail: error.message
    });
  }
}
