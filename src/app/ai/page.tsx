"use client";
import { useObjectStreamingChat, Message } from "@/packages/leele-ai/src";
import { useState } from "react";
import React from "react";

export default function Page() {
  const { messages, filteredMessages, isLoading, error, sendMessage } =
    useObjectStreamingChat({
      apiRoute: "/template/api/qa/",
    });
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Q&A Chatbot
        </h1>
        <div className="space-y-4 mb-6 h-96 overflow-y-auto">
          {filteredMessages?.map((message, index) => (
            <React.Fragment key={index}>
              <div className="flex justify-start">
                <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-200 text-gray-800">
                  <p>{message.userMessage}</p>
                </div>
              </div>
              {message.aiAnswer && (
                <div className="flex justify-end">
                  <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-blue-500 text-white">
                    <p>{message.aiAnswer}</p>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        {error && <p className="text-red-500 mb-4">An error occurred.</p>}
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isLoading}
            className="flex-grow px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
