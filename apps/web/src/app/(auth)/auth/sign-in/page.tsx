import { Metadata } from 'next';

import Link from 'next/link';
import { Command } from 'lucide-react';
import { SignInForm } from './sign-in-form';
import { z } from 'zod';

export const metadata: Metadata = {
  title: 'Sign In',
};
const propsSchema = z.object({
  searchParams: z.object({
    callback: z.string().optional(),
  }),
});

export default async function SignInPage(props: z.infer<typeof propsSchema>) {
  const propsSchemaResult = await propsSchema.safeParseAsync(props);

  if (!propsSchemaResult.success) {
    throw new Error('Invalid props');
  }

  const { callback } = propsSchemaResult.data.searchParams;

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Command className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">Bem vindo de volta</h1>
          <p className="text-sm text-muted-foreground">
            Digite seu email e senha para entrar na sua conta
          </p>
        </div>
        <SignInForm callback={callback} />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href="/auth/register" className="hover:text-brand underline underline-offset-4">
            Não tem uma conta? Cadastre-se
          </Link>
        </p>
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/auth/send-forgot-password"
            className="hover:text-brand underline underline-offset-4"
          >
            Esqueceu a senha? Recupere a sua senha
          </Link>
        </p>
      </div>
    </div>
  );
}
