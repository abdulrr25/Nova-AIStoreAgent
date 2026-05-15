"use client"
export const dynamic = 'force-dynamic'

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import { Eye, EyeOff, Loader2, Package, Truck, RotateCcw, ShieldCheck } from 'lucide-react';

const PERKS = [
  { icon: Package,     text: 'Track your orders in real-time' },
  { icon: Truck,       text: 'Free delivery on orders above ₹999' },
  { icon: RotateCcw,   text: '30-day hassle-free returns' },
  { icon: ShieldCheck, text: '100% authentic products guaranteed' },
];

function LoginContent() {
  const { login, isAuthenticated, hydrated } = useShop();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]   = useState(false);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hydrated && isAuthenticated) router.replace(redirect);
  }, [hydrated, isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.push(redirect);
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full px-4 py-3.5 border border-[#E5E7EB] bg-white text-sm text-[#111111] placeholder:text-[#9CA3AF] outline-none focus:border-[#E84545] focus:ring-2 focus:ring-[#E84545]/10 transition-all";

  return (
    <div className="min-h-screen flex">

      {/* ── LEFT PANEL: dark brand side ── */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden flex-col bg-[#0F0F0F]">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E84545]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E84545]/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-12 w-2 h-32 bg-[#E84545]/30" />
        <div className="absolute top-1/3 left-14 w-1 h-20 bg-white/10" />

        <div className="relative z-10 flex flex-col h-full px-14 py-12">
          {/* Logo */}
          <Link href="/">
            <span className="text-3xl font-extrabold italic text-white tracking-tight">NOVA</span>
          </Link>

          {/* Main copy */}
          <div className="flex-1 flex flex-col justify-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-[#E84545] text-[10px] font-extrabold tracking-widest uppercase mb-4">Welcome Back</p>
              <h2 className="text-4xl font-extrabold text-white leading-tight mb-5 uppercase tracking-tight">
                Premium<br />Fashion.<br />Your Way.
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-xs">
                Sign in to access exclusive deals, track your orders, and manage your wishlist.
              </p>

              {/* Perks */}
              <div className="space-y-4">
                {PERKS.map(({ icon: Icon, text }, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-[#E84545]" />
                    </div>
                    <span className="text-white/70 text-sm">{text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats row */}
          <div className="flex gap-8 border-t border-white/10 pt-8">
            {[['5M+', 'Happy Customers'], ['1000+', 'Brands'], ['Free', 'Shipping']].map(([val, lbl]) => (
              <div key={lbl}>
                <p className="text-xl font-extrabold text-white">{val}</p>
                <p className="text-white/40 text-xs mt-0.5 uppercase tracking-wider">{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL: form ── */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center justify-between p-5 border-b border-[#E5E7EB]">
          <Link href="/">
            <span className="text-xl font-extrabold italic text-[#111111]">NOVA</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="w-full max-w-[400px]">

            <div className="mb-8">
              <h1 className="text-2xl font-extrabold text-[#111111] uppercase tracking-wide">Sign In</h1>
              <p className="text-[#6B7280] text-sm mt-1.5">
                New to NOVA?{' '}
                <Link href={`/register${redirect !== '/' ? `?redirect=${redirect}` : ''}`}
                  className="text-[#E84545] font-bold hover:underline">
                  Create an account
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-[10px] font-extrabold text-[#111111] mb-1.5 uppercase tracking-widest">
                  Email Address
                </label>
                <input
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={inputCls}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-[10px] font-extrabold text-[#111111] mb-1.5 uppercase tracking-widest">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'} required value={password}
                    onChange={e => setPassword(e.target.value)} placeholder="Enter your password"
                    className={`${inputCls} pr-11`}
                  />
                  <button type="button" onClick={() => setShowPw(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#111111] transition-colors">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm">
                  {error}
                </motion.div>
              )}

              {/* Terms */}
              <p className="text-[#9CA3AF] text-xs leading-relaxed">
                By continuing, I agree to the{' '}
                <span className="text-[#E84545] cursor-pointer hover:underline">Terms of Use</span>
                {' & '}
                <span className="text-[#E84545] cursor-pointer hover:underline">Privacy Policy</span>
              </p>

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="w-full py-4 bg-[#111111] text-white font-extrabold text-xs tracking-widest uppercase hover:bg-[#E84545] transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                {loading
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> SIGNING IN...</>
                  : 'SIGN IN'}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-[#E5E7EB]" />
              <span className="text-xs text-[#9CA3AF] font-medium uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-[#E5E7EB]" />
            </div>

            <Link href={`/register${redirect !== '/' ? `?redirect=${redirect}` : ''}`}
              className="w-full flex items-center justify-center py-3.5 border-2 border-[#111111] text-[#111111] font-extrabold text-xs tracking-widest uppercase hover:bg-[#111111] hover:text-white transition-colors">
              CREATE NEW ACCOUNT
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <LoginContent />
    </Suspense>
  );
}
