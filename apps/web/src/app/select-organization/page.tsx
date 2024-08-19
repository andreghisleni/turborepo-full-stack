import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserServer } from '@/utils/get-server';
import { Building2 } from 'lucide-react';
import { Metadata } from 'next';
import { unstable_noStore } from 'next/cache';
import Image from 'next/image';
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
          <CardTitle className="text-center">Selecione uma organização</CardTitle>
        </CardHeader>

        <CardContent className="flex gap-8">
          {user.member_on.map(member => (
            <Link
              key={member.organization.slug}
              href={`/api/auth/organization/${member.organization.slug}`}
              className="flex flex-col items-center gap-4 rounded-lg p-16 dark:bg-zinc-900 hover:dark:bg-zinc-800"
            >
              {member.organization.avatarUrl ? (
                <Image
                  src={member.organization.avatarUrl}
                  className="h-16 w-16"
                  width={64}
                  height={64}
                  alt={member.organization.name}
                />
              ) : (
                <Building2 className="h-16 w-16" />
              )}
              <span className="text-lg">Acessar organização</span>
              <span className="text-xl">{member.organization.name}</span>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* <ShowJson data={session} /> */}
    </div>
  );
}
