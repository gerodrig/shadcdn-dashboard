'use client';
import { Badge } from '@/components/ui/badge';
import { Payment } from '@/data/payments.data';
import { ColumnDef, FilterFn, Row, SortDirection } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowDownIcon, ArrowUpIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';

import { Checkbox } from '@/components/ui/checkbox';


/*
pending: "secondary",
processing: "info",
success: "success",
failed: "destructive",
*/

const myCustomFilterFn: FilterFn<Payment> = (row: Row<Payment>, columnId: string, filterValue: any, addMeta: (meta: any) => void) => {
    filterValue = filterValue.toLowerCase();
    const filterParts = filterValue.split(' ');
    const rowValues = `${row.original.email} ${row.original.clientName} ${row.original.status}`.toLowerCase();

    return filterParts.every((part: string) => rowValues.includes(part));
}


const SortedIcon = ({isSorted}: {isSorted: false | SortDirection}) => {
    if(isSorted === 'asc') {
        return <ArrowUpIcon className="ml-2 h-4 w-4" />
    }

    return <ArrowDownIcon className="ml-2 h-4 w-4" />
};

export const columns: ColumnDef<Payment>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
  {
    accessorKey: 'clientName',
    header: ({ column }) => {
        return (
          <Button
            className='flex items-end'
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Client Name
            <SortedIcon isSorted={column.getIsSorted()} />  
          </Button>
        )
      },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
        return (
          <Button
            className='flex items-end'
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <SortedIcon isSorted={column.getIsSorted()} />  
          </Button>
        )
      },
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const variant = {
        pending: 'secondary',
        processing: 'info',
        success: 'success',
        failed: 'destructive',
      }[status] as 'secondary' | 'info' | 'success' | 'destructive';

      return (
        <Badge
          capitalize
          variant={variant}
          className={`text-right font-medium`}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
        return (
          <Button
            className='flex items-end'
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <SortedIcon isSorted={column.getIsSorted()} />  
          </Button>
        )
      },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'CAD',
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: 'email',
    filterFn: myCustomFilterFn,
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <SortedIcon isSorted={column.getIsSorted()} />  
          </Button>
        )
      },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(payment.id);
                toast('Payment ID copied to clipboard', {
                    position: 'top-right',
                });
              }}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
