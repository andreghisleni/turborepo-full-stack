'use client';

import { Filter, Loader2, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [isPendingFilterTransition, startTransition] = useTransition();

  const [filterFilter, setNameFilter] = useState(searchParams.get('filterFilter') ?? '');

  function handleFilter(event: FormEvent) {
    event.preventDefault();

    const params = new URLSearchParams(searchParams);

    params.set('filterFilter', filterFilter);

    params.set('pageIndex', '0');

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  function handleResetFilters() {
    setNameFilter('');

    const params = new URLSearchParams(searchParams);

    params.delete('filterFilter');

    router.push(`${pathname}?${params.toString()}`);
  }

  const hasFilters = filterFilter !== '';

  return (
    <form onSubmit={handleFilter} className="flex items-center gap-2">
      <Input
        value={filterFilter}
        onChange={e => setNameFilter(e.target.value)}
        placeholder="Filter..."
        className="h-8 w-auto"
      />

      <Separator orientation="vertical" className="h-6" />

      <Button type="submit" size="sm" variant="secondary" disabled={!hasFilters}>
        {isPendingFilterTransition ? (
          <Loader2 className="mr-2 size-3 animate-spin" />
        ) : (
          <Filter className="mr-2 size-3" />
        )}
        Filter
      </Button>

      <Button
        onClick={handleResetFilters /* eslint-disable-line */}
        disabled={!hasFilters}
        type="button"
        size="sm"
        variant="outline"
      >
        <X className="mr-2 size-3" />
        Reset
      </Button>
    </form>
  );
}
