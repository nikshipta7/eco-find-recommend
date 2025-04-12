
import apiService from './apiService';

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
    const products = await apiService.getProducts(query);
    console.log('Loaded products:', products.length);  // Debug log
    return products;
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
  // Sort products by sustainability score in descending order
  return products.sort((a, b) => {
    const scoreA = a.sustainabilityScore || 0;
    const scoreB = b.sustainabilityScore || 0;
    return scoreB - scoreA;
  });
}

// Export the addProduct function to make it available for adding new products
export async function addSustainableProduct(product: Omit<SustainableProduct, 'sustainabilityScore'>): Promise<boolean> {
  return apiService.addProduct(product);
}
