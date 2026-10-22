import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const { navigateTo } = useShop();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = register(fullName, email, username, password);
    if (res.success) {
      navigateTo('login');
    } else {
      setError(res.error || 'Registration failed');
    }
  };

  return (
    <div className="auth-card">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="full_name"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
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
          Register
        </button>

        {error && (
          <p style={{ color: '#b91c1c', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
            {error}
          </p>
        )}

        <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#6b7280', textAlign: 'center' }}>
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigateTo('login')}
            style={{
              background: 'none',
              border: 'none',
              color: '#2563eb',
              cursor: 'pointer',
              fontWeight: 600,
              padding: 0,
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
