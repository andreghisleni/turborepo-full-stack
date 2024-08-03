import { ReactNode } from 'react';

export function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-grow flex-col space-y-2 bg-zinc-100 px-10 pb-4 pt-8 dark:bg-background">
      {children}
    </div>
  );
}
