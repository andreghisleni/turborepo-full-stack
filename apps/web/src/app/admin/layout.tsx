import { Header } from '@/components/page/header';
import { HeaderMobile } from '@/components/page/header-mobile';
import { MarginWidthWrapper } from '@/components/page/margin-width-wrapper';
import { PageWrapper } from '@/components/page/page-wrapper';
import { SideNav } from '@/components/page/side-nav';
import { application } from '@full-stack/authorization';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { getUserServer } from '@/utils/get-user-server';
import { SIDENAV_ITEMS_ADMIN, USER_AVATAR_MENU_ITEMS } from './constants';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userRole = getCookie('user-role', { cookies });

  const user = getUserServer();

  if (!user) {
    return <div>Usuário não encontrado</div>;
  }
  if (userRole) {
    try {
      const ur = JSON.parse(userRole);

      if (ur.id && ur.role) {
        const items = SIDENAV_ITEMS_ADMIN({
          app: {
            user: {
              id: ur?.id || '',
              role: (ur?.role as application.Role) || 'DEFAULT',
            },
          },
        });

        const userAvatarMenuItems = USER_AVATAR_MENU_ITEMS(user);

        return (
          <div className="flex">
            <SideNav SIDENAV_ITEMS={items} />
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
