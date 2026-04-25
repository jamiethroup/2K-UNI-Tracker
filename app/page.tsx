import { SignInButton, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'

export default async function Home() {
  // You can grab the userId directly on the server
  const { userId } = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-zinc-950 text-white">
      <h1 className="text-4xl font-bold mb-8">WWE 2K26 Universe Tracker</h1>

      <div className="p-6 border border-zinc-800 rounded-lg bg-zinc-900">
        {!userId && (
          <>
            <p className="mb-4 text-zinc-400">Log in to manage your Universe.</p>
            <SignInButton mode="modal">
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Sign In
              </button>
            </SignInButton>
          </>
        )}

        {userId && (
          <div className="flex flex-col items-center gap-4">
            <UserButton />
            <p className="text-green-400 font-mono text-sm">Auth Successful!</p>
            <p className="text-zinc-400 text-xs">Your User ID: {userId}</p>asd
          </div>
        )}
      </div>
    </main>
  );
}