
import { useEffect, useState } from 'react';
import { loadSustainableProducts, SustainableProduct } from '../utils/sustainableProducts';
import Navbar from './Navbar';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

export function SustainableProducts() {
  const [products, setProducts] = useState<SustainableProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await loadSustainableProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load sustainable products');
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleAddToCart = (product: SustainableProduct) => {
    addToCart(product, 1);
  };
  
  // Handle search
  const handleSearch = (query: string) => {
    navigate(`/?search=${encodeURIComponent(query)}`);
  };

  if (loading) {
    return (
      <div>
        <Navbar onSearch={handleSearch} />
        <div className="container mx-auto p-8 text-center">
          Loading sustainable products...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar onSearch={handleSearch} />
        <div className="container mx-auto p-8">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Sustainable Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              
              <Button 
                onClick={() => handleAddToCart(product)}
                size="sm"
                className="gap-1 mt-4"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
