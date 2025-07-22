
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader, Package, Home, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  shipping_address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  order_items: OrderItem[];
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          created_at,
          total_amount,
          status,
          shipping_address,
          order_items ( id, product_name, quantity, price )
        `)
        .eq('id', params.id)
        .single();

      if (error || !data) {
        console.error('Error fetching order:', error);
        notFound();
      } else {
        setOrder(data as Order);
      }
      setLoading(false);
    };
    fetchOrder();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!order) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
       <Button asChild variant="outline" className="mb-8">
            <Link href="/account/orders"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders</Link>
        </Button>
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
                <span>Order #{order.id.substring(0, 8)}</span>
                <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>{order.status}</Badge>
            </CardTitle>
            <CardDescription>
              Placed on {new Date(order.created_at).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Order Items</h3>
              <div className="space-y-2">
                {order.order_items.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded-md">
                    <div>
                      <p className="font-medium">{item.product_name}</p>
                      <p className="text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p>₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
                <h3 className="font-semibold mb-2">Shipping Address</h3>
                <div className="text-sm text-muted-foreground p-4 border rounded-md">
                   <p>{order.shipping_address.street}</p>
                   <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip}</p>
                </div>
            </div>
          </CardContent>
          <CardFooter className="bg-secondary/50 p-6 flex justify-end">
             <div className="text-right">
                <p className="text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">₦{order.total_amount.toLocaleString()}</p>
             </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
