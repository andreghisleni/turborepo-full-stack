'use client';

import React from 'react';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import Logo from '@/assets/logo.svg';

import { cn } from '@/lib/utils';
import useScroll from '@/hooks/use-scroll';
import Image from 'next/image';
import { ThemeSwitcher } from './theme-switcher';
import { UserNav } from './user-nav';

export const Header = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full border-b border-gray-200 transition-all dark:border-border`,
        {
          'border-b border-gray-200 bg-white/75 backdrop-blur-lg dark:bg-background/75': scrolled,
          'border-b border-gray-200 bg-white dark:bg-background': selectedLayout,
        },
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex flex-row items-center justify-center space-x-3 md:hidden">
            {/* <span className="h-12 w-12 rounded-lg bg-zinc-300" /> */}
            <Image src={Logo} alt="Logo" className="h-12 w-12" />
            <span className="flex text-xl font-bold ">SMG-TEC</span>
          </Link>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <ThemeSwitcher />

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-300 text-center">
            {/* <span className="text-sm font-semibold">HQ</span> */}
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
};
