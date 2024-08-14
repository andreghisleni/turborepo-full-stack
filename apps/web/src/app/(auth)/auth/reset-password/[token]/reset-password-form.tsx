'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useResetPasswordMutation } from '@/generated/graphql';

const resetPasswordFormSchema = z
  .object({
    password: z.string().min(1, { message: 'Use 123456' }),
    password_confirmation: z.string().min(1, { message: 'Use 123456' }),
  })
  .refine(data => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
  });

type ResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>;

export function ResetPasswordForm({ tokenId }: { tokenId: string }) {
  const { toast } = useToast();
  const router = useRouter();

  const [resetPassword] = useResetPasswordMutation({
    onError: error => {
      toast({
        title: 'Erro ao redefinir senha',
        description: error.message,
        variant: 'destructive',
      });
    },
    onCompleted: () => {
      toast({
        title: 'Senha redefinida com sucesso',
      });
      router.push('/');
    },
  });

  const form = useForm<ResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: '',
      password_confirmation: '',
    },
  });

  async function handleRegister(data: ResetPasswordFormSchema) {
    await resetPassword({
      variables: {
        input: {
          password: data.password,
          tokenId,
        },
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <Input type="password" placeholder="Sua senha" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme sua senha</FormLabel>
                <Input type="password" placeholder="Confirme sua senha" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LogIn className="mr-2 h-4 w-4" />
          )}
          Redefinir senha
        </Button>
      </form>
    </Form>
  );
}
