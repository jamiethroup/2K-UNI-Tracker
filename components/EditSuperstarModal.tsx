'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { updateSuperstarAction } from "@/app/actions/updateSuperstar"
import { useState } from "react"

// Define the superstar type based on your schema
type Superstar = {
  id: number;
  name: string;
  brand: string;
  overall: number | null;
  isHeel: boolean | null
};

export function EditSuperstarModal({ star }: { star: Superstar }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 text-xs bg-zinc-900 border-zinc-700 hover:bg-zinc-800 text-zinc-300">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-zinc-950 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>Edit {star.name}</DialogTitle>
        </DialogHeader>

        <form
          action={async (formData) => {
            await updateSuperstarAction(formData);
            setIsOpen(false);
          }}
          className="flex flex-col gap-4 mt-2"
        >
          {/* Hidden input to pass the ID to the server action */}
          <input type="hidden" name="superstarId" value={star.id} />

          <div className="flex flex-col gap-2">
            <label htmlFor="brand" className="text-sm font-medium">Brand (Draft / Trade)</label>
            <select
              name="brand"
              id="brand"
              defaultValue={star.brand}
              className="p-2 rounded bg-zinc-900 border border-zinc-700 text-white"
            >
              <option value="RAW">RAW</option>
              <option value="SmackDown">SmackDown</option>
              <option value="NXT">NXT</option>
              <option value="Free Agent">Free Agent</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="overall" className="text-sm font-medium">Overall Rating</label>
            <input
              type="number"
              name="overall"
              id="overall"
              defaultValue={star.overall || 80}
              min="1"
              max="100"
              className="p-2 rounded bg-zinc-900 border border-zinc-700 text-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="isHeel" className="text-sm font-medium">Alignment (Turn)</label>
            <select
              name="isHeel"
              id="isHeel"
              defaultValue={star.isHeel ? 'true' : 'false'}
              className="p-2 rounded bg-zinc-900 border border-zinc-700 text-white"
            >
              <option value="false">Face (Good)</option>
              <option value="true">Heel (Bad)</option>
            </select>
          </div>

          <Button type="submit" className="w-full mt-4 bg-zinc-100 hover:bg-zinc-200 text-black">
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}