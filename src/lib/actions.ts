'use server';

import { classifyMessage, ClassifyMessageInput } from '@/ai/flows/classify-message';
import { analyzeThreatLog } from '@/ai/flows/analyze-threat-log';
import { generateSpeech as generateSpeechFlow } from '@/ai/flows/generate-speech';

export async function classifyUserMessage(input: ClassifyMessageInput) {
  try {
    const result = await classifyMessage(input);
    return result;
  } catch (error) {
    console.error('Error classifying message:', error);
    return {
      riskLevel: 'Dangerous',
      explanation: 'An error occurred during analysis. Please try again.',
    };
  }
}

export async function getThreatSummary() {
    try {
        const result = await analyzeThreatLog({});
        return result.summary;
    } catch (error) {
        console.error('Error analyzing threat log:', error);
        return 'Could not retrieve threat summary at this time.'
    }
}

export async function generateSpeech(text: string) {
    try {
        const result = await generateSpeechFlow(text);
        return result;
    } catch (error) {
        console.error('Error generating speech:', error);
        return { media: '' };
    }
}
