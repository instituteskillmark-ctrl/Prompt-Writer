import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { handleAiTestRequest } from './server/aiHandler.js'
import { handleProductionGenerate } from './server/aiServer.js'

function aiBackendPlugin(): Plugin {
  return {
    name: 'ai-backend-middleware',
    configureServer(server) {
      server.middlewares.use('/api/generate', (req, res) => {
        if (req.method === 'POST') {
          handleProductionGenerate(req, res);
        } else {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: 'Method Not Allowed. Use POST.' }));
        }
      });
      server.middlewares.use('/api/ai/test', (req, res) => {
        if (req.method === 'POST') {
          handleAiTestRequest(req, res);
        } else {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: 'Method Not Allowed. Use POST.' }));
        }
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/generate', (req, res) => {
        if (req.method === 'POST') {
          handleProductionGenerate(req, res);
        } else {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: 'Method Not Allowed. Use POST.' }));
        }
      });
      server.middlewares.use('/api/ai/test', (req, res) => {
        if (req.method === 'POST') {
          handleAiTestRequest(req, res);
        } else {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: 'Method Not Allowed. Use POST.' }));
        }
      });
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), aiBackendPlugin()],
})
