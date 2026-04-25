// components/BookTitleModal.tsx
'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { bookTitleChangeAction } from "@/app/actions/bookTitle"
import { useState } from "react"

// Define the types so TypeScript doesn't yell at us
type Superstar = { id: number; name: string; brand: string };
type Championship = { id: number; name: string; brand: string; currentHolderId: number | null };

export function BookTitleModal({
  roster,
  titles
}: {
  roster: Superstar[],
  titles: Championship[]
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold">
          Book Title Change
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-zinc-950 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>Book a Title Change</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Select the championship and the superstar who just won it.
          </DialogDescription>
        </DialogHeader>

        {/* The Form */}
        <form
          action={async (formData) => {
            await bookTitleChangeAction(formData);
            setIsOpen(false); // Close the modal after booking
          }}
          className="flex flex-col gap-4 mt-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="titleId" className="text-sm font-medium">Championship</label>
            <select
              name="titleId"
              id="titleId"
              className="p-2 rounded bg-zinc-900 border border-zinc-700 text-white"
              required
            >
              <option value="">Select a Title...</option>
              {titles.map(title => (
                <option key={title.id} value={title.id}>{title.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="championId" className="text-sm font-medium">New Champion</label>
            <select
              name="championId"
              id="championId"
              className="p-2 rounded bg-zinc-900 border border-zinc-700 text-white"
              required
            >
              <option value="">Select a Superstar...</option>
              {roster.map(star => (
                <option key={star.id} value={star.id}>{star.name} ({star.brand})</option>
              ))}
            </select>
          </div>

          <Button type="submit" className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white">
            Confirm Finish
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}