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
import { updateStorylineAction } from "@/app/actions/updateStoryline"
import { useState } from "react"

// Define the type based on your schema
type Storyline = {
  id: number;
  title: string;
  description: string | null;
  status: string | null;
};

export function EditStorylineModal({ story }: { story: Storyline }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button variant="outline" size="xs" className="bg-zinc-900 border-zinc-700 hover:bg-zinc-800 text-zinc-300" />}>
        Edit
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-zinc-950 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>Edit Storyline</DialogTitle>
        </DialogHeader>

        <form
          action={async (formData) => {
            await updateStorylineAction(formData);
            setIsOpen(false);
          }}
          className="flex flex-col gap-4 mt-2"
        >
          {/* Hidden input to pass the ID securely */}
          <input type="hidden" name="storylineId" value={story.id} />

          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-medium">Title</label>
            <Input
              id="title"
              name="title"
              defaultValue={story.title}
              className="bg-zinc-900 border-zinc-700 text-white"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="status" className="text-sm font-medium">Status</label>
            <select
              name="status"
              id="status"
              defaultValue={story.status || 'Ongoing'}
              className="p-2 rounded-md bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
            >
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Abandoned">Abandoned</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-medium">Description (Notes/Updates)</label>
            <Textarea
              id="description"
              name="description"
              defaultValue={story.description || ''}
              className="bg-zinc-900 border-zinc-700 text-white min-h-[120px]"
            />
          </div>

          <Button type="submit" className="w-full mt-2 bg-zinc-100 hover:bg-zinc-300 text-black">
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}