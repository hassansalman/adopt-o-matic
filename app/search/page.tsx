'use client';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/ui/Navbar';
import DogFilters from '@/components/ui/search/DogFilters';
import DogList from '@/components/ui/search/DogList';
import DogMatch from '@/components/ui/search/DogMatch';
import { dogService } from '@/services/dog.service';
import { Dog } from '@/types/dog';
import { HeartIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface FilterProps {
  breed: string[];
  maxAge: number;
  minAge: number;
  from: number;
  sort: string;
  page: number;
}

export default function SearchPage() {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const limit = 25;
  const [totalResults, setTotalResults] = useState<number | undefined>(25);
  const totalPages = Math.ceil(totalResults! / limit) || 0;
  const [favoriteDogs, setFavoriteDogs] = useState<string[]>([]);
  const [currentBreedsId, setCurrentBreedsId] = useState<string[] | undefined>(
    []
  );
  const [matchedDog, setMatchedDog] = useState<Dog[] | null>(null);
  const [apiError, setApiError] = useState<string>('');
  const [filters, setFilters] = useState<FilterProps>({
    breed: selectedBreeds,
    maxAge: 100,
    minAge: 0,
    from: 0,
    sort: 'breed:asc',
    page: 0,
  });
  const [currentDogs, setCurrentDogs] = useState<Dog[] | null>([]);

  const toggleItem = (item: string) => {
    setSelectedBreeds((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  {
    /* Search Breeds Function */
  }
  useEffect(() => {
    const searchDogBreeds = async () => {
      try {
        const response = await dogService.searchBreeds(
          selectedBreeds,
          [],
          filters.minAge,
          filters.maxAge,
          limit,
          filters.from,
          filters.sort
        );
        setCurrentBreedsId(response?.resultIds);
        setTotalResults(response?.total);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    searchDogBreeds();
  }, [selectedBreeds, filters]);

  {
    /* Get Dogs Function */
  }

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await dogService.getDogs(currentBreedsId as string[]);
        setCurrentDogs(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDogs();
  }, [currentBreedsId]);

  const getFavoritesMatch = async () => {
    try {
      const response = await dogService.matchDog(favoriteDogs);
      const response2 = await dogService.getDogs([
        response?.match,
      ] as unknown as string[]);
      setMatchedDog(response2 as unknown as Dog[]);
    } catch (error) {
      setApiError(error as string);
      console.error('Error fetching data:', error);
    }
  };

  console.log('matchedDog', matchedDog);

  return (
    <>
      <Navbar />
      <div className="flex flex-col max-w-sm text-center p-8 mx-auto">
        <h2 className="mb-2 font-bold">
          Select your favorite dogs and find a match when finished searching.
        </h2>
        <Button
          className="mb-4"
          variant={'destructive'}
          onClick={getFavoritesMatch}
        >
          Find Match <HeartIcon />
        </Button>
        {!!apiError && <p className="text-destructive font-bold">{apiError}</p>}
      </div>
      {!matchedDog ? (
        <div className="grid grid-cols-3 gap-4 p-6">
          {/* Left Column - Breeds List */}
          <DogFilters
            selectedBreeds={selectedBreeds}
            filters={filters}
            setFilters={setFilters}
            toggleItem={toggleItem}
          />

          {/* Right Column - Current Dogs */}
          <DogList
            limit={limit}
            totalPages={totalPages}
            currentDogs={currentDogs}
            filters={filters}
            setFilters={setFilters}
            favoriteDogs={favoriteDogs}
            setFavoriteDogs={setFavoriteDogs}
          />
        </div>
      ) : (
        <DogMatch matchedDog={matchedDog} />
      )}
    </>
  );
}
