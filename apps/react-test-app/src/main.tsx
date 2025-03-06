import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import { ToastProvider } from "zenithui-toast"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider
      theme="auto"
      classNames={{
        className: "text-white bg-black",
        icon: "text-white",
        closeButton: "text-white bg-black",
        description: "text-gray-500",
      }}
    >
      <App />
    </ToastProvider>
  </StrictMode>,
)
