import { SignInButton, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { neon } from '@neondatabase/serverless'
import { db } from '@/db'
import { superstars } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { seedUniverseAction } from './actions/seed'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default async function Home() {
  // You can grab the userId directly on the server
  const { userId } = await auth();

  // Kick unauthenticated users back to login
  if (!userId) redirect('/sign-in');

  async function create(formData: FormData) {
    'use server';
    // Connect to the Neon database
    const sql = neon(`${process.env.DATABASE_URL}`);
    const comment = formData.get('comment');
    // Insert the comment from the form into the Postgres database
    await sql`INSERT INTO comments (comment) VALUES (${comment})`;
  }

  // Fetch only this user's superstars
  const userRoster = await db.select()
    .from(superstars)
    .where(eq(superstars.userId, userId));

  // THE ONBOARDING VIEW
  if (userRoster.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white p-6">
        <div className="max-w-md text-center p-8 bg-zinc-900 border border-zinc-800 rounded-xl">
          <h1 className="text-3xl font-bold mb-4">Welcome to Universe Mode</h1>
          <p className="text-zinc-400 mb-8">
            Your roster is currently empty. Click below to load the base WWE 2K26 roster and start booking.
          </p>
          
          {/* Since we are in a Server Component, we can pass Server Actions 
            directly to the native HTML form action attribute. No JS required!
          */}
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

  // THE MAIN DASHBOARD VIEW
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold">WWE 2K26 Universe Tracker</h1>
        <UserButton />
      </header>

      {/* Roster Grid */}
      
      <section className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">My Roster</h2>
        <div className="border border-zinc-800 rounded-md bg-zinc-950/50">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="w-[300px] text-zinc-400">Superstar</TableHead>
                <TableHead className="text-zinc-400">Brand</TableHead>
                <TableHead className="text-right text-zinc-400">Overall</TableHead>
                <TableHead className="text-right text-zinc-400">Alignment</TableHead>
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
                    <span className={star.isHeel ? "text-red-400" : "text-green-400"}>
                      {star.isHeel ? "Heel" : "Face"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Comment Form Section */}
      <section className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Add a Comment</h2>
        <div className="p-6 border border-zinc-800 rounded-lg bg-zinc-900">
          <form action={create} className="w-full">
            <input 
              type="text" 
              placeholder="write a comment" 
              name="comment"
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
            />
            <button 
              type="submit"
              className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}