import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => { success: boolean; error?: string };
  register: (fullName: string, email: string, username: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS = [
  {
    id: 1,
    username: 'gowtham',
    full_name: 'Gowtham Ravula',
    email: 'gowtham@example.com',
    password: 'password123',
    phone: '+91 98765 43210',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('ecom_current_user');
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch {
      // fallback
    }
    // Default logged in user so user can immediately experience cart, checkout, profile
    return {
      id: 1,
      username: 'gowtham',
      full_name: 'Gowtham Ravula',
      email: 'gowtham@example.com',
      phone: '+91 98765 43210',
    };
  });

  useEffect(() => {
    try {
      if (!localStorage.getItem('ecom_registered_users')) {
        localStorage.setItem('ecom_registered_users', JSON.stringify(DEMO_USERS));
      }
    } catch {
      // ignore
    }
  }, []);

  const login = (username: string, password: string): { success: boolean; error?: string } => {
    if (!username || !password) {
      return { success: false, error: 'Username and password are required.' };
    }

    try {
      const stored = localStorage.getItem('ecom_registered_users');
      const users = stored ? JSON.parse(stored) : DEMO_USERS;
      const found = users.find(
        (u: any) => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password
      );

      if (found) {
        const loggedInUser: User = {
          id: found.id,
          username: found.username,
          full_name: found.full_name || found.username,
          email: found.email,
          phone: found.phone,
        };
        setUser(loggedInUser);
        localStorage.setItem('ecom_current_user', JSON.stringify(loggedInUser));
        return { success: true };
      }
    } catch {
      // ignore
    }

    return { success: false, error: 'Invalid username or password' };
  };

  const register = (
    fullName: string,
    email: string,
    username: string,
    password: string
  ): { success: boolean; error?: string } => {
    if (!username.trim() || !password.trim()) {
      return { success: false, error: 'Username and password are required.' };
    }

    try {
      const stored = localStorage.getItem('ecom_registered_users');
      const users = stored ? JSON.parse(stored) : [...DEMO_USERS];

      if (users.some((u: any) => u.username.toLowerCase() === username.trim().toLowerCase())) {
        return { success: false, error: 'This username is already taken.' };
      }

      if (email.trim() && users.some((u: any) => u.email.toLowerCase() === email.trim().toLowerCase())) {
        return { success: false, error: 'This email is already registered.' };
      }

      const newUser = {
        id: Date.now(),
        username: username.trim(),
        full_name: fullName.trim() || username.trim(),
        email: email.trim(),
        password: password,
        phone: '',
      };

      users.push(newUser);
      localStorage.setItem('ecom_registered_users', JSON.stringify(users));

      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('ecom_current_user');
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
