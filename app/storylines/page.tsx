import { db } from '@/db'
import { storylines } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AddStorylineModal } from '@/components/AddStorylineModal'
import { EditStorylineModal } from '@/components/EditStorylineModal'
import { DeleteStorylineButton } from '@/components/DeleteStorylineButton'

export default async function StorylinesPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  // Fetch only this user's storylines, sorted by newest first
  const userStorylines = await db.select()
    .from(storylines)
    .where(eq(storylines.userId, userId))
    .orderBy(desc(storylines.createdAt));

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <header className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">Universe Storylines</h1>

        <div className="flex gap-4 items-center">
          <a href="/" className="text-sm text-zinc-400 hover:text-white underline mr-4">
            &larr; Back to Roster
          </a>
          <AddStorylineModal />
        </div>
      </header>

      {userStorylines.length === 0 ? (
        <p className="text-zinc-500 text-center mt-12">No storylines written yet. Start booking!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {userStorylines.map((story) => (
            <Card key={story.id} className="bg-zinc-900 border-zinc-800 text-white flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-bold">{story.title}</CardTitle>
                <Badge
                  variant={story.status === 'Ongoing' ? 'default' : 'secondary'}
                  className={story.status === 'Ongoing' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-zinc-700 text-zinc-300'}
                >
                  {story.status}
                </Badge>
              </CardHeader>

              <CardContent className="flex-grow">
                <p className="text-zinc-400 mt-2 leading-relaxed whitespace-pre-wrap">
                  {story.description}
                </p>
              </CardContent>

              {/* The Footer containing our new Edit and Delete actions */}
              <CardFooter className="border-t border-zinc-800 pt-4 flex justify-between items-center">
                <span className="text-xs text-zinc-600">
                  {story.createdAt ? new Date(story.createdAt).toLocaleDateString() : ''}
                </span>

                <div className="flex gap-2">
                  <EditStorylineModal story={story} />
                  <DeleteStorylineButton storylineId={story.id} />
                </div>
              </CardFooter>

            </Card>
          ))}
        </div>
      )}
    </main>
  );
}