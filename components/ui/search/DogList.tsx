import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import { ArrowUpDownIcon, HeartIcon } from 'lucide-react';
import { SetStateAction, useState } from 'react';
import { Dog } from '@/types/dog';
import { FilterProps } from '@/app/search/page';

interface DogFiltersProps {
  limit: number;
  totalPages: number;
  currentDogs: Dog[] | null;
  filters: FilterProps;
  setFilters: (value: SetStateAction<FilterProps>) => void;
  favoriteDogs: string[];
  setFavoriteDogs: (value: SetStateAction<string[]>) => void;
}

const DogList = ({
  limit,
  totalPages,
  currentDogs,
  filters,
  setFilters,
  favoriteDogs,
  setFavoriteDogs,
}: DogFiltersProps) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortOrderFilter, setSortOrderFilter] = useState<string>('breed');
  const [page, setPage] = useState<number>(1);

  const handleChangeSortOrder = () => {
    const sort = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(sort);
    setFilters({ ...filters, sort: sortOrderFilter + ':' + sort });
  };

  const handleSetFilterType = (val: string) => {
    setSortOrderFilter(val);
    setFilters({ ...filters, sort: val + ':' + sortOrder });
  };

  const handleNextPage = () => {
    setPage(page + 1);
    setFilters({ ...filters, from: page * limit });
  };

  const handlePrevPage = () => {
    setPage(page - 1);
    setFilters({ ...filters, from: page * limit });
  };

  const addFavoriteDog = (item: string) => {
    setFavoriteDogs((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <Card className="col-span-2">
      <div className="ml-auto max-w-64 p-4 pb-0 text-right flex">
        <Select onValueChange={(value) => handleSetFilterType(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Breed" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="mr-2">
              <SelectItem value="breed">Breed</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="age">Age</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          className="ml-2"
          onClick={handleChangeSortOrder}
          variant={'outline'}
        >
          Sort
          <ArrowUpDownIcon />
        </Button>
      </div>

      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-2">Available Dogs</h2>
        {!!currentDogs ? (
          currentDogs.map((item) => (
            <Card
              key={item.id}
              className="w-full max-w-full rounded-2xl shadow-lg mb-4"
            >
              <div className="flex">
                <Image
                  src={item.img}
                  alt={item.name}
                  width={300}
                  height={200}
                  className="rounded-t-2xl w-full max-w-48 h-48 object-cover"
                />
                <CardContent className="p-4 content-center">
                  <h2 className="text-xl font-bold">{item.name}</h2>
                  <p className="text-gray-600">Breed: {item.breed}</p>
                  <p className="text-gray-600">Age: {item.age} years</p>
                  <p className="text-gray-600">Location: {item.zip_code}</p>
                </CardContent>
                <div className="content-center ml-auto pr-8">
                  <Button
                    onClick={() => addFavoriteDog(item.id)}
                    className="bg-white p-0 hover:bg-white text-lg [&_svg]:size-8 shadow-none"
                  >
                    <HeartIcon
                      color={`${
                        favoriteDogs.includes(item.id) ? '#e32400' : '#000000'
                      }`}
                    />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No items selected</p>
        )}
        <div className="ml-auto max-w-md text-right">
          <Button disabled={page === 1} onClick={handlePrevPage}>
            Previous
          </Button>
          <span>
            Page {page} of {totalPages}
          </span>
          <Button disabled={page >= totalPages} onClick={handleNextPage}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DogList;
