import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button,  ZenithUiDialog,  ZenithUiDialogContent,  ZenithUiDialogHeader,  ZenithUiDialogTitle,  ZenithUiDrawer, ZenithUiDrawerContent} from "zenithui-primitive";

function App() {
  const [open, setOpen] = useState(false);
  const [dialog,setdialog] = useState<boolean>(false)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <div className="card flex flex-col gap-2">
        
      <Button onClick={() => setOpen(true)}  >Open Drawer</Button>
       <Button  onClick={() => setdialog(true)} >Open Dialog</Button>
      </div>
     
      

      {open && (
        <ZenithUiDrawer
          open={open}
          onOpenChange={setOpen}
          onClose={() => setOpen(false)}
          direction="right"
        >
          <ZenithUiDrawerContent
            className="rounded-bl-md rounded-tl-md p-6 pb-4 pt-2 transition-all duration-300 ease-in-out w-1/2"
            OverlayClassName="bg-black/75"
				></ZenithUiDrawerContent>
        </ZenithUiDrawer>
      )}
      {dialog && (
        <ZenithUiDialog open={dialog} onOpenChange={setdialog}>
          <ZenithUiDialogContent>
            <ZenithUiDialogHeader>
              <ZenithUiDialogTitle>dhfkgdfk</ZenithUiDialogTitle>
            </ZenithUiDialogHeader>
          </ZenithUiDialogContent>
        </ZenithUiDialog>
      )}
    </>
  );
}

export default App;
