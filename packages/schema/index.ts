import { z } from "zod";

export const ShortLinkSchema = z.object({
  shortCode: z.string().min(1),
  originalUrl: z.string().url(),
  createdAt: z.string().datetime(),
  expiresAt: z.string().datetime().optional(),
  clicks: z.number().optional(),
});

export type ShortLink = z.infer<typeof ShortLinkSchema>;

export const CreateShortLinkRequestSchema = z.object({
  originalUrl: z
    .string()
    .url({ message: "Please enter a valid URL (e.g., https://example.com)" }),
  customCode: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_-]+$/)
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),
  expiresAt: z
    .string()
    .datetime()
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),
});

export type CreateShortLinkRequest = z.infer<
  typeof CreateShortLinkRequestSchema
>;

export const CreateShortLinkResponseSchema = z.object({
  shortCode: z.string(),
});

export type CreateShortLinkResponse = z.infer<
  typeof CreateShortLinkResponseSchema
>;

export const CheckShortCodeExistsResponseSchema = z.object({
  exists: z.boolean(),
});

export type CheckShortCodeExistsResponse = z.infer<
  typeof CheckShortCodeExistsResponseSchema
>;
