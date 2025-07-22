
'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { CartItem } from '@/context/CartContext';

interface CreateOrderPayload {
  cart: CartItem[];
  totalAmount: number;
  shippingAddress: object;
}

export async function createOrder(payload: CreateOrderPayload) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to create an order.' };
  }

  // 1. Create the order
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      total_amount: payload.totalAmount,
      shipping_address: payload.shippingAddress,
      status: 'Pending',
    })
    .select('id')
    .single();

  if (orderError) {
    console.error('Error creating order:', orderError);
    return { error: 'Failed to create order.' };
  }

  const orderId = orderData.id;

  // 2. Create the order items
  const orderItems = payload.cart.map(item => ({
    order_id: orderId,
    product_id: item.id,
    product_name: item.name,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

  if (itemsError) {
    console.error('Error creating order items:', itemsError);
    // Optionally, delete the order if items fail
    await supabase.from('orders').delete().eq('id', orderId);
    return { error: 'Failed to create order items.' };
  }

  return { orderId };
}
