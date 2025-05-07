"use client"
import type { LightBoxImages } from "@zenithui/light-box"
import LightBox from "../ui/light-box"
import { useState } from "react"
import { Button } from "../ui/button"
import { toast } from "@zenithui/toast"
import CodePreview from "../code-preview"

export default function AnimationLightBox() {
  const [animation, setAnimation] = useState<
    "slide" | "fade" | "stretch" | "flip" | "blur" | ""
  >("")
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
  const [animation, setOpen] = useState<boolean>(false)
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
      <div className="flex items-center gap-2">
        <Button onClick={() => setAnimation("slide")}>Slide</Button>
        <Button onClick={() => setAnimation("stretch")}>Stretch</Button>
        <Button onClick={() => setAnimation("fade")}>Fade</Button>
        <Button onClick={() => setAnimation("flip")}>Flip</Button>
        <Button onClick={() => setAnimation("blur")}>Blur</Button>
        <LightBox
          images={dummyImages}
          open={animation !== ""}
          animation={animation === "" ? undefined : animation}
          onOpenChange={(open) => {
            setAnimation(open ? "slide" : "")
          }}
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
