'use client';

import { Filter, Loader2, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPendingFilterTransition, startTransition] = useTransition();

  const [nameFilter, setNameFilter] = useState(searchParams.get('nameFilter') ?? '');

  function handleFilter(event: FormEvent) {
    event.preventDefault();

    const params = new URLSearchParams(searchParams);

    params.set('nameFilter', nameFilter);

    params.set('pageIndex', '0');

    startTransition(() => {
      router.push(`/buildings?${params.toString()}`);
    });
  }

  function handleResetFilters() {
    setNameFilter('');

    const params = new URLSearchParams(searchParams);

    params.delete('nameFilter');

    router.push(`/buildings?${params.toString()}`);
  }

  const hasFilters = nameFilter !== '';

  return (
    <form onSubmit={handleFilter} className="flex items-center gap-2">
      <Input
        value={nameFilter}
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
