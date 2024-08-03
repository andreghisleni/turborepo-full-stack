import { ReactNode } from 'react';

export function MarginWidthWrapper({ children }: { children: ReactNode }) {
  return <div className="flex min-h-screen flex-col sm:border-r md:ml-60">{children}</div>;
}
