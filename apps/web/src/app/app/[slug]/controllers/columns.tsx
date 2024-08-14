'use client';

import { ColumnDef } from '@tanstack/react-table';

import { tdb } from '@/components/TableDataButton';

import { GetAllControllersQuery } from '@/generated/graphql';
import { format } from 'date-fns';
import { ControllerFormDialog } from './controller-form-dialog';
import { ControllerShowConnectionDataDialog } from './controller-show-connection-data-dialog';
import { UpdateStatusDetectionFormDialog } from './update-status-detection-form-dialog';
// import { ControllerFormDialog } from './controller-form-dialog';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Controller = GetAllControllersQuery['controllers'][0];

type ColumnsProps = {
  refetch: () => void;
};

export const verifyStatus = (s: number) => {
  switch (s) {
    case 0:
      return 'Normal';
    case 1:
      return 'Bloqueado pelo Sistema';
    case 2:
      return 'Bloqueado pelo Cliente';
    default:
      return 'Normal';
  }
};

export const columns = ({ refetch }: ColumnsProps): ColumnDef<Controller>[] => [
  tdb('name', 'Nome'),
  // tdb('email', 'Cliente', ({ row }) => (
  //   <div className="flex flex-col">
  //     <span className="font-bold">{row.original.email}</span>
  //     <span>{inputPhoneMask(row.original.phone || '')}</span>
  //   </div>
  // )),
  {
    id: 'place',
    header: () => (
      <div className="flex flex-col">
        <span className="font-bold">Nome do cliente</span>
        <span>Nome do Edifício</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-bold">{row.original.client?.name}</span>
        <span>{row.original.building?.name}</span>
      </div>
    ),
  },
  {
    id: 'block',
    header: () => (
      <div className="flex flex-col">
        <span className="font-bold">Bloco</span>
        <span>Andar</span>
        <span>Apartamento</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-bold">{row.original.block || '-'}</span>
        <span>{row.original.floor || '-'}</span>
        <span>{row.original.apartment || '-'}</span>
      </div>
    ),
  },
  {
    id: 'connection-data',
    header: 'Dados de conexão',
    cell: ({ row }) => <ControllerShowConnectionDataDialog controller={row.original} />,
  },
  {
    id: 'status',
    header: () => (
      <div className="flex flex-col">
        <span className="font-bold">Status</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-bold">{row.original.status ? 'On' : 'Off'}</span>
        <span>{verifyStatus(row.original.statusDetection)}</span>
      </div>
    ),
  },
  tdb('codeVersion', 'Versão do código'),
  {
    id: 'block',
    header: () => (
      <div className="flex flex-col">
        <span className="font-bold">Última leitura</span>
        <span>Valor sensor</span>
        <span>Tenção da bateria</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-bold">{row.original.sensorValue || '-'}</span>
        <span>{row.original.batteryLevel || '-'}</span>
      </div>
    ),
  },
  {
    id: 'createdAt',
    header: () => (
      <div className="flex flex-col">
        <span className="font-bold">Criado em</span>
        <span>Atualizado em</span>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span className="font-bold">
            {format(new Date(row.original.createdAt), 'dd/MM/yyyy HH:mm')}
          </span>
          <span>{format(new Date(row.original.updatedAt), 'dd/MM/yyyy HH:mm')}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <ControllerFormDialog refetch={refetch} controller={row.original} />
          <UpdateStatusDetectionFormDialog refetch={refetch} controller={row.original} />
        </div>
      );
    },
  },
];
