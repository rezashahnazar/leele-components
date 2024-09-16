import React from "react";
import { Message } from "./schema";
interface QAStreamRootProps {
    children: React.ReactNode;
    className?: string;
}
export declare const QAStreamRoot: React.FC<QAStreamRootProps>;
interface QAStreamCardProps {
    message: Message;
    className?: string;
}
export declare const QAStreamCard: React.FC<QAStreamCardProps>;
interface QAInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
    className?: string;
}
export declare const QAInput: React.FC<QAInputProps>;
interface QAFilterToggleProps {
    isFiltered: boolean;
    onToggle: () => void;
    className?: string;
}
export declare const QAFilterToggle: React.FC<QAFilterToggleProps>;
export {};
