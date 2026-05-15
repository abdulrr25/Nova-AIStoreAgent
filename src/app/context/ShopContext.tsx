"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Category } from '../data/products';
import { productsApi, categoriesApi, cartApi, ordersApi, authApi, wishlistApi, ApiOrder } from '../lib/api';

interface AuthUser { name: string; email: string; role: string; }
interface FilterState {
  categoryId: number | null;
  searchQuery: string;
  priceRange: [number, number];
  inStock: boolean;
}
interface ShopContextType {
  hydrated: boolean;
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  products: Product[];
  categories: Category[];
  loadingProducts: boolean;
  filters: FilterState;
  setFilters: (f: FilterState | ((prev: FilterState) => FilterState)) => void;
  clearFilters: () => void;
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  checkout: (shippingAddress: string, paymentMethod: string, paymentDetails: string) => Promise<ApiOrder>;
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}
const ShopContext = createContext<ShopContextType | undefined>(undefined);
const DEFAULT_FILTERS: FilterState = { categoryId: null, searchQuery: '', priceRange: [0, 200000], inStock: false };

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingProducts, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    try {
      const u = localStorage.getItem('user');
      if (u) setUser(JSON.parse(u));
      const c = localStorage.getItem('cart');
      if (c) setCart(JSON.parse(c));
      const w = localStorage.getItem('wishlist');
      if (w) setWishlist(JSON.parse(w));
    } catch { }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  useEffect(() => {
    Promise.all([productsApi.getAll(), categoriesApi.getAll()])
      .then(([prods, cats]) => { setProducts(prods); setCategories(cats); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await authApi.login(email, password);
    const u = { name: res.name, email: res.email, role: res.role };
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(u));
    setUser(u);
    try {
      const wl = await wishlistApi.get();
      const ids = wl.items.map((i: any) => i.product.id);
      setWishlist(ids);
      localStorage.setItem('wishlist', JSON.stringify(ids));
    } catch { }
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await authApi.register(name, email, password);
    const u = { name: res.name, email: res.email, role: res.role };
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('wishlist');
    setUser(null);
    setCart([]);
    setWishlist([]);
  };

  const addToCart = (product: Product, quantity = 1) =>
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      return existing
        ? prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i)
        : [...prev, { product, quantity }];
    });

  const removeFromCart = (productId: number) => setCart(prev => prev.filter(i => i.product.id !== productId));
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) { removeFromCart(productId); return; }
    setCart(prev => prev.map(i => i.product.id === productId ? { ...i, quantity } : i));
  };
  const clearCart = () => { setCart([]); localStorage.removeItem('cart'); };

  const toggleWishlist = async (productId: number) => {
    const inWl = wishlist.includes(productId);
    const newWl = inWl ? wishlist.filter(id => id !== productId) : [...wishlist, productId];
    setWishlist(newWl);
    if (user) {
      try {
        if (inWl) await wishlistApi.remove(productId);
        else await wishlistApi.add(productId);
      } catch { }
    }
  };

  const isInWishlist = (productId: number) => wishlist.includes(productId);

  const checkout = async (shippingAddress: string, paymentMethod: string, paymentDetails: string): Promise<ApiOrder> => {
    if (!user) throw new Error('Please login to checkout');
    if (cart.length === 0) throw new Error('Your cart is empty');
    try {
      const backendCart = await cartApi.get();
      for (const item of backendCart.items) await cartApi.remove(item.id);
    } catch { }
    for (const item of cart) await cartApi.add(item.product.id, item.quantity);
    const order = await ordersApi.place(shippingAddress, paymentMethod, paymentDetails);
    const paid = await ordersApi.pay(order.id);
    clearCart();
    return paid;
  };

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cart.reduce((s, i) => s + Number(i.product.price) * i.quantity, 0);
  const clearFilters = () => setFilters(DEFAULT_FILTERS);

  return (
    <ShopContext.Provider value={{
      hydrated, user, isAuthenticated: !!user, login, register, logout,
      products, categories, loadingProducts,
      filters, setFilters, clearFilters,
      cart, cartCount, cartTotal, addToCart, removeFromCart, updateQuantity, clearCart, checkout,
      wishlist, toggleWishlist, isInWishlist,
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used within ShopProvider');
  return ctx;
};
