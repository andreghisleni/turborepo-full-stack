'use client';

import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

import { TooltipProvider } from '@/components/ui/tooltip';
import { ApolloProviderWrapper } from '@/services/ApolloProviderWrapper';
import { AuthProvider } from '@/hooks/auth';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <JotaiProvider>
        <TooltipProvider>
          <AuthProvider>
            <ApolloProviderWrapper>{children}</ApolloProviderWrapper>
          </AuthProvider>
        </TooltipProvider>
      </JotaiProvider>
    </ThemeProvider>
  );
}
