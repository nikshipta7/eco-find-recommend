
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onSearch: (query: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-eco-light-green/10 to-eco-green/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Discover <span className="text-eco-green">Eco-Friendly</span> Products for a Better World
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl mb-8">
            Find sustainable alternatives that reduce your carbon footprint and help protect our planet
          </p>
          
          <form onSubmit={handleSubmit} className="flex w-full max-w-xl mx-auto">
            <div className="relative w-full">
              <Input
                type="search"
                className="pr-12 py-6 text-lg w-full"
                placeholder="Search sustainable products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                className="absolute right-0 top-0 bottom-0 h-full rounded-l-none bg-eco-green hover:bg-eco-dark-green"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>
          
          <div className="mt-8 flex flex-wrap gap-2 justify-center">
            <span className="text-sm font-medium mr-2">Popular searches:</span>
            {['organic cotton', 'bamboo', 'recycled plastic', 'zero waste'].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setSearchQuery(term);
                  onSearch(term);
                }}
                className="text-sm px-3 py-1 rounded-full bg-eco-green/10 hover:bg-eco-green/20 text-eco-dark-green"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
