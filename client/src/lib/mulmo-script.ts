import { z } from "zod";
import type { MulmoScript } from "@shared/schema";

export const DEFAULT_MULMO_SCRIPT: MulmoScript = {
  $mulmocast: {
    version: "1.0"
  },
  speakers: [
    {
      name: "Host",
      voice: "alloy"
    }
  ],
  beats: [
    {
      text: "Welcome to this AI-generated content.",
      speaker: "Host",
      duration: 3000
    }
  ]
};

export function validateMulmoScript(script: unknown): MulmoScript | null {
  try {
    const mulmoScriptSchema = z.object({
      $mulmocast: z.object({
        version: z.string(),
      }),
      speakers: z.array(z.object({
        name: z.string(),
        voice: z.string(),
      })).optional(),
      beats: z.array(z.object({
        text: z.string(),
        speaker: z.string().optional(),
        duration: z.number().optional(),
        image: z.object({
          prompt: z.string().optional(),
          url: z.string().optional(),
        }).optional(),
      })),
    });

    return mulmoScriptSchema.parse(script);
  } catch {
    return null;
  }
}

export function formatMulmoScript(script: MulmoScript): string {
  return JSON.stringify(script, null, 2);
}

export function parseMulmoScript(content: string): MulmoScript | null {
  try {
    const parsed = JSON.parse(content);
    return validateMulmoScript(parsed);
  } catch {
    return null;
  }
}

export const VOICE_OPTIONS = [
  { value: "alloy", label: "Alloy" },
  { value: "echo", label: "Echo" },
  { value: "fable", label: "Fable" },
  { value: "onyx", label: "Onyx" },
  { value: "nova", label: "Nova" },
  { value: "shimmer", label: "Shimmer" },
];

export const OUTPUT_TYPE_OPTIONS = [
  { value: "podcast", label: "Podcast", icon: "microphone" },
  { value: "video", label: "Video", icon: "video" },
  { value: "slideshow", label: "Slideshow", icon: "presentation" },
  { value: "pdf", label: "PDF", icon: "file-pdf" },
];
