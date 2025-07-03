'use server';

/**
 * @fileOverview AI agent that classifies a message as Safe, Suspicious, Dangerous, or Critical.
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
    .enum(['Safe', 'Suspicious', 'Dangerous', 'Critical'])
    .describe('The risk level of the message.'),
  explanation: z
    .string()
    .describe('A clear, simple explanation in English for a non-technical user about why the message was classified with its given risk level. If it is a threat, explain what kind of threat it is.'),
});
export type ClassifyMessageOutput = z.infer<typeof ClassifyMessageOutputSchema>;

export async function classifyMessage(input: ClassifyMessageInput): Promise<ClassifyMessageOutput> {
  return classifyMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'classifyMessagePrompt',
  input: {schema: ClassifyMessageInputSchema},
  output: {schema: ClassifyMessageOutputSchema},
  prompt: `You are VINK, a Cyber Guardian AI specializing in detecting digital threats within messages, regardless of the language. Your goal is to protect users by analyzing text for signs of phishing, scams, malware links, or other malicious content.

Carefully analyze the following message in its original language. Do not translate it. Look for these universal red flags:
- A sense of extreme urgency or threats (e.g., "account will be suspended," "immediate action required").
- Requests for personal or financial information (passwords, social security numbers, credit card details).
- Suspicious links that might be misspelled, use unusual domains, or employ URL shorteners to hide the true destination.
- Poor grammar, spelling mistakes, or unprofessional language for the supposed sender (e.g., a bank or a large company).
- Unexpected messages from supposedly known contacts or companies, especially if the request is unusual.
- Offers that seem too good to be true (e.g., winning a lottery you didn't enter, claiming a large prize for a small fee).

Based on your analysis, classify the message's risk level. The explanation you provide must be in clear, simple English for the user. Explain why the message was classified with its given risk level and, if it is a threat, what kind of threat it is. Be concise.

Crucially, if none of the red flags are detected and the message seems benign, classify it as 'Safe'. Do not speculate about potential risks or 'what ifs' if there is no direct evidence of a threat in the message.

Message: {{{text}}}

Respond in the required JSON format.
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
