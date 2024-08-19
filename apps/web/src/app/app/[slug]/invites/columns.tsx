'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { tdb } from '@/components/TableDataButton';

import { GetAllInvitesQuery } from '@/generated/graphql';

export type Invite = GetAllInvitesQuery['invites'][0];

type ColumnsProps = {
  refetch: () => void;
};

export const columns = ({ refetch }: ColumnsProps): ColumnDef<Invite>[] => [
  tdb('email', 'Email'),
  tdb('role', 'Role'),
  {
    accessorKey: 'createdAt',
    header: 'Criado em',
    cell: ({ row }) => {
      return <span>{format(new Date(row.getValue('createdAt')), 'dd/MM/yyyy HH:mm')}</span>;
    },
  },
  {
    accessorKey: 'acceptedAt',
    header: 'Aceito em',
    cell: ({ getValue }) => {
      const v = getValue<Date>();
      if (!v) return <span>-</span>;

      return <span>{format(new Date(v), 'dd/MM/yyyy HH:mm')}</span>;
    },
  },
  {
    accessorKey: 'rejectedAt',
    header: 'Rejeitado em',
    cell: ({ getValue }) => {
      const v = getValue<Date>();
      if (!v) return <span>-</span>;

      return <span>{format(new Date(v), 'dd/MM/yyyy HH:mm')}</span>;
    },
  },
];
