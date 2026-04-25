'use client'

import { deleteStorylineAction } from '@/app/actions/deleteStoryline'

export function DeleteStorylineButton({ storylineId }: { storylineId: number }) {
  return (
    <form action={deleteStorylineAction}>
      <input type="hidden" name="storylineId" value={storylineId} />
      <button
        type="submit"
        className="h-8 px-3 text-xs rounded-md bg-red-950/50 border border-red-900 text-red-500 hover:bg-red-900 hover:text-white transition-colors"
        onClick={(e) => {
          if (!confirm('Are you sure you want to delete this storyline?')) {
            e.preventDefault();
          }
        }}
      >
        Delete
      </button>
    </form>
  )
}
