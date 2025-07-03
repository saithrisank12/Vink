'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Send } from 'lucide-react';
import { classifyUserMessage } from '@/lib/actions';
import type { ClassifyMessageOutput } from '@/ai/flows/classify-message';

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

    onAnalyze(result);
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>AI Test Lab</CardTitle>
        <CardDescription>
          Paste any suspicious text, email, or link below to see VINK's AI analysis in action.
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
