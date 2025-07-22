
'use server';

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { z } from 'zod';

const emailSchema = z.string().email();
const passwordSchema = z.string().min(6, { message: 'Password must be at least 6 characters long.' });


export async function login(email: unknown, password: unknown) {
  const emailValidation = emailSchema.safeParse(email);
  const passwordValidation = passwordSchema.safeParse(password);

  if (!emailValidation.success) {
    return { error: { message: 'Invalid email address.' } };
  }
  if (!passwordValidation.success) {
    return { error: { message: passwordValidation.error.errors[0].message }};
  }

  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data, error } = await supabase.auth.signInWithPassword({
    email: emailValidation.data,
    password: passwordValidation.data,
  });

  return { data, error };
}


export async function signup(email: unknown, password: unknown) {
  const emailValidation = emailSchema.safeParse(email);
  const passwordValidation = passwordSchema.safeParse(password);

  if (!emailValidation.success) {
    return { error: { message: 'Invalid email address.' } };
  }
  if (!passwordValidation.success) {
    return { error: { message: passwordValidation.error.errors[0].message }};
  }

  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  );

  const { data, error } = await supabase.auth.signUp({
    email: emailValidation.data,
    password: passwordValidation.data,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  return { data, error };
}
