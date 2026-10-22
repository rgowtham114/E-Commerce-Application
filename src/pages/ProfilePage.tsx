import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { User as UserIcon, Mail, Phone, LogOut } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { navigateTo } = useShop();

  if (!user) {
    return (
      <div className="section-card" style={{ maxWidth: '520px', margin: '2rem auto', textAlign: 'center' }}>
        <h2>User Profile</h2>
        <p>Please log in to view your profile.</p>
        <button
          type="button"
          className="btn-pill primary"
          onClick={() => navigateTo('login')}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>User Profile</h2>
      <div className="product-card" style={{ maxWidth: '520px', padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#2563eb',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 700,
            }}
          >
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{user.full_name || user.username}</h3>
            <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>@{user.username}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <UserIcon size={18} color="#6b7280" />
            <div>
              <span style={{ fontSize: '0.8rem', color: '#6b7280', display: 'block' }}>Username</span>
              <strong>{user.username}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <UserIcon size={18} color="#6b7280" />
            <div>
              <span style={{ fontSize: '0.8rem', color: '#6b7280', display: 'block' }}>Full name</span>
              <strong>{user.full_name || '-'}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Mail size={18} color="#6b7280" />
            <div>
              <span style={{ fontSize: '0.8rem', color: '#6b7280', display: 'block' }}>Email</span>
              <strong>{user.email || '-'}</strong>
            </div>
          </div>

          {user.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Phone size={18} color="#6b7280" />
              <div>
                <span style={{ fontSize: '0.8rem', color: '#6b7280', display: 'block' }}>Phone</span>
                <strong>{user.phone}</strong>
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
          <button
            type="button"
            className="btn-pill"
            style={{ color: '#dc2626', borderColor: '#fca5a5', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            onClick={() => {
              logout();
              navigateTo('home');
            }}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
          <button
            type="button"
            className="btn-pill primary"
            onClick={() => navigateTo('products')}
          >
            Explore Store
          </button>
        </div>
      </div>
    </div>
  );
};
