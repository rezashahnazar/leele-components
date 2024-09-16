"use client";

import React, { useState, ReactNode } from "react";
import { Drawer } from "vaul";
import { DialogTitle } from "@radix-ui/react-dialog";
import { cn } from "./utils";

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
export default function LeelESheet({
  nested = false,
  snapPoints = !nested ? ["400px", 0.85] : ["150px", "300px"],
  defaultSnapPoint = !nested ? "400px" : "150px",
  contentElement,
  open,
  triggerElement = (
    <button
      className={cn(
        "bg-blue-500 text-white px-4 py-2 rounded-lg",
        "hover:bg-blue-500/10 hover:text-blue-500",
        "transition-all duration-300"
      )}
    >
      {nested ? "Toggle Nested Sheet Open/Close" : "Toggle Sheet Open/Close"}
    </button>
  ),
  overlayClassName = "bg-black/40",
  alwaysOpen = undefined,
  showOverlay = !nested ? true : false,
  activePageInteractions = true,
  preventScrollRestoration = true,
  disablePreventScroll = false,
  children,
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
      shouldScaleBackground={!nested}
      open={alwaysOpen ? true : open}
      onOpenChange={() => {}}
      dismissible={alwaysOpen ? false : true}
      onDrag={props.onDrag}
      onRelease={props.onRelease}
      onClose={props.onClose}
      modal={!activePageInteractions}
      fixed={alwaysOpen ? true : false}
      direction="bottom"
      preventScrollRestoration={preventScrollRestoration}
      disablePreventScroll={disablePreventScroll}
      nested={nested}
      {...props}
    >
      {/* Trigger element to open the sheet. If alwaysOpen is true, the sheet will 
          be open by default and this element will not be rendered */}
      {!alwaysOpen && <Drawer.Trigger asChild>{triggerElement}</Drawer.Trigger>}

      {/* Overlay background */}
      {showOverlay && (
        <Drawer.Overlay
          className={cn("fixed inset-0 bg-black/40", overlayClassName)}
        />
      )}

      <Drawer.Portal>
        {/* Main content of the sheet */}
        <Drawer.Content
          aria-describedby={undefined}
          className={cn(
            "fixed flex flex-col border border-gray-200 border-b-none rounded-3xl",
            " p-8 shadow-[0_4px_20px_rgba(0,0,0,0.1)]  h-full",
            {
              "bg-white bottom-0 left-8 right-8": nested,
              "bg-muted bottom-0 left-0 right-0": !nested,
            },
            props.className
          )}
        >
          {/* Screen reader only title for accessibility */}
          <DialogTitle className="sr-only">{props.contentSrTitle}</DialogTitle>
          {/* Render the content element */}
          {children}
          {contentElement}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
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
