import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button,  ZenithUiDrawer, ZenithUiDrawerContent} from "zenithui-primitive";

function App() {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Button  onClick={() => setOpen(true)} onMouseEnter={() => console.log("object")} >Click Me</Button>

      {open && (
        <ZenithUiDrawer
          open={open}
          onOpenChange={setOpen}
          onClose={() => setOpen(false)}
          direction="right"
        >
          <ZenithUiDrawerContent
            className="rounded-bl-md rounded-tl-md p-6 pb-4 pt-2 transition-all duration-300 ease-in-out"
            OverlayClassName="bg-black/75"
				></ZenithUiDrawerContent>
        </ZenithUiDrawer>
      )}
    </>
  );
}

export default App;
