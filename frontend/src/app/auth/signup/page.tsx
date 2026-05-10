'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuthStore } from '@/store/auth-store';

export default function SignUpPage() {
  const router = useRouter();
  const { register, isLoading, error } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password, name);
      router.push('/dashboard');
    } catch {
      // error is set in store
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-latrux-darker to-latrux-dark p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Zap className="h-10 w-10 text-latrux-gold" />
          </div>
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>Join LatruxTrade and start trading with AI</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Referral Code (optional)</label>
              <Input
                placeholder="LX-XXXXXXXX"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
              />
            </div>
            <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-latrux-gold hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
