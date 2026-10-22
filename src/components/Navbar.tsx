import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Heart, ShoppingCart } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const {
    categories,
    cartCount,
    wishlist,
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
    currentPage,
    navigateTo,
  } = useShop();

  const [menuOpen, setMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [localCategory, setLocalCategory] = useState(selectedCategory);
  const menuRef = useRef<HTMLDivElement>(null);

  // Sync local inputs when state changes
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setLocalCategory(selectedCategory);
  }, [selectedCategory]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setSelectedCategory(localCategory);
    // Navigate to products page to view results
    navigateTo('products');
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setLocalCategory(val);
    setSelectedCategory(val);
    if (currentPage !== 'home' && currentPage !== 'products') {
      navigateTo('products');
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div
          className="navbar-brand"
          onClick={() => navigateTo('home')}
          role="button"
          tabIndex={0}
        >
          <ShoppingBag size={22} color="#60a5fa" />
          <span>My Shop</span>
        </div>

        <div className="navbar-links">
          <button
            type="button"
            className={`nav-link-btn ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => navigateTo('home')}
          >
            Home
          </button>
          <button
            type="button"
            className={`nav-link-btn ${currentPage === 'products' ? 'active' : ''}`}
            onClick={() => navigateTo('products')}
          >
            Products
          </button>
          <button
            type="button"
            className={`nav-link-btn ${currentPage === 'cart' ? 'active' : ''}`}
            onClick={() => navigateTo('cart')}
          >
            <ShoppingCart size={16} />
            <span>Cart</span>
            {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
          </button>
          <button
            type="button"
            className={`nav-link-btn ${currentPage === 'wishlist' ? 'active' : ''}`}
            onClick={() => navigateTo('wishlist')}
          >
            <Heart size={16} />
            <span>Wishlist</span>
            {wishlist.length > 0 && <span className="nav-badge">{wishlist.length}</span>}
          </button>
        </div>

        <form className="navbar-search" onSubmit={handleSearchSubmit}>
          <select
            name="category"
            aria-label="Filter by category"
            value={localCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {{ name: c.name }.name}
              </option>
            ))}
          </select>
          <input
            name="q"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="navbar-auth">
        {isAuthenticated && user ? (
          <div className="user-menu" ref={menuRef}>
            <button
              className="user-menu-trigger"
              type="button"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span>Hi, {user.username}</span>
              <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>▼</span>
            </button>
            {menuOpen && (
              <div className="user-menu-panel open" role="menu">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    navigateTo('profile');
                  }}
                >
                  User Profile
                </button>
                <button
                  type="button"
                  role="menuitem"
                  style={{ color: '#dc2626' }}
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                    navigateTo('home');
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              type="button"
              className="btn-pill"
              onClick={() => navigateTo('login')}
            >
              Login
            </button>
            <button
              type="button"
              className="btn-pill primary"
              onClick={() => navigateTo('register')}
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </div>
  );
};
