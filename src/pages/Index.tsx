import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedCategories from '@/components/FeaturedCategories';
import SearchResults from '@/components/SearchResults';
import { loadSustainableProducts, searchProducts, SustainableProduct } from '@/utils/sustainableProducts';

const Index = () => {
  const [searchResults, setSearchResults] = useState<SustainableProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState<SustainableProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        console.log('Loading products...');  // Debug log
        const products = await loadSustainableProducts(searchQuery);
        console.log('Loaded products:', products.length);  // Debug log
        setAllProducts(products);
        setSearchResults(products);
        setLoading(false);
      } catch (error) {
        console.error('Error loading products:', error);
        setLoading(false);
      }
    }
    loadProducts();
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    console.log('Handling search for:', query);  // Debug log
    setSearchQuery(query);
    setLoading(true);
    
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
        
        <div id="search-results" className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-8">Loading products...</div>
          ) : searchQuery ? (
            <SearchResults products={searchResults} searchQuery={searchQuery} />
          ) : (
            <FeaturedCategories />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
