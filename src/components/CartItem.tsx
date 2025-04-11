
import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItemType } from '@/contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  updateQuantity, 
  removeFromCart 
}) => {
  return (
    <div className="flex items-start py-3 border-b last:border-b-0">
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mr-3">
        <img
          src={item.image || '/placeholder.svg'}
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex justify-between text-base font-medium">
          <h3 className="line-clamp-1">{item.name}</h3>
          <p className="ml-2">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500 line-clamp-1">{item.type || 'Product'}</p>
        <div className="flex items-center mt-2 justify-between">
          <div className="flex items-center border rounded-md">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 rounded-l-md"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 rounded-r-md"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => removeFromCart(item.id)}
            className="h-7 w-7 text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
