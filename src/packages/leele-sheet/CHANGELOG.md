# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.2] - 2024-09-17

### Added

- Support for nested sheets with the `nested` prop
- `alwaysOpen` prop to keep the sheet open
- `open` prop to control the open/close state
- `onOpenChange` callback for open state changes
- `preventScrollRestoration` and `disablePreventScroll` props for scroll behavior control

### Changed

- Default snap points are now responsive to the `nested` prop
- Default snap point is now responsive to the `nested` prop
- `contentElement` prop is deprecated in favor of using `children`

### Fixed

- Improved handling of overlay visibility for nested sheets
