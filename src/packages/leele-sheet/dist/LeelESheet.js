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
    var _b = _a.snapPoints, snapPoints = _b === void 0 ? ["300px", 0.85] : _b, _c = _a.defaultSnapPoint, defaultSnapPoint = _c === void 0 ? "300px" : _c, _d = _a.showOverlay, showOverlay = _d === void 0 ? true : _d, props = __rest(_a, ["snapPoints", "defaultSnapPoint", "showOverlay"]);
    // State to manage the current snap point
    var _e = (0, react_1.useState)(defaultSnapPoint), snap = _e[0], setSnap = _e[1];
    return (react_1.default.createElement(vaul_1.Drawer.Root, __assign({ snapPoints: snapPoints, activeSnapPoint: snap, setActiveSnapPoint: setSnap, shouldScaleBackground: true, open: true, dismissible: false, onDrag: props.onDrag, onRelease: props.onRelease, onClose: props.onClose }, props),
        react_1.default.createElement(vaul_1.Drawer.Trigger, { asChild: true }, props.triggerElement),
        showOverlay && (react_1.default.createElement(vaul_1.Drawer.Overlay, { className: (0, utils_1.cn)("fixed inset-0 bg-black/40", props.overlayClassName) })),
        react_1.default.createElement(vaul_1.Drawer.Portal, null,
            react_1.default.createElement(vaul_1.Drawer.Content, { "aria-describedby": undefined, className: (0, utils_1.cn)("fixed flex flex-col bg-muted border border-gray-200 border-b-none rounded-6xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] bottom-0 left-0 right-0 h-full", props.className) },
                react_1.default.createElement(react_dialog_1.DialogTitle, { className: "sr-only" }, props.contentSrTitle),
                props.contentElement))));
}
/**
 * Developer Guide:
 *
 * 1. The LeelESheet component is built on top of vault and radix-ui libraries.
 * 2. It provides a flexible way to create bottom sheets with customizable snap points.
 * 3. The 'triggerElement' prop should be used to provide a button or any interactive element to open the sheet.
 * 4. The 'contentElement' prop is where you should pass the main content of your sheet.
 * 5. Use 'snapPoints' to define the heights at which the sheet can snap. You can use pixel values or percentages.
 * 6. The 'defaultSnapPoint' sets the initial height of the sheet when opened.
 * 7. Callback props (onDrag, onRelease, onClose) can be used to add custom behaviors at different stages of interaction.
 * 8. The component is accessible by default, with screen reader support through the 'contentSrTitle' prop.
 * 9. Additional styling can be applied using the 'className' prop or by modifying the existing Tailwind classes.
 *
 * Note: This component is set to always be open and non-dismissible by default. If you need to control the open state,
 * you should implement that logic in the parent component and pass it down as a prop.
 */
