const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT =  5000;

// Enable CORS for all routes
app.use(cors());

// Define a route for the proxy
app.get('/proxy', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', response.headers['content-type']);
    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching the resource' });
  }
});

app.listen(PORT, () => {
  console.log(`CORS proxy server running on http://localhost:${PORT}`);
});
