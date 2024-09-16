"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationSchema = void 0;
var zod_1 = require("zod");
// Define the schema for a single message
var messageSchema = zod_1.z.object({
    userMessage: zod_1.z.string(),
    aiAnswer: zod_1.z.string(),
    datetime: zod_1.z.string(), // ISO string for easier serialization
    isCorrect: zod_1.z.boolean(),
    isConsideredInappropriate: zod_1.z.boolean().default(false),
});
// Define the schema for the entire conversation
exports.conversationSchema = zod_1.z.object({
    messages: zod_1.z.array(messageSchema),
});
