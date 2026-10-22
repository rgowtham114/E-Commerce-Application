import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted, navigateTo } = useShop();
  const [imgError, setImgError] = useState(false);
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="product-card">
      <div style={{ position: 'relative' }}>
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="img-fallback">
            📦
          </div>
        )}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'rgba(255, 255, 255, 0.85)',
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
          <Heart
            size={18}
            color={wishlisted ? '#ef4444' : '#64748b'}
            fill={wishlisted ? '#ef4444' : 'none'}
          />
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
          onClick={() => navigateTo('product_detail', product.id)}
        >
          View
        </button>
        <button
          type="button"
          className="btn-pill"
          style={{ color: '#111827', borderColor: '#d1d5db' }}
          onClick={() => addToCart(product.id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
