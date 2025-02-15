import { z } from 'zod';

export const LocationSchema = z.object({
  long: z.number(),
  lat: z.number(),
});

export const HotelSchema = z.object({
  id: z.union([z.number(), z.string()]).transform((val) => Number(val)), // Accepts both number and string
  name: z.string(),
  description: z.string(),
  location: LocationSchema,
  stars: z.number().min(1).max(5),
  image: z.string().url(),
});


export const CommentSchema = z.object({
  id: z.number(),
  hotelId: z.number(),
  author: z.string(),
  content: z.string(),
  rating: z.number().min(1).max(5),
  date: z.string(),
});

export type Location = z.infer<typeof LocationSchema>;
export type Hotel = z.infer<typeof HotelSchema>;
export type Comment = z.infer<typeof CommentSchema>;