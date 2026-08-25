import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { handleProductionGenerate } from './server/aiServer.ts';
import { handleAiTestRequest } from './server/aiHandler.ts';

const PORT = process.env.PORT || 3001;
const DIST_DIR = path.resolve(process.cwd(), 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  const urlPath = req.url ? req.url.split('?')[0] : '/';

  // 1. Production API Endpoints
  if (urlPath === '/api/generate') {
    if (req.method === 'POST') {
      handleProductionGenerate(req, res);
    } else {
      res.statusCode = 405;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, error: 'Method Not Allowed. Use POST.' }));
    }
    return;
  }

  if (urlPath === '/api/ai/test') {
    if (req.method === 'POST') {
      handleAiTestRequest(req, res);
    } else {
      res.statusCode = 405;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, error: 'Method Not Allowed. Use POST.' }));
    }
    return;
  }

  // 2. Production Static File Serving & SPA Fallback
  let filePath = path.join(DIST_DIR, urlPath);

  // Security check to prevent directory traversal
  if (!filePath.startsWith(DIST_DIR)) {
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
    } else {
      // Fallback to dist/index.html for SPA routes (/login, /signup, /workspace, /)
      const indexPath = path.join(DIST_DIR, 'index.html');
      fs.stat(indexPath, (indexErr, indexStats) => {
        if (!indexErr && indexStats.isFile()) {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          fs.createReadStream(indexPath).pipe(res);
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Application build assets not found. Run npm run build first.');
        }
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Production Server listening on http://localhost:${PORT}`);
  console.log(`API Endpoint active at http://localhost:${PORT}/api/generate`);
});
