'use client'

import { ScoreOrdination, ScoreType } from '@full-stack/schema'
import { RouterOutput } from '@full-stack/trpc'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

import { tableDataButton } from '@/components/TableDataButton'
import { Button } from '@/components/ui/button'
import { trpc } from '@/lib/trpc/react'

import { ActivityForm } from './activity-form'
import { ActivityProductsForm } from './activity-product-form'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Activity = RouterOutput['getActivities']['activities'][0]

type ColumnsProps = {
  refetch: () => void
}

// title
// description
// scoreType
// scoreOrdination
// scoreDescription
// defaultScore

export const columns = ({ refetch }: ColumnsProps): ColumnDef<Activity>[] => [
  {
    accessorKey: 'number',
    header: tableDataButton('N'),
  },
  {
    accessorKey: 'title',
    header: tableDataButton('Título'),
  },
  {
    accessorKey: 'description',
    header: tableDataButton('Descrição'),
  },
  {
    accessorKey: 'scoreType',
    header: tableDataButton('Tipo de pontuação'),
    cell: ({ getValue }) => ScoreType[getValue<ScoreType>()] || getValue(),
  },
  {
    accessorKey: 'scoreOrdination',
    header: tableDataButton('Ordenação da pontuação'),
    cell: ({ getValue }) =>
      ScoreOrdination[getValue<ScoreOrdination>()] || getValue(),
  },
  {
    accessorKey: 'scoreDescription',
    header: tableDataButton('Descrição da pontuação'),
  },
  {
    accessorKey: 'exactValue',
    header: tableDataButton('Valor exato'),
    cell: ({ getValue }) => getValue() || '-',
  },
  {
    accessorKey: 'numbers',
    header: tableDataButton('Números da somatória da pontuação'),
    cell: ({ getValue }) =>
      getValue() ? getValue<number[]>().join(', ') : '-',
  },
  {
    accessorKey: 'defaultScore',
    header: tableDataButton('Pontuação padrão'),
    cell: ({ getValue }) => getValue() || '-',
  },
  {
    accessorKey: 'numberOfTeams',
    header: tableDataButton('Número de equipes'),
    cell: ({ getValue }) => (getValue() === 0 ? 'Todas' : getValue()) || '-',
  },
  {
    accessorKey: 'createdAt',
    header: 'Criado em',
    cell: ({ row }) => {
      return (
        <span>
          {format(new Date(row.getValue('createdAt')), 'dd/MM/yyyy HH:mm')}
        </span>
      )
    },
  },
  {
    id: 'accessData',
    header: 'Dados de acesso',
    cell: ({ row }) => {
      const { mutateAsync: createUserWithActivity, isPending } =
        trpc.createUserWithActivity.useMutation({
          onSuccess: () => {
            refetch()
          },
        })

      if (row.original.User) {
        return (
          <div className="flex flex-col">
            <span>{row.original.User.userName}</span>
            <span>{row.original.User.password}</span>
            <Button variant="outline" asChild>
              <Link
                href={`/auth/sign-in?${new URLSearchParams({
                  user: row.original.User.userName,
                  pass: row.original.User.password || '',
                })}`}
              >
                Logar
              </Link>
            </Button>
          </div>
        )
      }

      return (
        <Button
          variant="outline"
          onClick={() =>
            createUserWithActivity({ activityId: row.original.id })
          }
          disabled={isPending}
        >
          {isPending ? <Loader2 className="animate-spin" /> : 'Criar usuário'}
        </Button>
      )
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => (
      <>
        <ActivityForm refetch={refetch} activity={row.original} />
        {row.original.scoreType === 'PRICE' && (
          <ActivityProductsForm
            {...{
              refetch,
              activityId: row.original.id,
              products: row.original.products,
            }}
          />
        )}
        <Button variant="outline" asChild>
          <Link href={`/activity/${row.original.id}`}>Lançar pontuação</Link>
        </Button>
      </>
    ),
  },
]
