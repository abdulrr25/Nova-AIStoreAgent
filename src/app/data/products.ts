// Types that match the Spring Boot backend API responses
export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: Category;
  sizes: string | null;   // "XS,S,M,L,XL"
  colors: string | null;  // "Black,White,Red"
}

export interface CartItem {
  product: Product;
  quantity: number;
}

// Helper to format price in INR
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

// Helper to get a deterministic rating based on product id
export function getProductRating(id: number): number {
  const ratings = [4.0, 4.2, 4.5, 4.7, 4.8, 3.9, 4.1, 4.6];
  return ratings[id % ratings.length];
}
