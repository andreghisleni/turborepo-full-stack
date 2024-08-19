'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SideNavItem } from '@/types';
import { Icon } from '@iconify/react';

import { useAuth } from '@/hooks/auth';
import { Shield } from 'lucide-react';
import type { OrganizationServer } from '@/utils/get-server';
import Image from 'next/image';

export const SideNav = ({
  SIDENAV_ITEMS,
  organization,
}: {
  SIDENAV_ITEMS: SideNavItem[];
  organization?: OrganizationServer;
}) => {
  const { user } = useAuth();

  const itens = SIDENAV_ITEMS;

  return (
    <div className="fixed hidden h-screen flex-1 border-r bg-zinc-900 text-white dark:border-border dark:bg-card dark:text-inherit md:flex md:w-60 ">
      <div className="h-screen w-full space-y-6">
        <Link
          href="/"
          className="flex h-16 w-full flex-row items-center justify-center space-x-3 border-b border-zinc-700 dark:border-border md:justify-start md:px-6"
        >
          {/* <span className="h-12 w-12 rounded-lg bg-zinc-600 dark:bg-zinc-700" /> */}
          {/* <Image src={Logo} alt="Logo" className="h-12 w-12" /> */}

          {organization ? (
            organization?.avatarUrl ? (
              <Image
                src={organization.avatarUrl}
                alt="Logo"
                className="h-12 w-12"
                width={48}
                height={48}
              />
            ) : (
              <span className="h-12 w-12 rounded-lg bg-zinc-600 dark:bg-zinc-700" />
            )
          ) : (
            <Shield className="h-12 w-12" />
          )}

          <span className="hidden truncate text-xl font-bold text-white dark:text-inherit md:flex">
            {organization ? organization?.name || 'Full-Stack' : 'Admin'}
          </span>
        </Link>

        <div className="h-[calc(100vh-64px-24px)] overflow-y-auto">
          <div className="flex flex-col space-y-2 md:px-6 ">
            {itens
              .filter(i => i.show)
              .map((item, idx) => {
                return <MenuItem key={idx} item={item} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`hover-bg-zinc-100 flex w-full flex-row items-center justify-between rounded-lg p-2 hover:bg-zinc-700 dark:hover:bg-zinc-700 ${
              pathname.includes(item.path) ? 'bg-zinc-700 dark:bg-zinc-700' : ''
            }`}
            type="button"
          >
            <div className="flex flex-row items-center space-x-4">
              {item.icon}
              <span className="flex text-xl  font-semibold">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? 'rotate-180' : ''} flex`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems
                ?.filter(i => i.show)
                .map((subItem, idx) => {
                  return (
                    <Link
                      key={idx}
                      href={subItem.path}
                      data-current={subItem.path === pathname}
                      className="flex flex-row items-center space-x-4 rounded-lg p-2 hover:bg-zinc-700 data-[current=true]:bg-zinc-700 data-[current=true]:font-bold dark:hover:bg-zinc-700 data-[current=true]:dark:bg-zinc-800"
                    >
                      <span>{subItem.title}</span>
                    </Link>
                  );
                })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row items-center space-x-4 rounded-lg p-2 hover:bg-zinc-700 data-[current=true]:bg-zinc-700 
          dark:hover:bg-zinc-700 data-[current=true]:dark:bg-zinc-700`}
          data-current={
            pathname === item.path ||
            (!item.exact && pathname.startsWith(item.path)) ||
            (item.pathCompare && pathname.startsWith(item.pathCompare))
          }
        >
          {item.icon}
          <span className="flex text-xl font-semibold">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
