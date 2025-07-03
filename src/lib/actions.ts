'use server';

import { classifyMessage, ClassifyMessageInput } from '@/ai/flows/classify-message';
import { analyzeThreatLog } from '@/ai/flows/analyze-threat-log';
import { generateSpeech as generateSpeechFlow } from '@/ai/flows/generate-speech';
import { translateText as translateTextFlow, TranslateTextInput } from '@/ai/flows/translate-text';

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
    if (!text?.trim()) {
        console.warn('generateSpeech called with empty text. Skipping TTS generation.');
        return { media: '' };
    }
    
    try {
        const result = await generateSpeechFlow(text);
        // Ensure we always return a consistent object, even if the AI flow fails.
        if (result && typeof result.media === 'string') {
            return result;
        }
        console.error("TTS flow returned an invalid result:", result);
        return { media: '' };
    } catch (error) {
        console.error('Error generating speech:', error);
        return { media: '' };
    }
}

export async function translateText(input: TranslateTextInput): Promise<string> {
    try {
        const result = await translateTextFlow(input);
        return result.translatedText;
    } catch (error) {
        console.error('Error translating text:', error);
        // Fallback to original text if translation fails
        return input.text;
    }
}
