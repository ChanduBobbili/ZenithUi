# 🌈 @zenithui/toast

A modern, lightweight toast notification system for React applications. ZenithUI Toast provides a simple and customizable way to display notifications, alerts, and messages to users with smooth animations and flexible styling options.

## ✨ Features

- 🚀 Simple and intuitive API
- 🎨 RichColor Support
- ⚡️ Smooth animations
- 📱 Responsive and mobile-friendly
- 🎯 Multiple positions support
- 🔧 TypeScript ready

---

## 📦 Installation

Install the library using your preferred package manager:

```bash
npm install @zenithui/toast
# or
pnpm add @zenithui/toast
```

---

### Usage

Once installed, you can use the `ToastProvider` and `toast` component in your React application as follows:

```tsx
import { ToastProvider, toast } from '@zenithui/toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>,
);

const App = () => {
  return (
    <div>
      <button onClick={() => toast.success('Success Toast')}>
        Toast Success
      </button>
      <button onClick={() => toast.info('Info Toast')}>Toast Info</button>
      <button onClick={() => toast.error('Error Toast')}>Toast Error</button>
      <button onClick={() => toast.warning('Warning Toast')}>
        Toast Warning
      </button>
    </div>
  );
};
```

---

---

## Props

#### `ToastProvider` Props

| Prop Name            | Type                          | Description                                                                               | Default        |
| -------------------- | ----------------------------- | ----------------------------------------------------------------------------------------- | -------------- |
| `position`           | `ToastPosition`               | The position of the toast.                                                                | `bottom-right` |
| `richColors`         | `boolean`                     | Whether to use rich colors for the toast.                                                 | `false`        |
| `animation`          | `ToastAnimation`              | The animation of the toast.                                                               | `fade`         |
| `duration`           | `number`                      | The duration of the toast to display.                                                     | `5 seconds`    |
| `disableAutoDismiss` | `boolean`                     | Whether to enable auto dismiss for the toast.                                             | `true`         |
| `enableQueueSystem`  | `boolean`                     | If too many toasts appear at once, we should queue them instead of overwhelming the user. | `false`        |
| `maxToasts`          | `number`                      | The maximum no of toasts to show when queue system is enabled.                            | `5`            |
| `showCloseButton`    | `boolean`                     | Whether to show the close button for the toast.                                           | `false`        |
| `theme`              | `"light" \| "dark" \| "auto"` | The theme of the toast.                                                                   | `auto`         |

### `Types`

| Type Name        | Possible values                                                        |
| ---------------- | ---------------------------------------------------------------------- |
| `ToastPosition`  | `top-left,top-right,bottom-left,bottom-right,top-center,bottom-center` |
| `ToastAnimation` | `slide, fade`                                                          |
| `Toasts`         | `success, error, info, warning`                                        |

---

## 🎨 Styling

ZenithUi components are designed to be flexible and styled easily. Combine them with your existing CSS or utility-first frameworks like TailwindCSS for full control over the appearance.

---

## 📦 Other Components

- [@zenithui/time-picker](https://npmjs.com/package/@zenithui/time-picker)
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
