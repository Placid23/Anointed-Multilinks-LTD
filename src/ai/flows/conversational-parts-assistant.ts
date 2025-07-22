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
  prompt: `You are a friendly and knowledgeable AI customer support agent for Anointed Multilinks LTD, a Keke parts store.

Your role is to:
1. Greet the user warmly.
2. Listen to their Keke-related problems or questions.
3. Diagnose the issue based on their description.
4. Recommend specific parts from our store that can solve the problem.
5. If the user asks about something unrelated to Keke parts or maintenance, politely steer the conversation back to your area of expertise.
6. Keep your responses helpful, concise, and friendly.

User's message: {{{query}}}

Provide a helpful response that diagnoses the potential issue and suggests relevant parts.`,
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
