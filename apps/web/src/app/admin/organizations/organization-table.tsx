'use client';

import React, { Suspense } from 'react';

import { DataTable } from '@/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useGetAllOrganizationsQuery } from '@/generated/graphql';
import { useRouter, useSearchParams } from 'next/navigation';
import { Pagination } from '@/components/pagination';
import { calculateTotalPages } from '@/utils/calculate-total-pages';
import { columns } from './columns';
import { Filters } from './filters';
import { url } from '.';
import { OrganizationFormDialog } from './organization-form-dialog';

type Props = {
  pageIndex: number;
  pageSize: number;
  nameFilter: string;
};

export function OrganizationsTable({ pageIndex, pageSize, nameFilter }: Props) {
  const { data, refetch } = useGetAllOrganizationsQuery({
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

    router.push(`${url}?${params.toString()}`);
  }

  function setPageSize(l: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('pageSize', l);
    params.set('pageIndex', '0');
    router.push(`${url}?${params.toString()}`);
  }

  const total = data?.getTotalOrganizations || 0;

  const { totalPages, lastPageSize } = calculateTotalPages(total, pageSize);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organizações</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns({ refetch })}
          data={data?.organizations || []}
          filterComponent={<Filters />}
          ifJustFilterComponent
          addComponent={<OrganizationFormDialog refetch={refetch} />}
        />
        <Suspense fallback={null}>
          <Pagination
            {...{
              items: total || 0,
              page: pageIndex,
              pages: totalPages,
              limit: pageSize,
              showing: data?.organizations.length || 0,
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
