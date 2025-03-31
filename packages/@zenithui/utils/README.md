# @zenithui/utils

A collection of utility functions and hooks to simplify development in the ZenithUI ecosystem.

## Installation

You can install `@zenithui/utils` via npm:

```sh
npm install @zenithui/utils
```

or using yarn:

```sh
yarn add @zenithui/utils
```

## Utilities

### `cn(...classes): string`

Merges class names using flexible logic to handle various input types.

#### Usage:

```ts
import { cn } from '@zenithui/utils';

const buttonClass = cn('btn', 'btn-primary', { 'btn-disabled': false }, [
  'rounded',
  'shadow',
]);

console.log(buttonClass); // Output: "btn btn-primary rounded shadow"
```

### Other utilities

- **`uuid`** – Generates a random UUID (v4).
- **`randomInt`** – Returns a random integer within a given range.
- **`capitalize`** – Capitalizes the first letter of a string.
- **`sortByKey`** – Sorts an array of objects by a specified key.
- **`groupBy`** – Groups an array of objects by a given key.
- **`uniqueByKey`** – Removes duplicate objects from an array based on a specified key.
- **`pick`** – Returns a new object with only the specified keys from the original object.
- **`omit`** – Returns a new object excluding the specified keys from the original object.
- **`deepEqual`** – Performs a deep comparison to check if two objects are equal.
- **`cloneDeep`** – Creates a deep copy of an object.
- **`debounce`** – Delays the execution of a function until a specified time has passed since the last invocation.
- **`throttle`** – Ensures a function is called at most once in a given time interval.
- **`sleep`** – Creates a delay for a specified number of milliseconds.
- **`formatBytes`** – Converts a byte value into a human-readable string (e.g., KB, MB, GB).

## Hooks

### `useDeviceType(): DeviceType`

Detects the current device type based on the screen width.

#### Device Types:

- `smallMobile` (< 480px)
- `largeMobile` (480px - 767px)
- `tablet` (768px - 1023px)
- `desktop` (>= 1024px)

#### Usage:

```tsx
import useDeviceType from '@zenithui/utils/hooks/use-device';

const device = useDeviceType();
console.log(device); // e.g., "desktop"
```

### `useTheme(): "dark" | ""`

Detects and tracks the user's theme preference, either via system settings or manually stored preferences.

#### Usage:

```tsx
import useTheme from '@zenithui/utils/hooks/use-theme';

const theme = useTheme();
console.log(theme); // "dark" or ""
```

### Other Hooks:

- **`useDebounce`** - Delays updating a value until after a specified delay, preventing excessive updates.
- **`usePrevious`** - Stores and returns the previous value of a state or prop across renders.

---

## 🤝 Contributing

Contributions are welcome! Please check out our [contributing guide](https://github.com/ChanduBobbili/ZenithUi/blob/main/CONTRIBUTING.md) for more details.

---

## 🐛 Reporting Issues

Found a bug or have a feature request? [Create an issue](https://github.com/ChanduBobbili/ZenithUi/issues) on GitHub.

---

## 📄 License

ZenithUi is licensed under the [MIT License](https://github.com/ChanduBobbili/ZenithUi/blob/main/LICENSE.md).

Happy coding! 🚀
