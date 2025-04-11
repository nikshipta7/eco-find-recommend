
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/products';
import CategoryCard from './CategoryCard';

const FeaturedCategories: React.FC = () => {
  // Show only 4 featured categories
  const featuredCategories = categories.slice(0, 4);

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Popular Categories</h2>
          <Link 
            to="/categories" 
            className="text-primary flex items-center hover:underline"
          >
            <span>View all</span>
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredCategories.map((category) => (
            <CategoryCard 
              key={category.id} 
              id={category.id} 
              name={category.name} 
              image={category.image} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
