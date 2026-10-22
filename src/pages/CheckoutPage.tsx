import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, CreditCard, Truck, ArrowLeft } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, cartTotal, clearCart, navigateTo } = useShop();
  const { user } = useAuth();

  const [street, setStreet] = useState('123 MG Road, Indiranagar');
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [zip, setZip] = useState('560038');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(newOrderId);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="section-card" style={{ maxWidth: '600px', margin: '2rem auto', textAlign: 'center', padding: '3rem 2rem' }}>
        <CheckCircle2 size={64} color="#16a34a" style={{ margin: '0 auto 1.5rem' }} />
        <h2 style={{ margin: '0 0 0.5rem', color: '#111827' }}>Order Placed Successfully!</h2>
        <p style={{ color: '#4b5563', fontSize: '1rem', margin: '0 0 1.5rem' }}>
          Thank you for shopping with us, <strong>{user?.full_name || user?.username || 'Customer'}</strong>!
        </p>

        <div style={{ background: '#f9fafb', borderRadius: '0.75rem', padding: '1.25rem', textAlign: 'left', marginBottom: '1.5rem' }}>
          <p style={{ margin: '0.35rem 0' }}><strong>Order ID:</strong> {orderId}</p>
          <p style={{ margin: '0.35rem 0' }}><strong>Delivery to:</strong> {street}, {city}, {state} - {zip}</p>
          <p style={{ margin: '0.35rem 0' }}><strong>Payment Method:</strong> {paymentMethod.toUpperCase()}</p>
          <p style={{ margin: '0.35rem 0' }}><strong>Total Paid:</strong> ₹{cartTotal.toLocaleString('en-IN')}</p>
          <p style={{ margin: '0.35rem 0', color: '#16a34a', fontWeight: 500 }}>
            Estimated delivery within 2-4 business days.
          </p>
        </div>

        <button
          type="button"
          className="btn-pill primary"
          style={{ padding: '0.6rem 1.8rem', fontSize: '1rem' }}
          onClick={() => navigateTo('products')}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => navigateTo('cart')}
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
        <span>Back to Cart</span>
      </button>

      <h2>Checkout</h2>

      {cart.length > 0 ? (
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {/* Shipping and Payment Form */}
          <div style={{ flex: '1 1 400px' }}>
            <div className="section-card" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Truck size={20} color="#2563eb" />
                <span>Shipping Address</span>
              </h3>
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="auth-form">
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="House/Flat No, Street, Locality"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                      State
                    </label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      required
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      placeholder="Pin Code"
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="section-card">
              <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CreditCard size={20} color="#2563eb" />
                <span>Payment Method</span>
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    background: paymentMethod === 'upi' ? '#eff6ff' : '#ffffff',
                    borderColor: paymentMethod === 'upi' ? '#3b82f6' : '#e5e7eb',
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                  />
                  <div>
                    <div style={{ fontWeight: 600 }}>UPI (Google Pay, PhonePe, Paytm)</div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Instant zero-fee payment</div>
                  </div>
                </label>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    background: paymentMethod === 'card' ? '#eff6ff' : '#ffffff',
                    borderColor: paymentMethod === 'card' ? '#3b82f6' : '#e5e7eb',
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <div>
                    <div style={{ fontWeight: 600 }}>Credit / Debit Card</div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Visa, MasterCard, RuPay</div>
                  </div>
                </label>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    background: paymentMethod === 'cod' ? '#eff6ff' : '#ffffff',
                    borderColor: paymentMethod === 'cod' ? '#3b82f6' : '#e5e7eb',
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                  />
                  <div>
                    <div style={{ fontWeight: 600 }}>Cash on Delivery (COD)</div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Pay when your package arrives</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div style={{ flex: '1 1 320px' }}>
            <div className="section-card">
              <h3 style={{ marginTop: 0 }}>Order Summary</h3>
              <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '1rem' }}>
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0.6rem 0',
                      borderBottom: '1px solid #f3f4f6',
                    }}
                  >
                    <div>
                      <p style={{ margin: 0, fontWeight: 500, fontSize: '0.95rem' }}>
                        {item.product.name}
                      </p>
                      <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                        Qty: {item.quantity} × ₹{item.product.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontWeight: 600 }}>
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#16a34a' }}>
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 700, marginTop: '0.75rem' }}>
                  <span>Total</span>
                  <span style={{ color: '#16a34a' }}>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                className="btn-pill primary"
                style={{ width: '100%', padding: '0.75rem', fontSize: '1rem' }}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="section-card">
          <p>No items in cart.</p>
          <button
            type="button"
            className="btn-pill primary"
            onClick={() => navigateTo('products')}
          >
            Go to Products
          </button>
        </div>
      )}
    </div>
  );
};
