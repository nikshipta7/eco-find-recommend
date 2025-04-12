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
  subcategory?: string;
  image: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  subcategories?: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
}

export const categories: Category[] = [
  { 
    id: "personal-care", 
    name: "Personal Care / Hygiene", 
    image: "/src/images/personal_care.jpeg",
    subcategories: [
      { id: "soap", name: "Soap (Herbal, Antibacterial)" },
      { id: "toothpaste", name: "Toothpaste (Whitening, Herbal)" },
      { id: "toothbrush", name: "Toothbrush (Soft, Medium)" },
      { id: "lotion", name: "Lotion (Moisturizing, Soothing)" },
      { id: "body-wash", name: "Body Wash" },
      { id: "shampoo", name: "Shampoo" },
      { id: "conditioner", name: "Conditioner" },
      { id: "face-wash", name: "Face Wash" },
      { id: "deodorant", name: "Deodorant" },
      { id: "hand-sanitizer", name: "Hand Sanitizer" },
      { id: "wet-wipes", name: "Wet Wipes" },
      { id: "face-scrub", name: "Face Scrub" },
      { id: "lip-balm", name: "Lip Balm" },
      { id: "sunscreen", name: "Sunscreen" },
      { id: "mouthwash", name: "Mouthwash" }
    ]
  },
  { 
    id: "grooming-haircare", 
    name: "Grooming & Haircare", 
    image: "/src/images/grooming.webp",
    subcategories: [
      { id: "hair-oil", name: "Hair Oil" },
      { id: "beard-oil", name: "Beard Oil" },
      { id: "hair-gel", name: "Hair Gel / Pomade" },
      { id: "shaving-cream", name: "Shaving Cream" },
      { id: "razor", name: "Razor / Eco Razor" },
      { id: "cotton-swabs", name: "Cotton Swabs" },
      { id: "comb", name: "Comb / Hair Brush" }
    ]
  },
  { 
    id: "household-cleaning", 
    name: "Household & Cleaning", 
    image: "/src/images/cleaning.png",
    subcategories: [
      { id: "dishwashing-liquid", name: "Dishwashing Liquid" },
      { id: "floor-cleaner", name: "Floor Cleaner" },
      { id: "laundry-detergent", name: "Laundry Detergent (Eco-friendly)" },
      { id: "toilet-cleaner", name: "Toilet Cleaner" },
      { id: "cleaning-cloths", name: "Reusable Cleaning Cloths" },
      { id: "garbage-bags", name: "Garbage Bags (Biodegradable)" },
      { id: "kitchen-towels", name: "Reusable Kitchen Towels" },
      { id: "air-freshener", name: "Air Freshener (Natural)" }
    ] 
  },
  { 
    id: "natural-wellness", 
    name: "Additional Natural Wellness Products", 
    image: "/src/images/additional.webp",
    subcategories: [
      { id: "essential-oils", name: "Essential Oils (Lavender, Peppermint)" },
      { id: "organic-soap", name: "Organic Hand Soap" },
      { id: "bamboo-pads", name: "Bamboo Cotton Pads" },
      { id: "hair-mask", name: "Herbal Hair Mask" },
      { id: "face-pack", name: "Clay Face Pack" }
    ]
  }
];

