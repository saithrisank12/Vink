
'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Send } from 'lucide-react';
import { classifyUserMessage } from '@/lib/actions';
import type { ClassifyMessageOutput } from '@/ai/flows/classify-message';
import type { ThreatLogEntry } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';

const languages = [
  { value: 'English', label: 'English' },
  { value: 'Hindi', label: 'हिन्दी' },
  { value: 'Telugu', label: 'తెలుగు' },
  { value: 'Malayalam', label: 'മലയാളം' },
  { value: 'Tamil', label: 'தமிழ்' },
  { value: 'Bengali', label: 'বাংলা' },
];

type TestLabProps = {
  onAnalyze: (result: ClassifyMessageOutput) => void;
};

export function TestLab({ onAnalyze }: TestLabProps) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('English');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('vink-language') || 'English';
    setLanguage(storedLanguage);
    
    if (!localStorage.getItem('vink-language')) {
      localStorage.setItem('vink-language', 'English');
    }
  }, []);
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    localStorage.setItem('vink-language', value);
  }

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
          Paste any suspicious text, email, or link below to get an instant AI analysis.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language">Alert Language</Label>
            <p className="text-sm text-muted-foreground">
              If you want to hear the message, please select your language.
            </p>
            <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                    {languages.map(lang => (
                        <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="test-message">Message to Analyze</Label>
            <Textarea
              id="test-message"
              placeholder="Paste suspicious SMS / email / link…"
              className="min-h-[120px] bg-black/20"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
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
