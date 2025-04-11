
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, Recycle } from 'lucide-react';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const renderEcoScore = () => {
    return Array(5).fill(0).map((_, index) => (
      <Leaf 
        key={index} 
        className={`h-4 w-4 ${index < product.ecoScore ? 'text-eco-green' : 'text-muted'}`} 
        fill={index < product.ecoScore ? 'currentColor' : 'none'}
      />
    ));
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-square relative bg-muted">
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {product.organicLabel && (
            <Badge className="bg-eco-leaf text-white">Organic</Badge>
          )}
          {product.recyclableMaterial && (
            <Badge className="bg-eco-water text-white flex items-center gap-1">
              <Recycle className="h-3 w-3" /> Recyclable
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium line-clamp-2">{product.name}</h3>
          <span className="font-bold">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
        <div className="flex items-center mt-auto">
          <span className="text-xs mr-2">EcoScore:</span>
          <div className="flex">{renderEcoScore()}</div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 text-xs text-muted-foreground border-t">
        <div className="w-full flex justify-between">
          <span>Carbon: {product.carbonFootprint} kg CO₂e</span>
          <span>{product.type}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
