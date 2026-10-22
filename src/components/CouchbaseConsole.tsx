import React, { useState } from 'react';
import { CouchbaseDocument, N1QLQueryResult } from '../types';
import { 
  Database, 
  Play, 
  Terminal, 
  FileCode, 
  Search, 
  Clock, 
  CheckCircle2, 
  Layers, 
  Plus, 
  RefreshCw 
} from 'lucide-react';

interface CouchbaseConsoleProps {
  documents: CouchbaseDocument[];
  onExecuteQuery: (query: string) => N1QLQueryResult;
}

export const CouchbaseConsole: React.FC<CouchbaseConsoleProps> = ({
  documents,
  onExecuteQuery
}) => {
  const [queryInput, setQueryInput] = useState(
    "SELECT meta().id, c.headline, c.locale, c.cachedAt FROM `tridion_cms`.`delivery`.`components` c WHERE c.schema = 'ProductArticle';"
  );
  const [queryResult, setQueryResult] = useState<N1QLQueryResult | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<CouchbaseDocument>(documents[0]);
  const [running, setRunning] = useState(false);

  const sampleQueries = [
    {
      label: 'All Tridion Articles',
      sql: "SELECT meta().id, c.headline, c.locale, c.cachedAt FROM `tridion_cms`.`delivery`.`components` c WHERE c.schema = 'ProductArticle';"
    },
    {
      label: 'Blueprinting Locale Counts',
      sql: "SELECT c.locale, COUNT(*) as document_count FROM `tridion_cms`.`delivery`.`components` c GROUP BY c.locale;"
    },
    {
      label: 'Catalog In-Stock Items',
      sql: "SELECT meta().id, p.sku, p.name, p.price, p.inventory FROM `ecommerce_catalog`.`inventory`.`products` p WHERE p.status = 'IN_STOCK';"
    },
    {
      label: 'Key-Value Sub-Millisecond Ping',
      sql: "SELECT * FROM `tridion_cms`.`delivery`.`components` USE KEYS ['content:article:tcm-50-1092'];"
    }
  ];

  const handleRunQuery = () => {
    setRunning(true);
    setTimeout(() => {
      const res = onExecuteQuery(queryInput);
      setQueryResult(res);
      setRunning(false);
    }, 300);
  };

  return (
    <div className="space-y-6">
      {/* Couchbase Header Banner */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/30">
              Couchbase 7.6 Enterprise NoSQL
            </span>
            <span className="text-xs text-slate-300 font-bold">SQL++ (N1QL) & In-Memory Key-Value</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Distributed Document Cache & Query Engine
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
            Sub-millisecond memory-first document store powering the headless CMS and product catalog microservices. Decouples read traffic with multi-bucket isolation.
          </p>
        </div>

        {/* Couchbase Cluster Specs */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Bucket RAM</span>
            <span className="text-sm font-bold text-emerald-400 mono">100% Resident</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Read Latency</span>
            <span className="text-sm font-bold text-red-400 mono">&lt; 0.45 ms</span>
          </div>
        </div>
      </div>

      {/* N1QL SQL++ Query Console Section */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-red-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Interactive N1QL (SQL++) Query Editor
            </h3>
          </div>
          <span className="text-[10px] mono text-slate-500">Query Service Port :8093</span>
        </div>

        {/* Quick Query Templates */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar text-xs">
          {sampleQueries.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQueryInput(item.sql);
                handleRunQuery();
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 whitespace-nowrap transition-colors text-[11px]"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* SQL Input Area */}
        <div className="relative">
          <textarea
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            rows={3}
            className="w-full p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300 focus:outline-none focus:border-red-500 leading-relaxed custom-scrollbar resize-none"
            placeholder="Type N1QL query here..."
          />
          <button
            onClick={handleRunQuery}
            disabled={running}
            className="absolute bottom-3 right-3 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-red-600/30 transition-all active:scale-95"
          >
            {running ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>Execute N1QL</span>
          </button>
        </div>

        {/* Query Results Display */}
        {queryResult && (
          <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-2">
            <div className="flex items-center justify-between text-[11px] pb-2 border-b border-slate-800 text-slate-400">
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {queryResult.status.toUpperCase()}
                </span>
                <span>Returned <strong>{queryResult.resultCount}</strong> documents</span>
              </div>
              <span className="mono text-indigo-400">Execution: {queryResult.metrics.executionTime}</span>
            </div>

            <pre className="text-[11px] font-mono text-slate-200 overflow-x-auto max-h-48 custom-scrollbar p-2 bg-slate-900/60 rounded-lg">
              {JSON.stringify(queryResult.rows, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Couchbase Key-Value Document Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Document List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              In-Memory Bucket Documents ({documents.length})
            </span>
            <span className="text-[10px] font-mono text-red-400">Key-Value Engine</span>
          </div>

          <div className="space-y-2">
            {documents.map((doc) => {
              const isSelected = selectedDoc.id === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-red-500 shadow-md shadow-red-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white mono truncate max-w-[240px]">{doc.id}</span>
                    <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      RAM 100%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                    <span>Bucket: {doc.bucket}</span>
                    <span className="font-mono">CAS: {doc.cas.slice(0, 10)}...</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Key-Value Document Metadata & Raw Payload (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">
                  Couchbase Document Inspector
                </span>
                <h3 className="text-sm font-bold text-white mono">{selectedDoc.id}</h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                Sub-millisecond KV: 0.38 ms
              </span>
            </div>

            {/* Document Metadata Badges */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Scope / Collection</span>
                <span className="font-mono text-slate-200">{selectedDoc.scope}.{selectedDoc.collection}</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Payload Size</span>
                <span className="font-mono text-slate-200">{selectedDoc.sizeBytes} bytes</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block">TTL Status</span>
                <span className="font-mono text-emerald-400">
                  {selectedDoc.ttlSeconds === 0 ? 'No Expiry (Sticky)' : `${selectedDoc.ttlSeconds}s remaining`}
                </span>
              </div>
            </div>

            {/* Raw JSON viewer */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-red-400" />
                Raw Document JSON (Couchbase KV Store)
              </span>
              <pre className="text-[11px] font-mono text-indigo-300 p-3 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto max-h-56 custom-scrollbar">
                {JSON.stringify(selectedDoc.content, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
