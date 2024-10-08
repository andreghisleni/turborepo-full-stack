'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { tdb } from '@/components/TableDataButton';

import { GetAllOrganizationsQuery } from '@/generated/graphql';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Organization = GetAllOrganizationsQuery['organizations'][0];

type ColumnsProps = {
  refetch: () => void;
};

export const columns = ({ refetch }: ColumnsProps): ColumnDef<Organization>[] => [
  tdb('name', 'Nome'),
  tdb('slug', 'Slug (url)'),
  tdb('domain', 'Domínio'),
  tdb('shouldAttachUsersByDomain', 'Anexar'),
  tdb('avatarUrl', 'Avatar', ({ getValue }) =>
    getValue() ? (
      <Image
        src={getValue<string>()}
        alt="Avatar"
        className="rounded-full"
        width={40}
        height={40}
      />
    ) : null,
  ),
  {
    id: 'owner',
    header: 'Dono',
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span>{row.original.owner.name}</span>
        <span>{row.original.owner.email}</span>
      </div>
    ),
  },
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
          <Button
            onClick={() => {
              alert('Edit');
            }}
            className="rounded bg-blue-500 p-2 text-white"
          >
            Editar
          </Button>
          <Button
            onClick={() => {
              alert('Delete');
            }}
            className="rounded bg-red-500 p-2 text-white"
          >
            Deletar
          </Button>
        </div>
      );
    },
  },
];
