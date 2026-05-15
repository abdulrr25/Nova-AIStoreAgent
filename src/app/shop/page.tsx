"use client"
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import ProductGrid from '../components/ProductGrid';
import { useShop } from '../context/ShopContext';

export default function ShopPage() {
  const { setFilters } = useShop();
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setFilters(p => ({ ...p, searchQuery: q }));
    const cat = searchParams.get('categoryId');
    if (cat) setFilters(p => ({ ...p, categoryId: parseInt(cat) }));
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <Header />
      <ProductGrid />
    </div>
  );
}
