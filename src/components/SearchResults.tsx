
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/data/products';

interface SearchResultsProps {
  products: Product[];
  searchQuery: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ products, searchQuery }) => {
  if (!searchQuery.trim()) {
    return null;
  }

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
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
