'use server';

import { classifyMessage, ClassifyMessageInput } from '@/ai/flows/classify-message';
import { analyzeThreatLog } from '@/ai/flows/analyze-threat-log';

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
