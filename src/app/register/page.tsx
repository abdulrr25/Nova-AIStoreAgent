"use client"
export const dynamic = 'force-dynamic'

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import { Eye, EyeOff, Loader2, Check, Star, Gift, Heart, Zap } from 'lucide-react';

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: 'At least 6 characters', pass: password.length >= 6 },
    { label: 'Contains a number',     pass: /\d/.test(password) },
    { label: 'Contains a letter',     pass: /[a-zA-Z]/.test(password) },
  ];
  if (!password) return null;
  const strength = checks.filter(c => c.pass).length;
  const colors = ['bg-[#E84545]', 'bg-yellow-400', 'bg-[#16A34A]'];
  const labels = ['Weak', 'Fair', 'Strong'];
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-2">
        {[0, 1, 2].map(i => (
          <div key={i} className={`h-1 flex-1 transition-colors rounded-full ${i < strength ? colors[strength - 1] : 'bg-[#E5E7EB]'}`} />
        ))}
      </div>
      <div className="space-y-1">
        {checks.map(c => (
          <div key={c.label} className={`flex items-center gap-1.5 text-xs transition-colors ${c.pass ? 'text-[#16A34A]' : 'text-[#9CA3AF]'}`}>
            <div className={`w-3.5 h-3.5 flex items-center justify-center flex-shrink-0 rounded-sm ${c.pass ? 'bg-[#16A34A]' : 'bg-[#E5E7EB]'}`}>
              {c.pass && <Check className="w-2 h-2 text-white" strokeWidth={3} />}
            </div>
            {c.label}
          </div>
        ))}
      </div>
    </div>
  );
}

const BENEFITS = [
  { icon: Star,  text: 'Exclusive member-only deals & flash sales' },
  { icon: Gift,  text: 'Welcome bonus worth ₹500 on first order' },
  { icon: Heart, text: 'Save unlimited wishlist items across devices' },
  { icon: Zap,   text: 'Early access to new arrivals & seasonal sales' },
];

function RegisterContent() {
  const { register, isAuthenticated, hydrated } = useShop();
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get('redirect') || '/';
  const redirect = rawRedirect.startsWith('/') && !rawRedirect.startsWith('//') ? rawRedirect : '/';

  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    if (hydrated && isAuthenticated) router.replace(redirect);
  }, [hydrated, isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    if (password.length < 6)  { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      await register(name.trim(), email, password);
      router.push(redirect);
    } catch (err: any) {
      const msg = String(err?.message || '');
      setError(msg.toLowerCase().includes('exist')
        ? 'An account with this email already exists.'
        : 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full px-4 py-3.5 border border-[#E5E7EB] bg-white text-sm text-[#111111] placeholder:text-[#9CA3AF] outline-none focus:border-[#E84545] focus:ring-2 focus:ring-[#E84545]/10 transition-all";

  return (
    <div className="min-h-screen flex">

      {/* ── LEFT PANEL: dark brand side ── */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden flex-col bg-[#0F0F0F]">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#E84545]/5 rounded-full -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#E84545]/5 rounded-full translate-y-1/2 translate-x-1/2" />
        <div className="absolute top-1/2 left-12 w-2 h-24 bg-[#E84545]/40" />

        <div className="relative z-10 flex flex-col h-full px-14 py-12">
          {/* Logo */}
          <Link href="/">
            <span className="text-3xl font-extrabold italic text-white tracking-tight">NOVA</span>
          </Link>

          {/* Main copy */}
          <div className="flex-1 flex flex-col justify-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-[#E84545] text-[10px] font-extrabold tracking-widest uppercase mb-4">Join Today</p>
              <h2 className="text-4xl font-extrabold text-white leading-tight mb-5 uppercase tracking-tight">
                Your Fashion<br />Journey<br />Starts Here.
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-xs">
                Create your free account and unlock access to thousands of premium products.
              </p>

              {/* Benefits */}
              <div className="space-y-4">
                {BENEFITS.map(({ icon: Icon, text }, i) => (
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

          {/* Bottom note */}
          <div className="border-t border-white/10 pt-6">
            <p className="text-white/30 text-xs uppercase tracking-widest">Free to join · No hidden fees · Cancel anytime</p>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL: form ── */}
      <div className="flex-1 flex flex-col bg-white overflow-y-auto">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center justify-between p-5 border-b border-[#E5E7EB]">
          <Link href="/">
            <span className="text-xl font-extrabold italic text-[#111111]">NOVA</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="w-full max-w-[400px]">

            <div className="mb-7">
              <h1 className="text-2xl font-extrabold text-[#111111] uppercase tracking-wide">Create Account</h1>
              <p className="text-[#6B7280] text-sm mt-1.5">
                Already have an account?{' '}
                <Link href={`/login${redirect !== '/' ? `?redirect=${redirect}` : ''}`}
                  className="text-[#E84545] font-bold hover:underline">
                  Sign in
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-[10px] font-extrabold text-[#111111] mb-1.5 uppercase tracking-widest">Full Name</label>
                <input type="text" required value={name} onChange={e => setName(e.target.value)}
                  placeholder="Your full name"
                  className={inputCls} />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[10px] font-extrabold text-[#111111] mb-1.5 uppercase tracking-widest">Email Address</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={inputCls} />
              </div>

              {/* Password */}
              <div>
                <label className="block text-[10px] font-extrabold text-[#111111] mb-1.5 uppercase tracking-widest">Password</label>
                <div className="relative">
                  <input type={showPw ? 'text' : 'password'} required value={password}
                    onChange={e => setPassword(e.target.value)} placeholder="Min. 6 characters"
                    className={`${inputCls} pr-11`} />
                  <button type="button" onClick={() => setShowPw(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#111111] transition-colors">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <PasswordStrength password={password} />
              </div>

              {/* Confirm */}
              <div>
                <label className="block text-[10px] font-extrabold text-[#111111] mb-1.5 uppercase tracking-widest">Confirm Password</label>
                <div className="relative">
                  <input type={showPw ? 'text' : 'password'} required value={confirm}
                    onChange={e => setConfirm(e.target.value)} placeholder="Repeat password"
                    className={`${inputCls} pr-11 ${confirm && confirm !== password ? 'border-red-300 focus:border-red-400' : ''}`} />
                  {confirm && confirm === password && (
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#16A34A] flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                  )}
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
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> CREATING ACCOUNT...</>
                  : 'CREATE ACCOUNT'}
              </button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-[#E5E7EB]" />
              <span className="text-xs text-[#9CA3AF] font-medium uppercase tracking-wider">have an account?</span>
              <div className="flex-1 h-px bg-[#E5E7EB]" />
            </div>

            <Link href={`/login${redirect !== '/' ? `?redirect=${redirect}` : ''}`}
              className="w-full flex items-center justify-center py-3.5 border-2 border-[#111111] text-[#111111] font-extrabold text-xs tracking-widest uppercase hover:bg-[#111111] hover:text-white transition-colors">
              SIGN IN INSTEAD
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <RegisterContent />
    </Suspense>
  );
}
