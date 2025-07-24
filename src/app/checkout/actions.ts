'use server';

import type { CartItem } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';


interface CreateOrderPayload {
  cart: CartItem[];
  totalAmount: number;
  shippingAddress: object;
  user: User;
}

// This function now sends the order to the external processing app
// AND saves a copy to this app's database for user order history.
export async function createOrder(payload: CreateOrderPayload) {
  const { cart, totalAmount, shippingAddress, user } = payload;

  // 1. Save the order to this app's database for customer history
  const { data: orderData, error: localOrderError } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      total_amount: totalAmount,
      shipping_address: shippingAddress,
      status: 'Processing', // Set a default status
    })
    .select()
    .single();
  
  if (localOrderError) {
    console.error('Error creating local order:', localOrderError);
    return { error: 'Could not save order history.' };
  }

  const orderItems = cart.map(item => ({
    order_id: orderData.id,
    product_id: item.id,
    product_name: item.name,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

  if (itemsError) {
    console.error('Error saving order items:', itemsError);
    // You might want to add logic here to delete the order that was just created
    return { error: 'Could not save order items.' };
  }


  // 2. Send the order to the external processing app
  const processingAppUrl = `${process.env.NEXT_PUBLIC_PROCESSING_APP_URL}/api/orders`;
  const apiKey = process.env.PROCESSING_APP_API_KEY;

  if (!processingAppUrl || !apiKey) {
    console.error('Processing app URL or API key is not configured.');
    // The local order was saved, but we can't send it.
    // The user's order is placed, but the admin won't see it in the other app.
    // This should be monitored. For now, we proceed with success for the customer.
    return { order: orderData, processed: false };
  }

  try {
    const externalPayload = {
        source: 'Anointed Multilinks Online Store',
        customer: {
            id: user.id,
            email: user.email,
        },
        shippingAddress: shippingAddress,
        items: cart.map(item => ({
          product_id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: totalAmount,
        internalOrderId: orderData.id, // Send our internal order ID
      };


    const response = await fetch(processingAppUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(externalPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Error sending order to processing app: ${response.status}`, errorData);
      // Again, the customer's order is saved locally. We proceed with success.
      return { order: orderData, processed: false };
    }

    const result = await response.json();
    console.log('Order successfully sent to processing app:', result);
    return { order: orderData, processed: true };

  } catch (error) {
    console.error('Network or other error when sending order:', error);
    // The