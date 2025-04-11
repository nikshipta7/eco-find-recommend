import React from 'react';
import { SustainableProduct } from '@/utils/sustainableProducts';

interface SearchResultsProps {
  products: SustainableProduct[];
  searchQuery: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ products, searchQuery }) => {
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
          <div key={index} className="border rounded-lg p-4 shadow-sm">
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
            <p className="text-sm font-medium">₹{product.price.toFixed(2)}</p>
            <div className="mt-2 space-y-1">
              <p className="text-sm">
                Eco Score: <span className="font-medium">{product.ecoScore}/5</span>
              </p>
              <p className="text-sm">
                Carbon Footprint: <span className="font-medium">{product.carbonFootprint} kg CO2e</span>
              </p>
              {product.organicLabel && (
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Organic
                </span>
              )}
              {product.recyclableMaterial && (
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded ml-1">
                  Recyclable
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
