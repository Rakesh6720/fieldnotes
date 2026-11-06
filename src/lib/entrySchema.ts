import { z } from "zod";

export const moods = ['great', 'good', 'okay', 'low'] as const;

export const entrySchema = z.object({
    title: z
      .string()
      .trim()
      .min(1, "Give your entry a title")
      .max(120, "Keep the title under 120 characters"),
    body: z.string().max(5000, "Notes are limited to 5,000 characters"),
    mood: z.enum(moods).nullable(),
    tags: z.string(), // comma-separated in the form, an array in storage
});

export type EntryFormValues = z.infer<typeof entrySchema>;

export function parseTags(raw: string): string[] {
  return [...new Set(raw.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean))];
}