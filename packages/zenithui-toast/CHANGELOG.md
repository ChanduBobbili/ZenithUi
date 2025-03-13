# zenithui-toast

## 1.4.0

### Minor Changes

- Added new animation "enter with icon" in the toast

## 1.3.0

### Minor Changes

- New types of toasts && Custom styling, components
  - Loading, Promise toasts
  - classnames for custom styling
  - action, cancel button with custom component && click handler

## 1.2.0

### Minor Changes

- New Features

  - Refactored the toast component.
  - Added theming support with the `use-theme` hook.
  - Enabled offset customization.

## 1.1.0

### Minor Changes

- Theme Provider and customization options for toast instances.
  - Added theme support (light, dark, auto).
  - Provided options to customize individual toasts.
    - Rich color, duration, disable auto-dismiss, animation, show close button.

## 1.0.1

### Patch Changes

- Fixed auto-dismiss and z-index issues of the toasts container.

## 1.0.0

### Major Changes

- Introduced the toast library for React.
  - Various types of toasts: success, error, info, warning.
  - Position customization.
  - Animations like fade and slide.
  - Option to disable auto-dismiss.
  - Custom duration for dismissing the toast.
  - Rich color support.
  - Queue system: only a maximum number of toasts are shown at once, with the rest waiting in the queue.
  - Show close button with a flag.
