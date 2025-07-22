
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, Product } from '@/lib/data';
import { ProductCard } from '@/components/product/ProductCard';
import { Input } from '@/components/ui/input';
import { Search, Frown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  
  const filteredProducts = useMemo(() => {
    if (!query) {
      return [];
    }
    const lowerCaseQuery = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        product.category.toLowerCase().includes(lowerCaseQuery) ||
        product.brand.toLowerCase().includes(lowerCaseQuery) ||
        product.description.toLowerCase().includes(lowerCaseQuery)
    );
  }, [query]);

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-headline tracking-tight mb-4">Search Products</h1>
        <div className="relative mb-8">
          <Input
            type="search"
            placeholder="Search for parts by name, category, or brand..."
            className="w-full pr-10 text-lg p-6"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
        </div>
        
        {query ? (
          <div>
            {filteredProducts.length > 0 ? (
              <>
                <h2 className="text-2xl font-headline mb-6">
                  Showing {filteredProducts.length} results for "{query}"
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <Card className="text-center py-12">
                <CardHeader>
                  <Frown className="mx-auto h-16 w-16 text-muted-foreground" />
                  <CardTitle className="mt-4 font-headline">No products found for "{query}"</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Try a different search term or browse all our products.</p>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
           <Card className="text-center py-12">
                <CardHeader>
                  <Search className="mx-auto h-16 w-16 text-muted-foreground" />
                  <CardTitle className="mt-4 font-headline">Start Your Search</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Enter a term above to find the parts you need.</p>
                </CardContent>
              </Card>
        )}
      </div>
    </div>
  );
}

