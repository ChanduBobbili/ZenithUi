"use client"
import type { LightBoxImages } from "@zenithui/light-box"
import LightBox from "../ui/light-box"
import { useState } from "react"
import { Button } from "../ui/button"
import { toast } from "@zenithui/toast"
import CodePreview from "../code-preview"

export default function BasicLightBox() {
  const [open, setOpen] = useState<boolean>(false)
  const dummyImages: LightBoxImages[] = [
    {
      src: `${process.env.NEXT_PUBLIC_SITE_URL}/assets/images/spider-man-2.jpg`,
      alt: "Image 1",
      caption: "First Image",
      captionDescription: "This is the first image description.",
    },
    {
      src: `${process.env.NEXT_PUBLIC_SITE_URL}/assets/images/spider-man-1.jpg`,
      alt: "Image 2",
      caption: "Second Image",
      captionDescription: "This is the second image description.",
    },
    {
      src: `${process.env.NEXT_PUBLIC_SITE_URL}/assets/images/spider-man-3.jpg`,
      alt: "Image 3",
      caption: "Third Image",
      captionDescription: "This is the third image description.",
    },
  ]

  return (
    <CodePreview
      code={{
        code: `
import { type LightBoxImages, LightBox } from "@zenithui/light-box"

export default function BasicTooltip() {
  const [open, setOpen] = useState<boolean>(false)
  const dummyImages: LightBoxImages[] = [
    {
      src: "${process.env.NEXT_PUBLIC_SITE_URL}/assets/images/spider-man-2.jpg",
      alt: "Image 1",
      caption: "First Image",
      captionDescription: "This is the first image description.",
    },
    {
      src: "${process.env.NEXT_PUBLIC_SITE_URL}/assets/images/spider-man-1.jpg",
      alt: "Image 2",
      caption: "Second Image",
      captionDescription: "This is the second image description.",
    },
    {
      src: "${process.env.NEXT_PUBLIC_SITE_URL}/assets/images/spider-man-3.jpg",
      alt: "Image 3",
      caption: "Third Image",
      captionDescription: "This is the third image description.",
    },
  ]
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <LightBox
        images={dummyImages}
        open={open}
        animation="slide"
        onOpenChange={setOpen}
        showDeleteButton={true}
      />
    </div>
  );
}
      `,
        language: "jsx",
      }}
    >
      <div>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <LightBox
          images={dummyImages}
          open={open}
          animation="slide"
          onOpenChange={setOpen}
          showCloseButton={true}
          showPagination={true}
          showDeleteButton={true}
          showCaption={true}
          onImageDelete={() => toast.info("Trying to delete image !")}
        />
      </div>
    </CodePreview>
  )
}
