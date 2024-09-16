"use strict";
"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQAChat = useQAChat;
var react_1 = require("react");
var react_2 = require("ai/react");
var schema_1 = require("./schema");
function useQAChat(props) {
    var _a, _b;
    var _c = (0, react_1.useState)({
        messages: [],
    }), conversation = _c[0], setConversation = _c[1];
    var _d = (0, react_1.useState)(false), isInappropriateFilter = _d[0], setIsInappropriateFilter = _d[1];
    var _e = (0, react_2.experimental_useObject)(__assign(__assign({}, props), { schema: schema_1.conversationSchema })), object = _e.object, submit = _e.submit, isLoading = _e.isLoading, error = _e.error;
    (0, react_1.useEffect)(function () {
        if (object && object.messages) {
            setConversation(object);
        }
    }, [object]);
    var sendMessage = (0, react_1.useCallback)(function (userMessage) {
        var newMessage = {
            userMessage: userMessage,
            aiAnswer: "",
            datetime: new Date().toISOString(),
            isCorrect: false,
            isConsideredInappropriate: false,
        };
        var updatedConversation = {
            messages: __spreadArray(__spreadArray([], conversation.messages, true), [newMessage], false),
        };
        setConversation(updatedConversation);
        submit(updatedConversation);
    }, [conversation, submit]);
    var toggleInappropriateFilter = (0, react_1.useCallback)(function () {
        setIsInappropriateFilter(function (prev) { return !prev; });
    }, []);
    var filteredMessages = (_b = (_a = object === null || object === void 0 ? void 0 : object.messages) === null || _a === void 0 ? void 0 : _a.filter(function (msg) { return !isInappropriateFilter || !(msg === null || msg === void 0 ? void 0 : msg.isConsideredInappropriate); })) !== null && _b !== void 0 ? _b : [];
    return {
        conversation: object || conversation,
        filteredMessages: filteredMessages,
        sendMessage: sendMessage,
        isLoading: isLoading,
        error: error,
        isInappropriateFilter: isInappropriateFilter,
        toggleInappropriateFilter: toggleInappropriateFilter,
    };
}
