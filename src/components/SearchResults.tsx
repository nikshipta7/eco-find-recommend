
import React, { useState } from 'react';
import { SustainableProduct } from '@/utils/sustainableProducts';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface SearchResultsProps {
  products: SustainableProduct[];
  searchQuery: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ products, searchQuery }) => {
  const { addToCart } = useCart();
  
  // Store quantities for each product
  const [quantities, setQuantities] = useState<Record<string, number>>(
    products.reduce((acc, product) => {
      acc[product.name] = 1;
      return acc;
    }, {} as Record<string, number>)
  );
  
  const handleIncrement = (productName: string) => {
    setQuantities(prev => ({
      ...prev,
      [productName]: (prev[productName] || 1) + 1
    }));
  };
  
  const handleDecrement = (productName: string) => {
    setQuantities(prev => ({
      ...prev,
      [productName]: Math.max((prev[productName] || 1) - 1, 1)
    }));
  };
  
  const handleAddToCart = (product: SustainableProduct) => {
    addToCart(product, quantities[product.name] || 1);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-2">No results found</h2>
        <p className="text-muted-foreground">
          We couldn't find any products matching "{searchQuery}"
        </p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold mb-6">
        Search results for "{searchQuery}" ({products.length})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-sm flex flex-col">
            {product.imageUrl && (
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
            )}
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.brand}</p>
            <p className="text-sm text-gray-600">Type: {product.type}</p>
            <p className="text-sm font-medium mb-2">₹{product.price.toFixed(2)}</p>
            <div className="mt-auto space-y-1">
              <p className="text-sm">
                Eco Score: <span className="font-medium">{product.ecoScore}/5</span>
              </p>
              <p className="text-sm">
                Carbon Footprint: <span className="font-medium">{product.carbonFootprint} kg CO2e</span>
              </p>
              <div className="flex flex-wrap gap-1 mt-1">
                {product.organicLabel && (
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    Organic
                  </span>
                )}
                {product.recyclableMaterial && (
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    Recyclable
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-2 border-t">
              <div className="flex items-center border rounded-md">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-l-md p-0"
                  onClick={() => handleDecrement(product.name)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm">{quantities[product.name] || 1}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-r-md p-0"
                  onClick={() => handleIncrement(product.name)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <Button 
                onClick={() => handleAddToCart(product)}
                size="sm"
                className="gap-1"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
