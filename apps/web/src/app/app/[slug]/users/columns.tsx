'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { tdb } from '@/components/TableDataButton';

import { GetAllUsersQuery } from '@/generated/graphql';
import { inputPhoneMask } from '@/utils/inputMasks';
import { UpdateUserRoleSelector } from './update-user-role-selector';
import { UpdateActiveButton } from './update-active-button';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = GetAllUsersQuery['users'][0];

type ColumnsProps = {
  refetch: () => void;
};

export const columns = ({ refetch }: ColumnsProps): ColumnDef<User>[] => [
  tdb('name', 'Nome'),
  tdb('email', 'Email'),
  tdb('phone', 'Telefone', ({ row }) => inputPhoneMask(row.original.phone || '')),
  {
    accessorKey: 'createdAt',
    header: 'Criado em',
    cell: ({ row }) => {
      return <span>{format(new Date(row.getValue('createdAt')), 'dd/MM/yyyy HH:mm')}</span>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <UpdateActiveButton
            {...{
              id: row.original.id,
              isActive: !!row.original.activatedAt,
              refetch,
            }}
          />
          <UpdateUserRoleSelector
            {...{
              id: row.original.id,
              role: row.original.role as 'ADMIN' | 'DEFAULT',
              refetch,
            }}
          />
        </div>
      );
    },
  },
];
