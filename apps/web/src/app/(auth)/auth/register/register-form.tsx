'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { gql, useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';

const registerFormSchema = z
  .object({
    name: z.string().min(1, { message: 'Use John Doe' }),
    email: z.string().email(),
    password: z.string().min(1, { message: 'Use 123456' }),
    password_confirmation: z.string().min(1, { message: 'Use 123456' }),
  })
  .refine(data => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
  });

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`;

export function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();

  const [createUser] = useMutation(CREATE_USER, {
    onError: error => {
      toast({
        title: 'Erro na autenticação',
        description: error.message,
        variant: 'destructive',
      });
    },
    onCompleted: () => {
      toast({
        title: 'Bem-vindo!',
        description: 'Você foi autenticado com sucesso.',
      });
      router.push('/');
    },
  });

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  });

  async function handleRegister(data: RegisterFormSchema) {
    await createUser({
      variables: {
        input: {
          name: data.name,
          email: data.email,
          password: data.password,
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <Input placeholder="Seu nome" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
          Cadastrar
        </Button>
      </form>
    </Form>
  );
}
