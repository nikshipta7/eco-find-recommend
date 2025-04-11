
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, image }) => {
  return (
    <Link to={`/category/${id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="aspect-square relative">
          <img 
            src={image} 
            alt={name} 
            className="object-cover w-full h-full bg-muted"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-center">{name}</h3>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
