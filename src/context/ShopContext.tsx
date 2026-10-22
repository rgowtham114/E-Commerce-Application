import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Category, Product, CartItem, PageRoute } from '../types';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS } from '../data/initialProducts';
import { useAuth } from './AuthContext';

interface ShopContextType {
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  wishlist: number[];
  searchQuery: string;
  selectedCategory: string;
  currentPage: PageRoute;
  selectedProductId: number | null;
  toastMessage: string | null;
  cartTotal: number;
  cartCount: number;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (categoryId: string) => void;
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, action: 'increase' | 'decrease') => void;
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  toggleWishlist: (productId: number) => void;
  isWishlisted: (productId: number) => boolean;
  clearCart: () => void;
  navigateTo: (page: PageRoute, productId?: number) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);

  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const userKey = user ? user.username : 'guest';

  // Cart state persisted per user
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(`ecom_cart_${userKey}`);
      if (saved) return JSON.parse(saved);
      // default sample item in cart
      const initialItem = INITIAL_PRODUCTS[0];
      return [{ product: initialItem, quantity: 1 }];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted per user
  const [wishlist, setWishlist] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(`ecom_wishlist_${userKey}`);
      if (saved) return JSON.parse(saved);
      return [2, 12]; // sample wishlisted products
    } catch {
      return [];
    }
  });

  // Re-load when user changes
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(`ecom_cart_${userKey}`);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        setCart([]);
      }

      const savedWishlist = localStorage.getItem(`ecom_wishlist_${userKey}`);
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      } else {
        setWishlist([]);
      }
    } catch {
      // ignore
    }
  }, [userKey]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem(`ecom_cart_${userKey}`, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart, userKey]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem(`ecom_wishlist_${userKey}`, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist, userKey]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 2800);
  };

  const navigateTo = (page: PageRoute, productId?: number) => {
    setCurrentPage(page);
    if (productId !== undefined) {
      setSelectedProductId(productId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCart(prev => {
      const existing = prev.find(item => item.product.id === productId);
      if (existing) {
        return prev.map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });

    showToast(`Added "${product.name}" to Cart`);
  };

  const removeFromCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    setCart(prev => prev.filter(item => item.product.id !== productId));
    if (product) {
      showToast(`Removed "${product.name}" from Cart`);
    }
  };

  const updateQuantity = (productId: number, action: 'increase' | 'decrease') => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter(item => item.quantity > 0);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToWishlist = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (!wishlist.includes(productId)) {
      setWishlist(prev => [...prev, productId]);
      showToast(`Added "${product.name}" to Wishlist`);
    } else {
      showToast(`"${product.name}" is already in your Wishlist`);
    }
  };

  const removeFromWishlist = (productId: number) => {
    const product = products.find(p => p.id === productId);
    setWishlist(prev => prev.filter(id => id !== productId));
    if (product) {
      showToast(`Removed "${product.name}" from Wishlist`);
    }
  };

  const toggleWishlist = (productId: number) => {
    if (wishlist.includes(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const isWishlisted = (productId: number) => {
    return wishlist.includes(productId);
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        cart,
        wishlist,
        searchQuery,
        selectedCategory,
        currentPage,
        selectedProductId,
        toastMessage,
        cartTotal,
        cartCount,
        setSearchQuery,
        setSelectedCategory,
        addToCart,
        removeFromCart,
        updateQuantity,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isWishlisted,
        clearCart,
        navigateTo,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
