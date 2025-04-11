
import React from 'react';
import Navbar from '@/components/Navbar';
import { categories } from '@/data/products';
import CategoryCard from '@/components/CategoryCard';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearch={handleSearch} />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">All Categories</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard 
              key={category.id} 
              id={category.id} 
              name={category.name} 
              image={category.image} 
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Categories;
