import { config } from 'dotenv';
config();

import '@/ai/flows/classify-message.ts';
import '@/ai/flows/analyze-threat-log.ts';
import '@/ai/flows/generate-speech.ts';
import '@/ai/flows/translate-text.ts';
