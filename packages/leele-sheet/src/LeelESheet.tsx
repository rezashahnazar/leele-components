"use client";

import React, { useState, ReactNode } from "react";
import { Drawer } from "vaul";
import { DialogTitle } from "@radix-ui/react-dialog";
import { cn } from "./utils";

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
  onDrag?: (
    event: React.PointerEvent<HTMLDivElement>,
    percentageDragged: number
  ) => void;
  /** Callback fired on release */
  onRelease?: (
    event: React.PointerEvent<HTMLDivElement>,
    open: boolean
  ) => void;
  /** Callback fired when closed */
  onClose?: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * A customizable drawer component that displays content in a sheet-like interface.
 * @param props - The props for the LeelESheet component
 */
export default function LeelESheet({
  snapPoints = ["300px", 0.85],
  defaultSnapPoint = "300px",
  ...props
}: LeelESheetProps): JSX.Element {
  // State to manage the current snap point
  const [snap, setSnap] = useState<number | string | null>(
    defaultSnapPoint as number | string | null
  );

  return (
    <Drawer.Root
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      shouldScaleBackground
      open
      dismissible={false}
      onDrag={props.onDrag}
      onRelease={props.onRelease}
      onClose={props.onClose}
      {...props}
    >
      {/* Trigger element to open the sheet */}
      <Drawer.Trigger asChild>{props.triggerElement}</Drawer.Trigger>

      {/* Overlay background */}
      <Drawer.Overlay className="fixed inset-0 bg-black/40" />

      <Drawer.Portal>
        {/* Main content of the sheet */}
        <Drawer.Content
          aria-describedby={undefined}
          className={cn(
            "fixed flex flex-col bg-muted border border-gray-200 border-b-none rounded-6xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] bottom-0 left-0 right-0 h-full",
            props.className
          )}
        >
          {/* Screen reader only title for accessibility */}
          <DialogTitle className="sr-only">{props.contentSrTitle}</DialogTitle>
          {/* Render the content element */}
          {props.contentElement}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
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
