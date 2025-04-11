import axios from 'axios';

export interface SustainableProduct {
  name: string;
  brand: string;
  price: number;
  ecoScore: number;
  carbonFootprint: number;
  organicLabel: boolean;
  recyclableMaterial: boolean;
  imageUrl: string;
  type: string;
  sustainabilityScore: number | null;
}

export async function loadSustainableProducts(query: string = ''): Promise<SustainableProduct[]> {
  try {
    const response = await axios.get('http://localhost:5003/api/sustainable-products', {
      params: { query }
    });
    console.log('API Response:', response.data);  // Debug log
    
    if (response.data.success) {
      return response.data.data.map((product: any) => {
        // Extract numeric price from "INR X" format
        const priceMatch = product.Price.match(/INR\s*(\d+)/);
        const price = priceMatch ? parseFloat(priceMatch[1]) : 0;
        
        return {
          name: product['Product Name'],
          brand: product.Brand,
          price: price,
          ecoScore: product['EcoScore (1-5)'],
          carbonFootprint: product['Carbon Footprint (kg CO2e)'],
          organicLabel: product['Organic Label'],
          recyclableMaterial: product['Recyclable Material'],
          imageUrl: product['Image URL'],
          type: product['Type of the Product'] || 'General',
          sustainabilityScore: product['Predicted Sustainability']
        };
      });
    } else {
      console.error('Error loading sustainable products:', response.data.error);
      return [];
    }
  } catch (error) {
    console.error('Error loading sustainable products:', error);
    return [];
  }
}

export function searchProducts(products: SustainableProduct[], query: string): SustainableProduct[] {
  if (!query.trim()) return [];
  
  console.log('Searching products:', products.length, 'total products');  // Debug log
  console.log('Search query:', query);  // Debug log
  
  const searchTerms = query.toLowerCase().split(' ');
  const results = products.filter(product => {
    const searchText = `${product.name} ${product.type} ${product.brand}`.toLowerCase();
    const matches = searchTerms.every(term => searchText.includes(term));
    if (matches) {
      console.log('Found match:', product.name);  // Debug log
    }
    return matches;
  });
  
  console.log('Found results:', results.length);  // Debug log
  return results;
}

export function getProductRecommendations(products: SustainableProduct[]): SustainableProduct[] {
  // Implement your recommendation logic here
  // This is a placeholder - you'll need to update this based on your actual recommendation logic
  return products.sort((a, b) => b.sustainabilityScore - a.sustainabilityScore);
} 