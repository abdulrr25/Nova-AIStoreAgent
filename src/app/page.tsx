"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import { useShop } from './context/ShopContext';
import { Truck, RotateCcw, ShieldCheck, Headphones, ArrowRight, Zap } from 'lucide-react';

const CATEGORY_IMAGES: Record<string, string> = {
  'Electronics':    'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=600&fit=crop&crop=entropy&auto=format&q=80',
  'Clothing':       'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=600&fit=crop&crop=entropy&auto=format&q=80',
  'Books':          'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=600&fit=crop&crop=entropy&auto=format&q=80',
  'Home & Kitchen': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop&crop=entropy&auto=format&q=80',
  'Sports':         'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=600&fit=crop&crop=entropy&auto=format&q=80',
};

const FEATURES = [
  { icon: Truck,       title: 'FREE DELIVERY',    desc: 'On orders above ₹999' },
  { icon: RotateCcw,   title: 'EASY RETURNS',     desc: '30-day hassle-free returns' },
  { icon: ShieldCheck, title: 'SECURE PAYMENT',   desc: '100% safe & encrypted' },
  { icon: Headphones,  title: '24/7 SUPPORT',     desc: 'Always here to help' },
];

function HomeContent() {
  const { categories, products, loadingProducts, setFilters } = useShop();
  const newArrivals = products.slice(0, 8);
  const trending = products.slice(8, 16);

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <Header />

      {/* ── ANNOUNCEMENT BAR ── */}
      <div className="bg-[#111111] py-2 px-4">
        <p className="text-center text-white text-[11px] font-medium tracking-widest uppercase">
          Free delivery on orders above ₹999 &nbsp;|&nbsp; Easy 30-day returns &nbsp;|&nbsp; Use code <span className="text-[#E84545] font-bold">NOVA10</span> for 10% off
        </p>
      </div>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#0F0F0F]" style={{ minHeight: 560 }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1800&fit=crop')",
            opacity: 0.35,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F] via-[#0F0F0F]/80 to-transparent" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-28 flex flex-col items-start gap-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block border border-[#E84545] text-[#E84545] text-[10px] font-bold tracking-widest px-4 py-1.5 mb-5 uppercase">
              New Season 2025
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-none mb-4 tracking-tight uppercase">
              SHOP THE<br />
              <span className="text-[#E84545]">LATEST</span>
            </h1>
            <p className="text-[#9CA3AF] text-lg mb-8 font-medium max-w-md">
              Discover premium fashion from the world's best brands. Curated just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/shop"
                className="inline-flex items-center justify-center gap-2 bg-[#E84545] text-white px-10 py-4 font-bold text-xs tracking-widest uppercase hover:bg-[#CC2B2B] transition-colors rounded-sm">
                SHOP NOW <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/shop"
                className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-10 py-4 font-bold text-xs tracking-widest uppercase hover:bg-white/10 transition-colors rounded-sm">
                VIEW COLLECTIONS
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORY TILES ── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[#E84545] text-[10px] font-bold tracking-widest uppercase mb-1">Explore</p>
              <h2 className="text-2xl font-extrabold text-[#111111] uppercase tracking-wide">Shop By Category</h2>
            </div>
            <Link href="/shop" className="text-[10px] text-[#6B7280] font-bold uppercase tracking-widest hover:text-[#E84545] transition-colors flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}>
                <Link
                  href="/shop"
                  onClick={() => setFilters(prev => ({ ...prev, categoryId: cat.id }))}
                  className="block group cursor-pointer">
                  <div className="relative overflow-hidden rounded-sm aspect-square mb-3">
                    <img
                      src={CATEGORY_IMAGES[cat.name] || 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=300&fit=crop'}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute inset-0 flex items-end p-3">
                      <p className="text-white text-xs font-extrabold tracking-widest uppercase">{cat.name}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ── */}
      <section className="py-14 px-4 bg-[#F5F5F0]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[#E84545] text-[10px] font-bold tracking-widest uppercase mb-1">Just In</p>
              <h2 className="text-2xl font-extrabold text-[#111111] uppercase tracking-wide">New Arrivals</h2>
            </div>
            <Link href="/shop" className="text-[10px] text-[#6B7280] font-bold uppercase tracking-widest hover:text-[#E84545] transition-colors flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {loadingProducts ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-[#E5E7EB] animate-pulse rounded-sm" style={{ aspectRatio: '3/4' }} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {newArrivals.map((product, i) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <ProductCard product={product} view="grid" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── DUAL PROMO BANNERS ── */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Banner 1 — dark */}
          <Link href="/shop">
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="relative overflow-hidden bg-[#111111] flex items-center justify-between px-8 py-10 group cursor-pointer rounded-sm"
              style={{ minHeight: 200 }}>
              <div className="relative z-10">
                <p className="text-[#E84545] text-[10px] font-bold tracking-widest uppercase mb-2">New Season</p>
                <h3 className="text-white text-3xl font-extrabold mb-4 uppercase">Trending<br />This Week</h3>
                <span className="inline-flex items-center gap-1.5 bg-[#E84545] text-white px-5 py-2 text-[10px] font-bold tracking-widest uppercase group-hover:bg-[#CC2B2B] transition-colors">
                  EXPLORE <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-44 overflow-hidden opacity-30 group-hover:opacity-50 transition-opacity">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&fit=crop"
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </motion.div>
          </Link>

          {/* Banner 2 — red */}
          <Link href="/shop">
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="relative overflow-hidden bg-[#E84545] flex items-center justify-between px-8 py-10 group cursor-pointer rounded-sm"
              style={{ minHeight: 200 }}>
              <div className="relative z-10">
                <p className="text-white/70 text-[10px] font-bold tracking-widest uppercase mb-2">Limited Time</p>
                <h3 className="text-white text-3xl font-extrabold mb-4 uppercase">Up to<br />70% OFF</h3>
                <span className="inline-flex items-center gap-1.5 bg-white text-[#E84545] px-5 py-2 text-[10px] font-bold tracking-widest uppercase group-hover:bg-[#F9FAFB] transition-colors">
                  GRAB NOW <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-44 overflow-hidden opacity-30 group-hover:opacity-50 transition-opacity">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&fit=crop"
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* ── TRENDING NOW ── */}
      {trending.length > 0 && (
        <section className="py-14 px-4 bg-[#F5F5F0]">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[#E84545] text-[10px] font-bold tracking-widest uppercase mb-1">Hot Right Now</p>
                <h2 className="text-2xl font-extrabold text-[#111111] uppercase tracking-wide flex items-center gap-2">
                  Trending Now <Zap className="w-5 h-5 text-[#F59E0B]" />
                </h2>
              </div>
              <Link href="/shop" className="text-[10px] text-[#6B7280] font-bold uppercase tracking-widest hover:text-[#E84545] transition-colors flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {trending.map((product, i) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <ProductCard product={product} view="grid" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FEATURES STRIP ── */}
      <section className="py-10 px-4 bg-white border-t border-[#E5E7EB]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4">
              <div className="w-11 h-11 bg-[#111111] flex items-center justify-center flex-shrink-0 rounded-sm">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-extrabold text-[#111111] text-xs tracking-wider uppercase">{title}</p>
                <p className="text-[#6B7280] text-xs mt-0.5">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0F0F0F] text-[#6B7280]">
        <div className="max-w-[1400px] mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <span className="text-2xl font-extrabold italic text-white tracking-tight">NOVA</span>
              <p className="text-sm mt-3 leading-relaxed">
                Premium fashion destination. 1000+ brands. Delivered fast, returned easy.
              </p>
              <div className="flex gap-3 mt-5">
                {['App Store', 'Google Play'].map(s => (
                  <div key={s} className="border border-[#2A2A2A] px-3 py-1.5 text-xs hover:border-[#E84545] hover:text-[#E84545] cursor-pointer transition-colors">
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-extrabold text-[10px] tracking-widest uppercase mb-4">Quick Links</h4>
              <ul className="space-y-2.5 text-sm">
                {['New Arrivals', 'Men', 'Women', 'Kids', 'Sale', 'Gift Cards'].map(item => (
                  <li key={item}><Link href="/shop" className="hover:text-white transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-white font-extrabold text-[10px] tracking-widest uppercase mb-4">Customer Service</h4>
              <ul className="space-y-2.5 text-sm">
                {['Contact Us', 'FAQ', 'Track Order', 'Returns & Refunds', 'Shipping Policy', 'Size Guide'].map(item => (
                  <li key={item}><Link href="/" className="hover:text-white transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-extrabold text-[10px] tracking-widest uppercase mb-4">Contact</h4>
              <ul className="space-y-2.5 text-sm">
                <li>support@nova.in</li>
                <li>+91 98765 43210</li>
                <li className="pt-2">Mon–Sat: 9AM–9PM</li>
              </ul>
              <div className="mt-5">
                <h4 className="text-white font-extrabold text-[10px] tracking-widest uppercase mb-3">My Account</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
                  <li><Link href="/register" className="hover:text-white transition-colors">Register</Link></li>
                  <li><Link href="/orders" className="hover:text-white transition-colors">My Orders</Link></li>
                  <li><Link href="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-[#1A1A1A] mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs">&copy; 2025 NOVA Fashion Pvt. Ltd. All rights reserved.</p>
            <div className="flex gap-5 text-xs">
              <Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/" className="hover:text-white transition-colors">Terms of Use</Link>
              <Link href="/" className="hover:text-white transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return <HomeContent />;
}
