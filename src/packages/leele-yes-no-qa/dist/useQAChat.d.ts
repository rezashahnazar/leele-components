import { StreamObject } from "./schema";
import * as _ai_sdk_react from "@ai-sdk/react";
export declare function useQAChat(props: Omit<_ai_sdk_react.Experimental_UseObjectOptions<StreamObject>, "schema"> & {
    api: string;
}): {
    conversation: {
        messages?: ({
            userMessage?: string | undefined;
            aiAnswer?: string | undefined;
            datetime?: string | undefined;
            isCorrect?: boolean | undefined;
            isConsideredInappropriate?: boolean | undefined;
        } | undefined)[] | undefined;
    };
    filteredMessages: ({
        userMessage?: string | undefined;
        aiAnswer?: string | undefined;
        datetime?: string | undefined;
        isCorrect?: boolean | undefined;
        isConsideredInappropriate?: boolean | undefined;
    } | undefined)[];
    sendMessage: (userMessage: string) => void;
    isLoading: boolean;
    error: Error | undefined;
    isInappropriateFilter: boolean;
    toggleInappropriateFilter: () => void;
};
