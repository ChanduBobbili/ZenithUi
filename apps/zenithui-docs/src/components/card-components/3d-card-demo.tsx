"use client"

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"

export function ThreeDCardPreview() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="group/card border-border bg-card relative h-auto w-auto rounded-xl border p-6 sm:w-[30rem] dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10">
        <CardItem
          translateZ="50"
          className="text-card-foreground text-xl font-bold"
        >
          Make things float in air
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-muted-foreground mt-2 max-w-sm text-sm"
        >
          Hover over this card to unleash the power of CSS perspective.
        </CardItem>
        <CardItem
          translateZ="100"
          className="mt-4 w-full"
        >
          <div className="h-60 w-full rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 object-cover group-hover/card:shadow-xl" />
        </CardItem>
        <div className="mt-20 flex items-center justify-between">
          <CardItem
            translateZ={20}
            as="button"
            className="text-card-foreground rounded-xl px-4 py-2 text-xs font-normal"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="bg-primary text-primary-foreground rounded-xl px-4 py-2 text-xs font-bold"
          >
            Sign up
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  )
}
