"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QAFilterToggle = exports.QAInput = exports.QAStreamCard = exports.QAStreamRoot = void 0;
var react_1 = __importDefault(require("react"));
var QAStreamRoot = function (_a) {
    var children = _a.children, _b = _a.className, className = _b === void 0 ? "" : _b;
    return react_1.default.createElement("div", { className: "flex flex-col space-y-4 ".concat(className) }, children);
};
exports.QAStreamRoot = QAStreamRoot;
var QAStreamCard = function (_a) {
    var message = _a.message, _b = _a.className, className = _b === void 0 ? "" : _b;
    return (react_1.default.createElement("div", { className: "border rounded-lg p-4 ".concat(className) },
        react_1.default.createElement("p", { className: "font-bold" },
            "User: ",
            message.userMessage),
        react_1.default.createElement("p", { className: "mt-2 ".concat(message.isCorrect ? "text-green-600" : "text-red-600") },
            "AI: ",
            message.aiAnswer),
        react_1.default.createElement("p", { className: "text-sm text-gray-500 mt-2" }, new Date(message.datetime).toLocaleString()),
        message.isConsideredInappropriate && (react_1.default.createElement("p", { className: "text-sm text-yellow-500 mt-2" }, "This message may be inappropriate."))));
};
exports.QAStreamCard = QAStreamCard;
var QAInput = function (_a) {
    var onSend = _a.onSend, _b = _a.disabled, disabled = _b === void 0 ? false : _b, _c = _a.className, className = _c === void 0 ? "" : _c;
    var _d = react_1.default.useState(""), input = _d[0], setInput = _d[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        if (input.trim()) {
            onSend(input.trim());
            setInput("");
        }
    };
    return (react_1.default.createElement("form", { onSubmit: handleSubmit, className: "flex ".concat(className) },
        react_1.default.createElement("input", { type: "text", value: input, onChange: function (e) { return setInput(e.target.value); }, disabled: disabled, placeholder: "Ask a yes/no question...", className: "flex-grow border rounded-l-lg p-2" }),
        react_1.default.createElement("button", { type: "submit", disabled: disabled, className: "bg-blue-500 text-white rounded-r-lg px-4 py-2 disabled:bg-gray-300" }, "Send")));
};
exports.QAInput = QAInput;
var QAFilterToggle = function (_a) {
    var isFiltered = _a.isFiltered, onToggle = _a.onToggle, _b = _a.className, className = _b === void 0 ? "" : _b;
    return (react_1.default.createElement("button", { onClick: onToggle, className: "px-4 py-2 rounded ".concat(isFiltered ? "bg-red-500 text-white" : "bg-gray-200", " ").concat(className) }, isFiltered ? "Show All Messages" : "Hide Inappropriate Messages"));
};
exports.QAFilterToggle = QAFilterToggle;
