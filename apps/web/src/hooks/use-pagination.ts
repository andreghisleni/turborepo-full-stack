import { calculateTotalPages } from '@/utils/calculate-total-pages';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function usePaginationFuncs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function navigateToPage(p: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('pageIndex', String(p));

    router.push(`${pathname}?${params.toString()}`);
  }

  function setPageSize(l: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('pageSize', l);
    params.set('pageIndex', '0');
    router.push(`${pathname}?${params.toString()}`);
  }

  return {
    navigateToPage,
    setPageSize,
  };
}

export function usePagination({
  total,
  pageSize,
  showing,
}: {
  total?: number;
  pageSize: number;
  showing?: number;
}) {
  const { navigateToPage, setPageSize } = usePaginationFuncs();

  const t = total || 0;

  const { totalPages, lastPageSize } = calculateTotalPages(t, pageSize);

  return {
    navigateToPage,
    setPageSize,
    totalPages,
    lastPageSize,
    total: t,
    showing: showing || 0,
  };
}
