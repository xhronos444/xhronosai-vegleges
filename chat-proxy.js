
import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Statikus fájlok kiszolgálása
app.use(express.static('.'));

// Alapértelmezett route
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: '.' });
});

app.post('/chat', async (req, res) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Hiba történt:', error);
    res.status(500).json({ error: 'Szerver hiba történt' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => console.log(`Proxy fut a ${PORT} porton`));
