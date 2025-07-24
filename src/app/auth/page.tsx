
'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AtSign, KeyRound, Loader, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { login, signup } from './actions';
import { Label } from '@/components/ui/label';

function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Directly get the mode from searchParams inside the component
  const mode = searchParams.get('mode') || 'login';

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (mode === 'signup') {
        const { error } = await signup(email, password);
        if (error) throw error;
        toast({
          title: 'Check your email',
          description: 'We sent you a verification link. Please check your inbox.',
        });
        router.push('/auth?mode=login');
      } else {
        const { data, error } = await login(email, password);
        if (error) throw error;
        toast({
          title: 'Login successful',
          description: 'Welcome back!',
        });
        router.push('/');
        router.refresh();
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: error.message || 'An unexpected error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    const newMode = mode === 'login' ? 'signup' : 'login';
    router.push(`/auth?mode=${newMode}`);
  };

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="max-w-md w-full animate-slide-in-from-bottom">
        <form onSubmit={handleAuthAction}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              {mode === 'login' ? <LogIn className="h-6 w-6" /> : <UserPlus className="h-6 w-6" />}
              {mode === 'login' ? 'Welcome Back!' : 'Create an Account'}
            </CardTitle>
            <CardDescription>
              {mode === 'login'
                ? "Enter your credentials to access your account."
                : "Join us to get the best parts for your Keke."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
               <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                mode === 'login' ? 'Login' : 'Sign Up'
              )}
            </Button>
            <p className="text-sm text-muted-foreground">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
              <Button variant="link" type="button" onClick={toggleMode} className="p-1">
                {mode === 'login' ? 'Sign up' : 'Login'}
              </Button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}


export default function AuthPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-10rem)]"><Loader className="h-8 w-8 animate-spin" /></div>}>
      <AuthForm />
    </Suspense>
  );
}
