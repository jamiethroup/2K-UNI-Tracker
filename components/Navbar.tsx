"use client"; // Required for usePathname

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Trophy, BookOpen, Swords } from "lucide-react";
import { cn } from "@/lib/utils"; // Standard Shadcn utility

export function Navbar() {
  const pathname = usePathname();

  // Define your nav items in an array to keep the code DRY
  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Roster", href: "/", icon: Users },
    { name: "Championships", href: "/champions", icon: Trophy },
    { name: "Storylines", href: "/storylines", icon: BookOpen },
    { name: "Feuds", href: "/feuds", icon: Swords },
  ];

  return (
    <nav className="grid grid-cols-5 md:flex flex-col gap-2 md:flex-grow">
      {navItems.map((item) => {
        // Logic to check if the current path matches the link
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col md:flex-row items-center gap-3 px-3 py-2 rounded-md transition-colors text-xs md:text-sm font-medium",
              // Default/Inactive styles
              "hover:bg-zinc-800 text-zinc-400",
              // Active styles
              isActive && "bg-zinc-800 text-white"
            )}
          >
            <item.icon className={cn("w-4 h-4", isActive ? "text-white" : "text-zinc-400")} />
            <span className="hidden md:block">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
