import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { navigateTo } = useShop();

  const [username, setUsername] = useState('gowtham');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = login(username, password);
    if (res.success) {
      navigateTo('home');
    } else {
      setError(res.error || 'Invalid username or password');
    }
  };

  return (
    <div className="auth-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="btn-pill primary"
          style={{ width: '100%', padding: '0.65rem' }}
        >
          Login
        </button>

        {error && (
          <p style={{ color: '#b91c1c', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
            {error}
          </p>
        )}

        <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#6b7280', textAlign: 'center' }}>
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => navigateTo('register')}
            style={{
              background: 'none',
              border: 'none',
              color: '#2563eb',
              cursor: 'pointer',
              fontWeight: 600,
              padding: 0,
            }}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};
