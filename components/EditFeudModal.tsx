'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { updateFeudAction } from "@/app/actions/feuds"
import { useState } from "react"

export function EditFeudModal({ feud, roster }: { feud: any, roster: any[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button variant="outline" size="sm" className="bg-zinc-900 border-zinc-700 hover:bg-zinc-800 text-zinc-300 h-8 text-xs" />}>
        Edit / Archive
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-zinc-950 border-zinc-800 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Manage Feud</DialogTitle></DialogHeader>
        <form action={async (formData) => { await updateFeudAction(formData); setIsOpen(false); }} className="flex flex-col gap-4 mt-2">
          <input type="hidden" name="feudId" value={feud.id} />

          <div className="flex gap-4">
            <div className="flex-[2] flex flex-col gap-2">
              <label className="text-sm font-medium">Title</label>
              <Input name="title" defaultValue={feud.title} className="bg-zinc-900 border-zinc-700" required />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm font-medium text-orange-500">Status</label>
              <select name="status" defaultValue={feud.status} className="p-2 rounded-md bg-zinc-900 border border-zinc-700 text-white text-sm">
                <option value="Active">Active</option>
                <option value="Archived">Archived (Past)</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm font-medium">Start Date</label>
              <Input name="startDate" defaultValue={feud.startDate || ''} className="bg-zinc-900 border-zinc-700" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm font-medium">End Date</label>
              <Input name="endDate" defaultValue={feud.endDate || ''} className="bg-zinc-900 border-zinc-700" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Involved Superstars</label>
            <div className="max-h-40 overflow-y-auto border border-zinc-700 rounded bg-zinc-900 p-2 grid grid-cols-2 gap-2">
              {roster.map(star => {
                const isSelected = feud.superstars?.includes(star.id);
                return (
                  <label key={star.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-zinc-800 p-1 rounded">
                    <input type="checkbox" name="superstars" value={star.id} defaultChecked={isSelected} className="accent-orange-600" />
                    <span>{star.name}</span>
                  </label>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Story Notes</label>
            <Textarea name="description" defaultValue={feud.description || ''} className="bg-zinc-900 border-zinc-700" />
          </div>

          <Button type="submit" className="w-full mt-2 bg-orange-600 hover:bg-orange-700">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}