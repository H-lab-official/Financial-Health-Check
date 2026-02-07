/**
 * Production static server for the SPA.
 * Replaces PM2's "serve" to avoid URIError on malformed URLs (decodeURIComponent in PM2 Serve.js).
 */
const express = require('express');
const path = require('path');

const PORT = Number(process.env.PM2_SERVE_PORT || process.env.PORT || 4173);
const DIST = path.resolve(__dirname, 'dist');

const app = express();

// Reject malformed request URLs so we don't crash (PM2 serve throws in decodeURIComponent)
app.use((req, res, next) => {
  try {
    decodeURIComponent(req.path);
  } catch (_) {
    res.status(400).send('Bad Request');
    return;
  }
  next();
});

app.use(express.static(DIST, { index: false }));

// SPA fallback
app.get('*', (_req, res) => {
  res.sendFile(path.join(DIST, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Exposing ' + DIST + ' on 0.0.0.0:' + PORT);
});
