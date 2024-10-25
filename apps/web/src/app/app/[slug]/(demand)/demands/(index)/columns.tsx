import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { tableDataButton } from '@/components/TableDataButton';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { tableDataParser } from '@/components/TableDataParser';
import { GetSaleDemandsQuery } from '@/generated/graphql';

export type SaleDemand = GetSaleDemandsQuery['saleDemands'][0];

export const columns = (): ColumnDef<SaleDemand>[] => [
  {
    accessorKey: 'emittedAt',
    header: tableDataButton('Emitido em'),
    cell: tableDataParser('date'),
  },
  {
    accessorKey: 'product.name',
    header: tableDataButton('Produto'),
  },
  {
    accessorKey: 'product.code',
    header: tableDataButton('Código do produto'),
  },
  {
    accessorKey: 'createdAt',
    id: 'createdAt',
    header: tableDataButton('Criado em'),
    cell: tableDataParser(),
  },
  {
    id: 'year',
    header: tableDataButton('Ano'),
    cell: ({ row }) => {
      return (
        <span>
          {row.original.product.variations?.find(
            variation => variation.variationType.name === 'year',
          )?.value ?? 'Sem ano'}
        </span>
      );
    },
  },
  {
    id: 'country',
    header: tableDataButton('País'),
    cell: ({ row }) => {
      return (
        <span>
          {
            row.original.product.variations?.find(
              variation => variation.variationType.name === 'country',
            )?.variationValue?.name
          }
        </span>
      );
    },
  },
  {
    id: 'variations',
    header: tableDataButton('Variações'),
    cell: ({ row }) => {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="link">Variações</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="grid grid-cols-1 gap-y-2">
              {row.original.product.variations?.map(variation => (
                <div key={variation.id} className="flex justify-between">
                  <p className="font-semibold">{variation.variationType.label}:</p>

                  <p>{variation.value ?? variation.variationValue?.name}</p>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      );
    },
  },
  {
    accessorKey: 'note',
    header: tableDataButton('Observação'),
  },

  {
    id: 'actions',
    header: () => <span>Ações</span>,
    cell: ({ row }) => {
      return (
        <Link href={`./demand/${row.original.id}`}>
          <Button variant="outline" className="ml-4">
            Abrir
          </Button>
        </Link>
      );
    },
  },
];
