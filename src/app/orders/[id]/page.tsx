"use client"
export const dynamic = 'force-dynamic'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useShop } from '../../context/ShopContext';
import { ordersApi, ApiOrder } from '../../lib/api';
import { formatPrice } from '../../data/products';
import Header from '../../components/Header';
import { ArrowLeft, Package, CheckCircle, Truck, Box, Clock, MapPin, CreditCard, Loader2, XCircle, Wallet } from 'lucide-react';

const TRACKING_STEPS = [
  { status: 'PLACED',    label: 'Order Placed',       icon: Clock,       desc: 'Your order has been received and confirmed' },
  { status: 'PACKED',    label: 'Packed',              icon: Box,         desc: 'Items are packed and ready for dispatch' },
  { status: 'SHIPPED',   label: 'Out for Delivery',   icon: Truck,       desc: 'Your order is on its way to you' },
  { status: 'DELIVERED', label: 'Delivered',           icon: CheckCircle, desc: 'Package delivered successfully' },
];
const STATUS_ORDER = ['PLACED', 'PACKED', 'SHIPPED', 'DELIVERED'];

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  UPI: 'UPI Payment', CARD: 'Credit/Debit Card', NET_BANKING: 'Net Banking', COD: 'Cash on Delivery', WALLET: 'Digital Wallet',
};

