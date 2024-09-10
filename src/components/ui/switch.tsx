"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-8 w-16 shrink-0 cursor-pointer items-center rounded-full " +
        "shadow-sm transition-colors focus-visible:outline-none " +
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
        "focus-visible:ring-offset-background " +
        "disabled:cursor-not-allowed disabled:opacity-50 " +
        "data-[state=checked]:bg-foreground/20 data-[state=unchecked]:bg-foreground/20 " +
        "shadow-[inset_0_0px_4px_1px_hsl(var(--foreground)/10%)] ",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block size-8 rounded-full bg-card-foreground/80 shadow-[0_1px_2px_1px_hsl(var(--foreground)/20%)] " +
          "ring-0  data-[state=checked]:translate-x-0 data-[state=unchecked]:-translate-x-8 !duration-500 !transition-transform "
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
