"use client"
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Grid2X2, LayoutList, ChevronDown, Loader2, Package } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from './ProductCard';
import Filter from './Filter';

const SORT_OPTIONS = [
  { value: 'default',    label: 'Recommended' },
  { value: 'new',        label: "What's New" },
  { value: 'price-low',  label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Rating' },
];

export default function ProductGrid() {
  const { products, loadingProducts, filters, setFilters, clearFilters } = useShop();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [gridView, setGridView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('default');
  const [showSort, setShowSort] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (filters.categoryId !== null) list = list.filter(p => p.category.id === filters.categoryId);
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.name.toLowerCase().includes(q)
      );
    }
    list = list.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
    if (filters.inStock) list = list.filter(p => p.stock > 0);
    return list;
  }, [products, filters]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sortBy === 'price-low') return list.sort((a, b) => Number(a.price) - Number(b.price));
    if (sortBy === 'price-high') return list.sort((a, b) => Number(b.price) - Number(a.price));
    if (sortBy === 'rating') return list.sort((a, b) => b.id % 5 - a.id % 5);
    if (sortBy === 'new') return list.sort((a, b) => b.id - a.id);
    return list;
  }, [filtered, sortBy]);

  if (loadingProducts) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-[#F5F5F0]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-[#9C2B2B] mx-auto mb-3" />
          <p className="text-[#6B7280] text-sm tracking-wide">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5F0] min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex gap-0">

          {/* Desktop filter sidebar */}
          <div className="hidden lg:block w-[280px] flex-shrink-0 min-h-screen">
            <div className="sticky top-[105px] max-h-[calc(100vh-105px)] overflow-y-auto p-4">
              <Filter isOpen={true} onClose={() => {}} />
            </div>
          </div>

          {/* Products area */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="bg-white border-b border-[#E5E7EB] px-6 py-3 flex items-center justify-between sticky top-[105px] z-10">
              <div className="flex items-center gap-3">
                {/* Mobile filter trigger */}
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 text-[10px] font-bold text-[#14110F] uppercase tracking-wide border border-[#E5E7EB] px-3 py-2 hover:border-[#9C2B2B] hover:text-[#9C2B2B] transition-colors rounded-xl">
                  <SlidersHorizontal className="w-3.5 h-3.5" /> Filter
                </button>
                <span className="text-xs text-[#6B7280] font-medium">
                  <span className="font-bold text-[#14110F]">{sorted.length}</span> items
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowSort(v => !v)}
                    className="flex items-center gap-1.5 text-[10px] font-bold text-[#14110F] uppercase tracking-wide hover:text-[#9C2B2B] transition-colors">
                    Sort: {SORT_OPTIONS.find(o => o.value === sortBy)?.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSort ? 'rotate-180' : ''}`} />
                  </button>
                  {showSort && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowSort(false)} />
                      <div className="absolute right-0 top-full mt-2 bg-white shadow-xl border border-[#E5E7EB] w-52 z-20 rounded-xl">
                        {SORT_OPTIONS.map(opt => (
                          <button key={opt.value} onClick={() => { setSortBy(opt.value); setShowSort(false); }}
                            className={`w-full text-left px-4 py-2.5 text-xs transition-colors ${
                              sortBy === opt.value
                                ? 'text-[#9C2B2B] font-bold bg-[#F5E9E7]'
                                : 'text-[#14110F] hover:bg-[#F9FAFB]'
                            }`}>
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* View toggle */}
                <div className="flex items-center gap-0.5 border border-[#E5E7EB] rounded-xl p-0.5">
                  <button
                    onClick={() => setGridView('grid')}
                    className={`p-1.5 rounded-xl transition-colors ${gridView === 'grid' ? 'bg-[#14110F] text-white' : 'text-[#6B7280] hover:text-[#14110F]'}`}>
                    <Grid2X2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setGridView('list')}
                    className={`p-1.5 rounded-xl transition-colors ${gridView === 'list' ? 'bg-[#14110F] text-white' : 'text-[#6B7280] hover:text-[#14110F]'}`}>
                    <LayoutList className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile filter drawer */}
            <Filter isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

            {/* Product grid / list */}
            <div className="p-4 lg:p-6">
              {sorted.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-28 text-center">
                  <Package className="w-16 h-16 text-[#E5E7EB] mx-auto mb-4" />
                  <p className="font-serif text-2xl text-[#14110F] mb-2">No results found</p>
                  <p className="text-[#6B7280] text-sm mb-6 max-w-xs">Try adjusting your filters or searching for something different.</p>
                  <button
                    onClick={clearFilters}
                    className="border border-[#14110F] text-[#14110F] px-8 py-2.5 text-sm font-medium hover:bg-[#14110F] hover:text-white transition-colors rounded-full">
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className={
                  gridView === 'grid'
                    ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5'
                    : 'space-y-4'
                }>
                  {sorted.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.02, 0.4), duration: 0.25 }}>
                      <ProductCard product={product} view={gridView} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
