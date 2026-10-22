import React from 'react';
import { Layers, Database, ShieldCheck, Activity, Github, Globe2 } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cacheHitRatio: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, cacheHitRatio }) => {
  const tabs = [
    { id: 'topology', label: 'Cluster Topology' },
    { id: 'tridion', label: 'Tridion DX Studio' },
    { id: 'couchbase', label: 'Couchbase N1QL' },
    { id: 'catalog', label: 'Catalog Service' },
    { id: 'api', label: 'REST API Hub' },
    { id: 'skills', label: 'Skills Matrix' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Stack Badges */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-red-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-black text-xl">
            T
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-white">TridionX</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                Microservices & CMS
              </span>
              <span className="hidden sm:inline px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/30">
                Couchbase NoSQL
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              React.js • Node.js Microservices • RWS Tridion DX • Couchbase 7.6 N1QL
            </p>
          </div>
        </div>

        {/* Global Cluster Status Indicators */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300 font-medium">Cluster Healthy</span>
            <span className="text-slate-600">•</span>
            <span className="text-indigo-400 mono font-bold">5 Nodes</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <Database className="w-3.5 h-3.5 text-red-400" />
            <span className="text-slate-400">Cache Hit:</span>
            <span className="text-emerald-400 mono font-bold">{cacheHitRatio.toFixed(1)}%</span>
          </div>

          <a
            href="https://github.com/rahulgarg55/tridion-microservices-cms"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold rounded-xl transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="max-w-7xl mx-auto mt-3 pt-2 border-t border-slate-800/60 flex items-center gap-2 overflow-x-auto custom-scrollbar text-xs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
};
