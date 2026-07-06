"use client"
export const dynamic = 'force-dynamic'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, ArrowLeft, Star, Truck, RotateCcw, Shield, Check, Loader2, ThumbsUp, ChevronDown, ChevronUp } from 'lucide-react';
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

function StarRating({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' }) {
  const s = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={`${s} ${i <= Math.round(rating) ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-[#D1D5DB]'}`} />
      ))}
    </div>
  );
}

/** Deterministic fake reviews based on product id */
function generateReviews(id: number, name: string) {
  const reviewers = [
    'Aarav S.', 'Priya M.', 'Rohan K.', 'Sneha D.', 'Vikram P.',
    'Ananya R.', 'Karthik N.', 'Meera J.', 'Arjun B.', 'Divya L.',
    'Rahul V.', 'Pooja T.', 'Aditya G.', 'Nisha C.', 'Amit W.',
  ];
  const positives = [
    `Absolutely love this ${name.split(' ')[0]}! Quality is top-notch and delivery was super fast. Highly recommended.`,
    `Great value for the price. Looks exactly as shown in the pictures. Very satisfied with my purchase.`,
    `This is my second purchase from NOVA and once again they've exceeded my expectations. Five stars!`,
    `Perfect build quality and premium feel. Packaging was excellent too. Would definitely buy again.`,
    `Been using this for a month now and it's holding up perfectly. Excellent product for the price point.`,
    `Really happy with this purchase. The quality surpassed my expectations. Fast shipping and great packaging.`,
    `Compared with many options before buying this. Glad I chose this one — superb quality and finish.`,
    `This product is a game-changer. Everything about it screams premium. NOVA never disappoints.`,
  ];
  const mixed = [
    `Good product overall. Minor issue with packaging but the product itself is great. Would rate 4/5.`,
    `Decent quality for the price. Could be slightly better in terms of finish, but still a solid buy.`,
    `Product is exactly as described. Took a couple of days extra to deliver but worth the wait.`,
  ];

  const count = 3 + (id % 5); // 3-7 reviews per product
  const reviews = [];
  for (let i = 0; i < count; i++) {
    const seed = (id * 17 + i * 31) % 100;
    const rating = seed < 55 ? 5 : seed < 80 ? 4 : seed < 92 ? 3 : 4;
    const pool = rating >= 4 ? positives : mixed;
    const text = pool[(id * 7 + i * 13) % pool.length];
    const reviewer = reviewers[(id * 3 + i * 7) % reviewers.length];
    const daysAgo = 3 + ((id + i * 11) % 90);
    reviews.push({ reviewer, rating, text, daysAgo, helpful: 2 + ((id + i) % 18) });
  }
  return reviews;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { products, addToCart, toggleWishlist, isInWishlist } = useShop();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [imgError, setImgError] = useState(false);

  const productId = parseInt(params.id as string);
  const product = products.find(p => p.id === productId);

  const sizes = product?.sizes ? product.sizes.split(',') : [];
  const colors = product?.colors ? product.colors.split(',') : [];
  const rating = product ? getProductRating(product.id) : 4.5;
  const mrp = product ? getMRP(product.price, product.id, product.category.id) : 0;
  const discountPct = product ? Math.round(((mrp - product.price) / mrp) * 100) : 0;
  const inStock = product ? product.stock > 0 : false;
  const wishlisted = product ? isInWishlist(product.id) : false;
  const reviews = product ? generateReviews(product.id, product.name) : [];
  const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  const totalReviews = reviews.length;

  // Suggested: same category, shuffled deterministically, excluding current product
  const suggestedProducts = products
    .filter(p => p.category.id === product?.category.id && p.id !== productId)
    .sort((a, b) => ((a.id * 37 + productId) % 100) - ((b.id * 37 + productId) % 100))
    .slice(0, 8);

  const handleAddToCart = () => {
    if (!product || !inStock) return;
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  // Reset state when product changes
  useEffect(() => {
    setSelectedSize(null);
    setSelectedColor(null);
    setQuantity(1);
    setAddedToCart(false);
    setShowAllReviews(false);
    setImgError(false);
    window.scrollTo(0, 0);
  }, [productId]);

  if (products.length > 0 && !product) {
    return (
      <div className="min-h-screen bg-[#F5F5F0]">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <p className="text-2xl font-bold text-[#14110F] mb-2">Product Not Found</p>
          <p className="text-[#6B7280] mb-6">This product doesn't exist or has been removed.</p>
          <Link href="/shop" className="bg-[#14110F] text-white px-8 py-3 text-xs font-bold tracking-wide uppercase hover:bg-[#9C2B2B] transition-colors rounded-xl">
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
          <Loader2 className="w-10 h-10 animate-spin text-[#9C2B2B]" />
        </div>
      </div>
    );
  }

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <Header />
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        {/* Back button */}
        <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#9C2B2B] transition-colors mb-6 uppercase tracking-wide text-[10px] font-bold">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* ── LEFT: Image ── */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="relative overflow-hidden bg-white rounded-2xl border border-[#E5E7EB] group" style={{ aspectRatio: '3/4' }}>
              {!imgError ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">{product.name}</p>
                  </div>
                </div>
              )}
              {!inStock && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                  <span className="text-sm font-bold text-[#6B7280] tracking-wide uppercase border border-[#E5E7EB] px-4 py-2">
                    OUT OF STOCK
                  </span>
                </div>
              )}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 p-2.5 bg-white shadow-md hover:shadow-lg transition-all rounded-xl">
                <Heart className={`w-5 h-5 transition-all ${wishlisted ? 'fill-[#9C2B2B] text-[#9C2B2B]' : 'text-[#6B7280]'}`} />
              </button>
              {discountPct >= 20 && (
                <div className="absolute top-4 left-4">
                  <span className="bg-[#9C2B2B] text-white text-[10px] font-bold px-3 py-1.5 rounded-xl tracking-wider">
                    {discountPct}% OFF
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* ── RIGHT: Details ── */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="py-2">
            {/* Category breadcrumb */}
            <div className="flex items-center gap-2 text-[10px] mb-3">
              <Link href="/" className="text-[#6B7280] hover:text-[#9C2B2B] transition-colors uppercase tracking-wide font-medium">Home</Link>
              <span className="text-[#D1D5DB]">/</span>
              <Link href="/shop" className="text-[#6B7280] hover:text-[#9C2B2B] transition-colors uppercase tracking-wide font-medium">Shop</Link>
              <span className="text-[#D1D5DB]">/</span>
              <span className="text-[#9C2B2B] font-bold uppercase tracking-wide">{product.category.name}</span>
            </div>

            {/* Name */}
            <h1 className="font-serif text-3xl md:text-4xl text-[#14110F] mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={avgRating} />
              <span className="text-[#6B7280] text-sm">{avgRating.toFixed(1)}</span>
              <span className="text-[#D1D5DB]">|</span>
              <span className="text-[#6B7280] text-sm">{totalReviews} reviews</span>
            </div>

            {/* Price row */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-semibold text-[#14110F]">{formatPrice(product.price)}</span>
              <span className="text-[#9CA3AF] line-through text-lg">{formatPrice(mrp)}</span>
              <span className="bg-[#9C2B2B] text-white text-xs font-bold px-2 py-1 rounded-xl">{discountPct}% OFF</span>
            </div>
            <p className="text-[#16A34A] text-xs font-semibold mb-5">Inclusive of all taxes</p>

            {/* Stock status */}
            <div className="mb-5">
              {inStock ? (
                <span className="inline-flex items-center gap-1.5 text-[#16A34A] text-sm font-bold">
                  <Check className="w-4 h-4" />
                  {product.stock <= 5 ? `Only ${product.stock} left in stock — hurry!` : 'In Stock'}
                </span>
              ) : (
                <span className="text-[#9C2B2B] text-sm font-bold">Out of Stock</span>
              )}
            </div>

            {/* Size selector */}
            {sizes.length > 0 && (
              <div className="mb-5">
                <p className="text-[10px] font-bold text-[#14110F] uppercase tracking-wide mb-2">
                  Select Size
                  {selectedSize && <span className="ml-2 text-[#6B7280] font-normal normal-case">{selectedSize}</span>}
                </p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size.trim())}
                      className={`px-4 py-2 text-xs font-bold tracking-wider border transition-all rounded-xl ${
                        selectedSize === size.trim()
                          ? 'bg-[#9C2B2B] text-white border-[#9C2B2B]'
                          : 'border-[#D1D5DB] text-[#14110F] hover:border-[#9C2B2B] hover:text-[#9C2B2B]'
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
                <p className="text-[10px] font-bold text-[#14110F] uppercase tracking-wide mb-2">
                  Select Color
                  {selectedColor && <span className="ml-2 text-[#6B7280] font-normal normal-case">{selectedColor}</span>}
                </p>
                <div className="flex flex-wrap gap-2">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color.trim())}
                      className={`px-4 py-2 text-xs font-medium border transition-all rounded-xl ${
                        selectedColor === color.trim()
                          ? 'bg-[#14110F] text-white border-[#14110F]'
                          : 'border-[#D1D5DB] text-[#14110F] hover:border-[#14110F]'
                      }`}>
                      {color.trim()}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity selector */}
            <div className="mb-6">
              <p className="text-[10px] font-bold text-[#14110F] uppercase tracking-wide mb-2">Quantity</p>
              <div className="flex items-center gap-0 border border-[#E5E7EB] w-fit rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#14110F] hover:bg-[#F3F4F6] font-bold text-lg transition-colors">
                  −
                </button>
                <span className="w-12 h-10 flex items-center justify-center text-sm font-bold text-[#14110F] border-x border-[#E5E7EB]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#14110F] hover:bg-[#F3F4F6] font-bold text-lg transition-colors">
                  +
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-all rounded-full ${
                  !inStock
                    ? 'bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed'
                    : addedToCart
                    ? 'bg-[#16A34A] text-white'
                    : 'bg-[#14110F] text-white hover:bg-[#9C2B2B]'
                }`}>
                {addedToCart
                  ? <><Check className="w-4 h-4" /> Added to Bag</>
                  : <><ShoppingBag className="w-4 h-4" /> Add to Bag</>}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => toggleWishlist(product.id)}
                className={`flex-1 sm:flex-none sm:px-8 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-all border rounded-full ${
                  wishlisted
                    ? 'border-[#9C2B2B] bg-[#F5E9E7] text-[#9C2B2B]'
                    : 'border-[#9C2B2B] text-[#9C2B2B] hover:bg-[#F5E9E7]'
                }`}>
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#9C2B2B]' : ''}`} />
                {wishlisted ? 'Wishlisted' : 'Wishlist'}
              </motion.button>
            </div>

            {/* Description */}
            <div className="mb-8 pb-8 border-b border-[#E5E7EB]">
              <p className="text-[10px] font-bold text-[#14110F] uppercase tracking-wide mb-2">Description</p>
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
                  <div className="w-9 h-9 bg-[#F3F4F6] flex items-center justify-center rounded-xl flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#14110F]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#14110F] uppercase tracking-wide">{label}</p>
                    <p className="text-[#6B7280] text-[10px]">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── REVIEWS SECTION ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-white rounded-xl border border-[#E5E7EB] p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-8 mb-8">
            {/* Rating summary */}
            <div className="flex-shrink-0 text-center md:text-left md:pr-8 md:border-r md:border-[#E5E7EB]">
              <p className="text-5xl font-semibold text-[#14110F]">{avgRating.toFixed(1)}</p>
              <StarRating rating={avgRating} />
              <p className="text-[#6B7280] text-sm mt-1">{totalReviews} reviews</p>
            </div>

            {/* Rating breakdown bars */}
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map(star => {
                const count = reviews.filter(r => r.rating === star).length;
                const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-sm text-[#6B7280] w-8 text-right">{star} ★</span>
                    <div className="flex-1 h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                      <div className="h-full bg-[#F59E0B] rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs text-[#9CA3AF] w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Individual reviews */}
          <div className="border-t border-[#E5E7EB] pt-6 space-y-6">
            <p className="text-[10px] font-bold text-[#14110F] uppercase tracking-wide">Customer Reviews</p>
            {displayedReviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="pb-5 border-b border-[#F3F4F6] last:border-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#9C2B2B] text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {review.reviewer[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#14110F]">{review.reviewer}</p>
                      <p className="text-[10px] text-[#9CA3AF]">{review.daysAgo} days ago</p>
                    </div>
                  </div>
                  <StarRating rating={review.rating} size="sm" />
                </div>
                <p className="text-sm text-[#6B7280] leading-relaxed ml-11">{review.text}</p>
                <div className="flex items-center gap-4 mt-2 ml-11">
                  <button className="flex items-center gap-1 text-xs text-[#9CA3AF] hover:text-[#9C2B2B] transition-colors">
                    <ThumbsUp className="w-3 h-3" /> Helpful ({review.helpful})
                  </button>
                </div>
              </motion.div>
            ))}

            {reviews.length > 3 && (
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="flex items-center gap-1 text-sm font-bold text-[#9C2B2B] hover:text-[#7A1F1F] transition-colors mx-auto"
              >
                {showAllReviews ? <><ChevronUp className="w-4 h-4" /> Show Less</> : <><ChevronDown className="w-4 h-4" /> Show All {reviews.length} Reviews</>}
              </button>
            )}
          </div>
        </motion.div>

        {/* ── SUGGESTED PRODUCTS ── */}
        {suggestedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16"
          >
            <div className="mb-6">
              <p className="text-[#9C2B2B] text-[11px] font-medium tracking-wide uppercase mb-1">Based on this product</p>
              <h2 className="font-serif text-2xl text-[#14110F]">You may also like</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {suggestedProducts.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.06 }}>
                  <ProductCard product={p} view="grid" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer spacer */}
      <div className="h-16" />
    </div>
  );
}
