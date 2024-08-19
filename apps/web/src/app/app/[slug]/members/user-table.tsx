'use client';

import React, { Suspense } from 'react';

import { DataTable } from '@/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useGetAllMembersQuery } from '@/generated/graphql';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Pagination } from '@/components/pagination';
import { calculateTotalPages } from '@/utils/calculate-total-pages';
import { columns } from './columns';
import { Filters } from './filters';

type Props = {
  pageIndex: number;
  pageSize: number;
  nameFilter: string;
};

export function UsersTable({ pageIndex, pageSize, nameFilter }: Props) {
  const { data, refetch } = useGetAllMembersQuery({
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
  const pathname = usePathname();

  function navigateToPage(p: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('pageIndex', String(p));

    router.push(`${pathname}?${params.toString()}`);
  }

  function setPageSize(l: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('pageSize', l);
    params.set('pageIndex', '0');
    router.push(`${pathname}?${params.toString()}`);
  }

  const total = data?.getTotalMembers || 0;

  const { totalPages, lastPageSize } = calculateTotalPages(total, pageSize);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Membros</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns({ refetch })}
          data={data?.members || []}
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
              showing: data?.members.length || 0,
              handleUpdatePage: p => {
                navigateToPage(p);
              },
              handleChangeLimit: l => {
                setPageSize(`${l}`);
              },
            }}
          />
        </Suspense>
      </CardContent>
    </Card>
  );
}
