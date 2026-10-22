import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowLeft, Heart, Check, ShieldCheck, Truck } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { products, selectedProductId, addToCart, toggleWishlist, isWishlisted, navigateTo } = useShop();
  const [imgError, setImgError] = useState(false);

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  if (!product) {
    return (
      <div className="section-card">
        <h2>Product not found</h2>
        <button type="button" className="btn-pill" onClick={() => navigateTo('products')}>
          Back to products
        </button>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);

  return (
    <div>
      <button
        type="button"
        onClick={() => navigateTo('products')}
        className="btn-pill"
        style={{
          color: '#374151',
          borderColor: '#d1d5db',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          marginBottom: '1rem',
          background: '#ffffff',
        }}
      >
        <ArrowLeft size={16} />
        <span>Back to Products</span>
      </button>

      <div className="section-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <span
              style={{
                display: 'inline-block',
                background: '#e0f2fe',
                color: '#0369a1',
                padding: '0.2rem 0.6rem',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}
            >
              {product.category}
            </span>
            <h2 style={{ margin: 0, fontSize: '1.6rem', color: '#111827' }}>{product.name}</h2>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
            }}
          >
            <div style={{ flex: '1 1 320px', maxWidth: '400px' }}>
              {!imgError ? (
                <img
                  src={product.image}
                  alt={product.name}
                  onError={() => setImgError(true)}
                  style={{
                    width: '100%',
                    maxHeight: '380px',
                    objectFit: 'cover',
                    borderRadius: '0.75rem',
                    background: '#e5e7eb',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '320px',
                    borderRadius: '0.75rem',
                    background: '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem',
                  }}
                >
                  📦
                </div>
              )}
            </div>

            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <p className="product-price" style={{ fontSize: '1.75rem', margin: 0 }}>
                  Price: ₹{product.price.toLocaleString('en-IN')}
                </p>
                <p style={{ margin: '0.35rem 0', color: '#16a34a', fontSize: '0.9rem', fontWeight: 500 }}>
                  ✓ In Stock ({product.stock} units available)
                </p>
              </div>

              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>Description</h4>
                <p style={{ color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                  {product.description}
                </p>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', maxWidth: '340px' }}>
                  <button
                    type="button"
                    className="btn-pill primary"
                    style={{ flex: 1, padding: '0.6rem 1rem', fontSize: '0.95rem' }}
                    onClick={() => addToCart(product.id)}
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    className="btn-pill"
                    style={{
                      color: wishlisted ? '#ef4444' : '#374151',
                      borderColor: wishlisted ? '#fca5a5' : '#d1d5db',
                      background: wishlisted ? '#fef2f2' : '#ffffff',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.6rem 1rem',
                    }}
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <Heart size={18} fill={wishlisted ? '#ef4444' : 'none'} />
                    <span>{wishlisted ? 'Wishlisted' : 'Wishlist'}</span>
                  </button>
                </div>
              </div>

              <div
                style={{
                  background: '#f9fafb',
                  borderRadius: '0.5rem',
                  padding: '0.85rem',
                  fontSize: '0.85rem',
                  color: '#4b5563',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Truck size={16} color="#2563eb" />
                  <span>Free express delivery on orders over ₹999</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={16} color="#16a34a" />
                  <span>100% Authentic products guaranteed</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} color="#16a34a" />
                  <span>7-day easy replacement policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
