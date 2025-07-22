
'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle form submission, e.g., send an email or save to a database.
    // For this example, we'll just show a success toast.
    console.log('Form data submitted:', formData);
    toast({
      title: 'Message Sent!',
      description: 'Thank you for contacting us. We will get back to you shortly.',
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Contact Us</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We're here to help. Whether you have a question about our products, need assistance with an order, or just want to say hello, we'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Our Address</h3>
                  <p className="text-muted-foreground">123 Keke Street, Aba, Abia State, Nigeria</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Email Us</h3>
                  <a href="mailto:sales@anointedmultilinks.com" className="text-muted-foreground hover:text-primary transition-colors">
                    sales@anointedmultilinks.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Call Us</h3>
                  <a href="tel:+2348012345678" className="text-muted-foreground hover:text-primary transition-colors">
                    +234 801 234 5678
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Follow Us</CardTitle>
            </CardHeader>
            <CardContent className="flex space-x-4">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Youtube">
                <Youtube className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Full Name</label>
                <Input id="name" name="name" type="text" placeholder="Your Name" required value={formData.name} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email Address</label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required value={formData.email} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-1">Subject</label>
                <Input id="subject" name="subject" type="text" placeholder="How can we help?" required value={formData.subject} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">Message</label>
                <Textarea id="message" name="message" placeholder="Your message..." rows={5} required value={formData.message} onChange={handleInputChange} />
              </div>
              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" /> Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
