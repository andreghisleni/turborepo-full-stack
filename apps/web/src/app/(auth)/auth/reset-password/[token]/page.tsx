import { Metadata } from 'next';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Command } from 'lucide-react';
import { z } from 'zod';
import { unstable_noStore } from 'next/cache';
import { ResetPasswordForm } from './reset-password-form';

export const metadata: Metadata = {
  title: 'Redefinir senha',
};

const resetPasswordProps = z.object({
  params: z.object({
    token: z.string(),
  }),
});

type ResetPasswordProps = z.infer<typeof resetPasswordProps>;

export default function ResetPasswordPage(props: ResetPasswordProps) {
  unstable_noStore();

  const data = resetPasswordProps.safeParse(props);

  if (!data.success) {
    return <div>Invalid token</div>;
  }

  const { token } = data.data.params;

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Button className="absolute right-4 top-4 md:right-8 md:top-8" variant="ghost" asChild>
        <Link href="/">Entrar</Link>
      </Button>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Command className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">Redefinir senha</h1>
        </div>
        <ResetPasswordForm tokenId={token} />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href="/auth/sign-in" className="hover:text-brand underline underline-offset-4">
            Já tem uma conta? Entre
          </Link>
        </p>
      </div>
    </div>
  );
}
