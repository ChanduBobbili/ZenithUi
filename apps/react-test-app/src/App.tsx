import viteLogo from "/vite.svg"
import "./App.css"
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Toggle,
  ToggleGroup,
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
        <Drawer direction="right">
          <DrawerTrigger asChild>
            <Button>Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent
            className="w-1/2 rounded-bl-md rounded-tl-md p-6 pb-4 pt-2 transition-all duration-300 ease-in-out"
            OverlayClassName="bg-black/75"
          >
            <DrawerHeader>
              <DrawerTitle className="text-sky-400">Drawer Tiltle</DrawerTitle>
              <DrawerDescription className="text-emerald-400">
                Drawer Description
              </DrawerDescription>
            </DrawerHeader>

            <p>jkjdgfkfgkfjhgkjfhgl</p>
          </DrawerContent>
        </Drawer>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent className="w-1/2 max-w-full">
            <DialogHeader>
              <DialogTitle className="text-sky-400">Dialog Tiltle</DialogTitle>
              <DialogDescription className="text-emerald-400">
                Dialog Description
              </DialogDescription>
            </DialogHeader>

            <p>jkjdgfkfgkfjhgkjfhgl</p>
          </DialogContent>
        </Dialog>

        <Popover>
          <PopoverTrigger>
            <Button>Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent
            side="right"
            openAnimate="slide"
            closeAnimate="slide"
          ></PopoverContent>
        </Popover>

        <ToggleGroup
          type="single"
          className="pointer-events-auto flex flex-col gap-2 p-0"
        >
          {["B", "C", "D"].map((option) => (
            <Toggle
              key={option}
              value={option}
              aria-label={option}
              className={cn(
                "h-12 w-12 data-[state='on']:!bg-primary data-[state='on']:!text-white",
              )}
            >
              {option}
            </Toggle>
          ))}
        </ToggleGroup>

        <TimePicker
          time="12:34"
          onTimeChange={(time) => console.log(time)}
          align="center"
          side="right"
        />
      </div>
    </>
  )
}

export default App
