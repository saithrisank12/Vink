'use client';

import { useState, useEffect } from 'react';
import { ThreatCard } from '@/components/vink/threat-log/threat-card';
import type { ThreatLogEntry, ThreatLevel } from '@/lib/types';
import { Button } from '@/components/ui/button';

const generateMockData = (): ThreatLogEntry[] => {
  const data: ThreatLogEntry[] = [];
  const attackTypes = ['Phishing', 'Malware', 'Deepfake', 'Spyware', 'Adware'];
  const levels: ThreatLevel[] = ['Safe', 'Suspicious', 'Dangerous', 'Critical'];
  for (let i = 0; i < 20; i++) {
    const level = levels[Math.floor(Math.random() * 4)];
    data.push({
      id: `threat-${i}`,
      timestamp: new Date(Date.now() - (i + 1) * 3 * 60 * 60 * 1000), // Push mock data further back
      sourceIp: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      attackType: attackTypes[Math.floor(Math.random() * attackTypes.length)],
      confidence: Math.random(),
      level: level,
      description: `A ${level.toLowerCase()} ${attackTypes[Math.floor(Math.random() * attackTypes.length)].toLowerCase()} attempt was detected and blocked.`
    });
  }
  return data;
};

const filters: ThreatLevel[] = ['Critical', 'Dangerous', 'Suspicious', 'Safe'];

export default function ThreatLogPage() {
  const [activeFilters, setActiveFilters] = useState<Set<ThreatLevel>>(new Set(filters));
  const [allThreats, setAllThreats] = useState<ThreatLogEntry[]>([]);

  useEffect(() => {
    const mockData = generateMockData();
    let storedThreats: ThreatLogEntry[] = [];
    try {
      const storedThreatsRaw = localStorage.getItem('vink-threats') || '[]';
      storedThreats = JSON.parse(storedThreatsRaw, (key, value) => {
        if (key === 'timestamp' && typeof value === 'string') {
          return new Date(value);
        }
        return value;
      });
    } catch (error) {
      console.error("Failed to parse threats from localStorage", error);
    }

    const combinedData = [...storedThreats, ...mockData]
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      
    setAllThreats(combinedData);
  }, []);

  const toggleFilter = (filter: ThreatLevel) => {
    setActiveFilters(prev => {
      const newFilters = new Set(prev);
      if (newFilters.has(filter)) {
        newFilters.delete(filter);
      } else {
        newFilters.add(filter);
      }
      return newFilters;
    });
  };

  const filteredData = allThreats.filter(entry => activeFilters.has(entry.level));

  return (
    <div className="w-full animate-fade-in space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Threat Log</h1>
        <p className="text-muted-foreground">A detailed history of all detected security events.</p>
      </header>

      <div className="flex flex-wrap gap-2">
        {filters.map(filter => (
          <Button
            key={filter}
            variant={activeFilters.has(filter) ? 'default' : 'outline'}
            onClick={() => toggleFilter(filter)}
            className="capitalize"
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-border before:opacity-50">
        {filteredData.length > 0 ? (
          filteredData.map(entry => <ThreatCard key={entry.id} entry={entry} />)
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            No threats matching the current filters.
          </div>
        )}
      </div>
    </div>
  );
}
