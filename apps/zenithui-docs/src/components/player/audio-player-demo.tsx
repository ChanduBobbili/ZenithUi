"use client"
import AudioPlayer from "@/components/ui/audio-player"

export function AudioPlayerPreview() {
  return (
    <div className="flex w-full items-center justify-center p-8">
      <AudioPlayer
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        title="The Epic Sound"
        cover="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop"
      />
    </div>
  )
}
