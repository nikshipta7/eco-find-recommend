
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCart } from '@/contexts/CartContext';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';

const CartDropdown: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    // In a real app, navigate to checkout page
    alert('Proceeding to checkout! This would navigate to a checkout page in a real app.');
    // For demo purposes, we'll just clear the cart
    clearCart();
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <h2 className="font-medium">Shopping Cart ({totalItems} items)</h2>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            Your cart is empty
          </div>
        ) : (
          <>
            <ScrollArea className="max-h-80">
              <div className="p-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                  />
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t">
              <div className="flex justify-between mb-4">
                <span>Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <Button className="w-full" onClick={handleCheckout}>
                Proceed to Payment
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default CartDropdown;
