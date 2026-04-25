import { ClerkProvider, UserButton } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { Users, Trophy, BookOpen, LayoutDashboard } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'The Gorilla Position',
  description: 'WWE Universe Control Center',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={`${inter.className} bg-zinc-950 text-white flex min-h-screen`}>
          {/* SIDEBAR NAVIGATION */}
          <aside className="w-64 border-r border-zinc-800 bg-zinc-900/50 hidden md:flex flex-col p-6 sticky top-0 h-screen">

            {/* Logo Area */}
            <div className="flex items-center gap-3 mb-10 px-3 mt-4">
              <h1 className="text-sm font-black tracking-tighter uppercase leading-none">
                The Gorilla<br />
                <span className="text-orange-500">Position</span>
              </h1>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-2 flex-grow">
              <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-800 transition-colors text-sm font-medium">
                <LayoutDashboard className="w-4 h-4 text-zinc-400" /> Dashboard
              </Link>
              <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-800 transition-colors text-sm font-medium">
                <Users className="w-4 h-4 text-zinc-400" /> Roster
              </Link>
              <Link href="/champions" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-800 transition-colors text-sm font-medium">
                <Trophy className="w-4 h-4 text-zinc-400" /> Championships
              </Link>
              <Link href="/storylines" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-800 transition-colors text-sm font-medium">
                <BookOpen className="w-4 h-4 text-zinc-400" /> Storylines
              </Link>
            </nav>

            {/* User Profile Footer */}
            <div className="pt-6 border-t border-zinc-800 flex items-center gap-3 px-2">
              <UserButton showName />
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <div className="flex-grow flex flex-col w-full">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}