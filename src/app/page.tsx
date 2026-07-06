"use client"
export const dynamic = 'force-dynamic'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import { useShop } from './context/ShopContext';
import { Truck, RotateCcw, ShieldCheck, Headphones, ArrowRight, Sparkles } from 'lucide-react';

const CATEGORY_IMAGES: Record<string, string> = {
  'Electronics':    'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=600&fit=crop&crop=entropy&auto=format&q=80',
  'Clothing':       'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=600&fit=crop&crop=entropy&auto=format&q=80',
  'Books':          'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=600&fit=crop&crop=entropy&auto=format&q=80',
  'Home & Kitchen': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop&crop=entropy&auto=format&q=80',
  'Sports':         'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=600&fit=crop&crop=entropy&auto=format&q=80',
};

const FEATURES = [
  { icon: Truck,       title: 'Free delivery',   desc: 'On orders above ₹999' },
  { icon: RotateCcw,   title: 'Easy returns',    desc: '30-day hassle-free returns' },
  { icon: ShieldCheck, title: 'Secure payment',  desc: '100% safe & encrypted' },
  { icon: Headphones,  title: '24/7 support',    desc: 'Always here to help' },
];

function SectionHeading({ eyebrow, title, icon }: { eyebrow: string; title: string; icon?: React.ReactNode }) {
  return (
    <div>
      <p className="text-[#9C2B2B] text-[11px] font-medium tracking-[0.18em] uppercase mb-2">{eyebrow}</p>
      <h2 className="font-serif text-3xl md:text-4xl text-[#14110F] flex items-center gap-3">
        {title} {icon}
      </h2>
    </div>
  );
}

