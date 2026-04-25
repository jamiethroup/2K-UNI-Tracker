import { db } from '@/db';
import { superstars } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { seedUniverseAction } from './actions/seed';
import { UserButton } from '@clerk/nextjs';
import { ClearRosterButton } from '@/components/ClearRosterButton';
import { EditSuperstarModal } from '@/components/EditSuperstarModal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function Dashboard() {
  const { userId } = await auth();

  // 1. Kick unauthenticated users back to login
  if (!userId) redirect('/sign-in');

  // 2. Fetch only this user's superstars
  const userRoster = await db.select()
    .from(superstars)
    .where(eq(superstars.userId, userId));

  // 3. THE ONBOARDING VIEW (If roster is empty)
  if (userRoster.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white p-6">
        <div className="max-w-md text-center p-8 bg-zinc-900 border border-zinc-800 rounded-xl">
          <h1 className="text-3xl font-bold mb-4">Welcome to Universe Mode</h1>
          <p className="text-zinc-400 mb-8">
            Your roster is currently empty. Click below to load the base WWE 2K26 roster and start booking.
          </p>

          <form action={seedUniverseAction}>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition-colors"
            >
              Initialize My Roster
            </button>
          </form>
        </div>
      </main>
    );
  }

  // 4. THE MAIN DASHBOARD VIEW (If they have data)
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-12 max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">My Universe</h1>
          <span className="text-sm text-zinc-400">({userRoster.length} superstars)</span>
        </div>
        <div className="flex items-center gap-4">
          <ClearRosterButton />
          <UserButton />
        </div>
      </header>

      {/* Roster Table */}
      <section className="mb-12 max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold">My Roster</h2>
          {/* A quick link over to your newly created Champions page */}
          <a href="/champions" className="text-sm text-zinc-400 hover:text-white underline">
            View Championships &rarr;
          </a>
        </div>

        <div className="border border-zinc-800 rounded-md bg-zinc-950/50">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="w-[300px] text-zinc-400">Superstar</TableHead>
                <TableHead className="text-zinc-400">Brand</TableHead>
                <TableHead className="text-right text-zinc-400">Overall</TableHead>
                <TableHead className="text-right text-zinc-400">Alignment</TableHead>
                {/* Add an empty header for the Actions column */}
                <TableHead className="text-right text-zinc-400"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userRoster.map((star) => (
                <TableRow key={star.id} className="border-zinc-800 hover:bg-zinc-900/50">
                  <TableCell className="font-medium text-white">{star.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`
                        ${star.brand === 'RAW' ? 'border-red-500 text-red-500' : ''}
                        ${star.brand === 'SmackDown' ? 'border-blue-500 text-blue-500' : ''}
                        ${star.brand === 'NXT' ? 'border-yellow-500 text-yellow-500' : ''}
                      `}
                    >
                      {star.brand}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-white">{star.overall}</TableCell>
                  <TableCell className="text-right">
                    <span className={star.isHeel ? "text-red-400 font-medium" : "text-green-400 font-medium"}>
                      {star.isHeel ? "Heel" : "Face"}
                    </span>
                  </TableCell>
                  {/* Drop the Edit Modal in the final cell */}
                  <TableCell className="text-right">
                    <EditSuperstarModal star={star} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  );
}