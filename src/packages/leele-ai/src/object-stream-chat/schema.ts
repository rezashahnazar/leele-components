import { z } from "zod";

const messageSchema = z.object({
  id: z.string().optional(),
  userMessage: z.string().optional(),
  aiAnswer: z.string().optional(),
  datetime: z.string().optional(),
  isCorrect: z.boolean().optional(),
  isConsideredInappropriate: z.boolean().optional().default(false),
});

export const conversationSchema = z.object({
  messages: z.array(messageSchema),
});

export type Message = z.infer<typeof messageSchema>;
export type Conversation = z.infer<typeof conversationSchema>;

export type StreamObject = {
  messages: Partial<Message>[];
};
