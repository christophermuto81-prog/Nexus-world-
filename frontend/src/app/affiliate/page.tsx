'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { ArrowLeft, Share2, Copy, DollarSign, Users, Gift, Check } from 'lucide-react';

export default function AffiliatePage() {
  const [affiliate, setAffiliate] = useState<any>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    api.getAffiliateInfo().then((data) => {
      setAffiliate(data);
      setIsRegistered(true);
    }).catch(() => setIsRegistered(false));
  }, []);

  const handleRegister = async () => {
    try {
      const data = await api.registerAffiliate();
      setAffiliate(data);
      setIsRegistered(true);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const copyCode = () => {
    if (affiliate?.code) {
      navigator.clipboard.writeText(affiliate.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-latrux-darker to-latrux-dark">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Share2 className="h-7 w-7 text-latrux-gold" />
              Affiliate Program
            </h1>
            <p className="text-muted-foreground">Earn commissions by referring traders</p>
          </div>
        </div>

        {!isRegistered ? (
          <Card className="text-center py-12">
            <CardContent>
              <Gift className="h-16 w-16 text-latrux-gold mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Join the Affiliate Program</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                Earn 50% commission on the first subscription from each referral,
                10% lifetime recurring, and $50 bonus for Elite+ referrals.
              </p>
              <div className="grid md:grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-2xl font-bold text-latrux-gold">50%</p>
                  <p className="text-xs text-muted-foreground">First Sub</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-2xl font-bold text-latrux-green">10%</p>
                  <p className="text-xs text-muted-foreground">Lifetime</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-2xl font-bold text-latrux-purple">$50</p>
                  <p className="text-xs text-muted-foreground">Elite+ Bonus</p>
                </div>
              </div>
              <Button variant="gold" size="xl" onClick={handleRegister}>
                Register as Affiliate
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Referral Code */}
            <Card className="border-latrux-gold/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Your Referral Code</p>
                    <p className="text-3xl font-bold font-mono text-latrux-gold">
                      {affiliate?.code}
                    </p>
                  </div>
                  <Button variant="outline" onClick={copyCode}>
                    {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <Users className="h-8 w-8 text-latrux-blue" />
                  <div>
                    <p className="text-sm text-muted-foreground">Referrals</p>
                    <p className="text-2xl font-bold">{affiliate?.referrals?.length || 0}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <DollarSign className="h-8 w-8 text-latrux-green" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Earnings</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(affiliate?.totalEarnings || 0)}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <Gift className="h-8 w-8 text-latrux-gold" />
                  <div>
                    <p className="text-sm text-muted-foreground">Payout (LX Token)</p>
                    <p className="text-2xl font-bold">Coming Soon</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Referral List */}
            <Card>
              <CardHeader>
                <CardTitle>Your Referrals</CardTitle>
              </CardHeader>
              <CardContent>
                {affiliate?.referrals?.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Share your code to start earning commissions
                  </p>
                ) : (
                  <div className="space-y-2">
                    {affiliate?.referrals?.map((ref: any) => (
                      <div key={ref.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                        <div>
                          <p className="text-sm font-medium">{ref.referredUser?.email}</p>
                          <p className="text-xs text-muted-foreground">
                            Joined {new Date(ref.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="text-sm font-mono text-latrux-green">
                          {formatCurrency(ref.lifetimeEarnings)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
