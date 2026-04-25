// app/champions/page.tsx
import { db } from '@/db'
import { championships, superstars } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function ChampionsPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  // Fetch titles and the roster so we can map names to the holder IDs
  const userTitles = await db.select().from(championships).where(eq(championships.userId, userId));
  const userRoster = await db.select().from(superstars).where(eq(superstars.userId, userId));

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Title Histories</h1>

      {userTitles.length === 0 ? (
        <p className="text-zinc-500">No active championships tracked yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
          {userTitles.map((title) => {
            // Find the superstar object that matches the currentHolderId
            const champ = userRoster.find(s => s.id === title.currentHolderId);

            return (
              <Card key={title.id} className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader>
                  <CardTitle className="text-lg">{title.name}</CardTitle>
                  <span className="text-xs text-zinc-500 uppercase">{title.brand}</span>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <span className="text-2xl font-bold text-yellow-500">
                      {champ ? champ.name : 'Vacant'}
                    </span>
                    <span className="text-sm text-zinc-400">
                      Days Held: {title.daysHeld}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </main>
  );
}