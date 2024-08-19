'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { tdb } from '@/components/TableDataButton';

import { GetAllMembersQuery } from '@/generated/graphql';
import { organization } from '@full-stack/authorization';
import { UpdateMemberRoleSelector } from './update-member-role-selector';
// import { UpdateMemberRoleSelector } from './update-member-role-selector';
// import { UpdateActiveButton } from './update-active-button';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Member = GetAllMembersQuery['members'][0];

type ColumnsProps = {
  refetch: () => void;
};

export const columns = ({ refetch }: ColumnsProps): ColumnDef<Member>[] => [
  tdb('user.name', 'Nome'),
  tdb('user.email', 'Email'),
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
          <UpdateMemberRoleSelector
            {...{
              id: row.original.id,
              role: row.original.role as organization.Role,
              refetch,
            }}
          />
        </div>
      );
    },
  },
];
