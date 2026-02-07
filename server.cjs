/**
 * Production static server for the SPA.
 * Replaces PM2's "serve" to avoid URIError on malformed URLs (decodeURIComponent in PM2 Serve.js).
 */
const fs = require('fs');
const path = require('path');

let express;
try {
  express = require('express');
} catch (e) {
  console.error('Missing dependency: run "npm install". Error:', e.message);
  process.exit(1);
}

const PORT = Number(process.env.PM2_SERVE_PORT || process.env.PORT || 4173);
const DIST = path.resolve(__dirname, 'dist');
const indexHtml = path.join(DIST, 'index.html');

if (!fs.existsSync(DIST)) {
  console.error('Folder "dist" not found. Run "npm run build" first. Path: ' + DIST);
  process.exit(1);
}
if (!fs.existsSync(indexHtml)) {
  console.error('File dist/index.html not found. Run "npm run build" first.');
  process.exit(1);
}

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
