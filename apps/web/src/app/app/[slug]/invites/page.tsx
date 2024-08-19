import { Metadata } from 'next';
import { unstable_noStore } from 'next/cache';

import { z } from 'zod';
import { OrgAbilityCan } from '@/utils/org-ability';
import { InvitesTable } from './invites-table';

export const metadata: Metadata = {
  title: 'Membros',
};

const pageParams = z.object({
  searchParams: z.object({
    pageIndex: z.coerce.number().default(0),
    pageSize: z.coerce.number().default(10),
    filterFilter: z.string().default(''),
  }),
});

export default async function UserPage(props: z.infer<typeof pageParams>) {
  unstable_noStore();

  const r = OrgAbilityCan(a => a.can('get', 'Invite'));

  if (r) {
    return r;
  }

  const p = pageParams.safeParse(props);

  if (!p.success) {
    return <div>Invalid parameters</div>;
  }

  const {
    searchParams: { pageIndex, pageSize, filterFilter },
  } = p.data;

  return (
    <InvitesTable
      {...{
        pageIndex,
        pageSize,
        filterFilter,
      }}
    />
  );
}
