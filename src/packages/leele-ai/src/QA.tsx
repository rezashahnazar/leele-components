import React from "react";
import { Message } from "./schema";

interface QAStreamRootProps {
  children: React.ReactNode;
  className?: string;
}

export const QAStreamRoot: React.FC<QAStreamRootProps> = ({
  children,
  className = "",
}) => <div className={`flex flex-col space-y-4 ${className}`}>{children}</div>;

interface QAStreamCardProps {
  message: Message;
  className?: string;
}

export const QAStreamCard: React.FC<QAStreamCardProps> = ({
  message,
  className = "",
}) => (
  <div className={`border rounded-lg p-4 ${className}`}>
    <p className="font-bold">User: {message.userMessage}</p>
    <p
      className={`mt-2 ${
        message.isCorrect ? "text-green-600" : "text-red-600"
      }`}
    >
      AI: {message.aiAnswer}
    </p>
    <p className="text-sm text-gray-500 mt-2">
      {new Date(message.datetime).toLocaleString()}
    </p>
    {message.isConsideredInappropriate && (
      <p className="text-sm text-yellow-500 mt-2">
        This message may be inappropriate.
      </p>
    )}
  </div>
);

interface QAInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  className?: string;
}

export const QAInput: React.FC<QAInputProps> = ({
  onSend,
  disabled = false,
  className = "",
}) => {
  const [input, setInput] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex ${className}`}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
        placeholder="Ask a yes/no question..."
        className="flex-grow border rounded-l-lg p-2"
      />
      <button
        type="submit"
        disabled={disabled}
        className="bg-blue-500 text-white rounded-r-lg px-4 py-2 disabled:bg-gray-300"
      >
        Send
      </button>
    </form>
  );
};

interface QAFilterToggleProps {
  isFiltered: boolean;
  onToggle: () => void;
  className?: string;
}

export const QAFilterToggle: React.FC<QAFilterToggleProps> = ({
  isFiltered,
  onToggle,
  className = "",
}) => (
  <button
    onClick={onToggle}
    className={`px-4 py-2 rounded ${
      isFiltered ? "bg-red-500 text-white" : "bg-gray-200"
    } ${className}`}
  >
    {isFiltered ? "Show All Messages" : "Hide Inappropriate Messages"}
  </button>
);
