'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { addFeudAction } from "@/app/actions/feuds"
import { useState } from "react"

export function AddFeudModal({ roster }: { roster: { id: number, name: string, brand: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold" />}>
        + Book New Feud
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-zinc-950 border-zinc-800 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Start a New Feud</DialogTitle>
        </DialogHeader>
        <form action={async (formData) => { await addFeudAction(formData); setIsOpen(false); }} className="flex flex-col gap-4 mt-2">

          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm font-medium">Rivalry Title</label>
              <Input name="title" placeholder="e.g. Bloodline Civil War" className="bg-zinc-900 border-zinc-700" required />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm font-medium">Start Date / Event</label>
              <Input name="startDate" type="text" placeholder="e.g. SummerSlam 2026" className="bg-zinc-900 border-zinc-700" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm font-medium">End Date / Event</label>
              <Input name="endDate" type="text" placeholder="e.g. WrestleMania" className="bg-zinc-900 border-zinc-700" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Involved Superstars</label>
            <div className="max-h-40 overflow-y-auto border border-zinc-700 rounded bg-zinc-900 p-2 grid grid-cols-2 gap-2">
              {roster.map(star => (
                <label key={star.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-zinc-800 p-1 rounded">
                  <input type="checkbox" name="superstars" value={star.id} className="accent-orange-600" />
                  <span>{star.name} <span className="text-zinc-500 text-xs">({star.brand})</span></span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Story Notes</label>
            <Textarea name="description" placeholder="Describe the feud..." className="bg-zinc-900 border-zinc-700" />
          </div>

          <Button type="submit" className="w-full mt-2 bg-orange-600 hover:bg-orange-700">Save Feud</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}