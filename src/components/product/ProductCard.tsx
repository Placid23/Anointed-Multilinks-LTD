import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StarRating } from './StarRating';
import type { Product } from '@/lib/data';
import { Badge } from '../ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.id}`} className="block">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-48 object-cover"
            data-ai-hint={product.aiHint}
          />
        </Link>
        {product.stockStatus === 'In Stock' && <Badge className="absolute top-2 right-2 bg-green-500 text-white">{product.stockStatus}</Badge>}
        {product.stockStatus === 'Low Stock' && <Badge variant="destructive" className="absolute top-2 right-2">{product.stockStatus}</Badge>}
        {product.stockStatus === 'Out of Stock' && <Badge variant="secondary" className="absolute top-2 right-2">{product.stockStatus}</Badge>}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardDescription>{product.category}</CardDescription>
        <CardTitle className="mt-1 text-lg font-headline">
          <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </CardTitle>
        <div className="mt-2 flex items-center gap-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-muted-foreground">({product.reviewsCount} reviews)</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-xl font-semibold">₦{product.price.toLocaleString()}</p>
        <Button size="sm" disabled={product.stockStatus === 'Out of Stock'}>
          <Plus className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
