import {
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
} from "zenithui-primitive"
import { TimePicker } from "zenithui-time-picker"
import { useState } from "react"
import { LightBox, LightBoxImages } from "zenithui-light-box"
import { DayPicker } from "zenithui-day-picker"
import { toast } from "zenithui-toast"

function App() {
  const [open, setOpen] = useState<boolean>(false)
  // const [value, setValue] = useState<string[]>([])
  const after7Days = new Date()
  after7Days.setDate(new Date().getDate() + 7)
  const [selectedDate, setSelectedDate] = useState<{ from: Date; to: Date }>({
    from: new Date(),
    to: after7Days,
  })

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
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2 overflow-y-auto bg-slate-100">
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

      <TimePicker
        time="14:34"
        onTimeChange={(time) => console.log(time)}
        align="center"
        side="right"
        theme="auto"
      />

      <button onClick={() => setOpen(true)}>Open Light Box</button>

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
        // classNames={{
        //   caption: "text-red-500",
        //   captionDescription: "text-blue-500",
        //   pagination: "text-green-500",
        //   paginationButton: "text-yellow-500 bg-yellow-500",
        //   paginationButtonActive: "bg-purple-900 border-purple-900",
        //   closeButton: "text-blue-900",
        //   deleteButton: " text-green-500",
        //   navigateButton: "text-blue-500",
        //   navigateButtonLeft: "text-blue-500",
        //   navigateButtonRight: "text-yellow-500",
        //   overLay: "bg-yellow-500",
        //   lightBox: "border-red-500 border-2",
        // }}
      />

      <DayPicker
        mode="range"
        selected={selectedDate}
        onSelect={setSelectedDate}
        hideNavigation={false}
        hideOutsideDates={false}
        hideWeekdays={false}
        theme="light"
        // classNames={{
        //   calendar: "bg-slate-50",
        //   day: "bg-slate-50",
        //   rangeDates: "bg-sky-50",
        //   rangeStart: "bg-blue-500",
        //   rangeEnd: "bg-red-500",
        //   outsideDate: "bg-red-100",
        // }}
      />

      <button onClick={() => toast.success("Success Toast")}>
        Toast Success
      </button>
      <button onClick={() => toast.info("Info Toast")}>Toast Info</button>
      <button onClick={() => toast.error("Error Toast")}>Toast Error</button>
      <button onClick={() => toast.warning("Warning Toast")}>
        Toast Warning
      </button>
    </div>
  )
}

export default App
