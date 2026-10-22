import React, { useState } from 'react';
import { TridionComponent, BlueprintPublication } from '../types';
import { 
  Layers, 
  Globe2, 
  FileText, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles,
  RefreshCw,
  Database,
  Code
} from 'lucide-react';

interface TridionStudioProps {
  components: TridionComponent[];
  onPublishComponent: (comp: TridionComponent) => void;
}

export const TridionStudio: React.FC<TridionStudioProps> = ({
  components,
  onPublishComponent
}) => {
  const [selectedPublication, setSelectedPublication] = useState<BlueprintPublication>('000 Global Master');
  const [selectedCompId, setSelectedCompId] = useState<string>(components[0].id);
  const [publishing, setPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const publications: BlueprintPublication[] = [
    '000 Global Master',
    '022 Regional EMEA (fr-FR)',
    '030 Regional APAC (ja-JP)'
  ];

  const filteredComponents = components.filter(c => c.publication === selectedPublication);
  const activeComp = components.find(c => c.id === selectedCompId) || filteredComponents[0] || components[0];

  const handlePublish = () => {
    setPublishing(true);
    setPublishSuccess(false);
    setTimeout(() => {
      setPublishing(false);
      setPublishSuccess(true);
      onPublishComponent(activeComp);
      setTimeout(() => setPublishSuccess(false), 3000);
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              RWS / SDL Tridion DX Architecture
            </span>
            <span className="text-xs text-indigo-300 font-bold">Blueprinting & Component Presentations</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Headless Content Management & Blueprinting
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
            Author multi-lingual component presentations in Tridion DX schema format. Publishing serializes JSON documents directly into Couchbase NoSQL with localized inheritance.
          </p>
        </div>

        {/* Blueprint Publication Switcher */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Blueprinting Level</span>
          </label>
          <div className="flex bg-slate-950 rounded-xl p-1 border border-slate-800 text-xs">
            {publications.map((pub) => (
              <button
                key={pub}
                onClick={() => {
                  setSelectedPublication(pub);
                  const matched = components.find(c => c.publication === pub);
                  if (matched) setSelectedCompId(matched.id);
                }}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedPublication === pub
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {pub.split(' ')[1] || pub}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Studio Grid: Component Selector + Live Component Template Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Component List (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Component Presentations ({filteredComponents.length})
            </span>
            <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
              TCM URI System
            </span>
          </div>

          <div className="space-y-2.5">
            {filteredComponents.map((comp) => {
              const isSelected = activeComp.id === comp.id;
              return (
                <div
                  key={comp.id}
                  onClick={() => setSelectedCompId(comp.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-indigo-500 shadow-md shadow-indigo-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-indigo-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {comp.tcmUri}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">v{comp.version}.0</span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1">{comp.title}</h4>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800/60">
                    <span>Schema: {comp.schema}</span>
                    <span className="text-emerald-400 font-bold">Couchbase Sync ✓</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Blueprinting Hierarchy Explainer Card */}
          <div className="rounded-2xl bg-slate-900/40 border border-slate-800/80 p-4 space-y-2 text-xs text-slate-400">
            <h4 className="font-bold text-slate-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Blueprinting Cascade</span>
            </h4>
            <p className="text-[11px] leading-relaxed">
              In Tridion, content created at <strong>000 Global Master</strong> cascades down through localized regional publications (EMEA / APAC) without duplication. Local editors can override specific fields while inheriting core product metadata.
            </p>
          </div>
        </div>

        {/* Right: Component Presentation Preview & Action (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
                  Template: {activeComp.componentTemplate}
                </span>
                <h3 className="text-lg font-extrabold text-white">{activeComp.title}</h3>
                <p className="text-xs text-slate-400">
                  Publication: <strong className="text-slate-300">{activeComp.publication}</strong> • Locale: <strong className="text-slate-300">{activeComp.locale}</strong>
                </p>
              </div>

              {/* Publish Action Button */}
              <button
                onClick={handlePublish}
                disabled={publishing}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
                  publishSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20 active:scale-95'
                }`}
              >
                {publishing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Deploying to Couchbase...</span>
                  </>
                ) : publishSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Published to Couchbase!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Publish Component Presentation</span>
                  </>
                )}
              </button>
            </div>

            {/* Live Rendered Component Presentation (Simulates frontend website rendering) */}
            <div className="rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-950 to-slate-900 border border-indigo-500/30 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {activeComp.fields.heroBadge || 'Enterprise Tech'}
                </span>
                <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  <Database className="w-3 h-3 text-red-400" />
                  Key: {activeComp.couchbaseDocKey}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {activeComp.fields.headline || activeComp.fields.componentTitle}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                {activeComp.fields.subheadline || activeComp.fields.summary}
              </p>

              {activeComp.fields.p99Latency && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">p99 Latency</span>
                    <span className="text-sm font-bold text-emerald-400 mono">{activeComp.fields.p99Latency}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Throughput</span>
                    <span className="text-sm font-bold text-indigo-300 mono">{activeComp.fields.concurrencyCapacity}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Cache Hit Rate</span>
                    <span className="text-sm font-bold text-emerald-400 mono">{activeComp.fields.cacheHitRate}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Eviction</span>
                    <span className="text-sm font-bold text-slate-300 mono">{activeComp.fields.evictionPolicy}</span>
                  </div>
                </div>
              )}

              {activeComp.fields.authorByline && (
                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-medium">
                  {activeComp.fields.authorByline}
                </div>
              )}
            </div>

            {/* Tridion Schema Raw Fields Viewer */}
            <div className="rounded-xl bg-slate-950 p-3.5 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-400 flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-indigo-400" />
                  Tridion Content Manager Field Mapping (JSON)
                </span>
                <span className="text-[10px] mono text-slate-500">Schema ID: {activeComp.schema}</span>
              </div>
              <pre className="text-[11px] font-mono text-indigo-300 overflow-x-auto p-2 bg-slate-900/80 rounded-lg custom-scrollbar">
                {JSON.stringify(activeComp.fields, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