function ViewAllLink() {
  return (
    <Link href="/shop" className="text-[12px] text-[#6B7280] font-medium hover:text-[#9C2B2B] transition-colors flex items-center gap-1.5 group">
      View all <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

function HomeContent() {
  const { categories, products, loadingProducts, setFilters } = useShop();
  const newArrivals = products.slice(0, 8);
  const trending = products.slice(8, 16);

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <Header />

      {/* ── ANNOUNCEMENT BAR ── */}
      <div className="bg-[#14110F] py-2.5 px-4">
        <p className="text-center text-white/70 text-[11px] font-medium tracking-wide">
          Free delivery on orders above ₹999 &nbsp;·&nbsp; Easy 30-day returns &nbsp;·&nbsp; Use code <span className="text-white font-semibold">NOVA10</span> for 10% off
        </p>
      </div>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#0C0A09]" style={{ minHeight: 620 }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1800&fit=crop')",
            opacity: 0.4,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0A09] via-[#0C0A09]/85 to-[#0C0A09]/20" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 h-full flex flex-col items-start justify-center gap-7" style={{ minHeight: 620 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
            <span className="inline-block text-white/50 text-[11px] font-medium tracking-[0.2em] uppercase mb-6">
              New Season — 2026 Collection
            </span>
            <h1 className="font-serif text-6xl md:text-8xl text-white leading-[0.95] mb-6 tracking-tight">
              Shop the<br />
              <span className="italic text-[#C97B6E]">latest</span>
            </h1>
            <p className="text-white/50 text-lg mb-10 font-light max-w-md leading-relaxed">
              Discover premium fashion from the world's best brands, curated for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0C0A09] px-9 py-4 font-medium text-sm hover:bg-[#9C2B2B] hover:text-white transition-colors rounded-full">
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/shop"
                className="inline-flex items-center justify-center gap-2 border border-white/25 text-white px-9 py-4 font-medium text-sm hover:bg-white/10 transition-colors rounded-full">
                View Collections
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORY TILES ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <SectionHeading eyebrow="Explore" title="Shop by category" />
            <ViewAllLink />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
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
                  <div className="relative overflow-hidden rounded-2xl aspect-square mb-3">
                    <Image
                      src={CATEGORY_IMAGES[cat.name] || 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=600&fit=crop&crop=entropy&auto=format&q=80'}
                      alt={cat.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 group-hover:from-black/60 transition-colors" />
                  </div>
                  <p className="text-[#14110F] text-sm font-medium text-center">{cat.name}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ── */}
      <section className="py-20 px-6 bg-[#F5F5F0]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <SectionHeading eyebrow="Just in" title="New arrivals" />
            <ViewAllLink />
          </div>

          {loadingProducts ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-[#E5E7EB] animate-pulse rounded-2xl" style={{ aspectRatio: '3/4' }} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
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
      <section className="py-8 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Banner 1 — dark */}
          <Link href="/shop">
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="relative overflow-hidden bg-[#14110F] flex items-center justify-between px-9 py-12 group cursor-pointer rounded-2xl"
              style={{ minHeight: 220 }}>
              <div className="relative z-10">
                <p className="text-white/40 text-[11px] font-medium tracking-[0.15em] uppercase mb-3">New season</p>
                <h3 className="font-serif text-white text-4xl mb-6">Trending<br />this week</h3>
                <span className="inline-flex items-center gap-1.5 bg-white text-[#14110F] px-6 py-2.5 text-xs font-medium rounded-full group-hover:bg-[#9C2B2B] group-hover:text-white transition-colors">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-48 overflow-hidden opacity-40 group-hover:opacity-60 transition-opacity">
                <Image
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop&auto=format&q=80"
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                />
              </div>
            </motion.div>
          </Link>

          {/* Banner 2 — accent */}
          <Link href="/shop">
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="relative overflow-hidden bg-[#9C2B2B] flex items-center justify-between px-9 py-12 group cursor-pointer rounded-2xl"
              style={{ minHeight: 220 }}>
              <div className="relative z-10">
                <p className="text-white/60 text-[11px] font-medium tracking-[0.15em] uppercase mb-3">Limited time</p>
                <h3 className="font-serif text-white text-4xl mb-6">Up to<br />70% off</h3>
                <span className="inline-flex items-center gap-1.5 bg-white text-[#9C2B2B] px-6 py-2.5 text-xs font-medium rounded-full group-hover:bg-[#14110F] group-hover:text-white transition-colors">
                  Grab now <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-48 overflow-hidden opacity-30 group-hover:opacity-50 transition-opacity">
                <Image
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop&auto=format&q=80"
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                />
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* ── TRENDING NOW ── */}
      {trending.length > 0 && (
        <section className="py-20 px-6 bg-[#F5F5F0]">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-end justify-between mb-10">
              <SectionHeading eyebrow="Hot right now" title="Trending now" icon={<Sparkles className="w-6 h-6 text-[#F59E0B]" />} />
              <ViewAllLink />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
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
      <section className="py-12 px-6 bg-white border-t border-[#E5E7EB]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4">
              <div className="w-11 h-11 bg-[#F5F5F0] flex items-center justify-center flex-shrink-0 rounded-full">
                <Icon className="w-5 h-5 text-[#9C2B2B]" />
              </div>
              <div>
                <p className="font-medium text-[#14110F] text-sm">{title}</p>
                <p className="text-[#6B7280] text-xs mt-0.5">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0C0A09] text-white/40">
        <div className="max-w-[1400px] mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <span className="font-serif text-2xl italic text-white tracking-tight">Nova</span>
              <p className="text-sm mt-3 leading-relaxed">
                Premium fashion destination. 1000+ brands. Delivered fast, returned easy.
              </p>
              <div className="flex gap-3 mt-5">
                {['App Store', 'Google Play'].map(s => (
                  <div key={s} className="border border-white/10 rounded-full px-4 py-1.5 text-xs hover:border-[#9C2B2B] hover:text-white cursor-pointer transition-colors">
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-medium text-xs tracking-wide uppercase mb-4">Quick Links</h4>
              <ul className="space-y-2.5 text-sm">
                {['New Arrivals', 'Men', 'Women', 'Kids', 'Sale', 'Gift Cards'].map(item => (
                  <li key={item}><Link href="/shop" className="hover:text-white transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-white font-medium text-xs tracking-wide uppercase mb-4">Customer Service</h4>
              <ul className="space-y-2.5 text-sm">
                {['Contact Us', 'FAQ', 'Track Order', 'Returns & Refunds', 'Shipping Policy', 'Size Guide'].map(item => (
                  <li key={item}><Link href="/" className="hover:text-white transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-medium text-xs tracking-wide uppercase mb-4">Contact</h4>
              <ul className="space-y-2.5 text-sm">
                <li>support@nova.in</li>
                <li>+91 98765 43210</li>
                <li className="pt-2">Mon–Sat: 9AM–9PM</li>
              </ul>
              <div className="mt-5">
                <h4 className="text-white font-medium text-xs tracking-wide uppercase mb-3">My Account</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
                  <li><Link href="/register" className="hover:text-white transition-colors">Register</Link></li>
                  <li><Link href="/orders" className="hover:text-white transition-colors">My Orders</Link></li>
                  <li><Link href="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs">&copy; 2026 NOVA Fashion Pvt. Ltd. All rights reserved.</p>
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
