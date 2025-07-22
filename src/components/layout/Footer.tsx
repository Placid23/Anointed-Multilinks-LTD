import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Send } from 'lucide-react';
import { Logo } from '@/components/icons/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="bg-secondary/60 text-secondary-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Your trusted partner for genuine Keke spare parts and accessories in Nigeria.
            </p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Youtube">
                <Youtube className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Products</Link></li>
              <li><Link href="/ai-assistant" className="hover:text-primary transition-colors">AI Assistant</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Contact Info</h3>
            <address className="mt-4 space-y-2 text-sm not-italic text-muted-foreground">
              <p>123 Keke Street, Aba, Abia State</p>
              <p>Phone: <a href="tel:+2348012345678" className="hover:text-primary transition-colors">+234 801 234 5678</a></p>
              <p>Email: <a href="mailto:sales@anointedmultilinks.com" className="hover:text-primary transition-colors">sales@anointedmultilinks.com</a></p>
              <p>WhatsApp: <a href="https://wa.me/2348012345678" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Chat with us</a></p>
            </address>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Newsletter</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Stay up to date with our latest products and offers.
            </p>
            <form className="mt-4 flex gap-2">
              <Input type="email" placeholder="Enter your email" className="bg-background" />
              <Button type="submit" size="icon" aria-label="Subscribe to newsletter" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Anointed Multilinks LTD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
