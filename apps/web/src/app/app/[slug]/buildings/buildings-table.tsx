'use client';

import React, { Suspense } from 'react';

import { DataTable } from '@/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useGetAllBuildingsQuery } from '@/generated/graphql';
import { useRouter, useSearchParams } from 'next/navigation';
import { Pagination } from '@/components/pagination';
import { calculateTotalPages } from '@/utils/calculate-total-pages';
import { columns } from './columns';
import { Filters } from './filters';
import { BuildingFormDialog } from './building-form-dialog';

type Props = {
  pageIndex: number;
  pageSize: number;
  nameFilter: string;
};

export function BuildingsTable({ pageIndex, pageSize, nameFilter }: Props) {
  const { data, refetch } = useGetAllBuildingsQuery({
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

    router.push(`/buildings?${params.toString()}`);
  }

  function setPageSize(l: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('pageSize', l);
    params.set('pageIndex', '0');
    router.push(`/buildings?${params.toString()}`);
  }

  const total = data?.getTotalBuildings || 0;

  const { totalPages, lastPageSize } = calculateTotalPages(total, pageSize);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edifícios</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns({ refetch })}
          data={data?.buildings || []}
          addComponent={<BuildingFormDialog refetch={refetch} />}
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
              showing: data?.buildings.length || 0,
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
            showing: data?.buildings.length || 0,

            lastPageSize,

            data,
          }}
        /> */}
      </CardContent>
    </Card>
  );
}
