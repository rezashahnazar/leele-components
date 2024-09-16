"use client";
import { useState, useCallback, useEffect } from "react";
import { experimental_useObject as useObject } from "ai/react";
import {
  Conversation,
  StreamObject,
  conversationSchema,
  Message,
} from "./schema";
import * as _ai_sdk_react from "@ai-sdk/react";
import { nanoid } from "nanoid";

export function useQAChat(
  props: Omit<
    _ai_sdk_react.Experimental_UseObjectOptions<StreamObject>,
    "schema"
  > & {
    api: string;
  }
) {
  const [conversation, setConversation] = useState<Conversation>({
    messages: [],
  });
  const [isInappropriateFilter, setIsInappropriateFilter] = useState(false);
  const [allMessages, setAllMessages] = useState<Message[]>([]);

  const { object, submit, isLoading, error } = useObject<StreamObject>({
    ...props,
    schema: conversationSchema,
  });

  useEffect(() => {
    if (object && Array.isArray(object.messages)) {
      const updatedMessages = object.messages
        .filter((msg) => msg?.userMessage || msg?.aiAnswer)
        .reduce((acc, msg) => {
          const existingMsg = acc.find((m) => m.id === msg?.id);
          if (existingMsg) {
            existingMsg.aiAnswer = msg?.aiAnswer || existingMsg.aiAnswer;
            existingMsg.isCorrect = msg?.isCorrect ?? existingMsg.isCorrect;
            existingMsg.isConsideredInappropriate =
              msg?.isConsideredInappropriate ??
              existingMsg.isConsideredInappropriate;
          } else {
            acc.push({
              id: msg?.id || nanoid(),
              userMessage: msg?.userMessage || "",
              aiAnswer: msg?.aiAnswer || "",
              datetime:
                msg?.datetime && isValidISODate(msg?.datetime)
                  ? msg?.datetime
                  : new Date().toISOString(),
              isCorrect: msg?.isCorrect ?? false,
              isConsideredInappropriate:
                msg?.isConsideredInappropriate ?? false,
            });
          }
          return acc;
        }, [] as Message[]);

      setAllMessages(updatedMessages);
      setConversation({ messages: updatedMessages });
    }
  }, [object]);

  function isValidISODate(dateString: string) {
    const date = new Date(dateString);
    return (
      date instanceof Date && !isNaN(date.getTime()) && dateString.includes("T")
    );
  }

  const sendMessage = useCallback(
    (userMessage: string) => {
      if (!userMessage.trim()) return;

      const newMessage: Message = {
        id: nanoid(),
        userMessage,
        aiAnswer: "",
        datetime: new Date().toISOString(),
        isCorrect: false,
        isConsideredInappropriate: false,
      };

      setAllMessages((prevMessages) => {
        if (prevMessages.some((msg) => msg?.userMessage === userMessage)) {
          return prevMessages;
        }
        return [...prevMessages, newMessage];
      });

      setConversation((prevConversation) => ({
        messages: [...prevConversation.messages, newMessage],
      }));

      submit({ messages: [...conversation.messages, newMessage] });
    },
    [conversation.messages, submit]
  );

  const toggleInappropriateFilter = useCallback(() => {
    setIsInappropriateFilter((prev) => !prev);
  }, []);

  const filteredMessages = allMessages.filter(
    (msg) => !isInappropriateFilter || !msg?.isConsideredInappropriate
  );

  console.log(filteredMessages);

  return {
    conversation: object || conversation,

    filteredMessages,
    sendMessage,
    isLoading,
    error,
    isInappropriateFilter,
    toggleInappropriateFilter,
  };
}
