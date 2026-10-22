import React, { useState } from 'react';
import { ServiceNode } from '../types';
import { 
  Network, 
  Server, 
  Database, 
  Cpu, 
  Zap, 
  RefreshCw, 
  ShieldAlert, 
  CheckCircle2, 
  Activity,
  Layers,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

interface TopologyViewProps {
  services: ServiceNode[];
  onTriggerTrafficSpike: () => void;
  onSimulateFailover: () => void;
}

export const TopologyView: React.FC<TopologyViewProps> = ({
  services,
  onTriggerTrafficSpike,
  onSimulateFailover
}) => {
  const [selectedService, setSelectedService] = useState<ServiceNode>(services[0]);

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                Microservices Topology
              </span>
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> All Services Connected
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Enterprise Microservices & Couchbase Fabric
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1 leading-relaxed">
              Decoupled Node.js microservices coordinated via an API Gateway, backed by a Couchbase 7.6 Enterprise memory-first NoSQL cluster and Tridion DX headless component publishing.
            </p>
          </div>

          {/* Interactive Simulation Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onTriggerTrafficSpike}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
            >
              <Zap className="w-4 h-4" />
              <span>Simulate Load Spike (15k ops)</span>
            </button>
            <button
              onClick={onSimulateFailover}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Test Circuit Breaker</span>
            </button>
          </div>
        </div>
      </div>

      {/* Visual Service Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((svc) => {
          const isSelected = selectedService.id === svc.id;
          const isCouchbase = svc.type === 'couchbase';

          return (
            <div
              key={svc.id}
              onClick={() => setSelectedService(svc)}
              className={`rounded-2xl p-4 border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10 scale-[1.02]'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                    isCouchbase
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                  }`}>
                    {isCouchbase ? <Database className="w-4 h-4" /> : <Server className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white leading-tight">{svc.name}</h3>
                    <span className="text-[10px] font-mono text-slate-400">Port :{svc.port}</span>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  svc.status === 'healthy'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {svc.status}
                </span>
              </div>

              <p className="text-[11px] text-slate-400 line-clamp-2 mb-3">
                {svc.description}
              </p>

              <div className="grid grid-cols-3 pt-2.5 border-t border-slate-800/80 text-[11px]">
                <div>
                  <span className="text-slate-500 text-[10px] block">Latency</span>
                  <span className="font-mono font-bold text-emerald-400">{svc.latencyMs}ms</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Requests</span>
                  <span className="font-mono font-bold text-slate-200">{svc.requestCount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Error Rate</span>
                  <span className="font-mono font-bold text-indigo-300">{svc.errorRatePercent}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Deep Dive Inspector */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>{selectedService.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-indigo-300 mono">
                  {selectedService.id}
                </span>
              </h3>
              <p className="text-xs text-slate-400">Node Architecture & Resiliency Telemetry</p>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
            p99: {selectedService.latencyMs} ms
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
            <span className="text-slate-500 text-[10px] uppercase font-bold block mb-1">Architecture Tier</span>
            <span className="font-semibold text-slate-200">{selectedService.type.toUpperCase()} Microservice</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
            <span className="text-slate-500 text-[10px] uppercase font-bold block mb-1">Process Uptime</span>
            <span className="font-mono text-slate-200">{(selectedService.uptimeSeconds / 3600).toFixed(1)} hours</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
            <span className="text-slate-500 text-[10px] uppercase font-bold block mb-1">Circuit Breaker</span>
            <span className="font-semibold text-emerald-400">CLOSED (Normal Operations)</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
            <span className="text-slate-500 text-[10px] uppercase font-bold block mb-1">Data Storage</span>
            <span className="font-semibold text-slate-200">Couchbase Memory Quota: 85%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
