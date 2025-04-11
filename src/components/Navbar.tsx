
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CartDropdown from './CartDropdown';

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-10">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-eco-green" />
            <span className="text-xl font-bold text-eco-dark-green">EcoFind</span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/categories" className="text-foreground hover:text-primary transition-colors">
              Categories
            </Link>
            <Link to="/sustainable-products" className="text-foreground hover:text-primary transition-colors">
              Sustainable Products
            </Link>
            <Link to="/login" className="text-foreground hover:text-primary transition-colors">
              Login
            </Link>
            <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
          </div>
          
          <form onSubmit={handleSubmit} className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search eco-friendly products..."
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          </form>
          
          <div className="flex items-center">
            <CartDropdown />
            <div className="md:hidden ml-2">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-4 flex md:hidden">
          <Input
            type="search"
            placeholder="Search eco-friendly products..."
            className="w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" variant="ghost" className="-ml-10">
            <Search className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
