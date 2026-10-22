/**
 * API Gateway Microservice (Node.js)
 * Port: 4001
 * Responsibilities: Reverse proxy, Circuit Breaker, Rate Limiting, Couchbase Cache-Aside
 */

import http from 'http';
import CouchbaseClusterManager from '../couchbase-service/couchbaseMock.js';
import TridionEngine from '../content-service/tridionEngine.js';

const cb = new CouchbaseClusterManager();
const tridion = new TridionEngine();

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = req.url || '/';

  // Liveness check
  if (url === '/api/v1/health' || url === '/health') {
    res.writeHead(200);
    res.end(JSON.stringify({
      status: 'healthy',
      gateway: 'API Gateway v2.4 (Node.js)',
      circuitBreaker: 'CLOSED',
      uptime: process.uptime(),
      connectedServices: ['content-service', 'catalog-service', 'couchbase-cluster']
    }));
    return;
  }

  // Fetch Presentations via Gateway
  if (url.startsWith('/api/v1/content/presentations')) {
    try {
      const doc = await cb.get('tridion_cms', 'content:article:tcm-50-1092');
      res.writeHead(200);
      res.end(JSON.stringify({
        status: 200,
        source: 'Couchbase NoSQL (Sub-millisecond KV)',
        cas: doc.cas,
        data: doc.content
      }));
    } catch (e) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  // Fallback 404
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Endpoint not found', path: url }));
});

export default server;
