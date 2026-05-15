"use client"
export const dynamic = 'force-dynamic'
import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import ProductGrid from '../components/ProductGrid';
import { useShop } from '../context/ShopContext';

function ShopContent() {
  const { setFilters } = useShop();
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setFilters(p => ({ ...p, searchQuery: q }));
    const cat = searchParams.get('categoryId');
    if (cat) setFilters(p => ({ ...p, categoryId: parseInt(cat) }));
  }, [searchParams]);

  return <ProductGrid />;
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <Header />
      <Suspense fallback={<div className="min-h-screen bg-[#F5F5F0]" />}>
        <ShopContent />
      </Suspense>
    </div>
  );
}
