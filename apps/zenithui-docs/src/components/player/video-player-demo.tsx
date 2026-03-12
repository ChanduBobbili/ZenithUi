"use client"
import VideoPlayer from "@/components/ui/video-player"

export function VideoPlayerPreview() {
  return (
    <div className="flex w-full items-center justify-center p-8">
      <VideoPlayer src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
    </div>
  )
}
