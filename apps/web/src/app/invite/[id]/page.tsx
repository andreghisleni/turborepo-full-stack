import { Metadata } from 'next';
import { unstable_noStore } from 'next/cache';
import { z } from 'zod';

import { Invite } from './Invite';

export const metadata: Metadata = {
  title: 'Dados do grupo escoteiro',
};

export const revalidate = 10;

const propsSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  // searchParams: z.object({

  // }),
});

export default async function InvitePage(props: z.infer<typeof propsSchema>) {
  unstable_noStore();

  const p = propsSchema.safeParse(props);

  if (!p.success) {
    return (
      <div>
        <h1>Erro</h1>
        <pre>{JSON.stringify(p.error, null, 2)}</pre>
      </div>
    );
  }
  const {
    params: { id },
  } = p.data;

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Invite id={id} />
    </div>
  );
}
