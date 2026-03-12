"use client"

import InputWithTags from "@/components/ui/input-with-tags"

export function InputWithTagsPreview() {
  return (
    <div className="flex w-full items-center justify-center p-8">
      <InputWithTags
        placeholder="Add your favorite hobbies..."
        limit={5}
      />
    </div>
  )
}
