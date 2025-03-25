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

## ⏳ CountDownTimer

The `CountDownTimer` component provides a countdown timer with customization options such as labels, descriptions, and expiry callbacks.

### Basic Countdown

```tsx
import CountDownTimer from "@zenithui/time-picker";

<CountDownTimer
  startTime={new Date().toISOString()}
  onExpired={(isExpire) => console.log("Timer expired:", isExpire)}
/>
```

### Countdown with Description

```tsx
import CountDownTimer from "@zenithui/time-picker";

<CountDownTimer
  startTime={new Date().toISOString()}Prop Name Type Description Default
  description="until the event starts"
  descriptionClassName="text-gray-500"
/>
```

### Countdown with Labels

```tsx
import CountDownTimer from "@zenithui/time-picker";

<CountDownTimer
  startTime={new Date().toISOString()}
  format="with-names"
/>
```

### Custom Styling

```tsx
import CountDownTimer from "@zenithui/time-picker";

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

- [@zenithui/toast](https://npmjs.com/package/@zenithui/toast)
- [@zenithui/day-picker](https://npmjs.com/package/@zenithui/day-picker)
- [ZenithUi Light Box](https://npmjs.com/package/zenithui-light-box)

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
