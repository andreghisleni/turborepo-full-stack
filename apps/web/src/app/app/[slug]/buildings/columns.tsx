'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { tdb } from '@/components/TableDataButton';

import { GetAllBuildingsQuery } from '@/generated/graphql';
import { ShowBuildingAddress } from './show-building-address-dialog';
import { EditBuildingFormDialog } from './building-edit-form-dialog';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Building = GetAllBuildingsQuery['buildings'][0];

type ColumnsProps = {
  refetch: () => void;
};

export const columns = ({ refetch }: ColumnsProps): ColumnDef<Building>[] => [
  tdb('name', 'Nome'),
  {
    accessorKey: 'address',
    header: 'Endereço',
    cell: ({ row }) => {
      return <ShowBuildingAddress building={row.original} />;
    },
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
          <EditBuildingFormDialog refetch={refetch} building={row.original} />
        </div>
      );
    },
  },
];
