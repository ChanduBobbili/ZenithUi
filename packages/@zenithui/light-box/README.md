# @zenithui/light-box

A ZenithUi Light Box is a React component that creates an elegant modal overlay for displaying content like images, videos, or any custom content with a clean, modern design.
with support for animations, captions, navigation, and more.

---

## 📦 Installation

Install the library using your preferred package manager:

```sh npm2yarn copy
npm install @zenithui/light-box
```

---

## 🧩 Customization

You can customize the behavior and appearance of the light box using the following:

- Ensure that `images` is either an array of strings (URLs) or objects adhering to the `LightBoxImages` structure.
- Use the `classNames` prop to provide custom styling for specific parts of the lightbox.
- The component includes support for animations such as `slide`, `fade`, `stretch`.
- Custom behavior for image deletion can be implemented using the `onImageDelete` callback.

---

## ✨ Features

- Fullscreen modal lightbox using Radix UI Dialog
- Multiple animation styles: slide, fade, flip, blur, stretch
- Keyboard navigation (ArrowLeft, ArrowRight, Escape, Home, End)
- Touch swipe navigation (mobile support)
- Loading and error state indicators
- Customizable buttons (close, delete, navigation)
- Pagination dots and optional caption support
- Controlled open/close state
- Zoomble LightBox

## 🔍 Zoom

You can also implement a zoom effect for images. This is useful for detailed views or when you want to focus on a specific part of an image.

- `zoomable`: enables zoom effect
- `minZoom`: minimum zoom level
- `maxZoom`: maximum zoom level

### 📱 Touch Support

- Swiping left/right navigates between images
- Supports mobile device detection via `useDeviceType`

### 🔐 Accessibility

- Keyboard accessible navigation
- Proper ARIA roles and labels via Radix Dialog

### 🧪 Error/Loading States

- Displays a spinner while loading
- Shows an error icon if the image fails to load

### 🧠 Best Practices

- Always provide `onOpenChange` to control visibility
- Provide `onImageDelete` if delete button is shown
- Customize buttons for consistent UI across app
- Ensure image URLs are valid or provide fallback handling

---

## 🤝 Contributing

Contributions are welcome! Please check out our [contributing guide](https://github.com/ChanduBobbili/ZenithUi/blob/main/CONTRIBUTING.md) for more details.

---

## 📄 License

ZenithUi is licensed under the [MIT License](https://github.com/ChanduBobbili/ZenithUi/blob/main/LICENSE.md).

Happy coding! 🚀
