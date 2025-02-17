# ZenithUi Day Picker

A ZenithUi Day Picker is a React component that provides a customizable and lightweight calendar interface for selecting dates, built with `date-fns` for efficient date manipulation. It features a clean, modern design with support for navigation, highlighting, and flexible configurations.

## Features

- Select a date from a monthly calendar view.
- Navigate between months.
- Customizable styles using `classNames`.
- Options to hide navigation buttons, weekdays, and outside dates.
- Supports external date formatting and styling.

## Installation

```sh
npm install zenithui-day-picker

## OR

yarn add zenithui-day-picker
```

## Usage

```tsx
import React, { useState } from "react";
import { DayPicker } from "zenithui-day-picker";

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <DayPicker selected={selectedDate} onSelect={setSelectedDate} />
    </div>
  );
};

export default App;
```

## Props

### `DayPickerProps`

| Prop Name          | Type                  | Description                                                     | Default    |
| ------------------ | --------------------- | --------------------------------------------------------------- | ---------- |
| `selected`         | `Date`                | The currently selected date.                                    | `required` |
| `onSelect`         | `(date: any) => void` | Function called when a date is selected.                        | `required` |
| `mode`             | `single or range`     | The mode of the calendar to select date.                        | `required` |
| `classNames`       | `Partial<ClassNames>` | Custom class names for styling different parts of the calendar. | `optional` |
| `hideNavigation`   | `boolean`             | Hide previous/next month buttons.                               | `false`    |
| `hideWeekdays`     | `boolean`             | Hide weekday names.                                             | `false`    |
| `hideOutsideDates` | `boolean`             | Hide dates that belong to the previous/next month.              | `false`    |
| `theme`            | `light, dark, auto`   | Theme of the calendar                                           | `auto`     |

### `ClassNames` (Optional Styling)

| Key               | Description                                |
| ----------------- | ------------------------------------------ |
| `calendar`        | Styles for the calendar container.         |
| `header`          | Styles for the header section.             |
| `monthCaption`    | Styles for the month name caption.         |
| `prevMonthButton` | Styles for the previous month button.      |
| `nextMonthButton` | Styles for the next month button.          |
| `weekdays`        | Styles for the weekdays container.         |
| `weekday`         | Styles for each weekday label.             |
| `days`            | Styles for the days grid.                  |
| `day`             | Styles for an individual day.              |
| `daySelected`     | Styles for the selected day.               |
| `outsideDate`     | Styles for days outside the current month. |
| `today`           | Styles for today's date.                   |
| `rangeStart`      | Styles for start date of range             |
| `rangeEnd`        | Styles for end date of range               |
| `rangeDates`      | Styles for dates btw the range             |

## Customization

You can pass a `classNames` object to customize the appearance:

```tsx
<DayPicker
  selected={selectedDate}
  onSelect={setSelectedDate}
  classNames={{
    calendar: "bg-gray-100 p-4",
    daySelected: "bg-green-500 text-white",
    today: "border border-blue-500",
  }}
/>
```

---

## 🎨 Styling

ZenithUi components are designed to be flexible and styled easily. Combine them with your existing CSS or utility-first frameworks like TailwindCSS for full control over the appearance.

---

## 📦 Other Components

- [ZenithUi Time Picker](https://npmjs.com/package/zenithui-time-picker)
- [ZenithUi Light Box](https://npmjs.com/package/zenithui-light-box)
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
