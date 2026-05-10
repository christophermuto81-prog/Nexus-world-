'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import type { Broker } from '@/types';
import { ArrowLeft, Building2, Search, Star, ExternalLink, Plug } from 'lucide-react';

export default function BrokersPage() {
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    api.getBrokers(search || undefined).then(setBrokers as any).catch(console.error);
  }, [search]);

  const filtered = filter
    ? brokers.filter((b) => b.assetTypes.includes(filter))
    : brokers;

  return (
    <div className="min-h-screen bg-gradient-to-b from-latrux-darker to-latrux-dark">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Building2 className="h-7 w-7 text-latrux-gold" />
              Broker Directory
            </h1>
            <p className="text-muted-foreground">Connect your broker for automated trading</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search brokers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {['', 'crypto', 'forex', 'stocks'].map((f) => (
              <Button
                key={f}
                variant={filter === f ? 'gold' : 'outline'}
                size="sm"
                onClick={() => setFilter(f)}
              >
                {f || 'All'}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((broker) => (
            <Card key={broker.id} className="hover:border-latrux-gold/20 transition">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{broker.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 text-latrux-gold fill-latrux-gold" />
                      <span className="text-xs text-muted-foreground">
                        {broker.rating?.toFixed(1) || 'N/A'}
                      </span>
                    </div>
                  </div>
                  {broker.apiSupport && (
                    <Badge variant="success" className="text-xs">
                      <Plug className="h-3 w-3 mr-1" />
                      API
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {broker.assetTypes.map((type) => (
                    <Badge key={type} variant="secondary" className="text-xs capitalize">
                      {type}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <a
                    href={broker.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1 rounded-md border border-input bg-transparent px-3 py-1.5 text-xs font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Visit
                  </a>
                  {broker.apiSupport && (
                    <Button variant="gold" size="sm" className="flex-1">
                      Connect
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Maker Engine Placeholder */}
        <Card className="mt-12 border-dashed border-2">
          <CardContent className="py-12 text-center">
            <h3 className="text-xl font-bold mb-2">Maker Engine</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-4">
              Visual API connector with drag-and-drop workflow builder.
              Connect any broker with a few clicks.
            </p>
            <Badge variant="secondary">Coming in Phase 2</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
