import { Metadata } from 'next';
import { BasePageJustBaseFilter } from '@/components/base-page';
import { SaleDemandsTable } from './sale-demands-table';

export const metadata: Metadata = {
  title: `Demandas`,
};

export default BasePageJustBaseFilter(
  a => a.can('get', 'SaleDemand'),
  ({ searchParams: { filterFilter, pageIndex, pageSize } }) => {
    return <SaleDemandsTable {...{ filterFilter, pageIndex, pageSize }} />;
  },
);
