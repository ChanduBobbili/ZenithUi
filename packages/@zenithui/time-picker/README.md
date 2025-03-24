# 🌈 @zenithui/time-picker

A ZenithUi Time Picker is a React component that provides a smooth and accessible interface for selecting time. Featuring a scrollable design for hours, minutes, and (AM/PM) selection, it supports both 12-hour and 24-hour formats with seamless customization options for a modern user experience.

---

## 📦 Installation

Install the library using your preferred package manager:

```bash
npm install @zenithui/time-picker
# or
yarn add @zenithui/time-picker
# or
pnpm add @zenithui/time-picker
```

---

## ⏳ TimePicker

Once installed, you can use the `TimePicker` component in your React application as follows:

```tsx
import { TimePicker } from "@zenithui/time-picker";

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
  startTime={new Date().toISOString()}Prop Name	Type	Description	Default
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

## 🎨 Styling

ZenithUi components are designed to be flexible and styled easily. Combine them with your existing CSS or utility-first frameworks like TailwindCSS for full control over the appearance.

---

## 📦 Other Components

- [ZenithUi Light Box](https://npmjs.com/package/zenithui-light-box)
- [ZenithUi Day Picker](https://npmjs.com/package/zenithui-day-picker)
- [ZenithUi Toast](https://npmjs.com/package/zenithui-toast)

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
