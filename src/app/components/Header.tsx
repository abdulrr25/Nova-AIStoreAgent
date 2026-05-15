"use client"
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, User, Menu, X, Package, LogOut, ChevronDown } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import Cart from './Cart';

export default function Header() {
  const { cartCount, wishlist, user, isAuthenticated, logout, categories, setFilters } = useShop();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    router.push('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0F0F0F] shadow-lg">
        {/* ── Row 1: Logo / Search / Icons ── */}
        <div className="max-w-[1400px] mx-auto px-4 flex items-center gap-4 h-16">
          {/* Mobile hamburger */}
          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-1">
            <Menu className="w-6 h-6 text-white" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-2xl font-extrabold italic text-white tracking-tight">NOVA</span>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4 hidden sm:flex">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands and more"
                className="w-full bg-[#1A1A1A] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-[#6B7280] outline-none focus:ring-2 focus:ring-[#E84545]/60 transition-all rounded-sm"
              />
            </div>
          </form>

          {/* Right icons */}
          <div className="flex items-center gap-6 ml-auto">
            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(v => !v)}
                className="flex flex-col items-center gap-0.5 group"
              >
                <User className="w-5 h-5 text-white group-hover:text-[#E84545] transition-colors" />
                <span className="text-[10px] font-semibold text-[#9CA3AF] group-hover:text-[#E84545] transition-colors hidden sm:block tracking-wider uppercase">
                  {isAuthenticated ? user?.name?.split(' ')[0] : 'Profile'}
                </span>
              </button>
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    className="absolute right-0 top-full mt-3 w-64 bg-white shadow-2xl border border-[#E5E7EB] z-50 rounded-sm"
                  >
                    {isAuthenticated ? (
                      <>
                        <div className="px-5 py-4 border-b border-[#E5E7EB] bg-[#F9FAFB]">
                          <p className="font-bold text-[#111111] text-sm">{user?.name}</p>
                          <p className="text-xs text-[#6B7280] mt-0.5 truncate">{user?.email}</p>
                        </div>
                        <Link href="/orders" onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-5 py-3 text-sm text-[#111111] hover:bg-[#F9FAFB] transition-colors">
                          <Package className="w-4 h-4 text-[#6B7280]" /> My Orders
                        </Link>
                        <Link href="/wishlist" onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-5 py-3 text-sm text-[#111111] hover:bg-[#F9FAFB] transition-colors border-t border-[#E5E7EB]">
                          <Heart className="w-4 h-4 text-[#6B7280]" /> My Wishlist
                        </Link>
                        <button onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-5 py-3 text-sm text-[#E84545] hover:bg-[#FFF0F0] transition-colors border-t border-[#E5E7EB]">
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="px-5 py-4">
                          <p className="font-bold text-[#111111] text-sm">Hello!</p>
                          <p className="text-xs text-[#6B7280] mt-1">Sign in for the best experience</p>
                          <div className="flex gap-2 mt-3">
                            <Link href="/login" onClick={() => setIsProfileOpen(false)}
                              className="flex-1 text-center py-2 border-2 border-[#111111] text-[#111111] text-xs font-bold hover:bg-[#F9FAFB] transition-colors tracking-wider uppercase">
                              LOGIN
                            </Link>
                            <Link href="/register" onClick={() => setIsProfileOpen(false)}
                              className="flex-1 text-center py-2 bg-[#111111] text-white text-xs font-bold hover:bg-[#E84545] transition-colors tracking-wider uppercase">
                              SIGN UP
                            </Link>
                          </div>
                        </div>
                        <div className="border-t border-[#E5E7EB]">
                          <Link href="/orders" onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 px-5 py-3 text-sm text-[#111111] hover:bg-[#F9FAFB] transition-colors">
                            <Package className="w-4 h-4 text-[#6B7280]" /> My Orders
                          </Link>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist */}
            <Link href="/wishlist" className="flex flex-col items-center gap-0.5 group relative hidden sm:flex">
              <div className="relative">
                <Heart className="w-5 h-5 text-white group-hover:text-[#E84545] transition-colors" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#E84545] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-semibold text-[#9CA3AF] group-hover:text-[#E84545] transition-colors tracking-wider uppercase">Wishlist</span>
            </Link>

            {/* Bag */}
            <button onClick={() => setIsCartOpen(true)} className="flex flex-col items-center gap-0.5 group relative">
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-white group-hover:text-[#E84545] transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#E84545] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-semibold text-[#9CA3AF] group-hover:text-[#E84545] transition-colors hidden sm:block tracking-wider uppercase">Bag</span>
            </button>
          </div>
        </div>

        {/* ── Row 2: Category nav ── */}
        <nav className="hidden lg:block border-t border-[#1A1A1A]">
          <div className="max-w-[1400px] mx-auto px-4 flex items-center gap-8">
            {categories.length > 0 ? (
              categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setFilters((prev: any) => ({ ...prev, categoryId: cat.id }));
                    router.push('/shop');
                  }}
                  className="py-3 text-xs font-bold text-[#9CA3AF] hover:text-white border-b-2 border-transparent hover:border-[#E84545] transition-all tracking-wider whitespace-nowrap"
                >
                  {cat.name.toUpperCase()}
                </button>
              ))
            ) : (
              ['MEN', 'WOMEN', 'KIDS', 'HOME & LIVING', 'BEAUTY', 'ACCESSORIES'].map(label => (
                <Link key={label} href="/shop"
                  className="py-3 text-xs font-bold text-[#9CA3AF] hover:text-white border-b-2 border-transparent hover:border-[#E84545] transition-all tracking-wider whitespace-nowrap">
                  {label}
                </Link>
              ))
            )}
          </div>
        </nav>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="sm:hidden px-4 pb-3 bg-[#0F0F0F]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-[#1A1A1A] pl-9 pr-4 py-2 text-sm text-white placeholder:text-[#6B7280] outline-none rounded-sm"
            />
          </div>
        </form>
      </header>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 lg:hidden" onClick={() => setIsMobileMenuOpen(false)}>
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="w-72 bg-[#0F0F0F] h-full flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b border-[#1A1A1A]">
                <span className="text-xl font-extrabold italic text-white">NOVA</span>
                <button onClick={() => setIsMobileMenuOpen(false)}><X className="w-5 h-5 text-white" /></button>
              </div>
              {isAuthenticated ? (
                <div className="p-4 bg-[#1A1A1A] border-b border-[#2A2A2A]">
                  <p className="font-bold text-white text-sm">{user?.name}</p>
                  <p className="text-xs text-[#6B7280]">{user?.email}</p>
                </div>
              ) : (
                <div className="p-4 flex gap-2 border-b border-[#1A1A1A]">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 py-2 text-center border border-white text-white text-xs font-bold tracking-wider uppercase hover:bg-white hover:text-[#0F0F0F] transition-colors">
                    LOGIN
                  </Link>
                  <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 py-2 text-center bg-[#E84545] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#CC2B2B] transition-colors">
                    SIGN UP
                  </Link>
                </div>
              )}
              <nav className="flex-1 overflow-y-auto">
                {categories.map(cat => (
                  <button key={cat.id}
                    onClick={() => {
                      setFilters((p: any) => ({ ...p, categoryId: cat.id }));
                      router.push('/shop');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-5 py-3.5 text-sm font-bold text-[#9CA3AF] hover:text-white border-b border-[#1A1A1A] hover:bg-[#1A1A1A] tracking-wider transition-colors">
                    {cat.name.toUpperCase()}
                  </button>
                ))}
                <Link href="/orders" onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-3.5 text-sm text-[#9CA3AF] hover:text-white border-b border-[#1A1A1A] hover:bg-[#1A1A1A] transition-colors">
                  <Package className="w-4 h-4" /> My Orders
                </Link>
                <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-3.5 text-sm text-[#9CA3AF] hover:text-white border-b border-[#1A1A1A] hover:bg-[#1A1A1A] transition-colors">
                  <Heart className="w-4 h-4" /> My Wishlist
                </Link>
              </nav>
              {isAuthenticated && (
                <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                  className="p-4 flex items-center gap-2 text-sm text-[#E84545] border-t border-[#1A1A1A] font-medium hover:bg-[#1A1A1A] transition-colors">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart drawer */}
      <AnimatePresence>
        {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
