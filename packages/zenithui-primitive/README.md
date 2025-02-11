# 🌈 ZenithUi

ZenithUi is a React component library offering a collection of accessible and customizable primitive UI components. Build your UI effortlessly with these reusable building blocks.

---

## 📦 Installation

Install the library using your preferred package manager:

```bash
npm install zenithui-primitive
# or
yarn add zenithui-primitive
# or
pnpm add zenithui-primitive
```

---

## ⏳ CountDownTimer

The `CountDownTimer` component provides a countdown timer with customization options such as labels, descriptions, and expiry callbacks.

### Props

| Prop Name              | Type                              | Default           | Description                                                                                 |
| ---------------------- | --------------------------------- | ----------------- | ------------------------------------------------------------------------------------------- |
| `startTime`            | `string`                          | **Required**      | The start time for the countdown timer in ISO string format.                                |
| `format`               | `"with-names" \| "without-names"` | `"without-names"` | Format of the countdown display. Includes labels (`with-names`) or plain (`without-names`). |
| `className`            | `string`                          | `""`              | Additional CSS class name(s) for the countdown timer.                                       |
| `description`          | `string`                          | `""`              | Description text displayed alongside the countdown timer.                                   |
| `minutes`              | `number`                          | `5`               | Number of minutes for the countdown.                                                        |
| `descriptionClassName` | `string`                          | `""`              | Additional CSS class name(s) for the description text.                                      |
| `onExpired`            | `(isExpire: boolean) => void`     | `undefined`       | Callback invoked when the countdown timer expires.                                          |

### Example Usage

#### Basic Countdown

```tsx
import CountDownTimer from "zenithui-primitive";

<CountDownTimer
  startTime={new Date().toISOString()}
  onExpired={(isExpire) => console.log("Timer expired:", isExpire)}
/>
```

#### Countdown with Description

```tsx
import CountDownTimer from "zenithui-primitive";

<CountDownTimer
  startTime={new Date().toISOString()}
  description="until the event starts"
  descriptionClassName="text-gray-500"
/>
```

#### Countdown with Labels

```tsx
import CountDownTimer from "zenithui-primitive";

<CountDownTimer
  startTime={new Date().toISOString()}
  format="with-names"
/>
```

#### Custom Styling

```tsx
import CountDownTimer from "zenithui-primitive";

<CountDownTimer
  startTime={new Date().toISOString()}
  className="font-bold text-blue-500"
/>
```

---

## Dialog

The Dialog component provides a modal dialog built on top of [Radix UI](https://www.radix-ui.com/themes/docs/components/dialog).

#### Example Usage

```tsx
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "zenithui-primitive";

<Dialog>
  <DialogTrigger>Open Dialog</DialogTrigger>
  <DialogContent>
    <DialogTitle>Dialog Title</DialogTitle>
    <DialogDescription>
      This is the description of the dialog.
    </DialogDescription>
    <DialogClose>Close</DialogClose>
  </DialogContent>
</Dialog>
```

---

## Drawer

The Drawer component is a sliding panel built on top of [Vaul](https://github.com/emilkowalski/vaul).

#### Example Usage

```tsx
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerTitle,
    DrawerDescription,
    DrawerClose,
} from "zenithui-primitive";

<Drawer>
  <DrawerTrigger>Open Drawer</DrawerTrigger>
  <DrawerContent>
    <DrawerTitle>Drawer Title</DrawerTitle>
    <DrawerDescription>
      This is the description of the drawer.
    </DrawerDescription>
    <DrawerClose>Close</DrawerClose>
  </DrawerContent>
</Drawer>
```

---

## Popover

A customizable and accessible popover component.

### Customization

You can modify the popover styles using the `className` prop or inline `style` attributes.

### Example Usage

```tsx
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
} from "zenithui-primitive";

<Popover>
  <PopoverTrigger>Open Popover</PopoverTrigger>
  <PopoverContent className="rounded bg-gray-800 p-4 text-white">
    This is a popover content.
    <PopoverArrow />
  </PopoverContent>
</Popover>
```

---

## Toggle

The `Toggle` component is used for creating toggleable elements that represent a binary state.

#### Props

The `Toggle` component inherits all props from the underlying `Radix TogglePrimitive.Root` component. Additionally, it supports the following variants via `class-variance-authority`:

- **variant**: Controls the visual style of the toggle.

  - `default` (default): Transparent background.
  - `outline`: Border with hover effects.

- **size**: Controls the size of the toggle.
  - `default` (default): Height of `9px` and padding of `3px`.
  - `sm`: Smaller size with height of `8px` and padding of `2px`.
  - `lg`: Larger size with height of `10px` and padding of `3px`.

#### Example Usage

```tsx
import { Toggle } from "zenithui-primitive";

<Toggle
  variant="outline"
  size="default"
>
  Toggle Me
</Toggle>
```

---

## Toggle Group

The `ToggleGroup` and `ToggleGroupItem` components allow you to create a group of toggleable items. These are useful for building grouped toggle buttons with shared styling and behavior.

#### Components

- **ToggleGroup**: A wrapper component for grouping `ToggleGroupItem` components.
- **ToggleGroupItem**: Represents an individual toggleable item within the group.

#### Props

##### ToggleGroup

The `ToggleGroup` component inherits all props from the `Radix ToggleGroupPrimitive.Root` component. It also supports the following variants via `class-variance-authority`:

- **variant**: Controls the visual style of the toggles within the group.
  - `default` (default): Transparent background.
  - `outline`: Border with hover effects.
- **size**: Controls the size of the toggles within the group.
  - `default` (default): Height of `9px` and padding of `3px`.
  - `sm`: Smaller size with height of `8px` and padding of `2px`.
  - `lg`: Larger size with height of `10px` and padding of `3px`.

##### ToggleGroupItem

The `ToggleGroupItem` component inherits all props from the `Radix ToggleGroupPrimitive.Item` component. Additionally, it automatically inherits `variant` and `size` values from the enclosing `ToggleGroup`.

#### Example Usage

```tsx
import { ToggleGroup, ToggleGroupItem } from "zenithui-primitive";

<ToggleGroup type="single" variant="outline" size="default">
  <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
  <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
  <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
</ToggleGroup>
```

---

## 🎨 Styling

ZenithUi components are designed to be flexible and styled easily. Combine them with your existing CSS or utility-first frameworks like TailwindCSS for full control over the appearance.

---

## 📦 Other Components

- [ZenithUi Time Picker](https://npmjs.com/package/zenithui-time-picker)
- [ZenithUi Light Box](https://npmjs.com/package/zenithui-light-box)
- [ZenithUi Day Picker](https://npmjs.com/package/zenithui-day-picker)

---

## 🤝 Contributing

Contributions are welcome! Please check out our [contributing guide](https://github.com/ChanduBobbili/ZenithUi/blob/main/CONTRIBUTING.md) for more details.

---

## 🐛 Reporting Issues

Found a bug or have a feature request? [Create an issue](https://github.com/ChanduBobbili/ZenithUi/issues) on GitHub.

---

## 📄 License

ZenithUi is licensed under the [MIT License](https://github.com/ChanduBobbili/ZenithUi/blob/main/LICENSE).

Happy coding! 🚀
