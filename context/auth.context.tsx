'use client';
import { authService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User } from '@/types/user';

export interface IAuthContext {
  isLoading: boolean;
  isLoggedIn: boolean;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  logIn: ({ name, email }: { name: string; email: string }) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/login');
    }
  }, []);

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      localStorage.removeItem('user'); // Clear user data
      setUser(null);
      setIsLoggedIn(false);
      setLoading(false);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const logIn = async (data: { name: string; email: string }) => {
    try {
      const response = await authService.login(data);
      if (response) {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data)); // Persist user
        router.push('/search'); // Redirect after login
      }
      return true;
    } catch (err: unknown) {
      router.push('/login');
      console.error(err as string);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, setUser, logout, isLoading: loading, logIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!!!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
