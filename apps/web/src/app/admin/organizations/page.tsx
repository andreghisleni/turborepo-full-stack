import { Metadata } from 'next';
import { unstable_noStore } from 'next/cache';

import { AppAbilityCan } from '@/utils/app-ability';
import { z } from 'zod';
import { OrganizationsTable } from './organization-table';

export const metadata: Metadata = {
  title: 'Organizações',
};

const pageParams = z.object({
  searchParams: z.object({
    pageIndex: z.coerce.number().default(0),
    pageSize: z.coerce.number().default(10),
    nameFilter: z.string().default(''),
  }),
});

export default async function OrganizationPage(props: z.infer<typeof pageParams>) {
  unstable_noStore();

  const r = AppAbilityCan(a => a.can('get', 'Organization'));

  if (r) {
    return r;
  }

  const p = pageParams.safeParse(props);

  if (!p.success) {
    return <div>Invalid parameters</div>;
  }

  const {
    searchParams: { pageIndex, pageSize, nameFilter },
  } = p.data;

  return (
    <OrganizationsTable
      {...{
        pageIndex,
        pageSize,
        nameFilter,
      }}
    />
  );
}
