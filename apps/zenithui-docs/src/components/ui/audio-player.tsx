"use client"
import React, { useRef, useState } from "react"
import { Button } from "@/components/ui/button" // Internal
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

const CustomSlider = ({
  value,
  onChange,
  className,
}: {
  value: number
  onChange: (value: number) => void
  className?: string
}) => {
  return (
    <motion.div
      className={cn(
        "bg-secondary relative h-1 w-full cursor-pointer rounded-full",
        className,
      )}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const percentage = (x / rect.width) * 100
        onChange(Math.min(Math.max(percentage, 0), 100))
      }}
    >
      <motion.div
        className="bg-primary absolute top-0 left-0 h-full rounded-full"
        style={{ width: `${value}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </motion.div>
  )
}

const AudioPlayer = ({
  src,
  cover,
  title,
}: {
  src: string
  cover?: string
  title?: string
}) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isShuffle, setIsShuffle] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      setProgress(isFinite(progress) ? progress : 0)
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (value: number) => {
    if (audioRef.current && audioRef.current.duration) {
      const time = (value / 100) * audioRef.current.duration
      if (isFinite(time)) {
        audioRef.current.currentTime = time
        setProgress(value)
      }
    }
  }

  const handleShuffle = () => {
    setIsShuffle(!isShuffle)
  }

  const handleRepeat = () => {
    setIsRepeat(!isRepeat)
  }

  return (
    <AnimatePresence>
      <motion.div
        className="bg-card border-border relative mx-auto flex h-auto w-[280px] flex-col overflow-hidden rounded-3xl border p-3 shadow-sm backdrop-blur-sm"
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(10px)" }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
          delay: 0.1,
          type: "spring",
        }}
        layout
      >
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          src={src}
          className="hidden"
        />
        <motion.div
          className="relative flex flex-col"
          layout
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Cover */}
          {cover && (
            <motion.div className="bg-muted relative h-[180px] w-full overflow-hidden rounded-[16px]">
              <img
                src={cover}
                alt="cover"
                className="h-full w-full object-cover"
              />
            </motion.div>
          )}

          <motion.div className="flex w-full flex-col gap-y-2">
            {/* Title */}
            {title && (
              <motion.h3 className="text-card-foreground mt-1 text-center text-base font-bold">
                {title}
              </motion.h3>
            )}

            {/* Slider */}
            <motion.div className="flex flex-col gap-y-1">
              <CustomSlider
                value={progress}
                onChange={handleSeek}
                className="w-full"
              />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  {formatTime(currentTime)}
                </span>
                <span className="text-muted-foreground text-sm">
                  {formatTime(duration)}
                </span>
              </div>
            </motion.div>

            {/* Controls */}
            <motion.div className="flex w-full items-center justify-center">
              <div className="bg-background border-border flex w-fit items-center gap-2 rounded-[16px] border p-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation()
                      handleShuffle()
                    }}
                    className={cn(
                      "text-foreground hover:bg-accent hover:text-accent-foreground h-8 w-8 rounded-full",
                      isShuffle && "bg-accent text-accent-foreground",
                    )}
                  >
                    <Shuffle className="h-5 w-5" />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    className="text-foreground hover:bg-accent hover:text-accent-foreground h-8 w-8 rounded-full"
                  >
                    <SkipBack className="h-5 w-5" />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation()
                      togglePlay()
                    }}
                    variant="ghost"
                    size="icon"
                    className="text-foreground hover:bg-accent hover:text-accent-foreground h-8 w-8 rounded-full"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    className="text-foreground hover:bg-accent hover:text-accent-foreground h-8 w-8 rounded-full"
                  >
                    <SkipForward className="h-5 w-5" />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation()
                      handleRepeat()
                    }}
                    className={cn(
                      "text-foreground hover:bg-accent hover:text-accent-foreground h-8 w-8 rounded-full",
                      isRepeat && "bg-accent text-accent-foreground",
                    )}
                  >
                    <Repeat className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default AudioPlayer
