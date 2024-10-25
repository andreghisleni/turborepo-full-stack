import { ColumnDef } from '@tanstack/react-table';
import { tableDataButton } from '@/components/TableDataButton';
import { tableDataParser } from '@/components/TableDataParser';
import { GetSaleDemandQuery } from '@/generated/graphql';

export type SaleDemand = NonNullable<GetSaleDemandQuery['saleDemand']>;

export const columns = (): ColumnDef<SaleDemand['saleItens'][0]>[] => [
  {
    accessorKey: 'sale.code',
    header: tableDataButton('Código'),
  },
  {
    accessorKey: 'sale.client.name',
    header: tableDataButton('Nome do cliente'),
  },
  {
    accessorKey: 'price',
    header: tableDataButton('Preço'),
  },
  {
    accessorKey: 'quantity',
    header: tableDataButton('Quantidade'),
  },
  {
    accessorKey: 'addedAt',
    header: tableDataButton('Adicionado em'),
    cell: tableDataParser('date'),
  },
  {
    accessorKey: 'seller.user.name',
    header: tableDataButton('Nome do vendedor'),
  },
  {
    accessorKey: 'sale.notes',
    header: tableDataButton('Observações'),
  },
];
