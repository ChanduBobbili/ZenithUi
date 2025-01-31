# 🌈 zenithui-light-box

A ZenithUi Light Box is a React component that creates an elegant modal overlay for displaying content like images, videos, or any custom content with a clean, modern design.
with support for animations, captions, navigation, and more.

---

## 📦 Installation

Install the library using your preferred package manager:

```bash
npm install zenithui-light-box
# or
pnpm add zenithui-light-box
```

---

### Usage

Once installed, you can use the `LightBox` component in your React application as follows:

```tsx
import { LightBox } from "zenithui-light-box";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Light Box</button>
      <LightBox
        open={open}
        onOpenChange={setOpen}
        images={images}
        initialIndex={0}
        animation="slide"
        showCloseButton
        showDeleteButton
        showPagination
        showCaption
        onImageDelete={(index) => console.log("Deleted image at index:", index)}
      />
    </div>
  )
}
```

---

## Props

#### `LightBox` Props

| Prop Name          | Type                             | Description                                                                          | Default   |
| ------------------ | -------------------------------- | ------------------------------------------------------------------------------------ | --------- |
| `open`             | `boolean`                        | Controls the visibility of the lightbox                                              | Required  |
| `onOpenChange`     | `(open: boolean) => void`        | Callback function triggered when the lightbox's visibility changes                   | Required  |
| `images`           | `LightBoxImages[] \| string[]`   | Array of image objects or strings representing the images to display in the lightbox | Required  |
| `initialIndex`     | `number`                         | The index of the initial image to display                                            | `0`       |
| `showCloseButton`  | `boolean`                        | Whether to display the close button                                                  | `true`    |
| `showDeleteButton` | `boolean`                        | Whether to display the delete button                                                 | `true`    |
| `showPagination`   | `boolean`                        | Whether to display pagination indicators                                             | `true`    |
| `animation`        | `"slide" \| "fade" \| "stretch"` | Animation style to use when transitioning between images                             | `"slide"` |
| `onImageDelete`    | `(index: number) => void`        | Callback function triggered when an image is deleted                                 | Optional  |
| `showCaption`      | `boolean`                        | Whether to display image captions                                                    | `true`    |
| `classNames`       | `LightBoxClassNames`             | Object containing class names for customizing the appearance of the lightbox         | Optional  |
| `components`       | `LightBoxComponents`             | Object containing components for customizing the appearance of the lightbox          | Optional  |

---

### `LightBoxImages`

| Property             | Type     | Description                                  |
| -------------------- | -------- | -------------------------------------------- |
| `src`                | `string` | The source URL of the image                  |
| `alt`                | `string` | The alternative text for the image           |
| `caption`            | `string` | The caption text for the image               |
| `captionDescription` | `string` | Additional description for the image caption |

---

---

### `LightBoxClassNames`

| Property                 | Type     | Description                                 |
| ------------------------ | -------- | ------------------------------------------- |
| `lightBox`               | `string` | Class name for the lightbox container       |
| `caption`                | `string` | Class name for the caption text             |
| `captionDescription`     | `string` | Class name for the caption description text |
| `pagination`             | `string` | Class name for the pagination container     |
| `paginationButton`       | `string` | Class name for the pagination buttons       |
| `paginationButtonActive` | `string` | Class name for the active pagination button |
| `navigateButton`         | `string` | Class name for the navigation button        |
| `navigateButtonLeft`     | `string` | Class name for the left navigation button   |
| `navigateButtonRight`    | `string` | Class name for the right navigation button  |
| `closeButton`            | `string` | Class name for the close button             |
| `deleteButton`           | `string` | Class name for the delete button            |
| `overLay`                | `string` | Class name for the overlay background       |

---

### `LightBoxComponents`

| Property                    | Type                    | Description                                      |
| --------------------------- | ----------------------- | ------------------------------------------------ |
| `NavigationButtonLeft`      | `NavigationButtonProps` | Custom component for the navigation button left  |
| `NavigationButtonRight`     | `NavigationButtonProps` | Custom component for the navigation button right |
| `DeleteButton`              | `DeleteButtonProps`     | Custom component for the delete button           |
| `CloseButton`               | `CloseButtonProps`      | Custom component for the close button            |
| `NavigationButtonLeftIcon`  | `React.JSX.Element`     | Custom icon for the navigation button left       |
| `NavigationButtonRightIcon` | `React.JSX.Element`     | Custom icon for the navigation button right      |
| `DeleteButtonIcon`          | `React.JSX.Element`     | Custom icon for the delete button                |
| `CloseButtonIcon`           | `React.JSX.Element`     | Custom icon for the close button                 |

---

## Customization

You can customize the behavior and appearance of the light box using the following:

- Ensure that `images` is either an array of strings (URLs) or objects adhering to the `LightBoxImages` structure.
- Use the `classNames` prop to provide custom styling for specific parts of the lightbox.
- The component includes support for animations such as `slide`, `fade`, `stretch`.
- Custom behavior for image deletion can be implemented using the `onImageDelete` callback.

---

## 🎨 Styling

ZenithUi components are designed to be flexible and styled easily. Combine them with your existing CSS or utility-first frameworks like TailwindCSS for full control over the appearance.

---

## 📦 Other Components

- [ZenithUi Time Picker](https://npmjs.com/package/zenithui-time-picker)
- [ZenithUi Primitive](https://npmjs.com/package/zenithui-primitive)
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
