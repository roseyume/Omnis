const express = require('express');
const request = require('request');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.all('/', (req, res) => {
  console.log("Handle all requests");
  console.log('Request URL:', req.originalUrl);
  request(
    { url: 'https://localhost:8000' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`listening on ${PORT}`));