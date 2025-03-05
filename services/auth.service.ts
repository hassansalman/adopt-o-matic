import { User } from '@/types/user';
import axios from 'axios';

export class AuthService {
  private apiBaseUrl: string;

  constructor() {
    this.apiBaseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      'https://frontend-take-home-service.fetch.com';
  }

  async login(requestBody: Partial<User>): Promise<{ message: string } | null> {
    try {
      const response = await axios.post(
        `${this.apiBaseUrl}/auth/login`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        const errorMessage = error.response.data;
        if (typeof errorMessage === 'string') {
          if (errorMessage.includes('Invalid credentials')) {
            throw new Error('Invalid Credentials');
          }
          if (errorMessage.includes('User must be verified')) {
            throw new Error('User must be verified to log in');
          }
          throw new Error(errorMessage);
        }
      }

      console.error(error);
      return null;
    }
  }

  async logout(): Promise<User | null> {
    try {
      const response = await axios.post(`${this.apiBaseUrl}/auth/logout`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorMessage = error.response.data;
        if (typeof errorMessage === 'string') {
          console.error(errorMessage);
        }
      }

      console.error(error);
      return null;
    }
  }
}

export const authService = new AuthService();
