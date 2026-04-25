// components/ClearRosterButton.tsx
'use client'

import { clearRosterAction } from '@/app/actions/clearRoster'

export function ClearRosterButton() {
  return (
    <form action={clearRosterAction}>
      <button
        type="submit"
        className="text-xs text-zinc-500 hover:text-red-500 underline"
        onClick={(e) => {
          if (!confirm('Are you sure you want to clear your entire roster? This cannot be undone.')) {
            e.preventDefault();
          }
        }}
      >
        Clear Roster
      </button>
    </form>
  )
}
