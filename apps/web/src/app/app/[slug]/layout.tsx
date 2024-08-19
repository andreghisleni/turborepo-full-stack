import { Header } from '@/components/page/header';
import { HeaderMobile } from '@/components/page/header-mobile';
import { MarginWidthWrapper } from '@/components/page/margin-width-wrapper';
import { PageWrapper } from '@/components/page/page-wrapper';
import { SideNav } from '@/components/page/side-nav';
import { getUserServer, getOrganizationServer } from '@/utils/get-server';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { application, organization as org } from '@full-stack/authorization';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { SIDENAV_ITEMS_ADMIN, USER_AVATAR_MENU_ITEMS } from './constants';

export default async function AppLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { slug: string };
}>) {
  if (!params.slug) {
    redirect('/');
  }

  const cookedMemberRole = getCookie('member-role', { cookies });

  if (!cookedMemberRole) {
    redirect(`/api/auth/organization/${params.slug}`);
  }

  const cookedMemberRoleParsed = JSON.parse(cookedMemberRole);

  if (cookedMemberRoleParsed.slug !== params.slug) {
    redirect(`/api/auth/organization/${params.slug}`);
  }

  const userRole = getCookie('user-role', { cookies });
  const memberRole = getCookie('member-role', { cookies });

  const user = getUserServer();
  const organization = getOrganizationServer();

  if (!user) {
    return <div>Usuário não encontrado</div>;
  }

  if (!organization) {
    return <div>Organização não encontrada</div>;
  }

  console.log('organization', organization);

  if (userRole && memberRole) {
    try {
      const ur = JSON.parse(userRole);
      const mr = JSON.parse(memberRole);

      if (ur.id && ur.role) {
        const items = SIDENAV_ITEMS_ADMIN({
          app: {
            user: {
              id: ur?.id || '',
              role: (ur?.role as application.Role) || 'DEFAULT',
            },
          },
          org: {
            user: {
              id: ur?.id || '',
              role: (mr?.role as org.Role) || 'MEMBER',
            },
          },
          slug: params.slug,
        });

        const userAvatarMenuItems = USER_AVATAR_MENU_ITEMS(user);

        return (
          <div className="flex">
            <SideNav SIDENAV_ITEMS={items} organization={organization} />
            <main className="flex-1 overflow-x-hidden">
              <MarginWidthWrapper>
                <Header USER_AVATAR_MENU_ITEMS={userAvatarMenuItems} />
                <HeaderMobile SIDENAV_ITEMS={items} />
                <PageWrapper>{children}</PageWrapper>
              </MarginWidthWrapper>
            </main>
          </div>
        );
      }
    } catch {
      return (
        <div className="mx-auto my-auto flex max-w-md flex-col items-center rounded-lg bg-card p-8 shadow-md">
          <h1 className="mb-4 text-4xl font-bold text-destructive">401</h1>
          <h2 className="mb-4 text-2xl font-semibold">Não Autorizado</h2>
          <p className="mb-6 text-center text-muted-foreground">
            Você não tem permissão para acessar esta página.
          </p>
          <Button asChild>
            <Link href="/">Voltar para a Página Inicial</Link>
          </Button>
        </div>
      );
    }
  }
}
