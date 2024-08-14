'use client';

import { ShowJson } from '@/components/show-json';
import { Button } from '@/components/ui/button';
import { useGetMyProfileQuery } from '@/generated/graphql';

export function SeeProfile() {
  const { data, loading, refetch } = useGetMyProfileQuery({
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>SeeProfile</h1>
      <ShowJson data={data} />
      <Button onClick={() => refetch()}>Refetch</Button>
    </div>
  );
}
