import { z } from "zod";

// Define the schema for a single message
const messageSchema = z.object({
  id: z.string().optional(),
  userMessage: z.string().optional(),
  aiAnswer: z.string().optional(),
  datetime: z.string().optional(), // ISO string for easier serialization
  isCorrect: z.boolean().optional(),
  isConsideredInappropriate: z.boolean().optional().default(false),
});

// Define the schema for the entire conversation
export const conversationSchema = z.object({
  messages: z.array(messageSchema),
});

// TypeScript types based on the schema
export type Message = z.infer<typeof messageSchema>;
export type Conversation = z.infer<typeof conversationSchema>;

// Type for the stream object
export type StreamObject = {
  messages: Partial<Message>[];
};
