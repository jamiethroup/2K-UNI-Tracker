import { db } from '@/db'
import { feuds, superstars } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AddFeudModal } from '@/components/AddFeudModal'
import { EditFeudModal } from '@/components/EditFeudModal'
import { DeleteFeudButton } from '@/components/DeleteFeudButton'

export default async function FeudsPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  // Fetch the user's feuds and roster
  const allFeuds = await db.select().from(feuds).where(eq(feuds.userId, userId)).orderBy(desc(feuds.createdAt));
  const roster = await db.select().from(superstars).where(eq(superstars.userId, userId)).orderBy(superstars.name);

  // Split them up based on status!
  const activeFeuds = allFeuds.filter(f => f.status === 'Active');
  const pastFeuds = allFeuds.filter(f => f.status === 'Archived');

  // Helper to render cards
  const renderFeudCard = (feud: any) => {
    // Find the names of the involved superstars
    const involvedNames = feud.superstars
      ? feud.superstars.map((id: number) => roster.find(s => s.id === id)?.name).filter(Boolean).join(' vs. ')
      : 'TBD';

    return (
      <Card key={feud.id} className={`bg-zinc-900 border-zinc-800 text-white flex flex-col ${feud.status === 'Archived' ? 'opacity-70' : ''}`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start mb-2">
            <CardTitle className="text-xl font-bold text-orange-500">{feud.title}</CardTitle>
            <Badge className={feud.status === 'Active' ? 'bg-red-600' : 'bg-zinc-700 text-zinc-300'}>
              {feud.status}
            </Badge>
          </div>
          <p className="font-semibold text-lg">{involvedNames}</p>
          <div className="text-xs text-zinc-400 mt-1 flex gap-4">
            <span>Started: {feud.startDate || 'TBD'}</span>
            <span>Ended: {feud.endDate || 'Ongoing'}</span>
          </div>
        </CardHeader>

        <CardContent className="flex-grow pt-4">
          <p className="text-zinc-300 text-sm whitespace-pre-wrap border-t border-zinc-800 pt-4">
            {feud.description || 'No notes added.'}
          </p>
        </CardContent>

        <CardFooter className="border-t border-zinc-800 pt-4 flex justify-end gap-2">
          <EditFeudModal feud={feud} roster={roster} />
          <DeleteFeudButton feudId={feud.id} />
        </CardFooter>
      </Card>
    );
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <header className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">Rivalry Tracker</h1>
        <AddFeudModal roster={roster} />
      </header>

      <div className="max-w-6xl mx-auto">
        {/* ACTIVE FEUDS */}
        <h2 className="text-xl font-bold mb-4 border-b border-zinc-800 pb-2">Active Feuds</h2>
        {activeFeuds.length === 0 ? (
          <p className="text-zinc-500 mb-12">No active feuds. Book something!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {activeFeuds.map(renderFeudCard)}
          </div>
        )}

        {/* PAST FEUDS */}
        {pastFeuds.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-4 border-b border-zinc-800 pb-2 text-zinc-400">Past Feuds</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-80">
              {pastFeuds.map(renderFeudCard)}
            </div>
          </>
        )}
      </div>
    </main>
  );
}