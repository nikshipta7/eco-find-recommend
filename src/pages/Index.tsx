
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedCategories from '@/components/FeaturedCategories';
import SearchResults from '@/components/SearchResults';
import { searchProducts, Product } from '@/data/products';

const Index = () => {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSearchResults(searchProducts(query));
    
    // Scroll to search results if there are any
    if (query.trim()) {
      setTimeout(() => {
        window.scrollTo({
          top: document.getElementById('search-results')?.offsetTop || 0,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearch={handleSearch} />
      <main>
        <Hero onSearch={handleSearch} />
        
        <div id="search-results">
          <div className="container mx-auto px-4">
            <SearchResults products={searchResults} searchQuery={searchQuery} />
          </div>
        </div>
        
        {!searchQuery && <FeaturedCategories />}
      </main>
    </div>
  );
};

export default Index;
