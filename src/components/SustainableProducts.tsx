import { useEffect, useState } from 'react';
import { loadSustainableProducts, SustainableProduct } from '../utils/sustainableProducts';

export function SustainableProducts() {
  const [products, setProducts] = useState<SustainableProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <div>Loading sustainable products...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Sustainable Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600">
              Sustainability Score: {product.sustainabilityScore}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
} 