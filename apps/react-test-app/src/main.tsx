import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { ToastProvider } from "zenithui-toast"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider
      richColors
      enableQueueSystem
    >
      <App />
    </ToastProvider>
  </StrictMode>,
)
