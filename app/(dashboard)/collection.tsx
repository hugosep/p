import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { SelectCollection } from '@/lib/db';
import { deleteCollection } from './actions';

export function Collection({ collection }: { collection: SelectCollection }) {
  return (
    <TableRow>
      {/*
      <TableCell className="hidden sm:table-cell">
        {/*
        <Image
          alt="Collection image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={collection.imageUrl}
          width="64"
        />
      </TableCell>
      */}
      <TableCell className="font-medium">{collection.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {collection.type}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{`$${collection.name}`}</TableCell>
      <TableCell className="hidden md:table-cell">{collection.type}</TableCell>
      {/*<TableCell className="hidden md:table-cell">
        {collection.availableAt.toLocaleDateString("en-US")}
      </TableCell>*/}
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form action={deleteCollection}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
