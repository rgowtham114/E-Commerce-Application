import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { cart, cartTotal, updateQuantity, removeFromCart, navigateTo } = useShop();

  return (
    <div>
      <h2>Your Cart</h2>

      {cart.length > 0 ? (
        <>
          <div className="product-grid">
            {cart.map((item) => (
              <div key={item.product.id} className="product-card">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <p className="product-title" title={item.product.name}>
                  {item.product.name}
                </p>
                <p className="product-price">₹{item.product.price.toLocaleString('en-IN')}</p>
                <p style={{ margin: '0.4rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>Quantity:</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.product.id, 'decrease')}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      padding: '2px 6px',
                    }}
                    title="Decrease quantity"
                  >
                    ➖
                  </button>
                  <strong style={{ minWidth: '20px', textAlign: 'center' }}>
                    {item.quantity}
                  </strong>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.product.id, 'increase')}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      padding: '2px 6px',
                    }}
                    title="Increase quantity"
                  >
                    ➕
                  </button>
                </p>

                <div className="product-actions">
                  <button
                    type="button"
                    className="btn-pill primary"
                    style={{ background: '#dc2626', borderColor: '#dc2626' }}
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div
            className="section-card"
            style={{
              marginTop: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: '1.4rem' }}>
                Total: ₹{cartTotal.toLocaleString('en-IN')}
              </h3>
              <p style={{ margin: '0.25rem 0 0', color: '#6b7280', fontSize: '0.9rem' }}>
                Inclusive of all taxes and standard shipping
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                className="btn-pill"
                style={{ color: '#374151', borderColor: '#d1d5db' }}
                onClick={() => navigateTo('products')}
              >
                Continue Shopping
              </button>
              <button
                type="button"
                style={{
                  padding: '10px 24px',
                  background: '#16a34a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
                onClick={() => navigateTo('checkout')}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="section-card" style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
          <ShoppingBag size={48} color="#9ca3af" style={{ margin: '0 auto 1rem' }} />
          <p style={{ fontSize: '1.2rem', color: '#4b5563', margin: '0 0 1.25rem' }}>
            Your cart is empty.
          </p>
          <button
            type="button"
            className="btn-pill primary"
            onClick={() => navigateTo('products')}
          >
            Explore Products
          </button>
        </div>
      )}
    </div>
  );
};
