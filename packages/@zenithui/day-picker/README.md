# @zenithui/day-picker

A ZenithUi Day Picker is a React component that provides a customizable and lightweight calendar interface for selecting dates, built with `date-fns` for efficient date manipulation. It features a clean, modern design with support for navigation, highlighting, and flexible configurations.

## Features

- Select a date from a monthly calendar view.
- Navigate between months.
- Customizable styles using `classNames`.
- Options to hide navigation buttons, weekdays, and outside dates.
- Supports external date formatting and styling.

## Installation

```sh
npm install @zenithui/day-picker

## OR

yarn add @zenithui/day-picker
```

## Usage

```tsx
import React, { useState } from "react";
import { DayPicker } from "@zenithui/day-picker";

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

---

## 🎨 Styling

ZenithUi components are designed to be flexible and styled easily. Combine them with your existing CSS or utility-first frameworks like TailwindCSS for full control over the appearance.

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
