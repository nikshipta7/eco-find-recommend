
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { addSustainableProduct } from '@/utils/sustainableProducts';
import { toast } from 'sonner';

export function AdminProductForm() {
  const [productData, setProductData] = useState({
    name: '',
    brand: '',
    price: 0,
    ecoScore: 0,
    carbonFootprint: 0,
    organicLabel: false,
    recyclableMaterial: false,
    imageUrl: '/placeholder.svg',
    type: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setProductData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setProductData(prev => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setProductData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setProductData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!productData.name || !productData.brand || !productData.type) {
        toast.error("Please fill in all required fields");
        return;
      }

      const success = await addSustainableProduct(productData);
      
      if (success) {
        toast.success("Product added successfully!");
        // Reset form
        setProductData({
          name: '',
          brand: '',
          price: 0,
          ecoScore: 0,
          carbonFootprint: 0,
          organicLabel: false,
          recyclableMaterial: false,
          imageUrl: '/placeholder.svg',
          type: '',
        });
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("An error occurred while adding the product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add New Sustainable Product</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name*</Label>
            <Input 
              id="name" 
              name="name" 
              value={productData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="brand">Brand*</Label>
            <Input 
              id="brand" 
              name="brand" 
              value={productData.brand} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Product Type*</Label>
            <Input 
              id="type" 
              name="type" 
              value={productData.type} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Price*</Label>
            <Input 
              id="price" 
              name="price" 
              type="number" 
              min="0" 
              step="0.01" 
              value={productData.price} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ecoScore">Eco Score (1-5)*</Label>
            <Input 
              id="ecoScore" 
              name="ecoScore" 
              type="number" 
              min="1" 
              max="5" 
              step="0.1" 
              value={productData.ecoScore} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="carbonFootprint">Carbon Footprint (kg CO2e)*</Label>
            <Input 
              id="carbonFootprint" 
              name="carbonFootprint" 
              type="number" 
              min="0" 
              step="0.1" 
              value={productData.carbonFootprint} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input 
              id="imageUrl" 
              name="imageUrl" 
              value={productData.imageUrl} 
              onChange={handleChange} 
              placeholder="/placeholder.svg" 
            />
          </div>
          
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="organicLabel" 
                checked={productData.organicLabel} 
                onCheckedChange={(checked) => 
                  handleCheckboxChange("organicLabel", checked === true)
                } 
              />
              <Label htmlFor="organicLabel">Organic Label</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="recyclableMaterial" 
                checked={productData.recyclableMaterial} 
                onCheckedChange={(checked) => 
                  handleCheckboxChange("recyclableMaterial", checked === true)
                } 
              />
              <Label htmlFor="recyclableMaterial">Recyclable Material</Label>
            </div>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full mt-6" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding Product...' : 'Add Product'}
        </Button>
      </form>
    </div>
  );
}
