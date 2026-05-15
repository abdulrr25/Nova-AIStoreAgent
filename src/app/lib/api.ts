const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081/api';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `HTTP ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ApiCategory {
  id: number;
  name: string;
  description: string;
}

export interface ApiProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: ApiCategory;
  sizes: string | null;   // "XS,S,M,L,XL"
  colors: string | null;  // "Black,White,Red"
}

export interface ApiCartItem {
  id: number;
  product: ApiProduct;
  quantity: number;
}

export interface ApiCart {
  id: number;
  items: ApiCartItem[];
}

export interface ApiOrderItem {
  id: number;
  product: ApiProduct;
  quantity: number;
  price: number;
}

export interface ApiOrder {
  id: number;
  orderCode: string;  // "ORD-202501-000042"
  items: ApiOrderItem[];
  totalAmount: number;
  status: 'PLACED' | 'PACKED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
  paymentMethod: string;   // UPI, CARD, NET_BANKING, COD, WALLET
  paymentDetails: string;
  shippingAddress: string;
  createdAt: string;
}

export interface ApiWishlistItem {
  id: number;
  product: ApiProduct;
}

export interface ApiWishlist {
  id: number;
  items: ApiWishlistItem[];
}

export interface AuthResponse {
  token: string;
  name: string;
  email: string;
  role: string;
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export const authApi = {
  login: (email: string, password: string) =>
    request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name: string, email: string, password: string) =>
    request<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),
};

// ── Products ──────────────────────────────────────────────────────────────────

export const productsApi = {
  getAll: () => request<ApiProduct[]>('/products'),
  getById: (id: number) => request<ApiProduct>(`/products/${id}`),
  getByCategory: (categoryId: number) => request<ApiProduct[]>(`/products/category/${categoryId}`),
  search: (q: string) => request<ApiProduct[]>(`/products/search?q=${encodeURIComponent(q)}`),
};

// ── Categories ────────────────────────────────────────────────────────────────

export const categoriesApi = {
  getAll: () => request<ApiCategory[]>('/categories'),
};

// ── Cart ──────────────────────────────────────────────────────────────────────

export const cartApi = {
  get: () => request<ApiCart>('/cart'),
  add: (productId: number, quantity: number) =>
    request<ApiCart>('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    }),
  remove: (itemId: number) =>
    request<ApiCart>(`/cart/item/${itemId}`, { method: 'DELETE' }),
  update: (itemId: number, quantity: number) =>
    request<ApiCart>(`/cart/item/${itemId}?quantity=${quantity}`, { method: 'PUT' }),
};

// ── Orders ────────────────────────────────────────────────────────────────────

export const ordersApi = {
  place: (shippingAddress: string, paymentMethod: string, paymentDetails: string) =>
    request<ApiOrder>('/orders/place', {
      method: 'POST',
      body: JSON.stringify({ shippingAddress, paymentMethod, paymentDetails }),
    }),
  getAll: () => request<ApiOrder[]>('/orders'),
  getById: (id: number) => request<ApiOrder>(`/orders/${id}`),
  pay: (id: number) =>
    request<ApiOrder>(`/orders/${id}/pay`, { method: 'POST' }),
};

// ── Wishlist ──────────────────────────────────────────────────────────────────

export const wishlistApi = {
  get: () => request<ApiWishlist>('/wishlist'),
  add: (productId: number) => request<ApiWishlist>('/wishlist/add', { method: 'POST', body: JSON.stringify({ productId }) }),
  remove: (productId: number) => request<ApiWishlist>(`/wishlist/${productId}`, { method: 'DELETE' }),
  check: (productId: number) => request<{ inWishlist: boolean }>(`/wishlist/check/${productId}`),
};
