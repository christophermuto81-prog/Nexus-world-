'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { timeAgo } from '@/lib/utils';
import { Globe, Users, ArrowLeft, Zap } from 'lucide-react';
import type { CommunityEvent } from '@/types';

const GlobeComponent = dynamic(() => import('react-globe.gl').then((m) => m.default), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] flex items-center justify-center text-muted-foreground">
      Loading 3D Globe...
    </div>
  ),
});

export default function CommunityPage() {
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [globePoints, setGlobePoints] = useState<any[]>([]);
  const globeRef = useRef<any>();

  useEffect(() => {
    api
      .getCommunityEvents(50)
      .then((data: any) => {
        setEvents(data);
        const points = data
          .filter((e: CommunityEvent) => e.location)
          .map((e: CommunityEvent) => {
            const [lat, lng] = e.location!.split(',').map(Number);
            return { lat, lng, size: 0.5, color: '#F59E0B', label: e.message };
          });
        setGlobePoints(points);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-latrux-darker to-latrux-dark">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Globe className="h-7 w-7 text-latrux-gold" />
              Community Pulse
            </h1>
            <p className="text-muted-foreground">See traders joining from around the world</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 3D Globe */}
          <Card className="overflow-hidden">
            <CardContent className="p-0 h-[500px] relative bg-latrux-darker">
              {typeof window !== 'undefined' && (
                <GlobeComponent
                  ref={globeRef}
                  globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                  backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                  pointsData={globePoints}
                  pointAltitude="size"
                  pointColor="color"
                  pointLabel="label"
                  pointRadius={0.3}
                  atmosphereColor="#F59E0B"
                  atmosphereAltitude={0.15}
                  width={500}
                  height={500}
                />
              )}
            </CardContent>
          </Card>

          {/* Live Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-latrux-gold" />
                Live Activity
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-latrux-green opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-latrux-green" />
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {events.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No community events yet. Be the first to join!
                  </p>
                ) : (
                  events.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition"
                    >
                      <div className="h-8 w-8 rounded-full bg-latrux-gold/10 flex items-center justify-center">
                        <Zap className="h-4 w-4 text-latrux-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{event.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {timeAgo(event.createdAt)}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {event.type}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
