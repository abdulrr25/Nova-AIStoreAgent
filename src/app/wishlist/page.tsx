"use client"
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';

export default function WishlistPage() {
  const { wishlist, products, isAuthenticated, hydrated, addToCart } = useShop();
  const router = useRouter();

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-[#F5F5F0]">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-2 border-[#E84545] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F5F5F0]">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <div className="w-20 h-20 bg-[#FFF0F0] rounded-full flex items-center justify-center mb-6">
            <Heart className="w-9 h-9 text-[#E84545]" />
          </div>
          <h2 className="text-xl font-extrabold text-[#111111] uppercase tracking-wide mb-2">Login to View Wishlist</h2>
          <p className="text-[#6B7280] text-sm mb-6 max-w-xs">Sign in to save your favourite items and access your wishlist anytime.</p>
          <div className="flex gap-3">
            <Link href="/login?redirect=/wishlist"
              className="bg-[#111111] text-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-[#E84545] transition-colors rounded-sm">
              SIGN IN
            </Link>
            <Link href="/register"
              className="border-2 border-[#111111] text-[#111111] px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-[#111111] hover:text-white transition-colors rounded-sm">
              CREATE ACCOUNT
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <Header />
      <div className="max-w-[1400px] mx-auto px-4 py-10">
        {/* Page title */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[#E84545] text-[10px] font-bold tracking-widest uppercase mb-1">Saved Items</p>
            <h1 className="text-2xl font-extrabold text-[#111111] uppercase tracking-wide flex items-center gap-2">
              MY WISHLIST
              <span className="text-sm font-medium text-[#6B7280] normal-case tracking-normal">
                ({wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''})
              </span>
            </h1>
          </div>
          {wishlistProducts.length > 0 && (
            <button
              onClick={() => {
                wishlistProducts.forEach(p => { if (p.stock > 0) addToCart(p, 1); });
              }}
              className="flex items-center gap-2 border-2 border-[#111111] text-[#111111] px-5 py-2.5 text-[10px] font-bold tracking-widest uppercase hover:bg-[#111111] hover:text-white transition-colors rounded-sm">
              <ShoppingBag className="w-4 h-4" /> MOVE ALL TO BAG
            </button>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 bg-white border border-[#E5E7EB] rounded-full flex items-center justify-center mb-6 shadow-sm">
              <Heart className="w-10 h-10 text-[#D1D5DB]" />
            </div>
            <h2 className="text-xl font-extrabold text-[#111111] uppercase tracking-wide mb-2">Your Wishlist is Empty</h2>
            <p className="text-[#6B7280] text-sm mb-8 max-w-sm">
              Save items you love by tapping the heart icon on any product.
            </p>
            <Link href="/shop"
              className="bg-[#111111] text-white px-10 py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-[#E84545] transition-colors rounded-sm flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" /> SHOP NOW
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {wishlistProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}>
                <ProductCard product={product} view="grid" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
