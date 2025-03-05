import { Dog } from '@/types/dog';
import { DogSearchDTO } from '@/types/dogSearchDto';
import { Match } from '@/types/match';
import axios from 'axios';

export class DogService {
  private apiBaseUrl: string;

  constructor() {
    this.apiBaseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      'https://frontend-take-home-service.fetch.com';
  }

  async getBreeds(): Promise<string[] | null> {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/dogs/breeds`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Failed to fetch dog breeds',
          error.response?.data || error.message
        );
      } else {
        console.error('Unexpected error', error);
      }
      return null;
    }
  }

  async searchBreeds(
    breeds?: string[],
    zipcodes?: string[],
    ageMin?: number,
    ageMax?: number,
    size?: number,
    from?: number,
    sort?: string
  ): Promise<DogSearchDTO | null> {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/dogs/search`, {
        withCredentials: true,
        params: {
          breeds: breeds,
          zipCodes: zipcodes,
          ageMin: ageMin,
          ageMax: ageMax,
          size: size,
          from: from,
          sort: sort,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Failed to fetch dog breeds',
          error.response?.data || error.message
        );
      } else {
        console.error('Unexpected error', error);
      }
      return null;
    }
  }

  async getDogs(requestBody: string[]): Promise<Dog[] | null> {
    try {
      const response = await axios.post(
        `${this.apiBaseUrl}/dogs`,
        requestBody,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Failed to fetch dog breeds',
          error.response?.data || error.message
        );
      } else {
        console.error('Unexpected error', error);
      }
      return null;
    }
  }

  async matchDog(requestBody: string[]): Promise<Match | null> {
    try {
      const response = await axios.post(
        `${this.apiBaseUrl}/dogs/match`,
        requestBody,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Failed to fetch dog breeds',
          error.response?.data || error.message
        );
      } else {
        console.error('Unexpected error', error);
      }
      return null;
    }
  }
}

export const dogService = new DogService();
