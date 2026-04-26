// app/page.tsx
import { db } from '@/db';
import { feuds, storylines, superstars } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { seedUniverseAction } from './actions/seed';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClearRosterButton } from '@/components/ClearRosterButton';
import { RosterTable } from '@/components/RosterTable'; // <-- Import our new table

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) redirect('/sign-in');

  const userRoster = await db.select()
    .from(superstars)
    .where(eq(superstars.userId, userId));

  const userStorylines = await db.select()
    .from(storylines)
    .where(eq(storylines.userId, userId));

  const userFueds = await db.select()
    .from(feuds)
    .where(eq(feuds.userId, userId));

  if (userRoster.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white p-6 w-full">
        <div className="max-w-md text-center p-8 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center font-bold text-black text-2xl">G</div>
          </div>
          <h1 className="text-3xl font-bold mb-4">The Gorilla Position</h1>
          <p className="text-zinc-400 mb-8">
            Your universe is currently empty. Click below to load the base WWE roster and start booking.
          </p>

          <form action={seedUniverseAction}>
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded transition-colors shadow-[0_0_15px_rgba(234,88,12,0.3)]"
            >
              Initialize My Roster
            </button>
          </form>
        </div>
      </main>
    );
  }

  const rawCount = userRoster.filter(s => s.brand === 'RAW').length;
  const sdCount = userRoster.filter(s => s.brand === 'SmackDown').length;
  const nxtCount = userRoster.filter(s => s.brand === 'NXT').length;

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8 w-full">

      <header className="flex justify-between items-end mb-8 max-w-5xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold">Universe Control Center</h1>
          <p className="text-zinc-400 mt-1">Manage your roster, track titles, and book storylines.</p>
        </div>
        <ClearRosterButton />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Total Roster</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-orange-500 drop-shadow-[0_0_10px_rgba(234,88,12,0.2)]">
              {userRoster.length}
            </div>
            <p className="text-xs text-zinc-500 mt-1 font-medium">Active Superstars</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Current Storylines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-orange-500 drop-shadow-[0_0_10px_rgba(234,88,12,0.2)]">
              {userStorylines.length}
            </div>
            <p className="text-xs text-zinc-500 mt-1 font-medium">Active Storylines</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Current Fueds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-orange-500 drop-shadow-[0_0_10px_rgba(234,88,12,0.2)]">
              {userFueds.length}
            </div>
            <p className="text-xs text-zinc-500 mt-1 font-medium">Active Fueds</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Brand Split</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-medium">RAW</span>
              <span className="font-bold bg-zinc-950 px-2 rounded border border-zinc-800">{rawCount}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-400 font-medium">SmackDown</span>
              <span className="font-bold bg-zinc-950 px-2 rounded border border-zinc-800">{sdCount}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-yellow-400 font-medium">NXT</span>
              <span className="font-bold bg-zinc-950 px-2 rounded border border-zinc-800">{nxtCount}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-zinc-500 uppercase tracking-wider">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 text-green-500 text-sm font-bold mt-1 bg-zinc-950/50 p-2 rounded border border-zinc-800/50">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
              Neon DB Connected
            </div>
            <div className="flex items-center gap-3 text-green-500 text-sm font-bold mt-2 bg-zinc-950/50 p-2 rounded border border-zinc-800/50">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
              Clerk Auth Active
            </div>
          </CardContent>
        </Card>
      </div>

      <section className="mb-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">My Roster</h2>

        {/* Injecting our new Client Component Table here! */}
        <RosterTable initialRoster={userRoster} />

      </section>
    </main>
  );
}