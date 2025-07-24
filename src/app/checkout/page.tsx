
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import { Loader } from 'lucide-react';
import { createOrder } from './actions';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        toast({
          title: 'Authentication Required',
          description: 'Please log in to proceed to checkout.',
          variant: 'destructive',
        });
        router.push('/auth?mode=login&redirect=/checkout');
      } else {
        setUser(data.user);
      }
      setIsLoading(false);
    };
    checkUser();
  }, [router, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
        toast({ title: 'Your cart is empty', variant: 'destructive' });
        return;
    }
    if(!user) {
        toast({ title: 'You must be logged in to place an order.', variant: 'destructive' });
        return;
    }
    setIsLoading(true);

    try {
        const result = await createOrder({
            cart,
            totalAmount: cartTotal,
            shippingAddress: address,
            user,
        });

        if (result.error) {
            throw new Error(result.error);
        }

        toast({
            title: 'Order Placed!',
            description: `Your order #${result.order.id.substring(0,8)} has been placed successfully.`,
        });
        clearCart();
        router.push(`/account/orders/${result.order.id}`);

    } catch (error: any) {
        toast({
            title: 'Order Failed',
            description: error.message || 'There was an issue placing your order. Please try again.',
            variant: 'destructive'
        });
    } finally {
        setIsLoading(false);
    }
  };
  
  if (isLoading || !user) {
    return (
        <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[50vh]">
            <Loader className="animate-spin h-8 w-8" />
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-slide-in-from-bottom">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-headline tracking-tight mb-8">Checkout</h1>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>Enter the address where you want to receive your order.</CardDescription>
              </CardHeader>
              <CardContent>
                <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input id="street" name="street" value={address.street} onChange={handleInputChange} required />
                  </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" value={address.city} onChange={handleInputChange} required />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" name="state" value={address.state} onChange={handleInputChange} required />
                    </div>
                   </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP / Postal Code</Label>
                    <Input id="zip" name="zip" value={address.zip} onChange={handleInputChange} required />
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </Header>
              <CardContent className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <p>{item.name} <span className="text-muted-foreground">x {item.quantity}</span></p>
                    <p>₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-lg pt-4 border-t">
                  <p>Total</p>
                  <p>₦{cartTotal.toLocaleString()}</p>
                </div>
              </CardContent>
              <CardFooter>
                 <Button form="checkout-form" type="submit" className="w-full" size="lg" disabled={isLoading}>
                   {isLoading ? <Loader className="animate-spin mr-2" /> : null}
                  {isLoading ? 'Placing Order...' : 'Place Order'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
