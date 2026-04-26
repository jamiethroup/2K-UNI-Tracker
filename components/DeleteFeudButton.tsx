'use client'

import { deleteFeudAction } from '@/app/actions/feuds'

export function DeleteFeudButton({ feudId }: { feudId: number }) {
  return (
    <form action={deleteFeudAction}>
      <input type="hidden" name="feudId" value={feudId} />
      <button
        type="submit"
        className="h-8 px-3 text-xs rounded-md bg-red-950/50 border border-red-900 text-red-500 hover:bg-red-900 hover:text-white transition-colors"
        onClick={(e) => {
          if (!confirm('Delete this feud?')) {
            e.preventDefault();
          }
        }}
      >
        Delete
      </button>
    </form>
  )
}
