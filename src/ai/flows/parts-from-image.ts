'use server';

/**
 * @fileOverview This file defines a Genkit flow for identifying Keke parts from an image and suggesting similar parts.
 *
 * - partsFromImage - A function that takes an image of a Keke part and returns a list of suggested parts.
 * - PartsFromImageInput - The input type for the partsFromImage function.
 * - PartsFromImageOutput - The return type for the partsFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PartsFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a Keke part, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type PartsFromImageInput = z.infer<typeof PartsFromImageInputSchema>;

const PartsFromImageOutputSchema = z.object({
  suggestedParts: z
    .array(z.string())
    .describe('A list of suggested parts based on the image.'),
});
export type PartsFromImageOutput = z.infer<typeof PartsFromImageOutputSchema>;

export async function partsFromImage(input: PartsFromImageInput): Promise<PartsFromImageOutput> {
  return partsFromImageFlow(input);
}

const partsFromImagePrompt = ai.definePrompt({
  name: 'partsFromImagePrompt',
  input: {schema: PartsFromImageInputSchema},
  output: {schema: PartsFromImageOutputSchema},
  prompt: `You are an AI assistant specializing in identifying Keke parts.
  Based on the image provided, identify the part and suggest similar or compatible parts available in the store.
  Return a list of suggested part names.

  Image: {{media url=photoDataUri}}
  `,
});

const partsFromImageFlow = ai.defineFlow(
  {
    name: 'partsFromImageFlow',
    inputSchema: PartsFromImageInputSchema,
    outputSchema: PartsFromImageOutputSchema,
  },
  async input => {
    const {output} = await partsFromImagePrompt(input);
    return output!;
  }
);
