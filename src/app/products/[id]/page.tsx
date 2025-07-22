'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/data';
import { StarRating } from '@/components/product/StarRating';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Heart, Share2, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '@/components/product/ProductCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0,4);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="flex flex-col gap-4">
          <div className="aspect-square relative rounded-lg overflow-hidden border">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint={product.aiHint}
            />
             {product.stockStatus === 'In Stock' && <Badge className="absolute top-3 right-3 bg-green-500 text-white">{product.stockStatus}</Badge>}
            {product.stockStatus === 'Low Stock' && <Badge variant="destructive" className="absolute top-3 right-3">{product.stockStatus}</Badge>}
            {product.stockStatus === 'Out of Stock' && <Badge variant="secondary" className="absolute top-3 right-3">{product.stockStatus}</Badge>}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm text-muted-foreground">{product.category} &gt; {product.brand}</p>
            <h1 className="text-4xl font-bold font-headline mt-1">{product.name}</h1>
            <div className="mt-4 flex items-center gap-4">
              <StarRating rating={product.rating} />
              <p className="text-sm text-muted-foreground">({product.reviewsCount} reviews)</p>
            </div>
          </div>

          <div>
            <p className="text-3xl font-bold text-primary">
              ₦{product.price.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground italic mt-1">Prices subject to change; contact for confirmation.</p>
          </div>

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          
          <div className="flex items-center gap-4">
            <p className="font-medium">Quantity:</p>
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-bold">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
             <Button size="lg" className="flex-1" disabled={product.stockStatus === 'Out of Stock'}>
              <Plus className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              Buy Now
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Heart className="mr-2 h-4 w-4" /> Add to Wishlist
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
          </div>
        </div>
      </div>
      
      <Separator className="my-16" />

      <Card className="bg-secondary/50 border-primary/20 border-2">
        <CardHeader>
          <CardTitle className='font-headline flex items-center gap-2'>
            <ShoppingCart />
            Cart + Payments
          </CardTitle>
          <CardDescription>
            Enable a full-featured shopping cart and accept payments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Enable eCommerce 🔜</Button>
        </CardContent>
      </Card>

      <Separator className="my-16" />

      <div>
        <h2 className="text-3xl font-bold font-headline tracking-tight mb-8">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
      </div>
    </div>
  );
}

    