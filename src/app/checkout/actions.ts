
'use server';

import type { CartItem } from '@/context/CartContext';

interface CreateOrderPayload {
  cart: CartItem[];
  totalAmount: number;
  shippingAddress: object;
}

export async function sendOrderToProcessingApp(payload: CreateOrderPayload) {
  const processingAppUrl = `${process.env.NEXT_PUBLIC_PROCESSING_APP_URL}/api/orders`;
  const apiKey = process.env.PROCESSING_APP_API_KEY;

  if (!processingAppUrl || !apiKey) {
    console.error('Processing app URL or API key is not configured.');
    return { error: 'Server configuration error.' };
  }

  try {
    const response = await fetch(processingAppUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        shippingAddress: payload.shippingAddress,
        items: payload.cart.map(item => ({
          product_id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: payload.totalAmount,
        source: 'Anointed Multilinks Online Store',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Error sending order: ${response.status}`, errorData);
      return { error: errorData.message || 'Failed to submit order to processing app.' };
    }

    const result = await response.json();
    console.log('Order successfully sent:', result);
    // Assuming the processing app returns an orderId in the format we expect
    return { orderId: result.orderId };

  } catch (error) {
    console.error('Network or other error when sending order:', error);
    if