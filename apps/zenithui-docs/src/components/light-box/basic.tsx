"use client"
import type { LightBoxImages } from "@zenithui/light-box"
import LightBox from "../ui/light-box"
import { useState } from "react"
import { Button } from "../ui/button"

export default function BasicLightBox() {
  const [open, setOpen] = useState<boolean>(false)
  const dummyImages: LightBoxImages[] = [
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
  return (
    <div className="flex">
      <Button onClick={() => setOpen(!open)}>Open</Button>
      <LightBox
        images={dummyImages}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  )
}
