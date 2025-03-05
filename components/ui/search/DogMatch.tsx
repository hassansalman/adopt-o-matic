import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Dog } from '@/types/dog';

interface DogMatchProps {
  matchedDog: Dog[];
}
const DogMatch = ({ matchedDog }: DogMatchProps) => {
  return (
    <Card className="col-span-2 max-w-md mx-auto border-none shadow-none">
      <CardContent className="p-4">
        <h2 className="text-3xl font-semibold mb-2 text-center">
          A Perfect Match!
        </h2>
        {!!matchedDog &&
          matchedDog.map((item) => (
            <Card
              key={item.id}
              className="w-full max-w-full rounded-2xl shadow-lg mb-4"
            >
              <div className="flex flex-col">
                <Image
                  src={item.img}
                  alt={item.name}
                  width={300}
                  height={200}
                  className="rounded-t-2xl w-full max-w-md h-full object-cover"
                />
                <CardContent className="p-4 content-center">
                  <h2 className="text-xl font-bold">{item.name}</h2>
                  <p className="text-gray-600">Breed: {item.breed}</p>
                  <p className="text-gray-600">Age: {item.age} years</p>
                  <p className="text-gray-600">Location: {item.zip_code}</p>
                </CardContent>
              </div>
            </Card>
          ))}
      </CardContent>
    </Card>
  );
};

export default DogMatch;
