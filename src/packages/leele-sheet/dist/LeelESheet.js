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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LeelESheet;
var react_1 = __importStar(require("react"));
var vaul_1 = require("vaul");
var react_dialog_1 = require("@radix-ui/react-dialog");
var utils_1 = require("./utils");
/**
 * A customizable drawer component that displays content in a sheet-like interface.
 * @param props - The props for the LeelESheet component
 */
function LeelESheet(_a) {
    var _b = _a.nested, nested = _b === void 0 ? false : _b, _c = _a.snapPoints, snapPoints = _c === void 0 ? !nested ? ["400px", 0.85] : ["150px", "300px"] : _c, _d = _a.defaultSnapPoint, defaultSnapPoint = _d === void 0 ? !nested ? "400px" : "150px" : _d, contentElement = _a.contentElement, open = _a.open, _e = _a.triggerElement, triggerElement = _e === void 0 ? (react_1.default.createElement("button", { className: (0, utils_1.cn)("bg-blue-500 text-white px-4 py-2 rounded-lg", "hover:bg-blue-500/10 hover:text-blue-500", "transition-all duration-300") }, nested ? "Toggle Nested Sheet Open/Close" : "Toggle Sheet Open/Close")) : _e, _f = _a.overlayClassName, overlayClassName = _f === void 0 ? "bg-black/40" : _f, _g = _a.alwaysOpen, alwaysOpen = _g === void 0 ? undefined : _g, _h = _a.showOverlay, showOverlay = _h === void 0 ? !nested ? true : false : _h, _j = _a.activePageInteractions, activePageInteractions = _j === void 0 ? true : _j, _k = _a.preventScrollRestoration, preventScrollRestoration = _k === void 0 ? true : _k, _l = _a.disablePreventScroll, disablePreventScroll = _l === void 0 ? false : _l, children = _a.children, props = __rest(_a, ["nested", "snapPoints", "defaultSnapPoint", "contentElement", "open", "triggerElement", "overlayClassName", "alwaysOpen", "showOverlay", "activePageInteractions", "preventScrollRestoration", "disablePreventScroll", "children"]);
    // State to manage the current snap point
    var _m = (0, react_1.useState)(defaultSnapPoint), snap = _m[0], setSnap = _m[1];
    return (react_1.default.createElement(vaul_1.Drawer.Root, __assign({ snapPoints: snapPoints, activeSnapPoint: snap, setActiveSnapPoint: setSnap, shouldScaleBackground: !nested, open: alwaysOpen ? true : open, onOpenChange: function () { }, dismissible: alwaysOpen ? false : true, onDrag: props.onDrag, onRelease: props.onRelease, onClose: props.onClose, modal: !activePageInteractions, fixed: alwaysOpen ? true : false, direction: "bottom", preventScrollRestoration: preventScrollRestoration, disablePreventScroll: disablePreventScroll, nested: nested }, props),
        !alwaysOpen && react_1.default.createElement(vaul_1.Drawer.Trigger, { asChild: true }, triggerElement),
        showOverlay && (react_1.default.createElement(vaul_1.Drawer.Overlay, { className: (0, utils_1.cn)("fixed inset-0 bg-black/40", overlayClassName) })),
        react_1.default.createElement(vaul_1.Drawer.Portal, null,
            react_1.default.createElement(vaul_1.Drawer.Content, { "aria-describedby": undefined, className: (0, utils_1.cn)("fixed flex flex-col border border-gray-200 border-b-none rounded-3xl", " p-8 shadow-[0_4px_20px_rgba(0,0,0,0.1)]  h-full", {
                    "bg-white bottom-0 left-8 right-8": nested,
                    "bg-muted bottom-0 left-0 right-0": !nested,
                }, props.className) },
                react_1.default.createElement(react_dialog_1.DialogTitle, { className: "sr-only" }, props.contentSrTitle),
                children,
                contentElement))));
}
/**
 * Developer Guide:
 *
 * 1. The LeelESheet component is built on top of vaul and radix-ui libraries.
 * 2. It provides a flexible way to create bottom sheets with customizable behavior.
 * 3. The 'triggerElement' prop should be used to provide a button or any interactive element to open the sheet.
 * 4. The 'contentElement' prop is where you should pass the main content of your sheet.
 * 5. The 'alwaysOpen' prop determines if the sheet is always visible or can be dismissed.
 * 6. The 'nested' prop should be set to true if this sheet is rendered inside another sheet.
 * 7. Callback props (onDrag, onRelease, onClose) can be used to add custom behaviors at different stages of interaction.
 * 8. The component is accessible by default, with screen reader support through the 'contentSrTitle' prop.
 * 9. Additional styling can be applied using the 'className' prop or by modifying the existing Tailwind classes.
 * 10. The 'showOverlay' prop controls the visibility of the background overlay.
 * 11. Use 'activePageInteractions' to determine if the sheet should be modal or allow interactions with the page behind it.
 * 12. 'preventScrollRestoration' and 'disablePreventScroll' can be used to fine-tune scrolling behavior.
 *
 * Note: The open state and dismissibility of the sheet are controlled by the 'alwaysOpen' prop. Set it to false if you want
 * the sheet to be dismissible and controlled by the trigger element.
 */
