'use server';

/**
 * @fileOverview A parts compatibility check AI agent.
 *
 * - partsCompatibilityCheck - A function that handles the parts compatibility check process.
 * - PartsCompatibilityCheckInput - The input type for the partsCompatibilityCheck function.
 * - PartsCompatibilityCheckOutput - The return type for the partsCompatibilityCheck function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PartsCompatibilityCheckInputSchema = z.object({
  prompt: z.string().describe('A description of the vehicle or its parts.'),
});
export type PartsCompatibilityCheckInput = z.infer<typeof PartsCompatibilityCheckInputSchema>;

const PartsCompatibilityCheckOutputSchema = z.object({
  compatibility: z.string().describe('An estimate of part compatibility.'),
  availability: z.string().describe('An estimate of part availability.'),
});
export type PartsCompatibilityCheckOutput = z.infer<typeof PartsCompatibilityCheckOutputSchema>;

export async function partsCompatibilityCheck(input: PartsCompatibilityCheckInput): Promise<PartsCompatibilityCheckOutput> {
  return partsCompatibilityCheckFlow(input);
}

const prompt = ai.definePrompt({
  name: 'partsCompatibilityCheckPrompt',
  input: {schema: PartsCompatibilityCheckInputSchema},
  output: {schema: PartsCompatibilityCheckOutputSchema},
  prompt: `You are an expert in vehicle parts compatibility and availability.

You will use the provided description to estimate the part's compatibility and availability.

Description: {{{prompt}}}`,
});

const partsCompatibilityCheckFlow = ai.defineFlow(
  {
    name: 'partsCompatibilityCheckFlow',
    inputSchema: PartsCompatibilityCheckInputSchema,
    outputSchema: PartsCompatibilityCheckOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
