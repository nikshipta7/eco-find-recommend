
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product } from '@/data/products';
import { SustainableProduct } from '@/utils/sustainableProducts';
import { toast } from 'sonner';

export type CartItemType = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  type?: string;
};

interface CartContextType {
  cartItems: CartItemType[];
  addToCart: (product: Product | SustainableProduct, quantity: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const addToCart = (product: Product | SustainableProduct, quantity: number) => {
    setCartItems(prevItems => {
      // Check if product has required fields
      if (!product.name || typeof product.price !== 'number') {
        console.error('Invalid product data:', product);
        return prevItems;
      }

      // Create a product ID - use product.id if available, otherwise create one from the name
      const productId = (product as Product).id || `sustainable-${product.name.toLowerCase().replace(/\s+/g, '-')}`;
      
      // Check if the item already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.id === productId);
      
      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast.success(`Updated ${product.name} quantity in cart`);
        return updatedItems;
      } else {
        // Add new item
        const image = (product as Product).image || (product as SustainableProduct).imageUrl || '';
        toast.success(`Added ${product.name} to cart`);
        return [...prevItems, {
          id: productId,
          name: product.name,
          price: product.price,
          image: image,
          quantity: quantity,
          type: product.type
        }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prevItems => {
      const item = prevItems.find(item => item.id === id);
      if (item) {
        toast.info(`Removed ${item.name} from cart`);
      }
      return prevItems.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info('Cart cleared');
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
