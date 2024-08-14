'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { tdb } from '@/components/TableDataButton';

import { GetAllClientsQuery } from '@/generated/graphql';
import { inputDocumentMask, inputPhoneMask } from '@/utils/inputMasks';
import { ClientFormDialog } from './client-form-dialog';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Client = GetAllClientsQuery['clients'][0];

type ColumnsProps = {
  refetch: () => void;
};

export const columns = ({ refetch }: ColumnsProps): ColumnDef<Client>[] => [
  tdb('name', 'Nome'),
  tdb('email', 'Contato', ({ row }) => (
    <div className="flex flex-col">
      <span className="font-bold">{row.original.email}</span>
      <span>{inputPhoneMask(row.original.phone || '')}</span>
    </div>
  )),
  tdb('document', 'Documento', ({ getValue }) => inputDocumentMask(getValue<string>())),
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
          <ClientFormDialog refetch={refetch} client={row.original} />
        </div>
      );
    },
  },
];
