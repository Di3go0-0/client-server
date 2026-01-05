import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { ApiClient } from '../services/apiClient';
import { STORAGE_KEYS } from '../config/constants';

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiClient = ApiClient.getInstance();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      if (token) {
        try {
          const profile = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
          if (profile) {
            setUser(JSON.parse(profile));
          } else {
            const userData = await apiClient.getProfile();
            setUser(userData);
            localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(userData));
          }
        } catch (error) {
          console.error('Failed to initialize auth:', error);
          logout();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await apiClient.login(email, password);
      const token = response.token || response.access_token;
      
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      
      // Get user profile
      const userData = await apiClient.getProfile();
      setUser(userData);
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(userData));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, username: string): Promise<void> => {
    try {
      await apiClient.register(email, password, username);
      // Auto-login after registration
      await login(email, password);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = (): void => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};