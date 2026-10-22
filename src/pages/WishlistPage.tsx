import React from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, Trash2 } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, addToCart, removeFromWishlist, navigateTo } = useShop();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h2>Your Wishlist</h2>
        {wishlistedProducts.length > 0 && (
          <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>
            {wishlistedProducts.length} saved {wishlistedProducts.length === 1 ? 'item' : 'items'}
          </span>
        )}
      </div>

      {wishlistedProducts.length > 0 ? (
        <div className="product-grid">
          {wishlistedProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div style={{ position: 'relative' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeFromWishlist(product.id)}
                  title="Remove from wishlist"
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                  }}
                >
                  <Trash2 size={16} color="#dc2626" />
                </button>
              </div>

              <p className="product-category-tag">{product.category}</p>
              <p className="product-title" title={product.name}>
                {product.name}
              </p>
              <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>

              <div className="product-actions">
                <button
                  type="button"
                  className="btn-pill primary"
                  onClick={() => addToCart(product.id)}
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="btn-pill"
                  style={{ color: '#111827', borderColor: '#d1d5db' }}
                  onClick={() => navigateTo('product_detail', product.id)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="section-card" style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
          <Heart size={48} color="#9ca3af" style={{ margin: '0 auto 1rem' }} />
          <p style={{ fontSize: '1.2rem', color: '#4b5563', margin: '0 0 1.25rem' }}>
            Your wishlist is empty.
          </p>
          <button
            type="button"
            className="btn-pill primary"
            onClick={() => navigateTo('products')}
          >
            Discover Products
          </button>
        </div>
      )}
    </div>
  );
};
