import { streamObject } from "ai";
import { z } from "zod";
import { createOpenAI } from "@ai-sdk/openai";

export const runtime = "edge";
export const maxDuration = 30;

const messageSchema = z.object({
  id: z
    .string()
    .describe(
      "The unique identifier for the message received from the user client"
    ),
  userMessage: z.string().describe("The message sent by the user"),
  aiAnswer: z.string().describe("The answer from the AI"),
  datetime: z.string().describe("The timestamp of the message"),
  isCorrect: z.boolean().describe("Whether the AI's answer is correct"),
  isConsideredInappropriate: z
    .boolean()
    .default(false)
    .describe("Whether the message is considered inappropriate"),
});

const conversationSchema = z.object({
  messages: z.array(messageSchema),
});

export type Message = z.infer<typeof messageSchema>;
export type Conversation = z.infer<typeof conversationSchema>;

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE,
  compatibility: "strict",
});

async function handleQAChat(
  req: Request,
  prompt?: string,
  inappropriateDefiningPrompt?: string
): Promise<Response> {
  const { messages }: Conversation = await req.json();

  const lastUserMessage = messages[messages.length - 1];

  const basePrompt =
    prompt ||
    "You are a helpful AI assistant. Answer the user's yes/no question and provide a brief explanation.";
  const inappropriatePrompt = inappropriateDefiningPrompt
    ? `\nInappropriate content definition: ${inappropriateDefiningPrompt}`
    : "";

  const result = await streamObject({
    model: openai("gpt-4o-mini"),
    schemaName: "conversation",
    schemaDescription:
      "A QA conversation between a user and a fun AI assistant",
    schema: conversationSchema,
    prompt: `System: ${basePrompt}
    Notice:
    * ${inappropriatePrompt}
    * If the question is inappropriate, flag it as such. 
    * Always include all required fields in your response: id, userMessage, aiAnswer, datetime, isCorrect, and isConsideredInappropriate. 
    Use the provided id: ${lastUserMessage.id} in your response.
    Don't say anything as the aiAnswer if userMessage is inappropriate.
  User: ${lastUserMessage.userMessage}`,
    mode: "json",
  });

  const stream = new ReadableStream({
    async start(controller) {
      const reader = result.fullStream.getReader();

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          if (value.type === "object" && value.object.messages) {
            const jsonChunk = JSON.stringify(value.object) + "\n";
            controller.enqueue(new TextEncoder().encode(jsonChunk));
          }
        }
      } catch (error) {
        controller.error(error);
      } finally {
        controller.close();
        reader.releaseLock();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/json",
      "Transfer-Encoding": "chunked",
    },
  });
}

export { handleQAChat };
