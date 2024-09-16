"use client";
import { useState, useCallback, useEffect } from "react";
import { nanoid } from "nanoid";

interface Message {
  id: string;
  userMessage: string;
  aiAnswer: string;
  datetime: string;
  isCorrect: boolean;
  isConsideredInappropriate: boolean;
}

interface ChatHookOptions {
  apiRoute: string;
  onError?: (error: Error) => void;
  onFinish?: () => void;
  onSubmit?: () => void;
}

interface ChatHookResult {
  messages: Message[];
  filteredMessages: Message[];
  isLoading: boolean;
  error: Error | null;
  sendMessage: (userMessage: string) => void;
}

export function useObjectStreamChat({
  apiRoute,
  onError,
  onFinish,
  onSubmit,
}: ChatHookOptions): ChatHookResult {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Add this new state for filtered messages
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);

  const sendMessage = useCallback(
    async (userMessage: string) => {
      setIsLoading(true);
      setError(null);
      onSubmit?.();

      // Add user message optimistically
      const newUserMessage: Message = {
        id: nanoid(),
        userMessage,
        aiAnswer: "",
        datetime: new Date().toISOString(),
        isCorrect: false,
        isConsideredInappropriate: false,
      };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);

      try {
        const response = await fetch(apiRoute, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages: [...messages, newUserMessage] }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error("Response body is not readable");
        }

        let partialMessage: Partial<Message> = {};

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = new TextDecoder().decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.trim() === "") continue;

            try {
              const parsed = JSON.parse(line);
              if (parsed.messages && parsed.messages.length > 0) {
                partialMessage = { ...partialMessage, ...parsed.messages[0] };
                setMessages((prevMessages) => [
                  ...prevMessages.slice(0, -1),
                  { ...newUserMessage, ...partialMessage } as Message,
                ]);
              }
            } catch (e) {
              console.error("Error parsing JSON:", e);
            }
          }
        }

        setIsLoading(false);
        onFinish?.();
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
        setIsLoading(false);
        onError?.(err instanceof Error ? err : new Error("An error occurred"));
      }
    },
    [apiRoute, messages, onSubmit, onFinish, onError]
  );

  useEffect(() => {
    setFilteredMessages(
      messages.filter((msg) => msg.isConsideredInappropriate === false)
    );
  }, [messages]);

  useEffect(() => {
    return () => {
      // Cleanup if needed
    };
  }, []);

  return { messages, filteredMessages, isLoading, error, sendMessage };
}
