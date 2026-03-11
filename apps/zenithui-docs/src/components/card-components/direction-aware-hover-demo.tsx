"use client"

import { DirectionAwareHover } from "@/components/ui/direction-aware-hover"

export function DirectionAwareHoverPreview() {
  const imageUrl =
    "https://images.unsplash.com/photo-1663765970236-f2acfde22237?q=80&w=3532&auto=format&fit=crop"

  return (
    <div className="flex h-[40rem] w-full flex-col items-center justify-center space-y-4">
      <DirectionAwareHover
        imageUrl={imageUrl}
        className="rounded-2xl shadow-xl"
      >
        <p className="text-2xl font-bold text-white">In the mountains</p>
        <p className="mt-2 text-sm font-normal text-gray-200">$1299 / night</p>
        <button className="mt-4 cursor-pointer rounded-md bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-gray-100">
          Book Now
        </button>
      </DirectionAwareHover>
    </div>
  )
}
