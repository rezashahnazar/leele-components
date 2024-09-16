"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidMessage = isValidMessage;
function isValidMessage(message) {
    if (!message || typeof message !== "object") {
        return false;
    }
    var requiredFields = [
        "userMessage",
        "aiAnswer",
        "datetime",
        "isCorrect",
        "isConsideredInappropriate",
    ];
    return requiredFields.every(function (field) {
        if (field === "isCorrect" || field === "isConsideredInappropriate") {
            return typeof message[field] === "boolean";
        }
        return typeof message[field] === "string" && message[field].trim() !== "";
    });
}