export default function OrderDetailPage() {
  const { isAuthenticated, hydrated } = useShop();
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<ApiOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated) { router.replace('/login?redirect=/orders'); return; }
    ordersApi.getById(Number(params.id))
      .then(setOrder)
      .catch(() => router.replace('/orders'))
      .finally(() => setLoading(false));
  }, [hydrated, isAuthenticated, params.id]);

  if (!hydrated || loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F0]">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-10 h-10 animate-spin text-[#E84545]" />
        </div>
      </div>
    );
  }

  if (!order) return null;

  const isCancelled = order.status === 'CANCELLED';
  const currentStep = isCancelled ? -1 : STATUS_ORDER.indexOf(order.status);
  const orderLabel = (order as any).orderCode || `#${order.id}`;
  const paymentMethod = (order as any).paymentMethod || '';
  const paymentDetails = (order as any).paymentDetails || '';

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link href="/orders"
          className="inline-flex items-center gap-2 text-[10px] text-[#6B7280] hover:text-[#E84545] transition-colors mb-7 uppercase tracking-widest font-bold">
          <ArrowLeft className="w-4 h-4" /> Back to Orders
        </Link>

        <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
          <div>
            <p className="text-[#E84545] text-[10px] font-bold tracking-widest uppercase mb-1">Order Details</p>
            <h1 className="text-xl font-extrabold text-[#111111] uppercase tracking-wide">Order {orderLabel}</h1>
            <p className="text-xs text-[#6B7280] mt-1 tracking-wide">
              {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <span className={`px-3 py-1.5 text-xs font-bold rounded-sm border ${
            order.paymentStatus === 'PAID'
              ? 'bg-green-50 border-green-200 text-[#16A34A]'
              : 'bg-yellow-50 border-yellow-200 text-yellow-700'
          }`}>
            {order.paymentStatus === 'PAID' ? '✓ Payment Confirmed' : 'Payment Pending'}
          </span>
        </div>

        {/* Tracking */}
        {!isCancelled ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#E5E7EB] p-6 mb-4 rounded-sm shadow-sm">
            <h2 className="font-extrabold text-[#111111] text-xs tracking-widest uppercase mb-6 flex items-center gap-2">
              <Package className="w-4 h-4 text-[#E84545]" /> Shipment Tracking
            </h2>
            <div className="relative pl-4">
              <div className="absolute left-8 top-5 bottom-5 w-0.5 bg-[#F3F4F6]" />
              <div className="space-y-6">
                {TRACKING_STEPS.map((trackStep, i) => {
                  const done   = i <= currentStep;
                  const active = i === currentStep;
                  const Icon   = trackStep.icon;
                  return (
                    <div key={trackStep.status} className="flex items-start gap-4 relative">
                      <div className={`w-9 h-9 flex items-center justify-center flex-shrink-0 z-10 border-2 transition-all duration-300 rounded-sm ${
                        done
                          ? active
                            ? 'bg-[#E84545] border-[#E84545] text-white'
                            : 'bg-[#111111] border-[#111111] text-white'
                          : 'bg-white border-[#E5E7EB] text-[#D1D5DB]'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className={`pt-1.5 transition-opacity ${done ? 'opacity-100' : 'opacity-30'}`}>
                        <p className={`font-extrabold text-xs uppercase tracking-wide ${active ? 'text-[#E84545]' : 'text-[#111111]'}`}>
                          {trackStep.label}
                          {active && <span className="ml-2 text-[9px] bg-[#E84545] text-white px-2 py-0.5 font-bold normal-case tracking-normal">Current</span>}
                        </p>
                        <p className="text-[10px] text-[#6B7280] mt-0.5">{trackStep.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="bg-red-50 border border-red-200 p-5 mb-4 flex items-center gap-3 rounded-sm">
            <XCircle className="w-6 h-6 text-[#E84545]" />
            <div>
              <p className="font-extrabold text-[#E84545] text-sm uppercase tracking-wide">Order Cancelled</p>
              <p className="text-xs text-red-400 mt-0.5">This order has been cancelled. Refund will be processed in 5-7 days.</p>
            </div>
          </div>
        )}

        {/* Address */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white border border-[#E5E7EB] p-5 mb-4 rounded-sm shadow-sm">
          <h2 className="font-extrabold text-[#111111] text-xs tracking-widest uppercase mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#E84545]" /> Delivery Address
          </h2>
          <p className="text-sm text-[#6B7280] leading-relaxed">{order.shippingAddress}</p>
        </motion.div>

        {/* Items */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-white border border-[#E5E7EB] p-5 mb-4 rounded-sm shadow-sm">
          <h2 className="font-extrabold text-[#111111] text-xs tracking-widest uppercase mb-4">
            Items ({order.items.length})
          </h2>
          <div className="space-y-4">
            {order.items.map(item => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="relative w-14 h-16 flex-shrink-0 bg-[#F9FAFB] overflow-hidden rounded-sm border border-[#E5E7EB]">
                  <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover" unoptimized />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#E84545] text-[9px] font-bold uppercase tracking-widest">{item.product.category.name}</p>
                  <p className="font-medium text-sm text-[#111111] line-clamp-1 mt-0.5">{item.product.name}</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">Qty: {item.quantity} × {formatPrice(item.price)}</p>
                </div>
                <p className="font-extrabold text-sm text-[#111111] flex-shrink-0">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Payment */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white border border-[#E5E7EB] p-5 rounded-sm shadow-sm">
          <h2 className="font-extrabold text-[#111111] text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#E84545]" /> Payment Summary
          </h2>

          {(paymentMethod || paymentDetails) && (
            <div className="mb-4 p-3 bg-[#F9FAFB] border border-[#E5E7EB] flex items-center gap-3 rounded-sm">
              <Wallet className="w-4 h-4 text-[#6B7280]" />
              <div>
                <p className="text-xs font-bold text-[#111111]">{PAYMENT_METHOD_LABELS[paymentMethod] || paymentMethod}</p>
                {paymentDetails && <p className="text-[10px] text-[#6B7280] mt-0.5">{paymentDetails}</p>}
              </div>
            </div>
          )}

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-[#6B7280]">
              <span>Subtotal</span><span className="font-medium text-[#111111]">{formatPrice(order.totalAmount)}</span>
            </div>
            <div className="flex justify-between text-[#6B7280]">
              <span>Shipping</span><span className="text-[#16A34A] font-bold">FREE</span>
            </div>
            <div className="flex justify-between font-extrabold text-[#111111] border-t border-[#E5E7EB] pt-2 mt-1 text-base">
              <span>Total</span><span>{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
