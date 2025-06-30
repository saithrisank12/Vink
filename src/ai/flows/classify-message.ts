'use server';

/**
 * @fileOverview AI agent that classifies a message as Safe, Suspicious, or Dangerous.
 *
 * - classifyMessage - A function that classifies a message.
 * - ClassifyMessageInput - The input type for the classifyMessage function.
 * - ClassifyMessageOutput - The return type for the classifyMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClassifyMessageInputSchema = z.object({
  text: z.string().describe('The message to classify (SMS, email, link, etc.).'),
});
export type ClassifyMessageInput = z.infer<typeof ClassifyMessageInputSchema>;

const ClassifyMessageOutputSchema = z.object({
  riskLevel: z
    .enum(['Safe', 'Suspicious', 'Dangerous'])
    .describe('The risk level of the message.'),
  explanation: z
    .string()
    .describe('An explanation of why the message was classified as such.'),
});
export type ClassifyMessageOutput = z.infer<typeof ClassifyMessageOutputSchema>;

export async function classifyMessage(input: ClassifyMessageInput): Promise<ClassifyMessageOutput> {
  return classifyMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'classifyMessagePrompt',
  input: {schema: ClassifyMessageInputSchema},
  output: {schema: ClassifyMessageOutputSchema},
  prompt: `You are a cybersecurity expert. Classify the following message as Safe, Suspicious, or Dangerous, and explain your reasoning.

Message: {{{text}}}

Respond in JSON format:
{
  "riskLevel": "Safe" | "Suspicious" | "Dangerous",
  "explanation": "Explanation of the classification"
}
`,
});

const classifyMessageFlow = ai.defineFlow(
  {
    name: 'classifyMessageFlow',
    inputSchema: ClassifyMessageInputSchema,
    outputSchema: ClassifyMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
