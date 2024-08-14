'use client';

import React, { Suspense } from 'react';

import { DataTable } from '@/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useGetAllClientsQuery } from '@/generated/graphql';
import { useRouter, useSearchParams } from 'next/navigation';
import { Pagination } from '@/components/pagination';
import { calculateTotalPages } from '@/utils/calculate-total-pages';
import { columns } from './columns';
import { Filters } from './filters';
import { ClientFormDialog } from './client-form-dialog';

type Props = {
  pageIndex: number;
  pageSize: number;
  nameFilter: string;
};

export function ClientsTable({ pageIndex, pageSize, nameFilter }: Props) {
  const { data, refetch } = useGetAllClientsQuery({
    variables: {
      filter: {
        name: nameFilter,
        page: pageIndex,
        limit: pageSize,
      },
    },
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  function navigateToPage(p: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('pageIndex', String(p));

    router.push(`/clients?${params.toString()}`);
  }

  function setPageSize(l: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('pageSize', l);
    params.set('pageIndex', '0');
    router.push(`/clients?${params.toString()}`);
  }

  const total = data?.getTotalClients || 0;

  const { totalPages, lastPageSize } = calculateTotalPages(total, pageSize);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clientes</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns({ refetch })}
          data={data?.clients || []}
          addComponent={<ClientFormDialog refetch={refetch} />}
          filterComponent={<Filters />}
          ifJustFilterComponent
        />
        <Suspense fallback={null}>
          <Pagination
            {...{
              items: total || 0,
              page: pageIndex,
              pages: totalPages,
              limit: pageSize,
              showing: data?.clients.length || 0,
              handleUpdatePage: p => {
                navigateToPage(p);
              },
              handleChangeLimit: l => {
                setPageSize(`${l}`);
              },
            }}
          />
        </Suspense>
        {/* <ShowJson
          data={{
            items: total || 0,
            page: pageIndex,
            pages: totalPages,
            p: (total || 0) / pageSize,
            limit: pageSize,
            showing: data?.clients.length || 0,

            lastPageSize,

            data,
          }}
        /> */}
      </CardContent>
    </Card>
  );
}
