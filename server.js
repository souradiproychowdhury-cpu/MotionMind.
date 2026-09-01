const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const SYSTEM_INSTRUCTION = "You are an advanced autonomous cyborg 3D assistant model. Speak directly to the user. Keep your answers concise, fluid, and strictly limited to 2 short sentences. Do not use asterisks or markdown formatting structures.";

const providerKeys = {
  gemini: null,
  openai: null
};

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'AI proxy is running' });
});

app.post('/api/init', (req, res) => {
  const { provider, apiKey } = req.body || {};

  if (!provider || !['gemini', 'openai'].includes(provider)) {
    return res.status(400).json({ error: 'Provider must be gemini or openai.' });
  }

  if (!apiKey || !String(apiKey).trim()) {
    return res.status(400).json({ error: 'API key is required.' });
  }

  providerKeys[provider] = String(apiKey).trim();
  return res.json({ ok: true, provider });
});

function extractGeminiText(payload) {
  if (!payload) return '';
  if (typeof payload.text === 'string' && payload.text.trim()) return payload.text.trim();

  const text = payload?.candidates?.[0]?.content?.parts
    ?.map(part => typeof part?.text === 'string' ? part.text : '')
    .join('')
    .trim();

  if (text) return text;
  return '';
}

app.post('/api/ask', async (req, res) => {
  try {
    const { provider, question } = req.body || {};
    const cleanQuestion = String(question || '').trim();

    if (!provider || !['gemini', 'openai'].includes(provider)) {
      return res.status(400).json({ error: 'Provider must be gemini or openai.' });
    }

    if (!cleanQuestion) {
      return res.status(400).json({ error: 'Question is required.' });
    }

    const apiKey = providerKeys[provider];
    if (!apiKey) {
      return res.status(401).json({ error: `${provider.toUpperCase()} API key is not configured on the server.` });
    }

    if (provider === 'gemini') {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          contents: [{ parts: [{ text: cleanQuestion }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 220
          }
        })
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        const msg = payload?.error?.message || 'Gemini API request failed.';
        return res.status(response.status).json({ error: msg });
      }

      const answer = extractGeminiText(payload);
      if (!answer) {
        return res.status(502).json({ error: 'Gemini returned an empty response.' });
      }

      return res.json({ answer });
    }

    const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_INSTRUCTION },
          { role: 'user', content: cleanQuestion }
        ],
        max_tokens: 180,
        temperature: 0.7
      })
    });

    const data = await openAiResponse.json().catch(() => ({}));

    if (!openAiResponse.ok) {
      const msg = data?.error?.message || 'OpenAI API request failed.';
      return res.status(openAiResponse.status).json({ error: msg });
    }

    const answer = data?.choices?.[0]?.message?.content;
    if (!answer) {
      return res.status(502).json({ error: 'OpenAI returned an empty response.' });
    }

    return res.json({ answer: Array.isArray(answer) ? answer.map(part => part?.text || '').join(' ').trim() : String(answer).trim() });
  } catch (error) {
    console.error('AI proxy error:', error);
    return res.status(500).json({ error: error?.message || 'Unexpected server error while contacting AI provider.' });
  }
});

app.listen(PORT, () => {
  console.log(`AI proxy running on http://localhost:${PORT}`);
});
