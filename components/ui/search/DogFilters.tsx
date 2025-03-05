import { FilterProps } from '@/app/search/page';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dogService } from '@/services/dog.service';
import { SetStateAction, useEffect, useState } from 'react';

interface DogFiltersProps {
  selectedBreeds: string[];
  filters: FilterProps;
  setFilters: (value: SetStateAction<FilterProps>) => void;
  toggleItem: (item: string) => void;
}

const DogFilters = ({
  selectedBreeds,
  setFilters,
  filters,
  toggleItem,
}: DogFiltersProps) => {
  const [breedsList, setBreedsList] = useState<string[] | null>([]);

  const handleChangeMaxAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = e.target.value ? Number(e.target.value) : '';
    setFilters({ ...filters, maxAge: Number(num) });
  };
  const handleChangeMinAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = e.target.value ? Number(e.target.value) : '';
    setFilters({ ...filters, minAge: Number(num) });
  };

  useEffect(() => {
    const fetchBreedsList = async () => {
      try {
        const response = await dogService.getBreeds();
        setBreedsList(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBreedsList();
  }, []);

  return (
    <Card className="max-w-md col-span-1">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-2">Dog Breeds</h2>
        <div className="space-y-2">
          {breedsList &&
            breedsList.map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <Checkbox
                  id={item}
                  checked={selectedBreeds.includes(item)}
                  onCheckedChange={() => toggleItem(item)}
                />
                <Label htmlFor={item}>{item}</Label>
              </div>
            ))}
        </div>
        <div className="space-y-2 my-4 max-w-32">
          <Label htmlFor="maxAge">Min Age</Label>
          <Input
            onChange={handleChangeMinAge}
            type="number"
            id="minAge"
            placeholder="Min Age"
          />
        </div>
        <div className="space-y-2 max-w-32">
          <Label htmlFor="maxAge">Max Age</Label>
          <Input
            onChange={handleChangeMaxAge}
            type="number"
            id="maxAge"
            placeholder="Max Age"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DogFilters;
