"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, formatPrice, getProductRating } from '../data/products';

/** Ensures every Unsplash URL is portrait-cropped and high quality */
function optimizeImage(url: string): string {
  if (!url) return url;
  const base = url.split('?')[0];
  if (base.includes('unsplash.com')) {
    return `${base}?w=600&h=800&fit=crop&crop=entropy&auto=format&q=80`;
  }
  return url;
}

function getMRP(product: Product): number {
  const discounts = [20, 25, 30, 35, 40, 45, 50];
  const idx = (product.id * 7 + product.category.id * 3) % discounts.length;
  return Math.ceil((product.price / (1 - discounts[idx] / 100)) / 100) * 100;
}

function StarRating({ rating, tiny = false }: { rating: number; tiny?: boolean }) {
  const size = tiny ? 'w-2.5 h-2.5' : 'w-3 h-3';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          className={`${size} ${i <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`}
        />
      ))}
      <span className="text-gray-400 text-[10px] ml-1">({Math.floor(rating * 100 + 80)})</span>
    </div>
  );
}

export default function ProductCard({
  product,
  view = 'grid',
}: {
  product: Product;
  view?: 'grid' | 'list';
}) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [addedToCart, setAddedToCart] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const rating = getProductRating(product.id);
  const inStock = product.stock > 0;
  const mrp = getMRP(product);
  const discountPct = Math.round(((mrp - product.price) / mrp) * 100);
  const wishlisted = isInWishlist(product.id);
  const imgSrc = optimizeImage(product.imageUrl);

  const handleAddToCart = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!inStock) return;
    addToCart(product, 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  /* ── LIST VIEW ─────────────────────────────────────────── */
  if (view === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white flex gap-4 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
      >
        <Link
          href={`/product/${product.id}`}
          className="relative w-36 h-44 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100"
        >
          {!imgLoaded && !imgError && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />}
          {!imgError ? (
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              className={`object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              unoptimized
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              sizes="144px"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-lg">
              <ShoppingBag className="w-8 h-8 text-gray-300" />
            </div>
          )}
          {!inStock && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
              <span className="text-[9px] font-bold text-gray-500 tracking-wider uppercase">Out of Stock</span>
            </div>
          )}
        </Link>

        <div className="flex-1 min-w-0 py-1">
          <p className="font-semibold text-[#9C2B2B] text-[9px] uppercase tracking-wide">{product.category.name}</p>
          <Link href={`/product/${product.id}`}>
            <p className="text-gray-900 font-semibold text-sm mt-0.5 line-clamp-2 hover:text-[#9C2B2B] transition-colors leading-snug">
              {product.name}
            </p>
          </Link>
          <div className="mt-2">
            <StarRating rating={rating} tiny />
          </div>
          <div className="flex items-baseline gap-2 mt-2 flex-wrap">
            <span className="font-semibold text-gray-900 text-base">{formatPrice(product.price)}</span>
            <span className="text-gray-400 line-through text-sm">{formatPrice(mrp)}</span>
            <span className="text-green-600 font-bold text-xs">({discountPct}% OFF)</span>
          </div>
          {inStock && product.stock <= 5 && (
            <p className="text-[#9C2B2B] text-xs font-semibold mt-1">Only {product.stock} left!</p>
          )}
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`mt-3 px-6 py-2 text-[10px] font-bold tracking-wide uppercase rounded-lg transition-all ${
              inStock
                ? addedToCart
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-900 text-white hover:bg-[#9C2B2B]'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {addedToCart ? '✓ ADDED' : 'ADD TO BAG'}
          </button>
        </div>

        <button onClick={handleWishlist} className="self-start p-1.5 flex-shrink-0 mt-1">
          <Heart
            className={`w-5 h-5 transition-colors ${
              wishlisted ? 'fill-[#9C2B2B] text-[#9C2B2B]' : 'text-gray-300 hover:text-[#9C2B2B]'
            }`}
          />
        </button>
      </motion.div>
    );
  }

  /* ── GRID VIEW ─────────────────────────────────────────── */
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white group cursor-pointer select-none rounded-2xl overflow-hidden
                 shadow-[0_1px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.10)]
                 transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── IMAGE ── */}
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden bg-gray-50" style={{ aspectRatio: '3/4' }}>
          {/* Skeleton shimmer */}
          {!imgLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
          )}

          {!imgError ? (
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-105
                          ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              unoptimized
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center px-4">
                <ShoppingBag className="w-10 h-10 text-gray-300 mx-auto mb-1" />
                <p className="text-gray-400 text-[10px] line-clamp-2">{product.name}</p>
              </div>
            </div>
          )}

          {/* Top-left badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
            {!inStock ? (
              <span className="bg-black/70 backdrop-blur-sm text-white text-[10px] font-medium px-2.5 py-1 rounded-full">
                Sold out
              </span>
            ) : product.stock <= 5 ? (
              <span className="bg-[#9C2B2B] text-white text-[10px] font-medium px-2.5 py-1 rounded-full">
                Only {product.stock} left
              </span>
            ) : discountPct >= 30 ? (
              <span className="bg-white/90 backdrop-blur-sm text-[#14110F] text-[10px] font-medium px-2.5 py-1 rounded-full">
                {discountPct}% off
              </span>
            ) : null}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center
                        shadow-md transition-all duration-200 hover:scale-110 ${
              wishlisted ? 'bg-[#9C2B2B]' : 'bg-white/90 backdrop-blur-sm'
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 ${wishlisted ? 'fill-white text-white' : 'text-gray-600'}`}
            />
          </button>

          {/* Sold-out blur overlay */}
          {!inStock && <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]" />}

          {/* Hover: quick add button */}
          <AnimatePresence>
            {hovered && inStock && (
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 60, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute bottom-0 left-0 right-0 p-3 z-10"
              >
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-2.5 rounded-full text-[12px] font-medium
                              flex items-center justify-center gap-1.5 shadow-lg transition-colors ${
                    addedToCart
                      ? 'bg-green-600 text-white'
                      : 'bg-[#14110F]/95 text-white hover:bg-[#9C2B2B]'
                  }`}
                >
                  {addedToCart ? (
                    <><Check className="w-3.5 h-3.5" /> Added to bag</>
                  ) : (
                    <><ShoppingBag className="w-3.5 h-3.5" /> Quick add</>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>

      {/* ── INFO ── */}
      <div className="p-4 pt-3.5">
        <p className="text-[#9C2B2B] text-[10px] font-medium tracking-wide uppercase mb-1">
          {product.category.name}
        </p>
        <Link href={`/product/${product.id}`}>
          <p className="text-[#14110F] font-medium text-[13.5px] leading-snug line-clamp-2
                        hover:text-[#9C2B2B] transition-colors mb-1.5">
            {product.name}
          </p>
        </Link>
        <StarRating rating={rating} tiny />
        <div className="flex items-baseline gap-1.5 mt-2 flex-wrap">
          <span className="font-semibold text-[#14110F] text-sm">{formatPrice(product.price)}</span>
          <span className="text-gray-400 line-through text-xs">{formatPrice(mrp)}</span>
          <span className="text-green-700 font-medium text-[11px]">({discountPct}% off)</span>
        </div>
      </div>
    </motion.div>
  );
}
