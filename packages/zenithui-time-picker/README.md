# 🌈 zenithui-time-picker

A customizable, accessible, and lightweight time picker component for React applications. This component allows users to select time using a scrollable interface for hours, minutes, and periods (AM/PM), with built-in support for both 12-hour and 24-hour formats.

---

## 📦 Installation

Install the library using your preferred package manager:

```bash
npm install zenithui-time-picker
# or
yarn add zenithui-time-picker
# or
pnpm add zenithui-time-picker
```

---

### Usage

Once installed, you can use the `TimePicker` component in your React application as follows:

```tsx
import { TimePicker } from "zenithui-time-picker";

const App = () => {
  const [selectedTime, setSelectedTime] = useState("12:00");

  return (
    <div>
      <h1>Selected Time: {selectedTime}</h1>
      <TimePicker time={selectedTime} onTimeChange={setSelectedTime} />
    </div>
  );
};
```

---

## Props

#### `TimePicker` Props

| Prop Name          | Type                                     | Description                                                                                  | Default    |
| ------------------ | ---------------------------------------- | -------------------------------------------------------------------------------------------- | ---------- |
| **`time`**         | `string`                                 | The selected time in "HH:MM" format (24-hour clock).                                         | Required   |
| **`onTimeChange`** | `(time: string) => void`                 | Callback function triggered when the time changes, providing the updated time in "HH:MM".    | Required   |
| **`align`**        | `"center" \| "end" \| "start"`           | Alignment of the popover relative to the trigger element.                                    | `"center"` |
| **`side`**         | `"top" \| "right" \| "bottom" \| "left"` | Side of the trigger element where the popover will appear.                                   | `"bottom"` |
| **`alignOffset`**  | `number`                                 | Offset for popover alignment along the alignment axis.                                       | `10`       |
| **`sideOffset`**   | `number`                                 | Offset for popover alignment along the side axis.                                            | `10`       |
| **`formatter`**    | `(time: string) => string`               | Custom formatter for time display, receives the time in "HH:MM" format and returns a string. | optional   |
| **`classNames`**   | `TimePickerClassNames`                   | Object containing class names for customizing the appearance of the time picker.             | optional   |

### `TimePickerClassNames`

| Property                 | Type     | Description                                |
| ------------------------ | -------- | ------------------------------------------ |
| **`popoverContent`**     | `string` | Class name for the popover content.        |
| **`button`**             | `string` | Class name for the popover trigger button. |
| **`timeScrollList`**     | `string` | Class name for the time scroll list.       |
| **`timeScrollListItem`** | `string` | Class name for the time scroll list item.  |

---

## Customization

You can customize the alignment and positioning of the popover by using the following props:

- **`align`**: Controls the horizontal alignment of the popover. Options: `"center"`, `"start"`, `"end"`.
- **`side`**: Controls the vertical positioning of the popover. Options: `"top"`, `"right"`, `"bottom"`, `"left"`.
- **`alignOffset`** and **`sideOffset`**: Adjust the alignment and side positioning offsets for the popover.
- **`classNames`**: Pass custom class names for the popover content, buttons, or scrollable lists.
- **`formatter`**: Use a custom time formatter to display the time as desired.

---

## 🎨 Styling

ZenithUi components are designed to be flexible and styled easily. Combine them with your existing CSS or utility-first frameworks like TailwindCSS for full control over the appearance.

---

## 📦 Other Components

- [ZenithUi Primitive](https://npmjs.com/package/zenithui-primitive)
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

ZenithUi is licensed under the [MIT License](https://github.com/ChanduBobbili/ZenithUi/blob/main/LICENSE.md).

Happy coding! 🚀
