# LeelE Sheet

LeelE Sheet is a customizable snappable bottom sheet component for React applications, built on top of the Vaul library and Radix UI components. It offers precise control over the sheet's open states through configurable snap points, allowing you to define specific heights or percentages where the sheet can rest. This snappable functionality enables a smooth and intuitive user experience, as the sheet can be easily adjusted to predetermined positions. The component seamlessly integrates with TypeScript and Tailwind CSS, providing type safety and easy styling customization while maintaining the accessibility features from Radix UI.

## Features

- Fully customizable bottom sheet component
- Built with TypeScript for type safety
- Styled with Tailwind CSS for easy customization
- Snap points for precise control of sheet height
- Accessible by default with screen reader support
- Smooth animations and transitions

## Installation

```bash
npm install leele-sheet
```

## Usage

Here's a basic example of how to use LeelE Sheet:

```jsx
import { LeelESheet } from "leele-sheet";

function App() {
  return (
    <LeelESheet
      triggerElement={<button>Open Sheet</button>}
      contentElement={<div>Sheet Content</div>}
      contentSrTitle="Sheet Title"
      snapPoints={["300px", "50%", "80%"]}
      defaultSnapPoint="300px"
    />
  );
}
```

## Props

LeelE Sheet accepts the following props:

```typescript
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
```

## Customization

LeelE Sheet is built with Tailwind CSS, making it easy to customize. You can override the default styles by passing your own classes through the `className` prop.

## TypeScript

LeelE Sheet is written in TypeScript and provides full type definitions. This ensures type safety and improves developer experience when using the component.

## Built on Vaul

LeelE Sheet is built on top of the Vaul library, extending its functionality with custom defaults and styles. It leverages Vaul's core features while providing a more opinionated and ready-to-use component.

## Tailwind CSS Integration

This package is designed to work seamlessly with Tailwind CSS. Make sure you have Tailwind CSS set up in your project for the best experience. The component uses Tailwind classes for styling, allowing for easy theme integration and customization.

## Accessibility

LeelE Sheet is built with accessibility in mind. It includes proper ARIA attributes and supports screen readers out of the box.

## License

This project is licensed under the MIT License.
