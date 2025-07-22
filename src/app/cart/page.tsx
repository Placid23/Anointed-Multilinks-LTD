'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ArrowRight, ShoppingCart, CreditCard } from 'lucide-react';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline tracking-tight">Your Shopping Cart</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Review your items and proceed to checkout.
          </p>
        </div>

        {cart.length === 0 ? (
          <Card className="text-center py-12">
            <CardHeader>
              <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
              <CardTitle className="mt-4 font-headline">Your cart is empty</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
            </CardContent>
            <CardFooter className="justify-center">
              <Button asChild>
                <Link href="/products">
                  Start Shopping <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="grid md:grid-cols-[2fr_1fr] gap-12 items-start">
            <div className="space-y-4">
              <div className='flex justify-between items-baseline'>
                <h2 className="text-2xl font-headline">Cart Items ({cart.length})</h2>
                <Button variant="outline" size="sm" onClick={clearCart}>
                  <Trash2 className="mr-2 h-4 w-4" /> Clear Cart
                </Button>
              </div>
              <Separator />
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-4 py-4">
                  <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-grow">
                    <Link href={`/products/${item.id}`} className="font-semibold hover:text-primary">{item.name}</Link>
                    <p className="text-sm text-muted-foreground">₦{item.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-sm">Quantity:</p>
                      <div className="flex items-center border rounded-md">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                           type="number"
                           className="h-8 w-12 text-center border-0 focus-visible:ring-0"
                           value={item.quantity}
                           onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                           min="1"
                        />
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₦{(item.price * item.quantity).toLocaleString()}</p>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive h-8 w-8 mt-1" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-headline">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p>₦{cartTotal.toLocaleString()}</p>
                </div>
                 <div className="flex justify-between">
                  <p className="text-muted-foreground">Shipping</p>
                  <p>Calculated at next step</p>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <p>Total</p>
                  <p>₦{cartTotal.toLocaleString()}</p>
                </div>
                 <p className="text-xs text-muted-foreground italic mt-1">Prices subject to change; contact for confirmation.</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg">
                  <CreditCard className="mr-2 h-5 w-5" /> Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>

          </div>
        )}
      </div>
    </div>
  );
}