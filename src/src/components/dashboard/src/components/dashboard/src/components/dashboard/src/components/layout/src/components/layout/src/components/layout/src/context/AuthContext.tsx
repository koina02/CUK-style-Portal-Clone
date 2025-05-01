import React, { createContext, useContext, useState } from 'react';
import { User, currentUser as mockUser } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(mockUser);

  const login = async (email: string, password: string) => {
    // In a real app, you would validate credentials with a backend API
    // For demo purposes, we'll just set the mock user data
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  // For demo purposes only - allows switching between student and lecturer views
  const switchRole = () => {
    if (user) {
      setUser({
        ...user,
        role: user.role === 'student' ? 'lecturer' : 'student'
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
