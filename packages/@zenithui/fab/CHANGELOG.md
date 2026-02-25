# @zenithui/fab

## 1.0.0

### Major Changes

- 4d5a2a3: Built with accessibility in mind, enforcing proper ARIA attributes, semantic grouping (`role="group"`, `role="menuitem"`), keyboard interactions, and unmounting transitions.
- 4d5a2a3: Includes rich overlay menu item variants, including: - Standard interactive items FabItem, FabCheckboxItem, FabRadioGroup, FabRadioItem
- 4d5a2a3: Safe z-index management and DOM rendering via React `createPortal` to prevent clipping within overflow containers.
- 4d5a2a3: Built with a fully composable, React-primitive architecture
- 4d5a2a3: Integrated with `@floating-ui/react` under the hood to handle robust, collision-aware anchoring and popover placements.
- 4d5a2a3: Provides deep configuration for open states, dismiss behavior (`dismissOutsideClick`, `dismissOnEsc`), and precise coordinate routing (`xOffset`, `yOffset`).
