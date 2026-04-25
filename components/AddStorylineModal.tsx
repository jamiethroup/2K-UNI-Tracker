'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { addStorylineAction } from "@/app/actions/addStoryline"
import { useState } from "react"

export function AddStorylineModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button className="bg-zinc-100 hover:bg-zinc-300 text-black font-bold" />}>
        + New Storyline
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-zinc-950 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>Start a New Storyline</DialogTitle>
        </DialogHeader>

        <form
          action={async (formData) => {
            await addStorylineAction(formData);
            setIsOpen(false);
          }}
          className="flex flex-col gap-4 mt-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-medium">Title</label>
            <Input
              id="title"
              name="title"
              placeholder="e.g. The Bloodline Civil War"
              className="bg-zinc-900 border-zinc-700 text-white"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe the rivalry or arc..."
              className="bg-zinc-900 border-zinc-700 text-white min-h-[100px]"
            />
          </div>

          <Button type="submit" className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white">
            Save Storyline
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}