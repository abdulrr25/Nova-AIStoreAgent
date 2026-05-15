"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../data/products';

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#E5E7EB] py-4">
      <button onClick={() => setOpen(v => !v)} className="w-full flex items-center justify-between mb-3">
        <span className="text-[10px] font-extrabold text-[#111111] tracking-widest uppercase">{title}</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-[#6B7280]" />
          : <ChevronDown className="w-4 h-4 text-[#6B7280]" />}
      </button>
      {open && children}
    </div>
  );
}

interface FilterProps { isOpen: boolean; onClose: () => void; }

export default function Filter({ isOpen, onClose }: FilterProps) {
  const { categories, filters, setFilters, clearFilters } = useShop();

  const content = (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-1 pb-4 border-b border-[#E5E7EB]">
        <span className="text-sm font-extrabold text-[#111111] uppercase tracking-widest">Filters</span>
        <button
          onClick={clearFilters}
          className="text-[10px] font-bold text-[#E84545] hover:underline uppercase tracking-widest transition-colors">
          CLEAR ALL
        </button>
      </div>

      {/* Categories */}
      <Section title="Category">
        <div className="space-y-0.5">
          <button
            onClick={() => setFilters(p => ({ ...p, categoryId: null }))}
            className={`w-full text-left py-2 px-2.5 text-xs font-medium transition-all rounded-sm ${
              filters.categoryId === null
                ? 'bg-[#E84545] text-white font-bold'
                : 'text-[#111111] hover:bg-[#F3F4F6]'
            }`}>
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilters(p => ({ ...p, categoryId: cat.id }))}
              className={`w-full text-left py-2 px-2.5 text-xs font-medium flex items-center justify-between transition-all rounded-sm ${
                filters.categoryId === cat.id
                  ? 'bg-[#E84545] text-white font-bold'
                  : 'text-[#111111] hover:bg-[#F3F4F6]'
              }`}>
              <span>{cat.name}</span>
              {filters.categoryId === cat.id && (
                <span className="w-4 h-4 bg-white/30 flex items-center justify-center text-[9px] font-bold rounded-sm">✓</span>
              )}
            </button>
          ))}
        </div>
      </Section>

      {/* Price Range */}
      <Section title="Price Range">
        <div className="px-1">
          <input
            type="range" min="0" max="200000" step="1000"
            value={filters.priceRange[1]}
            onChange={e => setFilters(p => ({ ...p, priceRange: [p.priceRange[0], parseInt(e.target.value)] }))}
            className="w-full h-1.5 appearance-none bg-[#E5E7EB] rounded-full cursor-pointer accent-[#E84545]"
          />
          <div className="flex justify-between mt-2.5 text-xs text-[#6B7280] font-medium">
            <span>{formatPrice(0)}</span>
            <span className="text-[#E84545] font-bold">{formatPrice(filters.priceRange[1])}</span>
          </div>
        </div>
      </Section>

      {/* Availability */}
      <Section title="Availability">
        <label className="flex items-center gap-3 cursor-pointer py-1 group">
          <div
            onClick={() => setFilters(p => ({ ...p, inStock: !p.inStock }))}
            className={`w-4 h-4 border-2 flex items-center justify-center transition-all cursor-pointer rounded-sm ${
              filters.inStock ? 'bg-[#E84545] border-[#E84545]' : 'border-[#D1D5DB] group-hover:border-[#E84545]'
            }`}>
            {filters.inStock && <span className="text-white text-[9px] font-bold">✓</span>}
          </div>
          <span className="text-xs text-[#111111] font-medium group-hover:text-[#E84545] transition-colors">In Stock Only</span>
        </label>
      </Section>

      {/* Rating */}
      <Section title="Customer Rating">
        <div className="space-y-1">
          {[4, 3, 2].map(r => (
            <label key={r} className="flex items-center gap-3 py-1.5 cursor-pointer group">
              <div className="w-4 h-4 border-2 border-[#D1D5DB] group-hover:border-[#E84545] transition-colors rounded-sm flex-shrink-0" />
              <span className="text-xs text-[#111111] group-hover:text-[#E84545] transition-colors font-medium flex items-center gap-1">
                {r}
                <span className="text-[#F59E0B]">★</span>
                & above
              </span>
            </label>
          ))}
        </div>
      </Section>
    </div>
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block w-full bg-white p-4 border border-[#E5E7EB] rounded-sm">
        {content}
      </div>

      {/* Mobile drawer */}
      <div className="lg:hidden fixed inset-0 bg-black/60 z-50 flex" onClick={onClose}>
        <div
          className="w-80 max-w-[85vw] bg-white h-full overflow-y-auto p-4"
          onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-4">
            <span className="font-extrabold text-[#111111] text-sm uppercase tracking-widest">Filters</span>
            <button onClick={onClose} className="p-1 hover:text-[#E84545] transition-colors">
              <X className="w-5 h-5 text-[#111111]" />
            </button>
          </div>
          {content}
          <button
            onClick={onClose}
            className="w-full mt-4 py-3 bg-[#111111] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#E84545] transition-colors rounded-sm">
            APPLY FILTERS
          </button>
        </div>
      </div>
    </>
  );
}
