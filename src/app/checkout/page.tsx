"use client"
export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../data/products';
import { MapPin, CreditCard, CheckCircle, ArrowLeft, Loader2, ShieldCheck, Lock, Package } from 'lucide-react';
import Header from '../components/Header';

const STEPS = ['Address', 'Payment', 'Confirmed'];

const PAYMENT_METHODS = [
  { id: 'UPI',         label: 'UPI',               icon: '📱' },
  { id: 'CARD',        label: 'Credit/Debit Card',  icon: '💳' },
  { id: 'NET_BANKING', label: 'Net Banking',         icon: '🏦' },
  { id: 'COD',         label: 'Cash on Delivery',   icon: '💵' },
  { id: 'WALLET',      label: 'Wallet',              icon: '👛' },
];

const BANKS = ['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'PNB', 'Bank of Baroda', 'Union Bank', 'Canara Bank'];
const WALLETS = ['Paytm', 'PhonePe', 'Google Pay', 'Amazon Pay'];

function InputField({ label, value, onChange, placeholder, type = 'text', required = true }: any) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-[#111111] mb-1.5 uppercase tracking-widest">{label}</label>
      <input
        type={type} required={required} value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-[#E5E7EB] bg-white text-sm text-[#111111] placeholder:text-[#9CA3AF] outline-none focus:border-[#E84545] focus:ring-2 focus:ring-[#E84545]/10 transition-all rounded-sm"
      />
    </div>
  );
}

export default function CheckoutPage() {
  const { cart, cartTotal, isAuthenticated, hydrated, checkout } = useShop();
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [address, setAddress] = useState({ street: '', city: '', state: '', pincode: '', phone: '' });
  const [selectedMethod, setSelectedMethod] = useState('UPI');
  const [upiId, setUpiId] = useState('');
  const [card, setCard] = useState({ number: '4111 1111 1111 1111', expiry: '12/27', cvv: '123', name: 'Test User' });
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<{ id: number; orderCode?: string } | null>(null);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated) { router.replace('/login?redirect=/checkout'); return; }
    if (cart.length === 0 && step === 0) router.replace('/shop');
  }, [hydrated, isAuthenticated, cart.length]);

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0]">
        <Loader2 className="w-10 h-10 animate-spin text-[#E84545]" />
      </div>
    );
  }

  const fullAddress = `${address.street}, ${address.city}, ${address.state} - ${address.pincode}, Phone: ${address.phone}`;

  const getPaymentDetails = (): string => {
    switch (selectedMethod) {
      case 'UPI':         return upiId || 'user@upi';
      case 'CARD':        return `**** **** **** ${card.number.slice(-4)}`;
      case 'NET_BANKING': return selectedBank || 'Online Banking';
      case 'COD':         return 'Cash on Delivery';
      case 'WALLET':      return selectedWallet || 'Digital Wallet';
      default:            return '';
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setProcessing(true);
    try {
      await new Promise(r => setTimeout(r, 1800));
      const order = await checkout(fullAddress, selectedMethod, getPaymentDetails());
      setConfirmedOrder({ id: order.id, orderCode: (order as any).orderCode });
      setStep(2);
    } catch (err: any) {
      setError(err.message || 'Checkout failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const inputCls = "w-full px-4 py-3 border border-[#E5E7EB] bg-white text-sm text-[#111111] placeholder:text-[#9CA3AF] outline-none focus:border-[#E84545] focus:ring-2 focus:ring-[#E84545]/10 transition-all rounded-sm";

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Stepper */}
        {step < 2 && (
          <div className="flex items-center justify-center gap-3 mb-10">
            {STEPS.slice(0, 2).map((s, i) => (
              <React.Fragment key={s}>
                <div className={`flex items-center gap-2 text-sm font-medium transition-colors ${i <= step ? 'text-[#111111]' : 'text-[#9CA3AF]'}`}>
                  <div className={`w-8 h-8 flex items-center justify-center text-xs font-bold border-2 transition-all rounded-sm ${
                    i < step ? 'bg-[#111111] text-white border-[#111111]'
                    : i === step ? 'border-[#E84545] text-[#E84545]'
                    : 'border-[#D1D5DB] text-[#9CA3AF]'
                  }`}>
                    {i < step ? '✓' : i + 1}
                  </div>
                  <span className="hidden sm:block text-xs font-bold tracking-wider uppercase">{s}</span>
                </div>
                {i < 1 && <div className={`w-16 h-0.5 transition-colors ${i < step ? 'bg-[#111111]' : 'bg-[#E5E7EB]'}`} />}
              </React.Fragment>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">

              {/* ── Step 0: Address ── */}
              {step === 0 && (
                <motion.div key="addr" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="bg-white border border-[#E5E7EB] p-7 rounded-sm shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#111111] flex items-center justify-center rounded-sm">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-base font-extrabold text-[#111111] uppercase tracking-wide">Delivery Address</h2>
                      <p className="text-xs text-[#6B7280]">Where should we deliver your order?</p>
                    </div>
                  </div>
                  <form onSubmit={e => { e.preventDefault(); setStep(1); }} className="space-y-4">
                    <InputField label="Street / Flat No." value={address.street} onChange={(v: string) => setAddress(a => ({ ...a, street: v }))} placeholder="123 MG Road, Apt 4B" />
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="City" value={address.city} onChange={(v: string) => setAddress(a => ({ ...a, city: v }))} placeholder="Bangalore" />
                      <InputField label="State" value={address.state} onChange={(v: string) => setAddress(a => ({ ...a, state: v }))} placeholder="Karnataka" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="Pincode" value={address.pincode} onChange={(v: string) => setAddress(a => ({ ...a, pincode: v }))} placeholder="560001" />
                      <InputField label="Phone" value={address.phone} onChange={(v: string) => setAddress(a => ({ ...a, phone: v }))} placeholder="+91 98765 43210" />
                    </div>
                    <button type="submit"
                      className="w-full py-4 bg-[#111111] text-white text-xs font-extrabold tracking-widest uppercase hover:bg-[#E84545] transition-colors rounded-sm mt-2">
                      CONTINUE TO PAYMENT
                    </button>
                  </form>
                </motion.div>
              )}

              {/* ── Step 1: Payment ── */}
              {step === 1 && (
                <motion.div key="pay" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="bg-white border border-[#E5E7EB] p-7 rounded-sm shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#111111] flex items-center justify-center rounded-sm">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-base font-extrabold text-[#111111] uppercase tracking-wide">Payment</h2>
                      <p className="text-xs text-[#6B7280]">Choose your preferred payment method</p>
                    </div>
                  </div>

                  <div className="mb-5 p-3.5 bg-[#F9FAFB] border border-[#E5E7EB] flex items-start gap-2.5 rounded-sm">
                    <ShieldCheck className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-[#6B7280]"><span className="font-semibold text-[#111111]">Demo mode</span> — no real payments processed. Safe for testing.</p>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                    {PAYMENT_METHODS.map(method => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedMethod(method.id)}
                        className={`flex items-center gap-2 px-3 py-3 text-xs font-bold border-2 transition-all rounded-sm text-left ${
                          selectedMethod === method.id
                            ? 'border-[#E84545] bg-[#FFF0F0] text-[#E84545]'
                            : 'border-[#E5E7EB] text-[#111111] hover:border-[#D1D5DB]'
                        }`}>
                        <span className="text-base">{method.icon}</span>
                        <span className="tracking-wide">{method.label}</span>
                      </button>
                    ))}
                  </div>

                  {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-sm">
                      {error}
                    </motion.div>
                  )}

                  <form onSubmit={handlePayment} className="space-y-4">
                    {/* UPI */}
                    {selectedMethod === 'UPI' && (
                      <div>
                        <label className="block text-[10px] font-bold text-[#111111] mb-1.5 uppercase tracking-widest">Enter UPI ID</label>
                        <input
                          value={upiId}
                          onChange={e => setUpiId(e.target.value)}
                          placeholder="e.g. username@paytm"
                          className={inputCls}
                        />
                        <p className="text-[10px] text-[#6B7280] mt-1">Your UPI ID is linked to your bank account</p>
                      </div>
                    )}

                    {/* Card */}
                    {selectedMethod === 'CARD' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[10px] font-bold text-[#111111] mb-1.5 uppercase tracking-widest">Cardholder Name</label>
                          <input value={card.name} onChange={e => setCard(c => ({ ...c, name: e.target.value }))} className={inputCls} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-[#111111] mb-1.5 uppercase tracking-widest">Card Number</label>
                          <div className="relative">
                            <input value={card.number} onChange={e => setCard(c => ({ ...c, number: e.target.value }))}
                              className={`${inputCls} font-mono pr-10`} />
                            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-[#111111] mb-1.5 uppercase tracking-widest">Expiry</label>
                            <input value={card.expiry} onChange={e => setCard(c => ({ ...c, expiry: e.target.value }))} className={`${inputCls} font-mono`} placeholder="MM/YY" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-[#111111] mb-1.5 uppercase tracking-widest">CVV</label>
                            <input type="password" value={card.cvv} onChange={e => setCard(c => ({ ...c, cvv: e.target.value }))} className={`${inputCls} font-mono`} placeholder="•••" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Net Banking */}
                    {selectedMethod === 'NET_BANKING' && (
                      <div>
                        <label className="block text-[10px] font-bold text-[#111111] mb-1.5 uppercase tracking-widest">Select Bank</label>
                        <select
                          value={selectedBank}
                          onChange={e => setSelectedBank(e.target.value)}
                          className={inputCls}>
                          <option value="">-- Select your bank --</option>
                          {BANKS.map(bank => (
                            <option key={bank} value={bank}>{bank}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* COD */}
                    {selectedMethod === 'COD' && (
                      <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-sm">
                        <p className="text-sm text-[#111111] font-medium">
                          Pay <span className="font-extrabold">{formatPrice(cartTotal)}</span> on delivery.
                        </p>
                        <p className="text-xs text-[#6B7280] mt-1">No prepayment needed. Cash/card accepted on delivery.</p>
                      </div>
                    )}

                    {/* Wallet */}
                    {selectedMethod === 'WALLET' && (
                      <div>
                        <label className="block text-[10px] font-bold text-[#111111] mb-2 uppercase tracking-widest">Select Wallet</label>
                        <div className="grid grid-cols-2 gap-2">
                          {WALLETS.map(wallet => (
                            <button key={wallet} type="button" onClick={() => setSelectedWallet(wallet)}
                              className={`py-2.5 px-3 text-xs font-bold border-2 transition-all rounded-sm ${
                                selectedWallet === wallet
                                  ? 'border-[#E84545] bg-[#FFF0F0] text-[#E84545]'
                                  : 'border-[#E5E7EB] text-[#111111] hover:border-[#D1D5DB]'
                              }`}>
                              {wallet}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={() => setStep(0)}
                        className="flex items-center gap-2 px-5 py-3.5 border-2 border-[#E5E7EB] text-[#111111] hover:border-[#111111] transition-colors text-xs font-bold tracking-wide uppercase rounded-sm">
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                      <button type="submit" disabled={processing}
                        className="flex-1 py-3.5 bg-[#111111] text-white font-extrabold text-xs tracking-widest uppercase hover:bg-[#E84545] transition-colors disabled:opacity-60 flex items-center justify-center gap-2 rounded-sm">
                        {processing
                          ? <><Loader2 className="w-4 h-4 animate-spin" /> PROCESSING...</>
                          : `PAY ${formatPrice(cartTotal)}`}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* ── Step 2: Confirmed ── */}
              {step === 2 && (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-[#E5E7EB] p-12 text-center rounded-sm shadow-sm">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
                    className="w-20 h-20 bg-[#F0FDF4] border-2 border-[#16A34A] flex items-center justify-center mx-auto mb-6 rounded-sm">
                    <CheckCircle className="w-10 h-10 text-[#16A34A]" />
                  </motion.div>
                  <h2 className="text-2xl font-extrabold text-[#111111] uppercase tracking-wide mb-2">Order Placed!</h2>
                  <p className="text-[#6B7280] mb-1 text-sm">
                    Order{' '}
                    <span className="font-bold text-[#111111]">
                      {confirmedOrder?.orderCode ? confirmedOrder.orderCode : `#${confirmedOrder?.id}`}
                    </span>
                    {' '}confirmed.
                  </p>
                  <p className="text-[#9CA3AF] text-xs mb-2">Payment via <span className="font-semibold">{selectedMethod}</span></p>
                  <p className="text-[#9CA3AF] text-xs mb-8">You'll receive a confirmation email shortly.</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href={`/orders/${confirmedOrder?.id}`}
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#111111] text-white font-bold text-xs tracking-widest uppercase hover:bg-[#E84545] transition-colors rounded-sm">
                      <Package className="w-4 h-4" /> TRACK ORDER
                    </Link>
                    <Link href="/shop"
                      className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-[#E5E7EB] text-[#111111] font-bold text-xs tracking-widest uppercase hover:border-[#111111] transition-colors rounded-sm">
                      CONTINUE SHOPPING
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          {step < 2 && (
            <div>
              <div className="bg-white border border-[#E5E7EB] p-5 sticky top-28 rounded-sm shadow-sm">
                <h3 className="font-extrabold text-[#111111] text-xs tracking-widest uppercase mb-4 pb-3 border-b border-[#E5E7EB]">
                  Order Summary
                </h3>
                <div className="space-y-3 max-h-56 overflow-y-auto mb-4">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-14 flex-shrink-0 overflow-hidden bg-[#F9FAFB] rounded-sm">
                        <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover" unoptimized />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-[#111111] line-clamp-1">{item.product.name}</p>
                        <p className="text-[10px] text-[#6B7280]">Qty {item.quantity}</p>
                      </div>
                      <span className="text-xs font-bold flex-shrink-0 text-[#111111]">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#E5E7EB] pt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-[#6B7280]">
                    <span>Subtotal</span><span className="font-medium text-[#111111]">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#6B7280]">
                    <span>Shipping</span><span className="text-[#16A34A] font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-[#111111] text-base pt-2 border-t border-[#E5E7EB] mt-1">
                    <span>Total</span><span>{formatPrice(cartTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
