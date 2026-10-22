import React, { useState } from 'react';
import { CatalogProduct } from '../types';
import { CATALOG_PRODUCTS } from '../data/mockCmsData';
import { ShoppingBag, Search, Database, Layers, Check, ShieldCheck, Zap } from 'lucide-react';

export const CatalogView: React.FC = () => {
  const [products, setProducts] = useState<CatalogProduct[]>(CATALOG_PRODUCTS);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);
  const [reservedSku, setReservedSku] = useState<string | null>(null);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleReserveStock = (sku: string) => {
    setProducts(prev => prev.map(p => {
      if (p.sku === sku && p.inventoryCount > 0) {
        return { ...p, inventoryCount: p.inventoryCount - 1 };
      }
      return p;
    }));
    setReservedSku(sku);
    setTimeout(() => setReservedSku(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              E-Commerce Catalog Microservice
            </span>
            <span className="text-xs text-slate-300 font-bold">Port :4003 • Sub-Millisecond Product API</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Couchbase Document-Driven Product Catalog
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
            Product inventory, pricing, and technical specifications stored as distributed JSON documents in Couchbase, unified with Tridion component presentations.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search SKUs or appliances..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 text-xs text-white rounded-xl border border-slate-800 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filtered.map((prod) => (
          <div
            key={prod.id}
            className="rounded-2xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between hover:border-slate-700 transition-all space-y-4 group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-indigo-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  SKU: {prod.sku}
                </span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  {prod.inventoryCount} in stock
                </span>
              </div>

              <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                {prod.name}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">{prod.category}</p>

              <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1.5 text-[11px] text-slate-300">
                {Object.entries(prod.specs).slice(0, 3).map(([key, val]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-slate-500">{key}:</span>
                    <span className="font-semibold text-slate-200">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block">Unit Price</span>
                <span className="text-lg font-black text-white mono">${prod.price.toLocaleString()}</span>
              </div>

              <button
                onClick={() => handleReserveStock(prod.sku)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  reservedSku === prod.sku
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 active:scale-95'
                }`}
              >
                {reservedSku === prod.sku ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>CAS Reserved!</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5" />
                    <span>Reserve via CAS</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
