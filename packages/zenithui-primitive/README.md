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

## 🔘 Button

The `Button` component is a simple and interactive button for your React applications.

### Props

All Button Props Applies for this Button component also.

### Example Usage

```javascript
import Button from "zenithui-primitive";

<Button
  onClick={() => console.log("Button clicked")}
>
  Click Me
</Button>
```

---

## ⏳ CountDownTimer

The `CountDownTimer` component provides a countdown timer with customization options such as labels, descriptions, and expiry callbacks.

### Props

| Prop Name             | Type                | Default       | Description                                                                 |
|-----------------------|---------------------|---------------|-----------------------------------------------------------------------------|
| `startTime`           | `string`           | **Required**  | The start time for the countdown timer in ISO string format.               |
| `format`              | `"with-names" \| "without-names"` | `"without-names"` | Format of the countdown display. Includes labels (`with-names`) or plain (`without-names`). |
| `className`           | `string`           | `""`          | Additional CSS class name(s) for the countdown timer.                      |
| `description`         | `string`           | `""`          | Description text displayed alongside the countdown timer.                  |
| `minutes`             | `number`           | `5`           | Number of minutes for the countdown.                                       |
| `descriptionClassName`| `string`           | `""`          | Additional CSS class name(s) for the description text.                     |
| `onExpired`           | `(isExpire: boolean) => void` | `undefined` | Callback invoked when the countdown timer expires.                         |

### Example Usage

#### Basic Countdown

```javascript
import CountDownTimer from "zenithui-primitive";

<CountDownTimer
  startTime={new Date().toISOString()}
  onExpired={(isExpire) => console.log("Timer expired:", isExpire)}
/>;
```

#### Countdown with Description

```javascript
import CountDownTimer from "zenithui-primitive";

<CountDownTimer
  startTime={new Date().toISOString()}
  description="until the event starts"
  descriptionClassName="text-gray-500"
/>;
```

#### Countdown with Labels

```javascript
import CountDownTimer from "zenithui-primitive";

<CountDownTimer
  startTime={new Date().toISOString()}
  format="with-names"
/>;
```

#### Custom Styling

```javascript
import CountDownTimer from "zenithui-primitive";

<CountDownTimer
  startTime={new Date().toISOString()}
  className="text-blue-500 font-bold"
/>;
```

---

### Dialog

The Dialog component provides a modal dialog built on top of [Radix UI](https://www.radix-ui.com/themes/docs/components/dialog).

#### Example Usage

```javascript
import {
  ZenithUiDialog,
  ZenithUiDialogTrigger,
  ZenithUiDialogContent,
  ZenithUiDialogTitle,
  ZenithUiDialogDescription,
  ZenithUiDialogClose,
} from "zenithui-primitive";

<ZenithUiDialog>
  <ZenithUiDialogTrigger>Open Dialog</ZenithUiDialogTrigger>
  <ZenithUiDialogContent>
    <ZenithUiDialogTitle>Dialog Title</ZenithUiDialogTitle>
    <ZenithUiDialogDescription>
      This is the description of the dialog.
    </ZenithUiDialogDescription>
    <ZenithUiDialogClose>Close</ZenithUiDialogClose>
  </ZenithUiDialogContent>
</ZenithUiDialog>
```

---

### Drawer

The Drawer component is a sliding panel built on top of [Vaul](https://github.com/emilkowalski/vaul).

#### Example Usage

```javascript
import {
  ZenithUiDrawer,
  ZenithUiDrawerTrigger,
  ZenithUiDrawerContent,
  ZenithUiDrawerTitle,
  ZenithUiDrawerDescription,
  ZenithUiDrawerClose,
} from "zenithui-primitive";

<ZenithUiDrawer>
  <ZenithUiDrawerTrigger>Open Drawer</ZenithUiDrawerTrigger>
  <ZenithUiDrawerContent>
    <ZenithUiDrawerTitle>Drawer Title</ZenithUiDrawerTitle>
    <ZenithUiDrawerDescription>
      This is the description of the drawer.
    </ZenithUiDrawerDescription>
    <ZenithUiDrawerClose>Close</ZenithUiDrawerClose>
  </ZenithUiDrawerContent>
</ZenithUiDrawer>
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

ZenithUi is licensed under the [MIT License](https://github.com/ChanduBobbili/ZenithUi/blob/main/LICENSE).

Happy coding! 🚀
