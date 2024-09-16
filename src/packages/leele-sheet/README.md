# LeelE Sheet

LeelE Sheet is a customizable snappable bottom sheet component for React applications, built on top of the Vaul library and Radix UI components. It offers precise control over the sheet's open states through configurable snap points, allowing you to define specific heights or percentages where the sheet can rest. This snappable functionality enables a smooth and intuitive user experience, as the sheet can be easily adjusted to predetermined positions. The component seamlessly integrates with TypeScript and Tailwind CSS, providing type safety and easy styling customization while maintaining the accessibility features from Radix UI.

## Table of Contents

- [LeelE Sheet](#leele-sheet)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Getting Started](#getting-started)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Nested Sheets](#nested-sheets)
  - [Props](#props)
  - [Customization](#customization)
  - [TypeScript](#typescript)
  - [Built on Vaul](#built-on-vaul)
  - [Tailwind CSS Integration](#tailwind-css-integration)
  - [Accessibility](#accessibility)
  - [Changelog](#changelog)
  - [Support](#support)
  - [License](#license)

## Introduction

LeelE Sheet is a powerful and flexible bottom sheet component designed to enhance the user interface of React applications. It offers a seamless way to present additional content or controls without disrupting the main view. With its snappable functionality, customizable styling, and support for nested sheets, LeelE Sheet is ideal for creating intuitive and interactive user experiences in various applications, such as:

- Mobile-first web applications
- Complex form interfaces
- Multi-level navigation menus
- Media galleries and playlists
- Settings and configuration panels

By leveraging the strengths of Vaul, Radix UI, and Tailwind CSS, LeelE Sheet provides a robust foundation for building sophisticated and accessible UI components.

## Getting Started

To start using LeelE Sheet in your project, follow these steps:

1. Install the package:

   ```bash
   npm install leele-sheet
   ```

2. Import the component in your React file:

   ```jsx
   import { LeelESheet } from "leele-sheet";
   ```

3. Use the component in your JSX:

   ```jsx
   function MyComponent() {
     return (
       <LeelESheet>
         <div>Your sheet content goes here</div>
       </LeelESheet>
     );
   }
   ```

4. Customize the sheet using props and Tailwind classes as needed:
   ```jsx
   <LeelESheet
     snapPoints={["25%", "50%", "75%"]}
     defaultSnapPoint="50%"
     className="bg-gray-100 p-4"
   >
     <h2 className="text-xl font-bold">Sheet Title</h2>
     <p>Sheet content...</p>
   </LeelESheet>
   ```

## Features

- Fully customizable bottom sheet component
- Built with TypeScript for type safety
- Styled with Tailwind CSS for easy customization
- Snap points for precise control of sheet height
- Accessible by default with screen reader support
- Smooth animations and transitions
- Configurable overlay visibility and styling

## Installation

```bash
npm install leele-sheet
```

## Usage

a
Here's a basic example of how to use LeelE Sheet:

```jsx
import { LeelESheet } from "leele-sheet";

function App() {
  return (
    <LeelESheet>
      <div>Main Sheet Content</div>
      <LeelESheet nested>
        <div>Nested Sheet Content</div>
      </LeelESheet>
    </LeelESheet>
  );
}
```

## Nested Sheets

LeelE Sheet now supports nested sheets, allowing you to create complex, multi-level interfaces. To create a nested sheet, simply use the `nested` prop:

```tsx
<LeelESheet>
  <div>Main Sheet Content</div>
  <LeelESheet nested>
    <div>Nested Sheet Content</div>
  </LeelESheet>
</LeelESheet>
```

Nested sheets have different default behaviors:
Default snap points: ["150px", "300px"]
Default snap point: "150px"
Overlay is hidden by default
You can customize these behaviors by passing the appropriate props to the nested sheet.

## Props

LeelE Sheet accepts the following props:

```typescript
export interface LeelESheetProps {
  /** Array of snap points (e.g., ["300px", "50%"]) */
  snapPoints?: (number | string)[];
  /** Initial snap point when opened */
  defaultSnapPoint?: number | string | null;
  /** Element that triggers the sheet */
  triggerElement?: ReactNode;
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
  /** Whether to nest the sheet */
  nested?: boolean;
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
}
```

## Customization

LeelE Sheet is built with Tailwind CSS, making it easy to customize. You can override the default styles by passing your own classes through the `className` prop. The overlay can be customized using the `overlayClassName` prop or hidden entirely with `showOverlay={false}`.

## TypeScript

LeelE Sheet is written in TypeScript and provides full type definitions. This ensures type safety and improves developer experience when using the component.

## Built on Vaul

LeelE Sheet is built on top of the Vaul library, extending its functionality with custom defaults and styles. It leverages Vaul's core features while providing a more opinionated and ready-to-use component.

## Tailwind CSS Integration

This package is designed to work seamlessly with Tailwind CSS. Make sure you have Tailwind CSS set up in your project for the best experience. The component uses Tailwind classes for styling, allowing for easy theme integration and customization.

## Accessibility

LeelE Sheet is built with accessibility in mind. It includes proper ARIA attributes and supports screen readers out of the box.

## Changelog

For a detailed list of changes and version history, please refer to the [CHANGELOG.md](./CHANGELOG.md) file.

## Support

If you need help or want to report an issue, please email me at reza.shahnazar@gmail.com.
I appreciate your feedback to make LeelE Sheet better!

## License

This project is licensed under the MIT License.
