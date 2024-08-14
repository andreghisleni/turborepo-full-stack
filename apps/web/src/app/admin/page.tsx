'use client';

import { Button } from '@/components/ui/button';
import { getSession } from 'next-auth/react';
import { SeeProfile } from './see-profile';

export default function Home() {
  const runRefreshToken = () => {
    getSession();
  };
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <Button onClick={runRefreshToken}>Refresh</Button>
      <SeeProfile />
    </main>
  );
}
