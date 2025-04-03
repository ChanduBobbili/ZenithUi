// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   Drawer,
//   DrawerContent,
//   DrawerDescription,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "zenithui-primitive"

import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_demo/primitive")({
  component: RouteComponent,
})

function RouteComponent() {
  return <></>
  //     <div className="flex flex-col gap-4">
  //       <Drawer direction="right">
  //         <DrawerTrigger asChild>
  //           <button>Open Drawer</button>
  //         </DrawerTrigger>
  //         <DrawerContent
  //           className="w-1/2 rounded-bl-md rounded-tl-md p-6 pb-4 pt-2 transition-all duration-300 ease-in-out"
  //           OverlayClassName="bg-black/75"
  //         >
  //           <DrawerHeader>
  //             <DrawerTitle className="text-sky-400">Drawer Tiltle</DrawerTitle>
  //             <DrawerDescription className="text-emerald-400">
  //               Drawer Description
  //             </DrawerDescription>
  //           </DrawerHeader>

  //           <p>jkjdgfkfgkfjhgkjfhgl</p>
  //         </DrawerContent>
  //       </Drawer>
  //       <Dialog>
  //         <DialogTrigger asChild>
  //           <button>Open Dialog</button>
  //         </DialogTrigger>
  //         <DialogContent className="w-1/2 max-w-full">
  //           <DialogHeader>
  //             <DialogTitle className="text-sky-400">Dialog Tiltle</DialogTitle>
  //             <DialogDescription className="text-emerald-400">
  //               Dialog Description
  //             </DialogDescription>
  //           </DialogHeader>

  //           <p>jkjdgfkfgkfjhgkjfhgl</p>
  //         </DialogContent>
  //       </Dialog>
  //     </div>
  //   )
}
