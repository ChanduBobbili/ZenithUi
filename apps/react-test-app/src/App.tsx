import viteLogo from "/vite.svg"
import "./App.css"
import {
  Button,
  ZenithUiDialog,
  ZenithUiDialogContent,
  ZenithUiDialogDescription,
  ZenithUiDialogHeader,
  ZenithUiDialogTitle,
  ZenithUiDialogTrigger,
  ZenithUiDrawer,
  ZenithUiDrawerContent,
  ZenithUiDrawerDescription,
  ZenithUiDrawerHeader,
  ZenithUiDrawerTitle,
  ZenithUiDrawerTrigger,
  ZenithUiPopover,
  ZenithUiPopoverContent,
  ZenithUiPopoverTrigger,
  ZenithUiToggle,
  ZenithUiToggleGroup,
} from "zenithui-primitive"
import { cn } from "./utils"
import { TimePicker } from "zenithui-time-picker"

function App() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <img
          src={viteLogo}
          className="logo"
          alt="Vite logo"
        />
        <ZenithUiDrawer direction="right">
          <ZenithUiDrawerTrigger asChild>
            <Button>Open Drawer</Button>
          </ZenithUiDrawerTrigger>
          <ZenithUiDrawerContent
            className="w-1/2 rounded-bl-md rounded-tl-md p-6 pb-4 pt-2 transition-all duration-300 ease-in-out"
            OverlayClassName="bg-black/75"
          >
            <ZenithUiDrawerHeader>
              <ZenithUiDrawerTitle className="text-sky-400">
                Drawer Tiltle
              </ZenithUiDrawerTitle>
              <ZenithUiDrawerDescription className="text-emerald-400">
                Drawer Description
              </ZenithUiDrawerDescription>
            </ZenithUiDrawerHeader>

            <p>jkjdgfkfgkfjhgkjfhgl</p>
          </ZenithUiDrawerContent>
        </ZenithUiDrawer>
        <ZenithUiDialog>
          <ZenithUiDialogTrigger asChild>
            <Button>Open Dialog</Button>
          </ZenithUiDialogTrigger>
          <ZenithUiDialogContent className="w-1/2 max-w-full">
            <ZenithUiDialogHeader>
              <ZenithUiDialogTitle className="text-sky-400">
                Dialog Tiltle
              </ZenithUiDialogTitle>
              <ZenithUiDialogDescription className="text-emerald-400">
                Dialog Description
              </ZenithUiDialogDescription>
            </ZenithUiDialogHeader>

            <p>jkjdgfkfgkfjhgkjfhgl</p>
          </ZenithUiDialogContent>
        </ZenithUiDialog>

        <ZenithUiPopover>
          <ZenithUiPopoverTrigger>
            <Button>Open Popover</Button>
          </ZenithUiPopoverTrigger>
          <ZenithUiPopoverContent
            side="right"
            openAnimate="slide"
            closeAnimate="slide"
          ></ZenithUiPopoverContent>
        </ZenithUiPopover>

        <ZenithUiToggleGroup
          type="single"
          className="pointer-events-auto flex flex-col gap-2 p-0"
        >
          {["B", "C", "D"].map((option) => (
            <ZenithUiToggle
              key={option}
              value={option}
              aria-label={option}
              className={cn(
                "h-12 w-12 data-[state='on']:!bg-primary data-[state='on']:!text-white",
              )}
            >
              {option}
            </ZenithUiToggle>
          ))}
        </ZenithUiToggleGroup>

        <TimePicker
          time="12:34"
          onTimeChange={(time) => console.log(time)}
        />
      </div>
    </>
  )
}

export default App
