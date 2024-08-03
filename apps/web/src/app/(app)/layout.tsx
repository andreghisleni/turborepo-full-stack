import { Header } from '@/components/page/header';
import { HeaderMobile } from '@/components/page/header-mobile';
import { MarginWidthWrapper } from '@/components/page/margin-width-wrapper';
import { PageWrapper } from '@/components/page/page-wrapper';
import { SideNav } from '@/components/page/side-nav';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <SideNav />
      <main className="flex-1 overflow-x-hidden">
        <MarginWidthWrapper>
          <Header />
          <HeaderMobile />
          <PageWrapper>{children}</PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  );
}
