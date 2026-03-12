"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button" // Updated to point to internal button
import { X } from "lucide-react"
import { motion, AnimatePresence } from "motion/react" // Updated to motion/react
import { useState } from "react"

interface Tag {
  text: string
  onRemove: () => void
}

const Tag = ({ text, onRemove }: Tag) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, y: -10, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.8, y: -10, filter: "blur(10px)" }}
      transition={{
        duration: 0.4,
        ease: "circInOut",
        type: "spring",
      }}
      className="bg-accent text-accent-foreground flex items-center gap-1 rounded-xl px-2 py-1 text-sm shadow-sm backdrop-blur-sm"
    >
      {text}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={onRemove}
          className="text-accent-foreground hover:bg-muted flex h-fit items-center justify-center rounded-full bg-transparent p-1 text-xs"
        >
          <X className="h-4 w-4" />
        </Button>
      </motion.div>
    </motion.span>
  )
}

interface InputWithTagsProps {
  placeholder?: string
  className?: string
  limit?: number
}

const InputWithTags = ({
  placeholder,
  className,
  limit = 10,
}: InputWithTagsProps) => {
  const [tags, setTags] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault()
      if (!limit || tags.length < limit) {
        setTags([...tags, inputValue.trim()])
        setInputValue("")
      }
    }
  }

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove))
  }

  return (
    <div className={cn("flex w-full max-w-xl flex-col gap-2", className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
      >
        <motion.input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Type something and press Enter..."}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="bg-card border-border text-card-foreground hover:bg-accent/50 focus:bg-accent/50 w-full rounded-xl border px-4 py-2 shadow-sm ring-0 backdrop-blur-sm transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50"
          disabled={limit ? tags.length >= limit : false}
        />
      </motion.div>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {tags.map((tag, index) => (
            <Tag
              key={index.toString()}
              text={tag}
              onRemove={() => removeTag(index)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default InputWithTags
