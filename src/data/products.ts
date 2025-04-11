
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  carbonFootprint: number;
  recyclableMaterial: boolean;
  organicLabel: boolean;
  ecoScore: number;
  type: string;
  category: string;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Organic Cotton T-Shirt",
    brand: "EcoWear",
    price: 29.99,
    carbonFootprint: 2.3,
    recyclableMaterial: true,
    organicLabel: true,
    ecoScore: 5,
    type: "Clothing",
    category: "Apparel",
    image: "/placeholder.svg",
    description: "Made with 100% organic cotton, this t-shirt is comfortable and eco-friendly."
  },
  {
    id: "2",
    name: "Bamboo Toothbrush",
    brand: "GreenSmile",
    price: 4.99,
    carbonFootprint: 0.5,
    recyclableMaterial: true,
    organicLabel: true,
    ecoScore: 5,
    type: "Bathroom",
    category: "Personal Care",
    image: "/placeholder.svg",
    description: "Biodegradable bamboo toothbrush with plant-based bristles."
  },
  {
    id: "3",
    name: "Recycled Glass Water Bottle",
    brand: "AquaEarth",
    price: 24.99,
    carbonFootprint: 1.2,
    recyclableMaterial: true,
    organicLabel: false,
    ecoScore: 4,
    type: "Kitchen",
    category: "Home Goods",
    image: "/placeholder.svg",
    description: "Made from 100% recycled glass, this stylish water bottle is BPA-free and dishwasher safe."
  },
  {
    id: "4",
    name: "LED Light Bulb Pack",
    brand: "EcoLuminate",
    price: 12.99,
    carbonFootprint: 0.8,
    recyclableMaterial: true,
    organicLabel: false,
    ecoScore: 4,
    type: "Lighting",
    category: "Home Goods",
    image: "/placeholder.svg",
    description: "Energy-efficient LED bulbs that last up to 15,000 hours, saving electricity and reducing waste."
  },
  {
    id: "5",
    name: "Recycled Paper Notebook",
    brand: "GreenWrite",
    price: 8.99,
    carbonFootprint: 0.3,
    recyclableMaterial: true,
    organicLabel: false,
    ecoScore: 4,
    type: "Stationery",
    category: "Office Supplies",
    image: "/placeholder.svg",
    description: "Notebook made from 100% post-consumer recycled paper with soy-based ink printing."
  },
  {
    id: "6",
    name: "Hemp Backpack",
    brand: "NaturePack",
    price: 49.99,
    carbonFootprint: 1.8,
    recyclableMaterial: true,
    organicLabel: true,
    ecoScore: 5,
    type: "Bags",
    category: "Accessories",
    image: "/placeholder.svg",
    description: "Durable backpack made from organic hemp with recycled polyester lining."
  },
  {
    id: "7",
    name: "Solar Power Bank",
    brand: "SunCharge",
    price: 39.99,
    carbonFootprint: 2.1,
    recyclableMaterial: true,
    organicLabel: false,
    ecoScore: 4,
    type: "Electronics",
    category: "Technology",
    image: "/placeholder.svg",
    description: "Portable power bank that can be charged using solar energy, perfect for outdoor use."
  },
  {
    id: "8",
    name: "Biodegradable Phone Case",
    brand: "EcoTech",
    price: 19.99,
    carbonFootprint: 0.4,
    recyclableMaterial: true,
    organicLabel: false,
    ecoScore: 4,
    type: "Accessories",
    category: "Technology",
    image: "/placeholder.svg",
    description: "Phone case made from biodegradable materials that protects your device while being kind to the planet."
  },
  {
    id: "9",
    name: "Reusable Silicone Food Bags",
    brand: "FreshGreen",
    price: 15.99,
    carbonFootprint: 1.0,
    recyclableMaterial: true,
    organicLabel: false,
    ecoScore: 4,
    type: "Kitchen",
    category: "Home Goods",
    image: "/placeholder.svg",
    description: "Set of reusable silicone food storage bags, an eco-friendly alternative to single-use plastic bags."
  },
  {
    id: "10",
    name: "Organic Wool Sweater",
    brand: "NatureKnit",
    price: 79.99,
    carbonFootprint: 3.2,
    recyclableMaterial: true,
    organicLabel: true,
    ecoScore: 4,
    type: "Clothing",
    category: "Apparel",
    image: "/placeholder.svg",
    description: "Warm and comfortable sweater made from organic wool sourced from ethically raised sheep."
  },
  {
    id: "11",
    name: "Bamboo Cutting Board",
    brand: "EcoChef",
    price: 29.99,
    carbonFootprint: 1.3,
    recyclableMaterial: true,
    organicLabel: true,
    ecoScore: 5,
    type: "Kitchen",
    category: "Home Goods",
    image: "/placeholder.svg",
    description: "Durable bamboo cutting board, a sustainable alternative to plastic cutting boards."
  },
  {
    id: "12",
    name: "Recycled Aluminum Water Bottle",
    brand: "PureEarth",
    price: 18.99,
    carbonFootprint: 1.5,
    recyclableMaterial: true,
    organicLabel: false,
    ecoScore: 3,
    type: "Kitchen",
    category: "Home Goods",
    image: "/placeholder.svg",
    description: "Lightweight water bottle made from recycled aluminum, perfect for on-the-go hydration."
  },
  {
    id: "13",
    name: "Organic Cotton Sheets",
    brand: "DreamEco",
    price: 89.99,
    carbonFootprint: 3.5,
    recyclableMaterial: true,
    organicLabel: true,
    ecoScore: 5,
    type: "Bedding",
    category: "Home Goods",
    image: "/placeholder.svg",
    description: "Luxuriously soft sheets made from organic cotton, free from harmful chemicals and pesticides."
  },
  {
    id: "14",
    name: "Plant-Based Cleaning Spray",
    brand: "CleanGreen",
    price: 7.99,
    carbonFootprint: 0.6,
    recyclableMaterial: true,
    organicLabel: true,
    ecoScore: 5,
    type: "Cleaning",
    category: "Home Goods",
    image: "/placeholder.svg",
    description: "All-purpose cleaning spray made from plant-based ingredients, effective and eco-friendly."
  },
  {
    id: "15",
    name: "Recycled Plastic Outdoor Chair",
    brand: "EcoLiving",
    price: 79.99,
    carbonFootprint: 4.2,
    recyclableMaterial: true,
    organicLabel: false,
    ecoScore: 3,
    type: "Furniture",
    category: "Home Goods",
    image: "/placeholder.svg",
    description: "Durable outdoor chair made from recycled ocean plastic, helping to clean up our oceans."
  },
  {
    id: "16",
    name: "Solar-Powered Garden Lights",
    brand: "SunGlow",
    price: 34.99,
    carbonFootprint: 1.7,
    recyclableMaterial: true,
    organicLabel: false,
    ecoScore: 4,
    type: "Outdoor",
    category: "Garden",
    image: "/placeholder.svg",
    description: "Set of energy-efficient garden lights powered by solar energy, no electricity needed."
  },
  {
    id: "17",
    name: "Biodegradable Plant Pots",
    brand: "GrowGreen",
    price: 12.99,
    carbonFootprint: 0.7,
    recyclableMaterial: true,
    organicLabel: true,
    ecoScore: 5,
    type: "Gardening",
    category: "Garden",
    image: "/placeholder.svg",
    description: "Set of biodegradable plant pots that can be planted directly into the soil."
  },
  {
    id: "18",
    name: "Natural Rubber Yoga Mat",
    brand: "ZenEarth",
    price: 59.99,
    carbonFootprint: 2.8,
    recyclableMaterial: true,
    organicLabel: true,
    ecoScore: 4,
    type: "Exercise",
    category: "Sports & Fitness",
    image: "/placeholder.svg",
    description: "Eco-friendly yoga mat made from natural rubber, free from harmful chemicals and PVC."
  },
  {
    id: "19",
    name: "Recycled Polyester Running Shoes",
    brand: "EcoStride",
    price: 89.99,
    carbonFootprint: 3.8,
    recyclableMaterial: true,
    organicLabel: false,
    ecoScore: 3,
    type: "Footwear",
    category: "Sports & Fitness",
    image: "/placeholder.svg",
    description: "Performance running shoes made from recycled plastic bottles, comfortable and sustainable."
  },
  {
    id: "20",
    name: "Organic Cotton Baby Onesie",
    brand: "TinyEarth",
    price: 19.99,
    carbonFootprint: 1.2,
    recyclableMaterial: true,
    organicLabel: true,
    ecoScore: 5,
    type: "Clothing",
    category: "Kids & Baby",
    image: "/placeholder.svg",
    description: "Soft and gentle baby onesie made from 100% organic cotton, perfect for sensitive skin."
  }
];

