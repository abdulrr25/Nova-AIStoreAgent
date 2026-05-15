"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../data/products';

export default function Cart({ onClose }: { onClose: () => void }) {
  const { cart, removeFromCart, updateQuantity, cartTotal, isAuthenticated } = useShop();
  const router = useRouter();

  const handleCheckout = () => {
    onClose();
    router.push(isAuthenticated ? '/checkout' : '/login?redirect=/checkout');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex justify-end" onClick={onClose}>
      <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.25 }}
        className="w-full max-w-[420px] bg-white h-full flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>

        {/* Header — dark strip */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#0F0F0F]">
          <div>
            <h2 className="font-extrabold text-white text-base uppercase tracking-widest">BAG</h2>
            {cart.length > 0 && <p className="text-[#6B7280] text-xs mt-0.5">{cart.length} item{cart.length > 1 ? 's' : ''}</p>}
          </div>
          <button onClick={onClose} className="p-1 text-[#9CA3AF] hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto bg-white">
          <AnimatePresence>
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center px-8">
                <ShoppingBag className="w-16 h-16 text-[#E5E7EB] mb-4" />
                <p className="font-extrabold text-[#111111] text-base mb-2">Your bag is empty</p>
                <p className="text-[#6B7280] text-sm mb-6">Looks like you haven't added anything to your bag yet.</p>
                <button onClick={onClose}
                  className="bg-[#111111] text-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-[#E84545] transition-colors">
                  SHOP NOW
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#F3F4F6]">
                {cart.map(item => (
                  <motion.div key={item.product.id} exit={{ opacity: 0, height: 0 }} className="px-5 py-4 flex gap-4">
                    <div className="relative w-20 h-28 flex-shrink-0 overflow-hidden bg-[#F9FAFB] rounded-sm">
                      <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover" unoptimized />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0 pr-2">
                          <p className="font-bold text-[#E84545] text-[10px] uppercase tracking-widest">{item.product.category.name}</p>
                          <p className="text-[#111111] text-xs font-medium mt-0.5 line-clamp-2">{item.product.name}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-[#D1D5DB] hover:text-[#E84545] transition-colors flex-shrink-0">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="font-bold text-[#111111] text-sm mt-2">{formatPrice(item.product.price * item.quantity)}</p>

                      {/* Qty selector */}
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-[10px] text-[#6B7280] uppercase tracking-wider font-medium">Qty:</span>
                        <div className="flex items-center border border-[#E5E7EB]">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#111111] hover:bg-[#F3F4F6] text-sm font-bold transition-colors">
                            −
                          </button>
                          <span className="w-8 h-7 flex items-center justify-center text-xs font-bold text-[#111111] border-x border-[#E5E7EB]">
                            {item.quantity}
                          </span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#111111] hover:bg-[#F3F4F6] text-sm font-bold transition-colors">
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-[#E5E7EB] bg-white">
            {/* Promo */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-[#E5E7EB] bg-[#F9FAFB] cursor-pointer hover:bg-[#F3F4F6] transition-colors">
              <Tag className="w-4 h-4 text-[#16A34A]" />
              <span className="text-xs text-[#111111] font-medium">Apply Promo Code</span>
              <ArrowRight className="w-4 h-4 text-[#6B7280] ml-auto" />
            </div>

            {/* Price summary */}
            <div className="px-5 py-4 space-y-2">
              <div className="flex justify-between text-sm text-[#6B7280]">
                <span>Subtotal ({cart.length} item{cart.length > 1 ? 's' : ''})</span>
                <span className="font-bold text-[#111111]">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-[#6B7280]">
                <span>Shipping</span>
                <span className="text-[#16A34A] font-bold">FREE</span>
              </div>
              <div className="flex justify-between font-extrabold text-base text-[#111111] pt-2 border-t border-[#E5E7EB] mt-2">
                <span>Total Amount</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <div className="px-5 pb-5">
              <button onClick={handleCheckout}
                className="w-full bg-[#111111] text-white py-4 font-extrabold text-xs uppercase tracking-widest hover:bg-[#E84545] transition-colors">
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
