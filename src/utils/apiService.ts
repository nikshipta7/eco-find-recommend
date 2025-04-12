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
  useLocalApi: false,  // Set to false to use MongoDB backend
  apiBaseUrl: 'http://localhost:5003/api',  // Updated Flask API URL with MongoDB
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
        // Use MongoDB backend
        console.log('Fetching products from MongoDB backend');
        const response = await axios.get(`${config.apiBaseUrl}/products`, {
          params: { query }
        });
        
        if (response.data.success) {
          return response.data.data.map((product: any) => ({
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
        } else {
          console.error('API error:', response.data.error);
          return [];
        }
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
        // Use MongoDB backend
        console.log('Adding product to MongoDB backend:', product);
        const response = await axios.post(
          `${config.apiBaseUrl}/add-product`, 
          product
        );
        return response.data.success;
      }
    } catch (error) {
      console.error('Error adding product:', error);
      return false;
    }
  }
};

export default apiService;
