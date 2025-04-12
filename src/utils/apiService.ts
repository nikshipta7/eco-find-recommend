
import axios from 'axios';
import { SustainableProduct } from './sustainableProducts';

// Mock data for development (when backend is not available)
const mockProducts: SustainableProduct[] = [
  {
    name: "Bamboo Toothbrush",
    brand: "EcoSmile",
    price: 4.99,
    ecoScore: 4.5,
    carbonFootprint: 0.3,
    organicLabel: true,
    recyclableMaterial: true,
    imageUrl: "/placeholder.svg",
    type: "Personal Care",
    sustainabilityScore: 8.5
  },
  {
    name: "Organic Cotton Towels",
    brand: "EcoHome",
    price: 19.99,
    ecoScore: 4.2,
    carbonFootprint: 1.2,
    organicLabel: true,
    recyclableMaterial: true,
    imageUrl: "/placeholder.svg",
    type: "Home Goods",
    sustainabilityScore: 7.8
  },
  {
    name: "Biodegradable Cleaning Spray",
    brand: "CleanGreen",
    price: 6.49,
    ecoScore: 4.8,
    carbonFootprint: 0.5,
    organicLabel: true,
    recyclableMaterial: true,
    imageUrl: "/placeholder.svg",
    type: "Household",
    sustainabilityScore: 9.2
  }
];

// Configuration object
const config = {
  useLocalApi: true,  // Toggle between mock data and actual API
  apiBaseUrl: 'http://localhost:5000',  // Flask API URL
};

// API service
const apiService = {
  /**
   * Get products from the API or use mock data
   */
  async getProducts(query: string = ''): Promise<SustainableProduct[]> {
    try {
      if (config.useLocalApi) {
        console.log('Using mock data for products');
        // Filter mock data if query exists
        if (query) {
          const lowercaseQuery = query.toLowerCase();
          return mockProducts.filter(product => 
            product.name.toLowerCase().includes(lowercaseQuery) ||
            product.brand.toLowerCase().includes(lowercaseQuery) ||
            product.type.toLowerCase().includes(lowercaseQuery)
          );
        }
        return Promise.resolve(mockProducts);
      } else {
        // Use actual API
        const response = await axios.get(`${config.apiBaseUrl}/get_products`, {
          params: { query }
        });
        return response.data.map((product: any) => ({
          name: product.name,
          brand: product.brand,
          price: product.price,
          ecoScore: product.ecoScore,
          carbonFootprint: product.carbonFootprint,
          organicLabel: product.organicLabel,
          recyclableMaterial: product.recyclableMaterial,
          imageUrl: product.imageUrl || '/placeholder.svg',
          type: product.type,
          sustainabilityScore: product.sustainabilityScore
        }));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  /**
   * Add a product to the database
   */
  async addProduct(product: Omit<SustainableProduct, 'sustainabilityScore'>): Promise<boolean> {
    try {
      if (config.useLocalApi) {
        console.log('Mock adding product:', product);
        // In a real app, this would add to the database
        // For development, we just log it
        return Promise.resolve(true);
      } else {
        // Calculate a sustainability score based on product attributes
        const calculatedScore = 
          (product.ecoScore * 1.5) + 
          (product.organicLabel ? 2 : 0) + 
          (product.recyclableMaterial ? 2 : 0) - 
          (product.carbonFootprint * 0.5);
        
        const productToAdd = {
          ...product,
          sustainabilityScore: parseFloat(calculatedScore.toFixed(1))
        };
        
        const response = await axios.post(
          `${config.apiBaseUrl}/add_product`, 
          productToAdd
        );
        return response.data && response.data.message === "Product added successfully!";
      }
    } catch (error) {
      console.error('Error adding product:', error);
      return false;
    }
  }
};

export default apiService;
