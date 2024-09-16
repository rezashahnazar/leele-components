import React, { ReactNode } from "react";
/** Props for the LeelESheet component */
export interface LeelESheetProps {
    /** Array of snap points (e.g., ["300px", "50%"]) */
    snapPoints?: (number | string)[];
    /** Initial snap point when opened */
    defaultSnapPoint?: number | string | null;
    /** Element that triggers the sheet */
    triggerElement?: ReactNode;
    /** Content to be displayed in the sheet */
    /** @deprecated Use `children` prop instead */
    contentElement?: ReactNode;
    /** Children to be displayed in the sheet */
    children?: ReactNode;
    /** Additional CSS classes for content */
    className?: string;
    /** Additional CSS classes for the overlay */
    overlayClassName?: string;
    /** Whether to show the overlay */
    showOverlay?: boolean;
    /** Whether to allow interactions with the page when the sheet is open */
    activePageInteractions?: boolean;
    /** The state that controls the open/close of the sheet */
    open?: boolean;
    /** Whether to always keep the sheet open */
    alwaysOpen?: boolean;
    /** Accessible title for screen readers */
    contentSrTitle?: string;
    /** Callback fired while dragging */
    onDrag?: (event: React.PointerEvent<HTMLDivElement>, percentageDragged: number) => void;
    /** Callback fired on release */
    onRelease?: (event: React.PointerEvent<HTMLDivElement>, open: boolean) => void;
    /** Callback fired when closed */
    onClose?: () => void;
    /** Callback fired when the open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Whether to prevent scroll restoration */
    preventScrollRestoration?: boolean;
    /** Whether to disable preventing scroll */
    disablePreventScroll?: boolean;
    /** Whether to nest the sheet */
    nested?: boolean;
}
/**
 * A customizable drawer component that displays content in a sheet-like interface.
 * @param props - The props for the LeelESheet component
 */
export default function LeelESheet({ nested, snapPoints, defaultSnapPoint, contentElement, open, triggerElement, overlayClassName, alwaysOpen, showOverlay, activePageInteractions, preventScrollRestoration, disablePreventScroll, children, ...props }: LeelESheetProps): JSX.Element;
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
