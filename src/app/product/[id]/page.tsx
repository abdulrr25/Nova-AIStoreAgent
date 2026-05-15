"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, ArrowLeft, Star, Truck, RotateCcw, Shield, Check, Loader2 } from 'lucide-react';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import { useShop } from '../../context/ShopContext';
import { formatPrice, getProductRating } from '../../data/products';

function getMRP(price: number, id: number, catId: number): number {
  const discountPcts = [20, 25, 30, 35, 40, 45, 50];
  const idx = (id * 7 + catId * 3) % discountPcts.length;
  const pct = discountPcts[idx];
  return Math.ceil((price / (1 - pct / 100)) / 100) * 100;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={`w-4 h-4 ${i <= Math.round(rating) ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-[#D1D5DB]'}`} />
      ))}
      <span className="text-[#6B7280] text-sm ml-1">({Math.floor(rating * 100 + 80)} reviews)</span>
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { products, addToCart, toggleWishlist, isInWishlist } = useShop();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const productId = parseInt(params.id as string);
  const product = products.find(p => p.id === productId);

  const sizes = product?.sizes ? product.sizes.split(',') : [];
  const colors = product?.colors ? product.colors.split(',') : [];
  const rating = product ? getProductRating(product.id) : 4.5;
  const mrp = product ? getMRP(product.price, product.id, product.category.id) : 0;
  const discountPct = product ? Math.round(((mrp - product.price) / mrp) * 100) : 0;
  const inStock = product ? product.stock > 0 : false;
  const wishlisted = product ? isInWishlist(product.id) : false;

  const relatedProducts = products.filter(p => p.category.id === product?.category.id && p.id !== productId).slice(0, 4);

  const handleAddToCart = () => {
    if (!product || !inStock) return;
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  if (products.length > 0 && !product) {
    return (
      <div className="min-h-screen bg-[#F5F5F0]">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <p className="text-2xl font-bold text-[#111111] mb-2">Product Not Found</p>
          <p className="text-[#6B7280] mb-6">This product doesn't exist or has been removed.</p>
          <Link href="/shop" className="bg-[#111111] text-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-[#E84545] transition-colors rounded-sm">
            BACK TO SHOP
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F5F0]">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-10 h-10 animate-spin text-[#E84545]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <Header />
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        {/* Back button */}
        <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#E84545] transition-colors mb-6 uppercase tracking-wide text-[10px] font-bold">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* ── LEFT: Image ── */}
          <div>
            <div className="relative overflow-hidden bg-white rounded-sm border border-[#E5E7EB] group" style={{ aspectRatio: '3/4' }}>
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                unoptimized
              />
              {!inStock && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                  <span className="text-sm font-bold text-[#6B7280] tracking-widest uppercase border border-[#E5E7EB] px-4 py-2">
                    OUT OF STOCK
                  </span>
                </div>
              )}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 p-2.5 bg-white shadow-md hover:shadow-lg transition-all rounded-sm">
                <Heart className={`w-5 h-5 transition-all ${wishlisted ? 'fill-[#E84545] text-[#E84545]' : 'text-[#6B7280]'}`} />
              </button>
            </div>
          </div>

          {/* ── RIGHT: Details ── */}
          <div className="py-2">
            {/* Category breadcrumb */}
            <p className="text-[#E84545] text-[10px] font-bold tracking-widest uppercase mb-2">
              {product.category.name}
            </p>

            {/* Name */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#111111] mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mb-4">
              <StarRating rating={rating} />
            </div>

            {/* Price row */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-extrabold text-[#111111]">{formatPrice(product.price)}</span>
              <span className="text-[#9CA3AF] line-through text-lg">{formatPrice(mrp)}</span>
              <span className="bg-[#E84545] text-white text-xs font-bold px-2 py-1 rounded-sm">{discountPct}% OFF</span>
            </div>

            {/* Stock status */}
            <div className="mb-5">
              {inStock ? (
                <span className="inline-flex items-center gap-1.5 text-[#16A34A] text-sm font-bold">
                  <Check className="w-4 h-4" />
                  {product.stock <= 5 ? `Only ${product.stock} left in stock!` : 'In Stock'}
                </span>
              ) : (
                <span className="text-[#E84545] text-sm font-bold">Out of Stock</span>
              )}
            </div>

            {/* Size selector */}
            {sizes.length > 0 && (
              <div className="mb-5">
                <p className="text-[10px] font-bold text-[#111111] uppercase tracking-widest mb-2">
                  Select Size
                  {selectedSize && <span className="ml-2 text-[#6B7280] font-normal normal-case">{selectedSize}</span>}
                </p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-xs font-bold tracking-wider border transition-all rounded-sm ${
                        selectedSize === size
                          ? 'bg-[#E84545] text-white border-[#E84545]'
                          : 'border-[#D1D5DB] text-[#111111] hover:border-[#E84545] hover:text-[#E84545]'
                      }`}>
                      {size.trim()}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color selector */}
            {colors.length > 0 && (
              <div className="mb-5">
                <p className="text-[10px] font-bold text-[#111111] uppercase tracking-widest mb-2">
                  Select Color
                  {selectedColor && <span className="ml-2 text-[#6B7280] font-normal normal-case">{selectedColor}</span>}
                </p>
                <div className="flex flex-wrap gap-2">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-xs font-medium border transition-all rounded-sm ${
                        selectedColor === color
                          ? 'bg-[#111111] text-white border-[#111111]'
                          : 'border-[#D1D5DB] text-[#111111] hover:border-[#111111]'
                      }`}>
                      {color.trim()}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity selector */}
            <div className="mb-6">
              <p className="text-[10px] font-bold text-[#111111] uppercase tracking-widest mb-2">Quantity</p>
              <div className="flex items-center gap-0 border border-[#E5E7EB] w-fit rounded-sm overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#111111] hover:bg-[#F3F4F6] font-bold text-lg transition-colors">
                  −
                </button>
                <span className="w-12 h-10 flex items-center justify-center text-sm font-bold text-[#111111] border-x border-[#E5E7EB]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-[#111111] hover:bg-[#F3F4F6] font-bold text-lg transition-colors">
                  +
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`w-full py-4 text-xs font-extrabold tracking-widest uppercase flex items-center justify-center gap-2 transition-all rounded-sm ${
                  !inStock
                    ? 'bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed'
                    : addedToCart
                    ? 'bg-[#16A34A] text-white'
                    : 'bg-[#111111] text-white hover:bg-[#E84545]'
                }`}>
                {addedToCart
                  ? <><Check className="w-4 h-4" /> ADDED TO BAG</>
                  : <><ShoppingBag className="w-4 h-4" /> ADD TO BAG</>}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-full py-4 text-xs font-extrabold tracking-widest uppercase flex items-center justify-center gap-2 transition-all border-2 rounded-sm ${
                  wishlisted
                    ? 'border-[#E84545] bg-[#FFF0F0] text-[#E84545]'
                    : 'border-[#E84545] text-[#E84545] hover:bg-[#FFF0F0]'
                }`}>
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#E84545]' : ''}`} />
                {wishlisted ? 'WISHLISTED' : 'ADD TO WISHLIST'}
              </button>
            </div>

            {/* Description */}
            <div className="mb-8 pb-8 border-b border-[#E5E7EB]">
              <p className="text-[10px] font-bold text-[#111111] uppercase tracking-widest mb-2">Description</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Truck,     label: 'Free Delivery', sub: 'On orders above ₹999' },
                { icon: RotateCcw, label: 'Easy Returns',  sub: '30-day return policy' },
                { icon: Shield,    label: 'Authentic',     sub: '100% genuine products' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#F3F4F6] flex items-center justify-center rounded-sm flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#111111]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#111111] uppercase tracking-wide">{label}</p>
                    <p className="text-[#6B7280] text-[10px]">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── YOU MAY ALSO LIKE ── */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="mb-6">
              <p className="text-[#E84545] text-[10px] font-bold tracking-widest uppercase mb-1">Similar Items</p>
              <h2 className="text-xl font-extrabold text-[#111111] uppercase tracking-wide">You May Also Like</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedProducts.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <ProductCard product={p} view="grid" />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
