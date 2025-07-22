'use server';

/**
 * @fileOverview A conversational parts assistant for diagnosing Keke issues and recommending parts.
 *
 * - conversationalPartsAssistant - A function that handles the conversational parts assistance process.
 * - ConversationalPartsAssistantInput - The input type for the conversationalPartsAssistant function.
 * - ConversationalPartsAssistantOutput - The return type for the conversationalPartsAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConversationalPartsAssistantInputSchema = z.object({
  query: z.string().describe('The user query about their Keke issue.'),
});
export type ConversationalPartsAssistantInput = z.infer<typeof ConversationalPartsAssistantInputSchema>;

const ConversationalPartsAssistantOutputSchema = z.object({
  response: z.string().describe('The assistant response with diagnosis and part recommendations.'),
});
export type ConversationalPartsAssistantOutput = z.infer<typeof ConversationalPartsAssistantOutputSchema>;

export async function conversationalPartsAssistant(input: ConversationalPartsAssistantInput): Promise<ConversationalPartsAssistantOutput> {
  return conversationalPartsAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'conversationalPartsAssistantPrompt',
  input: {schema: ConversationalPartsAssistantInputSchema},
  output: {schema: ConversationalPartsAssistantOutputSchema},
  prompt: `You are a helpful assistant specializing in diagnosing Keke issues and recommending parts.

  User Query: {{{query}}}

  Based on the user query, provide a diagnosis of the issue and recommend the necessary parts to fix it. Be specific and provide clear instructions.
  If the query is not related to Keke or parts, respond appropriately.
  Keep the answer short, no more than 200 words.
  `,
});

const conversationalPartsAssistantFlow = ai.defineFlow(
  {
    name: 'conversationalPartsAssistantFlow',
    inputSchema: ConversationalPartsAssistantInputSchema,
    outputSchema: ConversationalPartsAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
