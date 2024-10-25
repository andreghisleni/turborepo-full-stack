'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/data-table';
import { useGetSaleDemandQuery } from '@/generated/graphql';
import { SaleDemandView } from './sale-demand-view';
import { SaleDemandForm } from './sale-demand-form';
import { columns } from './columns';

export function SaleDemand({ id }: { id: string }) {
  const { data } = useGetSaleDemandQuery({
    variables: { id },
    fetchPolicy: 'no-cache',
  });

  if (!data) return null;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Demanda</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <SaleDemandView saleDemand={data.saleDemand} />

          <Separator />

          <SaleDemandForm
            {...{
              saleDemand: data.saleDemand,
            }}
          />

          <Separator />
          {/* <ShowJson data={data.saleDemand.sale_itens} /> */}

          <DataTable columns={columns()} data={data.saleDemand.saleItens || []} />
        </CardContent>
      </Card>
    </div>
  );
}
