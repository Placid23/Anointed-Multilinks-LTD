
'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  Camera,
  ChevronRight,
  ShieldCheck,
  Truck,
  Wrench,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

import { products, testimonials } from '@/lib/data';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProductCard } from '@/components/product/ProductCard';
import { cn } from '@/lib/utils';

const AnimatedSection = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(ref.current!);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <section
            ref={ref}
            className={cn(
                "transition-all duration-700 ease-out",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                className
            )}
        >
            {children}
        </section>
    );
};


export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[80vh] bg-cover bg-center animate-slide-in-from-bottom"
        style={{ backgroundImage: "url('https://placehold.co/1600x900.png')" }}
        data-ai-hint="keke taxi"
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-primary">
            Anointed Multilinks LTD
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground">
            Your #1 source for reliable Keke parts and accessories. Quality you can trust, service you can depend on.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/products">
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <AnimatedSection className="py-12 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-headline tracking-tight">Why Choose Us?</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              We are committed to providing the best products and services to keep your business moving.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4 font-headline">Genuine Quality Parts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We source only the highest quality, authentic spare parts to ensure durability and performance.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Wrench className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4 font-headline">Expert Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Our knowledgeable team is always ready to help you find the right part for your Keke.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Truck className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4 font-headline">Nationwide Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Fast and reliable delivery services to get your parts to you wherever you are in Nigeria.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold font-headline tracking-tight">Featured Products</h2>
            <Button asChild variant="link" className="text-primary">
              <Link href="/products">
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </AnimatedSection>
      
      <AnimatedSection className="py-12 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline tracking-tight">AI-Powered Assistance</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              Use our cutting-edge AI tools to find exactly what you need, faster.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex-row items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="font-headline">Conversational Assistant</CardTitle>
                  <CardDescription>Describe your Keke's issue in plain words.</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Our AI can diagnose problems and suggest the right parts. "My Keke won't start" is all you need to say.</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/ai-assistant">
                    Ask our AI Expert <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex-row items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Camera className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="font-headline">Image-Based Part Finder</CardTitle>
                  <CardDescription>Upload a photo of a part to identify it.</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Don't know the name of a part? Just take a picture and let our AI find it for you in our catalog.</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/parts-finder">
                    Find by Image <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline tracking-tight">What Our Customers Say</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              We're proud to have the trust of mechanics and Keke owners across the country.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="flex flex-col">
                <CardContent className="pt-6 flex-grow">
                  <p className="text-muted-foreground">"{testimonial.comment}"</p>
                </CardContent>
                <CardFooter className="mt-4 flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
