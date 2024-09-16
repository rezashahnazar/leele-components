export function isValidMessage(message: any): message is Required<{
  id: string;
  userMessage: string;
  aiAnswer: string;
  datetime: string;
  isCorrect: boolean;
  isConsideredInappropriate: boolean;
}> {
  const checks = [
    !!message,
    typeof message?.id === "string",
    typeof message?.userMessage === "string",
    typeof message?.aiAnswer === "string",
    typeof message?.datetime === "string",
    typeof message?.isCorrect === "boolean",
    typeof message?.isConsideredInappropriate === "boolean" || "undefined",
  ];
  return checks.every(Boolean);
}
