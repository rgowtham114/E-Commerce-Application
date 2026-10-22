export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  categoryId: number;
  description: string;
  price: number;
  image: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: number;
  username: string;
  full_name: string;
  email: string;
  phone?: string;
}

export type PageRoute =
  | 'home'
  | 'products'
  | 'product_detail'
  | 'cart'
  | 'wishlist'
  | 'checkout'
  | 'login'
  | 'register'
  | 'profile';
