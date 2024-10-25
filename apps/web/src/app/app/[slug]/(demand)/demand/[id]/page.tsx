import { Metadata } from 'next';
import { BasePageWithoutFilter } from '@/components/base-page';
import { z } from 'zod';
import { SaleDemand } from './sale-demand';

export const metadata: Metadata = {
  title: `Demandas`,
};

export default BasePageWithoutFilter(
  a => a.can('get', 'SaleDemand'),
  ({ params: { id } }) => {
    return <SaleDemand id={id} />;
  },
  z.object({ params: z.object({ id: z.string() }) }),
);
