"use client"

import { HoverEffect } from "@/components/ui/card-hover-effect"

export function CardHoverEffectPreview() {
  const projects = [
    {
      title: "Stripe",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "https://stripe.com",
    },
    {
      title: "Netflix",
      description:
        "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more.",
      link: "https://netflix.com",
    },
    {
      title: "Google",
      description:
        "A multinational technology company that specializes in Internet-related services and products.",
      link: "https://google.com",
    },
    {
      title: "Meta",
      description:
        "A technology conglomerate that develops social media platforms and virtual reality hardware.",
      link: "https://meta.com",
    },
  ]

  return (
    <div className="mx-auto w-full max-w-5xl px-8">
      <HoverEffect items={projects} />
    </div>
  )
}
