const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'Wikipedia research proxy is running' });
});

app.post('/api/init', (req, res) => {
  const { provider } = req.body || {};

  if (!provider || !['wikipedia'].includes(provider)) {
    return res.status(400).json({ error: 'Provider must be wikipedia.' });
  }

  return res.json({ ok: true, provider });
});

async function fetchWikipediaAnswer(question) {
  const searchUrl = `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&list=search&srsearch=${encodeURIComponent(question)}&srlimit=1&utf8=1`;
  const searchResponse = await fetch(searchUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; research-bot/1.0; +https://example.com)'
    }
  });

  if (!searchResponse.ok) {
    throw new Error('Wikipedia search request failed.');
  }

  const searchData = await searchResponse.json();
  const pageTitle = searchData?.query?.search?.[0]?.title;

  if (!pageTitle) {
    throw new Error('No Wikipedia article was found for that question.');
  }

  const pageUrl = `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro=1&explaintext=1&redirects=1&titles=${encodeURIComponent(pageTitle)}`;
  const pageResponse = await fetch(pageUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; research-bot/1.0; +https://example.com)'
    }
  });

  if (!pageResponse.ok) {
    throw new Error('Wikipedia article request failed.');
  }

  const pageData = await pageResponse.json();
  const pages = pageData?.query?.pages || {};
  const page = Object.values(pages)[0];
  const extractedText = String(page?.extract || '').replace(/\s+/g, ' ').trim();

  if (!extractedText) {
    throw new Error('Wikipedia returned no summary for that topic.');
  }

  const summary = extractedText
    .split(/(?<=[.!?])\s+/)
    .slice(0, 2)
    .join(' ')
    .trim() || extractedText.slice(0, 500);

  return summary;
}

app.post('/api/ask', async (req, res) => {
  try {
    const { provider, question } = req.body || {};
    const cleanQuestion = String(question || '').trim();

    if (!provider || !['wikipedia'].includes(provider)) {
      return res.status(400).json({ error: 'Provider must be wikipedia.' });
    }

    if (!cleanQuestion) {
      return res.status(400).json({ error: 'Question is required.' });
    }

    const answer = await fetchWikipediaAnswer(cleanQuestion);
    return res.json({ answer });
  } catch (error) {
    console.error('Wikipedia proxy error:', error);
    return res.status(500).json({ error: error?.message || 'Unexpected server error while requesting Wikipedia.' });
  }
});

app.listen(PORT, () => {
  console.log(`Wikipedia research proxy running on http://localhost:${PORT}`);
});
