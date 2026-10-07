const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Import AI providers
const { GoogleGenerativeAI } = require('@google/generative-ai');
const OpenAI = require('openai');

app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'index.html')));
app.use(express.static(__dirname));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html', 'index.html'));
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'AI research proxy is running' });
});

app.post('/api/init', (req, res) => {
  const { provider } = req.body || {};

  if (!provider || !['gemini', 'gpt'].includes(provider)) {
    return res.status(400).json({ error: 'Provider must be gemini or gpt.' });
  }

  const isGeminiConfigured = process.env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY.includes('your_gemini');
  const isOpenAIConfigured = process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.includes('your_openai');

  if (provider === 'gemini' && !isGeminiConfigured) {
    return res.status(400).json({ error: 'Gemini API key not configured. Add your key to .env' });
  }

  if (provider === 'gpt' && !isOpenAIConfigured) {
    return res.status(400).json({ error: 'OpenAI API key not configured. Add your key to .env' });
  }

  return res.json({ ok: true, provider });
});

async function fetchGeminiAnswer(question) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const models = [
      process.env.GEMINI_MODEL,
      'gemini-3.1-flash-lite',
      'gemini-3.5-flash-lite',
      'gemini-3.8-flash',
      'gemini-flash-latest'
    ].filter(Boolean);

    const promptText = `You are an advanced cyborg 3D AI assistant. Answer the user's question directly, fluidly, and concisely in maximum 2 short sentences. Do not use asterisks, markdown, emojis, or bullet points.\nQuestion: ${question}`;

    let lastError = null;
    for (const model of models) {
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: {
              maxOutputTokens: 150,
              temperature: 0.7
            }
          })
        });

        const data = await res.json();
        const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidate) {
          // Clean formatting for crisp speech synthesis
          const cleanText = candidate.replace(/[*#_~`]/g, '').trim();
          const sentences = cleanText.split(/(?<=[.!?])\s+/).slice(0, 2).join(' ').trim();
          return sentences || cleanText.slice(0, 300);
        }
        if (data.error) {
          lastError = data.error.message;
        }
      } catch (err) {
        lastError = err.message;
      }
    }

    throw new Error(lastError || 'Gemini API returned no response.');
  } catch (error) {
    throw new Error(`Gemini API error: ${error.message}`);
  }
}

async function fetchGPTAnswer(question) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const message = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: question
        }
      ],
      max_tokens: 150
    });

    const text = message.choices[0]?.message?.content;

    if (!text) {
      throw new Error('GPT API returned no response.');
    }

    return String(text).trim();
  } catch (error) {
    throw new Error(`GPT API error: ${error.message}`);
  }
}

const handleAsk = async (req, res) => {
  try {
    const { provider, question } = req.body || {};
    const cleanQuestion = String(question || '').trim();

    if (!provider || !['gemini', 'gpt'].includes(provider)) {
      return res.status(400).json({ error: 'Provider must be gemini or gpt.' });
    }

    if (!cleanQuestion) {
      return res.status(400).json({ error: 'Question is required.' });
    }

    let answer;
    if (provider === 'gemini') {
      answer = await fetchGeminiAnswer(cleanQuestion);
    } else if (provider === 'gpt') {
      answer = await fetchGPTAnswer(cleanQuestion);
    }

    return res.json({ answer });
  } catch (error) {
    console.error('AI proxy error:', error);
    return res.status(500).json({ error: error?.message || 'Unexpected server error while processing the request.' });
  }
};

app.post('/api/ask', handleAsk);
app.post('/api/chat', handleAsk);

app.listen(PORT, () => {
  console.log(`AI research proxy running on http://localhost:${PORT}`);
});
