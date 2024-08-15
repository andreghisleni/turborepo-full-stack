'use client';

import { useAuth } from '@/hooks/auth';
import Link from 'next/link';
import { UserAvatarMenuItem } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Avatar } from '../avatar';

export function UserNav({
  USER_AVATAR_MENU_ITEMS,
}: {
  USER_AVATAR_MENU_ITEMS: UserAvatarMenuItem[];
}) {
  const { user, signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar
            className="flex h-12 w-12 items-center justify-center text-center"
            src={user?.avatarUrl || 'https://github.com/shadcn.png'}
            name={user?.name || 'Shad'}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name || `-`}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email || `-`}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem> */}

          {USER_AVATAR_MENU_ITEMS.map(item =>
            item.path ? (
              <DropdownMenuItem key={item.title} asChild>
                <Link href={item.path}>{item.title}</Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem key={item.title}>{item.title}</DropdownMenuItem>
            ),
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
