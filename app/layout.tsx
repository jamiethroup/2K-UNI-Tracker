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
          <aside className="border-r border-zinc-800 bg-zinc-800/90 md:bg-zinc-900/50 flex flex-col p-2 mb-5 md:p-6 fixed md:sticky right-0 md:left-0 mr-5 bottom-0 w-fit z-50 md:w-64 md:top-0 md:h-screen rounded-full md:rounded-none">

            {/* Logo Area */}
            <div className="hidden md:flex items-center gap-3 mb-10 px-3 mt-4">
              <h1 className="text-sm font-black tracking-tighter uppercase leading-none">
                The Gorilla<br />
                <span className="text-orange-500">Position</span>
              </h1>
            </div>

            {/* Links */}
            <nav className="grid grid-cols-4 md:flex flex-col gap-2 md:flex-grow">
              <Link href="/" className="flex flex-col md:flex-row items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-800 transition-colors text-xs md:text-sm font-medium">
                <LayoutDashboard className="w-4 h-4 text-zinc-400" /> <span className="hidden md:block">Dashboard</span>
              </Link>
              <Link href="/" className="flex flex-col md:flex-row items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-800 transition-colors text-xs md:text-sm font-medium">
                <Users className="w-4 h-4 text-zinc-400" /> <span className="hidden md:block">Roster</span>
              </Link>
              <Link href="/champions" className="flex flex-col md:flex-row items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-800 transition-colors text-xs md:text-sm font-medium">
                <Trophy className="w-4 h-4 text-zinc-400" /> <span className="hidden md:block">Championships</span>
              </Link>
              <Link href="/storylines" className="flex flex-col md:flex-row items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-800 transition-colors text-xs md:text-sm font-medium">
                <BookOpen className="w-4 h-4 text-zinc-400" /> <span className="hidden md:block">Storylines</span>
              </Link>
            </nav>

            {/* User Profile Footer */}
            <div className="pt-6 border-t border-zinc-800 hidden md:flex items-center gap-3 px-2">
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