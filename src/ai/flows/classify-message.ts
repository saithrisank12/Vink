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
    .describe('A clear, simple explanation for a non-technical user about why the message was classified with its given risk level. If it is a threat, explain what kind of threat it is.'),
});
export type ClassifyMessageOutput = z.infer<typeof ClassifyMessageOutputSchema>;

export async function classifyMessage(input: ClassifyMessageInput): Promise<ClassifyMessageOutput> {
  return classifyMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'classifyMessagePrompt',
  input: {schema: ClassifyMessageInputSchema},
  output: {schema: ClassifyMessageOutputSchema},
  prompt: `You are VINK, a Cyber Guardian AI specializing in detecting digital threats within messages. Your goal is to protect users by analyzing text for signs of phishing, scams, malware links, or other malicious content.

Carefully analyze the following message. Look for these red flags:
- A sense of extreme urgency or threats (e.g., "account will be suspended").
- Requests for personal information, passwords, or financial details.
- Suspicious links that might be misspelled or use unusual domains.
- Poor grammar, spelling mistakes, or unprofessional language.
- Unexpected messages from supposedly known contacts or companies.
- Offers that seem too good to be true (e.g., winning a lottery you didn't enter).

Based on your analysis, classify the message's risk level and provide a clear, simple explanation for the user. Be concise.

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
