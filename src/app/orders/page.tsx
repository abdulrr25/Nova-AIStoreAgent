"use client"
export const dynamic = 'force-dynamic'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import { ordersApi, ApiOrder } from '../lib/api';
import { formatPrice } from '../data/products';
import Header from '../components/Header';
import { Package, ChevronRight, Loader2, ShoppingBag, CheckCircle, Truck, Box, XCircle, Clock } from 'lucide-react';

const STATUS_CONFIG = {
  PLACED:    { label: 'Order Placed', icon: Clock,        color: 'text-blue-600',   bg: 'bg-blue-50',   border: 'border-blue-200'   },
  PACKED:    { label: 'Packed',       icon: Box,          color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  SHIPPED:   { label: 'Shipped',      icon: Truck,        color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
  DELIVERED: { label: 'Delivered',    icon: CheckCircle,  color: 'text-[#16A34A]',  bg: 'bg-green-50',  border: 'border-green-200'  },
  CANCELLED: { label: 'Cancelled',    icon: XCircle,      color: 'text-[#9C2B2B]',  bg: 'bg-red-50',    border: 'border-red-200'    },
};

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  UPI: 'UPI', CARD: 'Card', NET_BANKING: 'Net Banking', COD: 'COD', WALLET: 'Wallet',
};

export default function OrdersPage() {
  const { isAuthenticated, hydrated } = useShop();
  const router = useRouter();
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = () => {
    setLoading(true);
    setError('');
    ordersApi.getAll()
      .then(setOrders)
      .catch(() => setError('Failed to load orders. Please try again.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated) { router.replace('/login?redirect=/orders'); return; }
    fetchOrders();
  }, [hydrated, isAuthenticated]);

  if (!hydrated || loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F0]">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-10 h-10 animate-spin text-[#9C2B2B]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-8">
          <p className="text-[#9C2B2B] text-[10px] font-bold tracking-wide uppercase mb-1">Account</p>
          <h1 className="text-2xl font-semibold text-[#14110F] uppercase tracking-wide flex items-center gap-3">
            My Orders
          </h1>
        </div>

        {error ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-red-200 p-14 text-center rounded-xl shadow-sm">
            <XCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-[#14110F] uppercase tracking-wide mb-2">Something went wrong</h2>
            <p className="text-[#6B7280] text-sm mb-6">{error}</p>
            <button onClick={fetchOrders}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#14110F] text-white font-bold text-xs tracking-wide uppercase hover:bg-[#9C2B2B] transition-colors rounded-xl">
              TRY AGAIN
            </button>
          </motion.div>
        ) : orders.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#E5E7EB] p-14 text-center rounded-xl shadow-sm">
            <ShoppingBag className="w-16 h-16 text-[#E5E7EB] mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-[#14110F] uppercase tracking-wide mb-2">No orders yet</h2>
            <p className="text-[#6B7280] text-sm mb-6">You haven't placed any orders yet. Start shopping!</p>
            <Link href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#14110F] text-white font-bold text-xs tracking-wide uppercase hover:bg-[#9C2B2B] transition-colors rounded-xl">
              <Package className="w-4 h-4" /> START SHOPPING
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {orders.map((order, i) => {
              const cfg = STATUS_CONFIG[order.status];
              const Icon = cfg.icon;
              const orderLabel = (order as any).orderCode || `#${order.id}`;
              const methodLabel = PAYMENT_METHOD_LABELS[(order as any).paymentMethod] || (order as any).paymentMethod || '';
              return (
                <motion.div key={order.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link href={`/orders/${order.id}`}>
                    <div className="bg-white border border-[#E5E7EB] p-5 hover:shadow-md transition-all cursor-pointer group rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-[#14110F] text-sm uppercase tracking-wide">Order {orderLabel}</p>
                          <p className="text-[10px] text-[#6B7280] mt-0.5 tracking-wide">
                            {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          {methodLabel && (
                            <span className="text-[9px] font-bold text-[#6B7280] bg-[#F3F4F6] px-2 py-1 rounded-xl uppercase tracking-wider">
                              {methodLabel}
                            </span>
                          )}
                          <div className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-xl ${cfg.bg} ${cfg.border}`}>
                            <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                            <span className={`text-[10px] font-bold ${cfg.color} uppercase tracking-wider`}>{cfg.label}</span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-[#D1D5DB] group-hover:text-[#9C2B2B] transition-colors" />
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-[#F3F4F6] flex justify-between items-center">
                        <p className="text-xs text-[#6B7280]">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                        <p className="font-semibold text-[#14110F]">{formatPrice(order.totalAmount)}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
