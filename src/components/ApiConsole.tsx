import React, { useState } from 'react';
import { Terminal, Send, CheckCircle2, Play, Code, Copy, Check } from 'lucide-react';

export const ApiConsole: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('/api/v1/content/presentations');
  const [method, setMethod] = useState('GET');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>({
    status: 200,
    latencyMs: 1.4,
    data: {
      gateway: 'API Gateway v2.4 (Node.js Express)',
      total: 4,
      publication: '000 Global Master',
      presentations: [
        {
          tcmUri: 'tcm:50-1092-16',
          title: 'Cloud Enterprise Platform Overview',
          schema: 'ProductArticle',
          locale: 'en-US',
          couchbaseCacheStatus: 'HIT (Memory Resident 100%)'
        }
      ]
    }
  });
  const [copied, setCopied] = useState(false);

  const endpoints = [
    {
      method: 'GET',
      path: '/api/v1/content/presentations',
      description: 'Fetch published Tridion component presentations from Couchbase cache.',
      sampleResponse: {
        status: 200,
        gateway: 'API Gateway v2.4',
        publication: '000 Global Master',
        count: 4,
        cacheHit: true,
        source: 'Couchbase NoSQL (delivery.components)'
      }
    },
    {
      method: 'POST',
      path: '/api/v1/content/publish',
      description: 'Trigger multi-channel publishing event to Couchbase & invalidate edge KV cache.',
      sampleResponse: {
        status: 201,
        message: 'Component presentation published and synchronized to Couchbase NoSQL cluster.',
        tcmUri: 'tcm:50-1092-16',
        cas: '0x17b4920a11e80000',
        invalidatedNodes: 5
      }
    },
    {
      method: 'GET',
      path: '/api/v1/couchbase/query?n1ql=SELECT_ALL',
      description: 'Execute N1QL (SQL++) query through Couchbase query service.',
      sampleResponse: {
        status: 200,
        executionTime: '0.42ms',
        rowsCount: 4,
        metrics: { p99: '0.42ms', memoryQuotaUsed: '84.2%' }
      }
    },
    {
      method: 'GET',
      path: '/api/v1/health',
      description: 'Distributed cluster health, active circuit breakers, and node uptime.',
      sampleResponse: {
        status: 'healthy',
        services: {
          gateway: 'UP',
          contentService: 'UP',
          catalogService: 'UP',
          couchbaseCluster: 'UP'
        },
        uptimeHours: 23.6
      }
    }
  ];

  const handleExecute = () => {
    setLoading(true);
    setTimeout(() => {
      const ep = endpoints.find(e => e.path === selectedEndpoint);
      setResponse({
        status: ep?.method === 'POST' ? 201 : 200,
        latencyMs: (0.4 + Math.random() * 1.5).toFixed(2),
        data: ep?.sampleResponse || {}
      });
      setLoading(false);
    }, 250);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(response.data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              RESTful API Playground
            </span>
            <span className="text-xs text-slate-300 font-bold">API Gateway Routing (Port :4001)</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Microservices REST API Testing Hub
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
            Test live REST contracts connecting React.js front-end with Node.js microservices, Tridion Content Delivery, and Couchbase NoSQL endpoints.
          </p>
        </div>
      </div>

      {/* Endpoint Selector & Execution Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Endpoint List (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 block">
            Available Microservices Endpoints
          </span>

          <div className="space-y-2">
            {endpoints.map((ep) => {
              const isSelected = selectedEndpoint === ep.path;
              return (
                <div
                  key={ep.path}
                  onClick={() => {
                    setSelectedEndpoint(ep.path);
                    setMethod(ep.method);
                  }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-indigo-500 shadow-md shadow-indigo-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                      ep.method === 'GET' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-indigo-500/20 text-indigo-400'
                    }`}>
                      {ep.method}
                    </span>
                    <span className="text-xs font-mono text-white truncate">{ep.path}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{ep.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Request & Response Inspector (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-extrabold ${
                  method === 'GET' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-indigo-500/20 text-indigo-400'
                }`}>
                  {method}
                </span>
                <span className="text-xs font-mono text-white">{selectedEndpoint}</span>
              </div>

              <button
                onClick={handleExecute}
                disabled={loading}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Send Request</span>
              </button>
            </div>

            {/* Response status bar */}
            <div className="flex items-center justify-between text-xs px-1 text-slate-400">
              <div className="flex items-center gap-2">
                <span>Status:</span>
                <span className="px-2 py-0.5 rounded font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {response.status} OK
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="mono text-indigo-400 font-bold">{response.latencyMs} ms</span>
                <button
                  onClick={handleCopy}
                  className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* JSON Output Viewer */}
            <pre className="text-[11px] font-mono text-indigo-300 p-3.5 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto max-h-72 custom-scrollbar">
              {JSON.stringify(response.data, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
