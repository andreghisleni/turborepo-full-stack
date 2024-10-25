'use client';

import { DataTable } from '@/components/data-table';
import React, { Suspense } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { CardTableSkeleton } from '@/components/skeleton/card-table-skeleton';
import { usePaginationNew } from '@/hooks/use-pagination';
import { useGetSaleDemandsQuery } from '@/generated/graphql';
import { FilterBase } from '@/components/filter-base';
import { Pagination } from '@/components/pagination';
import { SaleDemandForm } from './sale-demand-form';
import { columns } from './columns';

type Props = {
  pageIndex: number;
  pageSize: number;
  filterFilter: string;
};

export function SaleDemandsTable({ pageIndex, pageSize, filterFilter }: Props) {
  const { data, loading } = useGetSaleDemandsQuery({
    variables: {
      filter: {
        filter: filterFilter,
        page: pageIndex,
        limit: pageSize,
      },
    },
  });

  const { navigateToPage, setPageSize, total, totalPages, showing } = usePaginationNew({
    total: data?.getTotalSaleDemands,
    pageSize,
    showing: data?.saleDemands.length,
  });

  if (loading) return <CardTableSkeleton columns={columns.length} />;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Demandas</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <ShowJson data={sales} /> */}
          <DataTable
            columns={columns()}
            data={data?.saleDemands || []}
            addComponent={<SaleDemandForm />}
            filterComponent={<FilterBase />}
            ifJustFilterComponent
          />
          <Suspense fallback={null}>
            <Pagination
              {...{
                items: total || 0,
                page: pageIndex,
                pages: totalPages,
                limit: pageSize,
                showing,
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
    </div>
  );
}
