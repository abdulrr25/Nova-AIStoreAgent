"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, User, ShoppingBag, BarChart2, Package, Search, Zap } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK = [
  { label: 'Store Stats',        q: 'Give me an overview of the store stats' },
  { label: 'Pending Orders',     q: 'Show all orders with PLACED status' },
  { label: 'Delivered Orders',   q: 'Show all DELIVERED orders' },
  { label: 'Cancelled Orders',   q: 'Show all CANCELLED orders' },
  { label: 'Low Stock',          q: 'Which products are low in stock?' },
  { label: 'All Products',       q: 'List all products with their prices and stock' },
];

const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS || 'nova@admin';
const ADK_URL   = process.env.NEXT_PUBLIC_ADK_URL    || 'http://localhost:8001';

export default function AdminPage() {
  const [unlocked, setUnlocked]   = useState(false);
  const [passInput, setPassInput] = useState('');
  const [passError, setPassError] = useState(false);

  const [messages, setMessages]   = useState<Message[]>([{
    role: 'assistant',
    content: "👋 Hi! I'm your NOVA store AI assistant, powered by Google ADK + Llama 3.3.\n\nAsk me anything about your orders, customers, products, or revenue. Use the quick buttons below or type your own question.",
  }]);
  const [input, setInput]         = useState('');
  const [loading, setLoading]     = useState(false);
  const [sessionId]               = useState(() => `admin_${Date.now()}`);
  const bottomRef                 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passInput === ADMIN_PASS) {
      setUnlocked(true);
    } else {
      setPassError(true);
      setTimeout(() => setPassError(false), 1500);
    }
  };

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    setMessages(p => [...p, { role: 'user', content: text }]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(`${ADK_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, session_id: sessionId }),
      });
      const data = await res.json();
      setMessages(p => [...p, { role: 'assistant', content: data.reply || data.error || 'Something went wrong.' }]);
    } catch {
      setMessages(p => [...p, { role: 'assistant', content: '❌ Cannot reach the ADK server. Make sure it is running on port 8001.\n\nRun: `python server.py` inside the Google ADK folder.' }]);
    } finally {
      setLoading(false);
    }
  };

  /* ── Lock screen ── */
  if (!unlocked) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#E84545] flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-white uppercase tracking-widest">NOVA Admin</h1>
            <p className="text-white/40 text-xs mt-1 uppercase tracking-wider">Google ADK · Llama 3.3 · Live Store Data</p>
          </div>
          <form onSubmit={handleUnlock} className="space-y-4">
            <input
              type="password"
              value={passInput}
              onChange={e => setPassInput(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
              className={`w-full px-4 py-3.5 bg-[#1A1A1A] border text-white text-sm placeholder:text-white/30 outline-none transition-all ${passError ? 'border-[#E84545]' : 'border-[#2A2A2A] focus:border-[#E84545]'}`}
            />
            {passError && <p className="text-[#E84545] text-xs text-center">Incorrect password</p>}
            <button type="submit"
              className="w-full py-3.5 bg-[#E84545] text-white font-extrabold text-xs tracking-widest uppercase hover:bg-[#cc3333] transition-colors">
              ENTER
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ── Chat UI ── */
  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col">

      {/* Header */}
      <div className="bg-[#0F0F0F] px-6 py-4 flex items-center gap-3 shrink-0">
        <div className="w-9 h-9 bg-[#E84545] flex items-center justify-center shrink-0">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-white font-extrabold text-sm uppercase tracking-widest">NOVA Admin Assistant</h1>
          <p className="text-white/40 text-[10px] uppercase tracking-wider">Google ADK · Llama 3.3-70B · Live Data</p>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <a href="/" className="text-white/40 hover:text-white text-xs transition-colors flex items-center gap-1.5">
            <ShoppingBag className="w-3.5 h-3.5" /> Store
          </a>
        </div>
      </div>

      {/* Quick action bar */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 py-3 flex items-center gap-3 overflow-x-auto shrink-0">
        <Zap className="w-3.5 h-3.5 text-[#E84545] shrink-0" />
        <span className="text-[10px] text-[#9CA3AF] uppercase tracking-widest shrink-0">Quick:</span>
        {QUICK.map(({ label, q }) => (
          <button key={label} onClick={() => send(q)} disabled={loading}
            className="text-xs px-3 py-1.5 bg-[#F5F5F0] border border-[#E5E7EB] text-[#374151] hover:bg-[#E84545] hover:text-white hover:border-[#E84545] transition-colors whitespace-nowrap disabled:opacity-40">
            {label}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5 max-w-3xl mx-auto w-full">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 bg-[#E84545] flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            <div className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
              msg.role === 'user'
                ? 'bg-[#111111] text-white'
                : 'bg-white border border-[#E5E7EB] text-[#111111] shadow-sm'
            }`}>
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 bg-[#111111] flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-[#E84545] flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white border border-[#E5E7EB] px-4 py-3 shadow-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#E84545]" />
              <span className="text-sm text-[#9CA3AF]">Querying your store data...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-[#E5E7EB] px-4 py-4 shrink-0">
        <div className="max-w-3xl mx-auto flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send(input)}
              placeholder='Ask anything — "Orders by Abdul", "ORD-202505-000001 status", "Revenue today"...'
              className="w-full pl-10 pr-4 py-3 border border-[#E5E7EB] text-sm text-[#111111] placeholder:text-[#9CA3AF] outline-none focus:border-[#E84545] focus:ring-2 focus:ring-[#E84545]/10 transition-all"
            />
          </div>
          <button onClick={() => send(input)} disabled={loading || !input.trim()}
            className="px-5 py-3 bg-[#E84545] text-white hover:bg-[#cc3333] transition-colors disabled:opacity-40">
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-center text-[10px] text-[#9CA3AF] mt-2 uppercase tracking-widest">
          NOVA Admin · Google ADK + Llama 3.3 · Data fetched live on every query
        </p>
      </div>
    </div>
  );
}
