'use client';

import React, { Suspense, useEffect } from 'react';

import { DataTable } from '@/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useGetAllControllersQuery } from '@/generated/graphql';
import { useRouter, useSearchParams } from 'next/navigation';
import { Pagination } from '@/components/pagination';
import { calculateTotalPages } from '@/utils/calculate-total-pages';
import { columns } from './columns';
import { Filters } from './filters';

type Props = {
  pageIndex: number;
  pageSize: number;
  nameFilter: string;
};

export function ControllersTable({ pageIndex, pageSize, nameFilter }: Props) {
  const { data, refetch } = useGetAllControllersQuery({
    variables: {
      filter: {
        name: nameFilter,
        page: pageIndex,
        limit: pageSize,
      },
    },
    refetchWritePolicy: 'overwrite',
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  function navigateToPage(p: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('pageIndex', String(p));

    router.push(`/controllers?${params.toString()}`);
  }

  function setPageSize(l: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('pageSize', l);
    params.set('pageIndex', '0');
    router.push(`/controllers?${params.toString()}`);
  }

  const total = data?.getTotalControllers || 0;

  const { totalPages, lastPageSize } = calculateTotalPages(total, pageSize);

  useEffect(() => {
    refetch();

    const looping = setInterval(() => {
      refetch();
    }, 20 * 1000);

    return () => {
      looping && clearInterval(looping);
    };
  }, [refetch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Controladoras</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns({ refetch })}
          data={data?.controllers || []}
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
              showing: data?.controllers.length || 0,
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
            showing: data?.controllers.length || 0,

            lastPageSize,

            data,
          }}
        /> */}
      </CardContent>
    </Card>
  );
}
