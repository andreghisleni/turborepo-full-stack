import { Metadata } from 'next';
import { unstable_noStore } from 'next/cache';

import { AppAbilityCan } from '@/utils/app-ability';
import { z } from 'zod';
import { UsersTable } from './user-table';

export const metadata: Metadata = {
  title: 'Usuários',
};

const pageParams = z.object({
  searchParams: z.object({
    pageIndex: z.coerce.number().default(0),
    pageSize: z.coerce.number().default(10),
    nameFilter: z.string().default(''),
  }),
});

export default async function UserPage(props: z.infer<typeof pageParams>) {
  unstable_noStore();

  const r = AppAbilityCan(a => a.can('get', 'User'));

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
    <UsersTable
      {...{
        pageIndex,
        pageSize,
        nameFilter,
      }}
    />
  );
}
