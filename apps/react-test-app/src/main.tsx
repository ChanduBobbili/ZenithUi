import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import { ToastProvider } from "zenithui-toast"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider
      theme="auto"
      disableAutoDismiss
    >
      <App />
    </ToastProvider>
  </StrictMode>,
)
