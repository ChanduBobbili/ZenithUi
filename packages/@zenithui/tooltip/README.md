# @zenithui/tooltip

A flexible, accessible tooltip component built with React and Floating UI that supports animations, custom positioning.

## ✨ Features

- 🎯 Precise positioning using Floating UI
- ♿ Fully accessible with proper ARIA attributes
- 🎨 Customizable animations (fade, slide, zoom)
- 🧩 Compound component pattern for flexible usage
- 🏗️ Supports asChild for seamless integration with existing components
- 🏷️ Customizable delay duration
- 🎚️ Configurable placement and offset

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

Once installed, you can use the `TooltipProvider` and `tooltip` component in your React application as follows:

```tsx
import { TooltipProvider, tooltip } from '@zenithui/tooltip';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TooltipProvider>
      <App />
    </TooltipProvider>
  </StrictMode>,
);

const App = () => {
  return (
    <div>
     <Tooltip.Root>
        <Tooltip.Trigger>Hover me</Tooltip.Trigger>
        <Tooltip.Content>This is a tooltip</Tooltip.Content>
      </Tooltip.Root>
    </div>
  );
};
```

#### Advanced Usage

```tsx
<TooltipProvider delayDuration={500} disableHoverableContent>
  <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <button>Custom Trigger</button>
    </Tooltip.Trigger>
    <Tooltip.Content
      side="right"
      offset={16}
      animation="slide"
      animationDuration={300}
      className="bg-gray-800 text-white p-3 rounded"
    >
      <p>Custom styled tooltip with animation</p>
    </Tooltip.Content>
  </Tooltip.Root>
</TooltipProvider>
```

---

## Props

#### `TooltipProvider` Props

| Prop Name                 | Type      | Description                                                                                                    | Default |
| ------------------------- | --------- | -------------------------------------------------------------------------------------------------------------- | ------- |
| `delayDuration`           | `number`  | The duration from when the pointer enters the trigger until the tooltip gets opened.                           | `700`   |
| `disableHoverableContent` | `boolean` | When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger. | `false` |

#### `Tooltip.Content` Props

| Prop Name           | Type                | Description                                                                                  | Default |
| ------------------- | ------------------- | -------------------------------------------------------------------------------------------- | ------- |
| `side`              | `Placement`         | Specifies the side of the trigger element where the tooltip should appear.                   | `top`   |
| `offset`            | `number`            | The distance in pixels between the tooltip and the trigger element along the specified side. | `12`    |
| `animation`         | `fade, slide, zoom` | The animation type for the tooltip.                                                          | `fade`  |
| `animationDuration` | `number`            | The duration of the tooltip animation in milliseconds.                                       | `200`   |

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
