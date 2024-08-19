import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserServer } from '@/utils/get-server';
import { Building2, ShieldOff } from 'lucide-react';
import { Metadata } from 'next';
import { unstable_noStore } from 'next/cache';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Selecionar o tipo de acesso',
};

export default async function SelectTypePage() {
  unstable_noStore();
  const user = getUserServer();

  if (!user) {
    return <div>Usuário não encontrado</div>;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Selecione o tipo de acesso</CardTitle>
        </CardHeader>

        <CardContent className="flex gap-8">
          <Link
            href="/admin"
            className="flex flex-col items-center gap-4 rounded-lg p-16 dark:bg-zinc-900 hover:dark:bg-zinc-800"
          >
            <ShieldOff className="h-16 w-16" />
            <span className="text-xl">Painel Administrativo</span>
          </Link>
          <Link
            href={
              user.member_on.length === 1
                ? `/app/${user.member_on[0].organization.slug}`
                : '/select-organization'
            }
            className="flex flex-col items-center gap-4 rounded-lg p-16 dark:bg-zinc-900 hover:dark:bg-zinc-800"
          >
            <Building2 className="h-16 w-16" />
            <span className="text-xl">
              {user.member_on.length === 1 ? 'Acessar organização' : 'Selecionar organização'}
            </span>
          </Link>
        </CardContent>
      </Card>

      {/* <ShowJson data={session} /> */}
    </div>
  );
}
