// components/RosterTable.tsx
'use client'

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EditSuperstarModal } from '@/components/EditSuperstarModal';
import { ArrowUpDown, ArrowDown, ArrowUp } from 'lucide-react';

// Define the type so TypeScript knows what our data looks like
type Superstar = {
  id: number;
  userId: string;
  name: string;
  brand: string;
  overall: number | null;
  isHeel: boolean | null;
};

export function RosterTable({ initialRoster }: { initialRoster: Superstar[] }) {
  const [sortConfig, setSortConfig] = useState<{ key: keyof Superstar; direction: 'asc' | 'desc' } | null>(null);

  // Sorting Logic
  const sortedRoster = [...initialRoster].sort((a, b) => {
    if (!sortConfig) return 0;

    const { key, direction } = sortConfig;

    // Sort by Overall (Numerical)
    if (key === 'overall') {
      const aVal = a.overall || 0;
      const bVal = b.overall || 0;
      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    }

    // Sort by Alignment (Boolean -> 1 or 0)
    if (key === 'isHeel') {
      const aVal = a.isHeel ? 1 : 0;
      const bVal = b.isHeel ? 1 : 0;
      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    }

    // Sort by Name or Brand (Alphabetical String)
    const aVal = String(a[key]);
    const bVal = String(b[key]);
    return direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
  });

  const requestSort = (key: keyof Superstar) => {
    let direction: 'asc' | 'desc' = 'asc';
    // If we click the same column that is already sorting 'asc', flip it to 'desc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnName: keyof Superstar) => {
    if (sortConfig?.key !== columnName) {
      return <ArrowUpDown className="ml-2 h-4 w-4 inline-block opacity-30" />;
    }
    if (sortConfig.direction === 'asc') {
      return <ArrowUp className="ml-2 h-4 w-4 inline-block text-orange-500" />;
    }
    return <ArrowDown className="ml-2 h-4 w-4 inline-block text-orange-500" />;
  };

  return (
    <div className="border border-zinc-800 rounded-md bg-zinc-950/50 overflow-hidden shadow-xl">
      <Table>
        <TableHeader className="bg-zinc-900">
          <TableRow className="border-zinc-800 hover:bg-transparent select-none">

            <TableHead
              className="w-[300px] text-zinc-400 font-semibold cursor-pointer hover:text-white transition-colors"
              onClick={() => requestSort('name')}
            >
              Superstar {getSortIcon('name')}
            </TableHead>

            <TableHead
              className="text-zinc-400 font-semibold cursor-pointer hover:text-white transition-colors"
              onClick={() => requestSort('brand')}
            >
              Brand {getSortIcon('brand')}
            </TableHead>

            <TableHead
              className="text-right text-zinc-400 font-semibold cursor-pointer hover:text-white transition-colors"
              onClick={() => requestSort('overall')}
            >
              Overall {getSortIcon('overall')}
            </TableHead>

            <TableHead
              className="text-right text-zinc-400 font-semibold cursor-pointer hover:text-white transition-colors"
              onClick={() => requestSort('isHeel')}
            >
              Alignment {getSortIcon('isHeel')}
            </TableHead>

            <TableHead className="text-right text-zinc-400"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedRoster.map((star) => (
            <TableRow key={star.id} className="border-zinc-800 hover:bg-zinc-900/50 transition-colors">
              <TableCell className="font-medium text-white">{star.name}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`
                    ${star.brand === 'RAW' ? 'border-red-500 text-red-500 bg-red-500/10' : ''}
                    ${star.brand === 'SmackDown' ? 'border-blue-500 text-blue-500 bg-blue-500/10' : ''}
                    ${star.brand === 'NXT' ? 'border-yellow-500 text-yellow-500 bg-yellow-500/10' : ''}
                    ${star.brand === 'Free Agent' ? 'border-zinc-500 text-zinc-500 bg-zinc-500/10' : ''}
                  `}
                >
                  {star.brand}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-mono text-zinc-300">{star.overall}</TableCell>
              <TableCell className="text-right">
                <span className={star.isHeel ? "text-red-400 font-medium" : "text-green-400 font-medium"}>
                  {star.isHeel ? "Heel" : "Face"}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <EditSuperstarModal star={star} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}