'use server';

/**
 * @fileOverview Summarizes recent threats from the threat log.
 *
 * - analyzeThreatLog - A function that generates a summary of recent threats.
 * - AnalyzeThreatLogInput - The input type for the analyzeThreatLog function (currently empty).
 * - AnalyzeThreatLogOutput - The return type for the analyzeThreatLog function, containing the summary.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeThreatLogInputSchema = z.object({});
export type AnalyzeThreatLogInput = z.infer<typeof AnalyzeThreatLogInputSchema>;

const AnalyzeThreatLogOutputSchema = z.object({
  summary: z.string().describe('A summary of recent threats in the threat log.'),
});
export type AnalyzeThreatLogOutput = z.infer<typeof AnalyzeThreatLogOutputSchema>;

export async function analyzeThreatLog(input: AnalyzeThreatLogInput): Promise<AnalyzeThreatLogOutput> {
  return analyzeThreatLogFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeThreatLogPrompt',
  input: {schema: AnalyzeThreatLogInputSchema},
  output: {schema: AnalyzeThreatLogOutputSchema},
  prompt: `You are an expert cybersecurity analyst.  Generate a summary of recent threats in the threat log, highlighting any patterns or emerging threats.
`,
});

const analyzeThreatLogFlow = ai.defineFlow(
  {
    name: 'analyzeThreatLogFlow',
    inputSchema: AnalyzeThreatLogInputSchema,
    outputSchema: AnalyzeThreatLogOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
