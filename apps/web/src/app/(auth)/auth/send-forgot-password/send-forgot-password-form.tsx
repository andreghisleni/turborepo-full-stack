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
import { useSendForgotPasswordEmailMutation } from '@/generated/graphql';

const sendForgotPasswordFormSchema = z.object({
  email: z.string().email(),
});

type SendForgotPasswordFormSchema = z.infer<typeof sendForgotPasswordFormSchema>;

export function SendForgotPasswordForm() {
  const { toast } = useToast();
  const router = useRouter();

  const [sendForgotPasswordEmail] = useSendForgotPasswordEmailMutation({
    onError: error => {
      toast({
        title: 'Erro ao enviar email',
        description: error.message,
        variant: 'destructive',
      });
    },
    onCompleted: () => {
      toast({
        title: 'Email enviado com sucesso',
        description: 'Verifique sua caixa de entrada',
      });
      router.replace('/auth/sign-in');
    },
  });

  const form = useForm<SendForgotPasswordFormSchema>({
    resolver: zodResolver(sendForgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });

  async function handleRegister(data: SendForgotPasswordFormSchema) {
    await sendForgotPasswordEmail({
      variables: {
        email: data.email,
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input placeholder="Seu email" {...field} />
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
          Recuperar senha
        </Button>
      </form>
    </Form>
  );
}
