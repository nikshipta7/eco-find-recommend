
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { categories, getProductsByCategory } from '@/data/products';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CategoryDetail = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [activeSubcategory, setActiveSubcategory] = useState<string | undefined>(undefined);
  
  const category = categories.find(cat => cat.id === categoryId);
  const products = categoryId ? getProductsByCategory(categoryId, activeSubcategory) : [];

  const handleSearch = (query: string) => {
    navigate(`/?search=${encodeURIComponent(query)}`);
  };

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar onSearch={handleSearch} />
        <main className="flex-1 container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
          <p className="mb-8">The category you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/categories')}>
            View All Categories
          </Button>
        </main>
      </div>
    );
  }

  const handleSubcategoryChange = (subcategoryId: string) => {
    setActiveSubcategory(subcategoryId === 'all' ? undefined : subcategoryId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearch={handleSearch} />
      <main className="flex-1 container mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center text-muted-foreground"
          onClick={() => navigate('/categories')}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Categories
        </Button>
        
        <h1 className="text-3xl font-bold mb-8">{category.name}</h1>
        
        {category.subcategories && category.subcategories.length > 0 && (
          <Tabs defaultValue="all" className="w-full mb-8">
            <TabsList className="w-full overflow-x-auto flex flex-nowrap justify-start p-1 mb-4">
              <TabsTrigger 
                value="all" 
                onClick={() => handleSubcategoryChange('all')}
                className="whitespace-nowrap"
              >
                All Products
              </TabsTrigger>
              {category.subcategories.map((subcategory) => (
                <TabsTrigger 
                  key={subcategory.id} 
                  value={subcategory.id}
                  onClick={() => handleSubcategoryChange(subcategory.id)}
                  className="whitespace-nowrap"
                >
                  {subcategory.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
        
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              No products found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryDetail;