export const categories = [
  { id: "apparel", name: "Apparel", image: "/placeholder.svg" },
  { id: "personal-care", name: "Personal Care", image: "/placeholder.svg" },
  { id: "home-goods", name: "Home Goods", image: "/placeholder.svg" },
  { id: "office-supplies", name: "Office Supplies", image: "/placeholder.svg" },
  { id: "accessories", name: "Accessories", image: "/placeholder.svg" },
  { id: "technology", name: "Technology", image: "/placeholder.svg" },
  { id: "garden", name: "Garden", image: "/placeholder.svg" },
  { id: "sports-fitness", name: "Sports & Fitness", image: "/placeholder.svg" },
  { id: "kids-baby", name: "Kids & Baby", image: "/placeholder.svg" }
];

export const getProductsByCategory = (categoryId: string): Product[] => {
  const categoryName = categories.find(cat => cat.id === categoryId)?.name;
  if (!categoryName) return [];
  return products.filter(product => product.category === categoryName);
};

export const searchProducts = (query: string): Product[] => {
  const lowerCaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerCaseQuery) ||
    product.brand.toLowerCase().includes(lowerCaseQuery) ||
    product.type.toLowerCase().includes(lowerCaseQuery) ||
    product.category.toLowerCase().includes(lowerCaseQuery) ||
    product.description.toLowerCase().includes(lowerCaseQuery)
  );
};
