import React, { ReactNode } from "react";
/** Props for the LeelESheet component */
export interface LeelESheetProps {
    /** Element that triggers the sheet */
    triggerElement?: ReactNode;
    /** Content to be displayed in the sheet */
    contentElement?: ReactNode;
    /** Accessible title for screen readers */
    contentSrTitle?: string;
    /** Array of snap points (e.g., ["300px", "50%"]) */
    snapPoints?: (number | string)[];
    /** Initial snap point when opened */
    defaultSnapPoint?: number | string | null;
    /** Callback fired while dragging */
    onDrag?: (event: React.PointerEvent<HTMLDivElement>, percentageDragged: number) => void;
    /** Callback fired on release */
    onRelease?: (event: React.PointerEvent<HTMLDivElement>, open: boolean) => void;
    /** Callback fired when closed */
    onClose?: () => void;
    /** Additional CSS classes for content */
    className?: string;
    /** Additional CSS classes for the overlay */
    overlayClassName?: string;
    /** Whether to show the overlay */
    showOverlay?: boolean;
}
/**
 * A customizable drawer component that displays content in a sheet-like interface.
 * @param props - The props for the LeelESheet component
 */
export default function LeelESheet({ snapPoints, defaultSnapPoint, showOverlay, ...props }: LeelESheetProps): JSX.Element;
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
