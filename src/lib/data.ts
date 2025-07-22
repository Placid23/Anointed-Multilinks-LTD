export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Keke Models' | 'Spare Parts' | 'Accessories';
  brand: 'Bajaj' | 'TVS' | 'Piaggio';
  image: string;
  aiHint: string;
  rating: number;
  reviewsCount: number;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface Testimonial {
  name: string;
  location: string;
  comment: string;
  avatar: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Bajaj RE 4S Keke',
    description: 'A brand new, reliable Bajaj RE 4S tricycle, perfect for commercial transport. Comes with a powerful engine and durable body.',
    price: 850000,
    category: 'Keke Models',
    brand: 'Bajaj',
    image: 'https://placehold.co/400x400.png',
    aiHint: 'new tricycle',
    rating: 4.8,
    reviewsCount: 152,
    stockStatus: 'In Stock',
  },
  {
    id: '2',
    name: 'TVS King Duramax Engine Oil',
    description: 'High-performance engine oil specifically formulated for TVS Keke models. Ensures smooth operation and long engine life.',
    price: 3500,
    category: 'Accessories',
    brand: 'TVS',
    image: 'https://placehold.co/400x400.png',
    aiHint: 'engine oil',
    rating: 4.5,
    reviewsCount: 88,
    stockStatus: 'In Stock',
  },
  {
    id: '3',
    name: 'Replacement Carburetor Assembly',
    description: 'Genuine replacement carburetor for Piaggio Ape models. Restores fuel efficiency and engine performance.',
    price: 12000,
    category: 'Spare Parts',
    brand: 'Piaggio',
    image: 'https://placehold.co/400x400.png',
    aiHint: 'keke carburetor',
    rating: 4.2,
    reviewsCount: 45,
    stockStatus: 'Low Stock',
  },
  {
    id: '4',
    name: 'Heavy Duty Rear Tyre',
    description: 'Durable rear tyre with excellent grip for all road conditions. Fits most Keke models including Bajaj and TVS.',
    price: 8000,
    category: 'Spare Parts',
    brand: 'Bajaj',
    image: 'https://placehold.co/400x400.png',
    aiHint: 'motorcycle tire',
    rating: 4.6,
    reviewsCount: 210,
    stockStatus: 'In Stock',
  },
  {
    id: '5',
    name: 'LED Headlight Set',
    description: 'Bright, energy-efficient LED headlight set for improved visibility and safety at night.',
    price: 5500,
    category: 'Accessories',
    brand: 'TVS',
    image: 'https://placehold.co/400x400.png',
    aiHint: 'keke headlight',
    rating: 4.9,
    reviewsCount: 95,
    stockStatus: 'In Stock',
  },
  {
    id: '6',
    name: 'Complete Gasket Kit',
    description: 'Full engine gasket kit for Bajaj RE models. Perfect for engine rebuilds and preventing leaks.',
    price: 2500,
    category: 'Spare Parts',
    brand: 'Bajaj',
    image: 'https://placehold.co/400x400.png',
    aiHint: 'engine gasket',
    rating: 4.3,
    reviewsCount: 33,
    stockStatus: 'Out of Stock',
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Musa Garba',
    location: 'Kano',
    comment: 'Anointed Multilinks is the only place I trust for my Keke parts. They are genuine and the delivery is very fast. My business has improved since I started buying from them.',
    avatar: 'https://placehold.co/100x100.png',
  },
  {
    name: 'Chinedu Okafor',
    location: 'Onitsha',
    comment: 'The quality of their parts is top-notch. I bought a carburetor from them, and my Keke is running smoother than ever. Highly recommended for all mechanics.',
    avatar: 'https://placehold.co/100x100.png',
  },
  {
    name: 'Adekunle Johnson',
    location: 'Lagos',
    comment: 'Excellent customer service! The AI assistant helped me find the exact part I needed when I didn\'t even know the name. It saved me a lot of time and stress.',
    avatar: 'https://placehold.co/100x100.png',
  },
];
