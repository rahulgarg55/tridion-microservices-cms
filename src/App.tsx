import React, { useState } from 'react';
import { ServiceNode, TridionComponent, CouchbaseDocument, N1QLQueryResult } from './types';
import { INITIAL_SERVICES, INITIAL_TRIDION_COMPONENTS, INITIAL_COUCHBASE_DOCS } from './data/mockCmsData';
import { Header } from './components/Header';
import { TopologyView } from './components/TopologyView';
import { TridionStudio } from './components/TridionStudio';
import { CouchbaseConsole } from './components/CouchbaseConsole';
import { CatalogView } from './components/CatalogView';
import { ApiConsole } from './components/ApiConsole';
import { SkillShowcase } from './components/SkillShowcase';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('topology');
  const [services, setServices] = useState<ServiceNode[]>(INITIAL_SERVICES);
  const [components, setComponents] = useState<TridionComponent[]>(INITIAL_TRIDION_COMPONENTS);
  const [documents, setDocuments] = useState<CouchbaseDocument[]>(INITIAL_COUCHBASE_DOCS);
  const [cacheHitRatio, setCacheHitRatio] = useState<number>(99.4);

  // Trigger Traffic Spike simulation
  const handleTriggerTrafficSpike = () => {
    setServices(prev => prev.map(s => ({
      ...s,
      requestCount: s.requestCount + Math.floor(8000 + Math.random() * 5000),
      latencyMs: Number((s.latencyMs * 1.08).toFixed(2))
    })));
    setCacheHitRatio(Number((99.2 + Math.random() * 0.7).toFixed(1)));
  };

  // Simulate Service Node Failover & Self-Healing
  const handleSimulateFailover = () => {
    setServices(prev => prev.map(s => s.type === 'catalog' ? { ...s, status: 'degraded', latencyMs: 14.5 } : s));
    setTimeout(() => {
      setServices(prev => prev.map(s => s.type === 'catalog' ? { ...s, status: 'healthy', latencyMs: 2.1 } : s));
    }, 3000);
  };

  // Publish Tridion Component to Couchbase Document Store
  const handlePublishComponent = (comp: TridionComponent) => {
    const updatedCas = `0x${Math.floor(Math.random() * 0xffffffff).toString(16)}0000`;
    const docKey = comp.couchbaseDocKey;

    setDocuments(prev => {
      const existingIdx = prev.findIndex(d => d.id === docKey);
      const newDoc: CouchbaseDocument = {
        id: docKey,
        cas: updatedCas,
        bucket: 'tridion_cms',
        scope: 'delivery',
        collection: 'components',
        ttlSeconds: 86400,
        memoryResident: true,
        sizeBytes: 1350,
        content: {
          tcmUri: comp.tcmUri,
          schema: comp.schema,
          publication: comp.publication,
          locale: comp.locale,
          headline: comp.fields.headline || comp.fields.componentTitle,
          cachedAt: new Date().toISOString(),
          servedFromMemory: true
        }
      };

      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = newDoc;
        return copy;
      }
      return [newDoc, ...prev];
    });

    setServices(prev => prev.map(s => s.type === 'couchbase' ? {
      ...s,
      requestCount: s.requestCount + 1,
      latencyMs: 0.38
    } : s));
  };

  // Execute N1QL Query Engine
  const handleExecuteQuery = (query: string): N1QLQueryResult => {
    const qLower = query.toLowerCase();
    let rows: any[] = [];

    if (qLower.includes('locale') && qLower.includes('group by')) {
      rows = [
        { locale: 'en-US', document_count: 2 },
        { locale: 'fr-FR', document_count: 1 },
        { locale: 'ja-JP', document_count: 1 }
      ];
    } else if (qLower.includes('ecommerce_catalog') || qLower.includes('products')) {
      rows = [
        {
          id: 'catalog:sku:NX-900',
          sku: 'NX-900',
          name: 'OmniCloud Microservices Appliance X9',
          price: 4999.00,
          inventory: 34
        }
      ];
    } else {
      rows = documents.map(d => ({
        id: d.id,
        bucket: d.bucket,
        cas: d.cas,
        headline: d.content.headline || d.content.name || 'Enterprise Asset',
        locale: d.content.locale || 'en-US',
        cachedAt: d.content.cachedAt || '2026-10-22T14:30:00Z',
        memoryResident: d.memoryResident
      }));
    }

    return {
      query,
      executionTimeMs: 0.42,
      status: 'success',
      resultCount: rows.length,
      rows,
      metrics: {
        elapsedTime: '0.42ms',
        executionTime: '0.38ms',
        resultSize: rows.length * 280
      }
    };
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header & Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cacheHitRatio={cacheHitRatio}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'topology' && (
          <TopologyView
            services={services}
            onTriggerTrafficSpike={handleTriggerTrafficSpike}
            onSimulateFailover={handleSimulateFailover}
          />
        )}
        {activeTab === 'tridion' && (
          <TridionStudio
            components={components}
            onPublishComponent={handlePublishComponent}
          />
        )}
        {activeTab === 'couchbase' && (
          <CouchbaseConsole
            documents={documents}
            onExecuteQuery={handleExecuteQuery}
          />
        )}
        {activeTab === 'catalog' && <CatalogView />}
        {activeTab === 'api' && <ApiConsole />}
        {activeTab === 'skills' && <SkillShowcase />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>TridionX Enterprise Microservices Platform v1.0.0</span>
            <span>•</span>
            <span>Engineered by <strong className="text-slate-300">Rahul Garg</strong></span>
          </div>
          <div className="flex items-center gap-4">
            <span>React.js • Node.js • Couchbase • Tridion DX</span>
            <span>•</span>
            <a
              href="https://github.com/rahulgarg55/tridion-microservices-cms"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
