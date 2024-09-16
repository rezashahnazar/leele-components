import { z } from "zod";
declare const messageSchema: z.ZodObject<{
    userMessage: z.ZodString;
    aiAnswer: z.ZodString;
    datetime: z.ZodString;
    isCorrect: z.ZodBoolean;
    isConsideredInappropriate: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    userMessage: string;
    aiAnswer: string;
    datetime: string;
    isCorrect: boolean;
    isConsideredInappropriate: boolean;
}, {
    userMessage: string;
    aiAnswer: string;
    datetime: string;
    isCorrect: boolean;
    isConsideredInappropriate?: boolean | undefined;
}>;
export declare const conversationSchema: z.ZodObject<{
    messages: z.ZodArray<z.ZodObject<{
        userMessage: z.ZodString;
        aiAnswer: z.ZodString;
        datetime: z.ZodString;
        isCorrect: z.ZodBoolean;
        isConsideredInappropriate: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        userMessage: string;
        aiAnswer: string;
        datetime: string;
        isCorrect: boolean;
        isConsideredInappropriate: boolean;
    }, {
        userMessage: string;
        aiAnswer: string;
        datetime: string;
        isCorrect: boolean;
        isConsideredInappropriate?: boolean | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    messages: {
        userMessage: string;
        aiAnswer: string;
        datetime: string;
        isCorrect: boolean;
        isConsideredInappropriate: boolean;
    }[];
}, {
    messages: {
        userMessage: string;
        aiAnswer: string;
        datetime: string;
        isCorrect: boolean;
        isConsideredInappropriate?: boolean | undefined;
    }[];
}>;
export type Message = z.infer<typeof messageSchema>;
export type Conversation = z.infer<typeof conversationSchema>;
export type StreamObject = {
    messages: Partial<Message>[];
};
export {};
