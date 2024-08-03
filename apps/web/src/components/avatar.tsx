'use client';

import React, { useState } from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { getNameInitials } from '@/utils/getNameInitials';

export const Avatar = ({
  name,
  src,
  className,
}: {
  name: string;
  src: string;
  className?: string;
}) => {
  const [status, setStatus] = useState('loading');

  return (
    <AvatarPrimitive.Root
      className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
    >
      {status !== 'error' && (
        <Image
          src={src}
          alt={name}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          width={40}
          height={40}
          className={cn('h-full w-full object-cover')}
        />
      )}
      {['loading', 'error'].includes(status) && (
        <AvatarPrimitive.Fallback
          className={cn('flex h-full w-full items-center justify-center rounded-full bg-muted')}
        >
          {getNameInitials(name)}
        </AvatarPrimitive.Fallback>
      )}
    </AvatarPrimitive.Root>
  );
};
