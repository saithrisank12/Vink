'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Send } from 'lucide-react';
import { classifyUserMessage } from '@/lib/actions';
import type { ClassifyMessageOutput } from '@/ai/flows/classify-message';
import type { ThreatLogEntry } from '@/lib/types';

type TestLabProps = {
  onAnalyze: (result: ClassifyMessageOutput) => void;
};

export function TestLab({ onAnalyze }: TestLabProps) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    const result = await classifyUserMessage({ text: message });
    setIsLoading(false);

    if (result.riskLevel !== 'Safe') {
      const newThreat: ThreatLogEntry = {
        id: `threat-${Date.now()}`,
        timestamp: new Date(),
        sourceIp: 'N/A (Test Lab)',
        attackType: 'User Submitted Analysis',
        confidence: 0.99,
        level: result.riskLevel,
        description: result.explanation,
      };

      try {
        const storedThreatsRaw = localStorage.getItem('vink-threats') || '[]';
        const existingThreats: ThreatLogEntry[] = JSON.parse(storedThreatsRaw, (key, value) => {
          if (key === 'timestamp' && typeof value === 'string') {
            return new Date(value);
          }
          return value;
        });
        
        const updatedThreats = [newThreat, ...existingThreats];
        localStorage.setItem('vink-threats', JSON.stringify(updatedThreats));
      } catch (error) {
        console.error("Failed to update threats in localStorage", error);
      }
    }

    onAnalyze(result);
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>AI Test Lab</CardTitle>
        <CardDescription>
          Paste any suspicious text, email, or link below to see VINK's AI analysis in action.
          Remember, AI can make mistakes, so it's always wise to double-check important messages.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Paste suspicious SMS / email / link…"
            className="min-h-[120px] bg-black/20"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Analyze Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
