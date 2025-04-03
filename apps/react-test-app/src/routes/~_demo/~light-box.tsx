import { createFileRoute } from "@tanstack/react-router"
// import { useState } from "react"
// import { LightBox, LightBoxImages } from "zenithui-light-box"
// import { dummyImages } from "../../utils/dummy"

export const Route = createFileRoute("/_demo/light-box")({
  component: () => {
    return <></>
  },
})

// function RouteComponent() {
//   const [open, setOpen] = useState<boolean>(false)
//   const [images, setImages] = useState<LightBoxImages[]>(dummyImages)

//   const handleImageDelete = (index: number) =>
//     setImages((prevImages) => prevImages.filter((_, i) => i !== index))

//   return (
//     <div>
//       <button onClick={() => setOpen(true)}>Open Light Box</button>
//       <LightBox
//         open={open}
//         onOpenChange={setOpen}
//         images={images}
//         initialIndex={0}
//         showCloseButton={true}
//         showDeleteButton={true}
//         showPagination={true}
//         animation="fade"
//         showCaption={true}
//         onImageDelete={handleImageDelete}
//         // classNames={{
//         //   caption: "text-red-500",
//         //   captionDescription: "text-blue-500",
//         //   pagination: "text-green-500",
//         //   paginationButton: "text-yellow-500 bg-yellow-500",
//         //   paginationButtonActive: "bg-purple-900 border-purple-900",
//         //   closeButton: "text-blue-900",
//         //   deleteButton: " text-green-500",
//         //   navigateButton: "text-blue-500",
//         //   navigateButtonLeft: "text-blue-500",
//         //   navigateButtonRight: "text-yellow-500",
//         //   overLay: "bg-yellow-500",
//         //   lightBox: "border-red-500 border-2",
//         // }}
//       />
//     </div>
//   )
// }