// Our sample products
export const products: Product[] = [
  // Personal Care / Hygiene
  {
    id: "1",
    name: "Herbal Antibacterial Soap",
    brand: "EcoClean",
    price: 5.99,
    carbonFootprint: 0.8,
    recyclableMaterial: true,
    organicLabel: true,
    ecoScore: 5,
    type: "Soap",
    category: "Personal Care / Hygiene",
    subcategory: "soap",
    image: "/src/images/additional.webp",
    description: "Handmade herbal soap with antibacterial properties from natural ingredients."
  },
  {
    id: "2",
    name: "Whitening Herbal Toothpaste",
    brand: "NatureBright",
    price: 4.99,
    carbonFootprint: 0.5,
    recyclableMaterial: true,
    organicLabel: true,
    ecoScore: 5,
    type: "Toothpaste",
    category: "Personal Care / Hygiene",
    subcategory: "toothpaste",
    image: "/src/images/additional.webp",
    description: "Natural toothpaste that brightens your smile without harsh chemicals."
  },
  
  // Grooming & Haircare
  {
    id: "15",
    name: "Organic Argan Hair Oil",
    brand: "PureRoots",
    price: 14.99,
    carbonFootprint: 1.2,
    recyclableMaterial: true,
    organicLabel: true,
    ecoScore: 4,
    type: "Hair Oil",
    category: "Grooming & Haircare",
    subcategory: "hair-oil",
    image: "/placeholder.svg",
    description: "Nourishing hair oil made from organic argan nuts to strengthen and moisturize hair."
  },
  {
    id: "16",
    name: "Cedar & Sandalwood Beard Oil",
    brand: "WildGrooming",
    price: 18.99,
    carbonFootprint: 1.0,
    recyclableMaterial: true,
    organicLabel: true,
    ecoScore: 4,
    type: "Beard Oil",
    category: "Grooming & Haircare",
    subcategory: "beard-oil",
    image: "/placeholder.svg",
    description: "Premium beard oil with cedar and sandalwood essential oils for a well-groomed beard."
  },
  
  // Household & Cleaning
  {
    id: "23",
    name: "Citrus Enzyme Dishwashing Liquid",
    brand: "CleanGreen",
    price: 6.99,
    carbonFootprint: 0.9,
    recyclableMaterial: true,
    organicLabel: true,
    ecoScore: 5,
    type: "Dishwashing Liquid",
    category: "Household & Cleaning",
    subcategory: "dishwashing-liquid",
    image: "/placeholder.svg",
    description: "Plant-based dishwashing liquid with natural citrus enzymes that cut through grease."
  },
  {
    id: "24",
    name: "Multi-Surface Floor Cleaner",
    brand: "EcoHome",
    price: 9.99,
    carbonFootprint: 1.1,
    recyclableMaterial: true,
    organicLabel: false,
    ecoScore: 4,
    type: "Floor Cleaner",
    category: "Household & Cleaning",
    subcategory: "floor-cleaner",
    image: "/placeholder.svg",
    description: "Effective floor cleaner made with biodegradable ingredients safe for all surfaces."
  },
  
  // Additional Natural Wellness Products
  {
    id: "31",
    name: "Lavender Essential Oil",
    brand: "PureEssence",
    price: 12.99,
    carbonFootprint: 0.7,
    recyclableMaterial: true,
    organicLabel: true,
    ecoScore: 5,
    type: "Essential Oil",
    category: "Additional Natural Wellness Products",
    subcategory: "essential-oils",
    image: "/placeholder.svg",
    description: "100% pure lavender essential oil for relaxation and natural aromatherapy."
  },
  {
    id: "32",
    name: "Organic Liquid Hand Soap",
    brand: "PureHands",
    price: 7.99,
    carbonFootprint: 0.8,
    recyclableMaterial: true,
    organicLabel: true,
    ecoScore: 5,
    type: "Hand Soap",
    category: "Additional Natural Wellness Products",
    subcategory: "organic-soap",
    image: "/placeholder.svg",
    description: "Gentle organic hand soap with moisturizing plant extracts in a recyclable bottle."
  }
];

export const getProductsByCategory = (categoryId: string, subcategoryId?: string): Product[] => {
  const categoryName = categories.find(cat => cat.id === categoryId)?.name;
  if (!categoryName) return [];
  
  let filteredProducts = products.filter(product => product.category === categoryName);
  
  // If subcategory is provided, filter by it too
  if (subcategoryId) {
    filteredProducts = filteredProducts.filter(product => product.subcategory === subcategoryId);
  }
  
  return filteredProducts;
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
