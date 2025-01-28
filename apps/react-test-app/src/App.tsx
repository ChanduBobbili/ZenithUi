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
} from "zenithui-primitive"
import { TimePicker } from "zenithui-time-picker"
import { useState } from "react"
import { LightBox, LightBoxImages } from "zenithui-light-box"
import { CgClose } from "react-icons/cg"
import { BiCloset, BiNavigation } from "react-icons/bi"

function App() {
  const [open, setOpen] = useState<boolean>(false)

  const images: LightBoxImages[] = [
    {
      src: "https://qa.hearzap.server.apxor.com/v1/assets/1737546899_e4acf2e7-4113-462f-8aa4-8aa1da58bab5_pxfuel.jpg",
      alt: "Image 1",
      caption: "First Image",
      captionDescription: "This is the first image description.",
    },
    {
      src: "https://qa.hearzap.server.apxor.com/v1/assets/1737546898_e84b2e20-aa62-486e-9a78-cb0bc9997c8a_hearing-loss.png",
      alt: "Image 2",
      caption: "Second Image",
      captionDescription: "This is the second image description.",
    },
    {
      src: "https://qa.hearzap.server.apxor.com/v1/assets/1737546899_e4acf2e7-4113-462f-8aa4-8aa1da58bab5_pxfuel.jpg",
      alt: "Image 3",
      caption: "Third Image",
      captionDescription: "This is the third image description.",
    },
  ]

  const handleImageDelete = (index: number) => {
    console.log(`Image at index ${index} deleted`)
  }
  return (
    <>
      <div className="flex flex-col gap-2">
        <img
          src={viteLogo}
          className="logo"
          alt="Vite logo"
        />

        <Button
          className="bg-red-500"
          onClick={() => console.log("clicked")}
          disabled={true}
        >
          Zenithui Button
        </Button>
        <Drawer direction="right">
          <DrawerTrigger asChild>
            <button>Open Drawer</button>
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
            <button>Open Dialog</button>
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

        <TimePicker
          time="14:34"
          onTimeChange={(time) => console.log(time)}
          align="center"
          side="right"
          // classNames={{
          //   button: "text-red-500",
          //   timeScrollListItem: "bg-slate-500",
          //   timeScrollList: "bg-emerald-500",
          //   popoverContent: "bg-red-500",
          //   // Selected: "text-green-500 bg-black",
          // }}
        />

        <button onClick={() => setOpen(true)}>Open</button>

        <LightBox
          open={open}
          onOpenChange={setOpen}
          images={images}
          initialIndex={0}
          showCloseButton={true}
          showDeleteButton={true}
          showPagination={true}
          animation="fade"
          showCaption={true}
          onImageDelete={handleImageDelete}
          classNames={{
            caption: "text-red-500",
            captionDescription: "text-blue-500",
            pagination: "text-green-500",
            paginationButton: "text-yellow-500 bg-yellow-500",
            paginationButtonActive: "bg-purple-900 border-purple-900",
            closeButton: "text-blue-900",
            deleteButton: " text-green-500",
            navigateButton: "text-blue-500",
            navigateButtonLeft: "text-blue-500",
            navigateButtonRight: "text-yellow-500",
            overLay: "bg-yellow-500",
            lightBox: "border-red-500 border-2",
          }}
          components={{
            CloseButtonIcon: <CgClose className="size-1/2" />,
            DeleteButtonIcon: <BiNavigation className="size-1/2" />,
            NavigationButtonLeftIcon: <BiNavigation className="size-1/2" />,
            NavigationButtonRightIcon: <BiNavigation className="size-1/2" />,
            CloseButton: ({ onOpenChange }) => (
              <button onClick={() => onOpenChange(false)}>
                <BiCloset />
              </button>
            ),
            NavigationButtonLeft: ({ onClick }) => (
              <button onClick={onClick}>
                <BiCloset className="size-1/2" />
              </button>
            ),
            NavigationButtonRight: ({ onClick }) => (
              <button onClick={onClick}>
                <BiNavigation className="size-1/2" />
              </button>
            ),
          }}
        />
      </div>
    </>
  )
}

export default App
