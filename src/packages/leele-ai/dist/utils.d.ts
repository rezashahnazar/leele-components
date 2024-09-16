export declare function isValidMessage(message: any): message is Required<{
    userMessage: string;
    aiAnswer: string;
    datetime: string;
    isCorrect: boolean;
    isConsideredInappropriate: boolean;
}>;
