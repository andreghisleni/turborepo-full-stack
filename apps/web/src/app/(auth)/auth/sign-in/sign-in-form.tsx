'use client';

import { signIn } from '@/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: 'Use 123456' }),
});

type SignInFormSchema = z.infer<typeof signInFormSchema>;

export function SignInForm() {
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function handleSignIn(data: SignInFormSchema) {
    const { email, password } = data;

    const response = await signIn({
      email,
      password,
    });

    if (response?.errors) {
      toast({
        title: 'Erro na autenticação',
        description: response.errors,
        variant: 'destructive',
      });
    }

    if (response?.errors === null) {
      toast({
        title: 'Bem-vindo!',
        description: 'Você foi autenticado com sucesso.',
      });
      router.push('/');
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="email" {...register('email')} placeholder="example@example.com" />
        {errors.email && (
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register('password')} placeholder="Senha" />
        {errors.password && (
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <LogIn className="mr-2 h-4 w-4" />
        )}
        Entrar
      </Button>
    </form>
  );
}
