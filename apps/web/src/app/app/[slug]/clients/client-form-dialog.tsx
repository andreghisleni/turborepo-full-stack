'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useCreateClientMutation,
  useGetAllBuildingsToCreateClientQuery,
  useUpdateClientMutation,
} from '@/generated/graphql';
import { MySelect } from '@/components/my-select';
import { inputDocumentMask, inputPhoneMask } from '@/utils/inputMasks';
import { Client } from './columns';

interface ClientFormDialogProps {
  refetch: () => void;
  client?: Client;
}

const formSchema = z.object({
  name: z.string().min(1),
  document: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  buildingId: z.string().min(1),
});

export function ClientFormDialog({ refetch, client }: ClientFormDialogProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: client?.name ?? '',
      document: client?.document ?? '',
      phone: client?.phone ?? '',
      email: client?.email ?? '',
      buildingId: client?.building.id ?? '',
    },
  });

  const [createClient] = useCreateClientMutation({
    onCompleted: () => {
      refetch();
      form.reset();
      setIsOpen(false);
      toast({
        title: 'Cliente cadastrado com sucesso',
      });
    },
    onError: error => {
      toast({
        title: 'Erro ao cadastrar cliente',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const [updateClient] = useUpdateClientMutation({
    onCompleted: () => {
      refetch();
      form.reset();
      setIsOpen(false);
      toast({
        title: 'Cliente atualizado com sucesso',
      });
    },
    onError: error => {
      toast({
        title: 'Erro ao atualizar cliente',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const { data: buildingData } = useGetAllBuildingsToCreateClientQuery();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // eslint-disable-line no-console

    try {
      if (client) {
        await updateClient({
          variables: {
            input: {
              id: client.id,
              ...values,
            },
          },
        });
      } else {
        await createClient({
          variables: {
            input: values,
          },
        });
      }
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{client ? 'Editar' : 'Adicionar'}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{client ? 'Editar cliente' : 'Cadastrar cliente'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="document"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Documento</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Documento"
                      {...field}
                      value={inputDocumentMask(field.value || '')}
                      maxLength={18}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Telefone"
                      {...field}
                      value={inputPhoneMask(field.value || '')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="buildingId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prédio</FormLabel>
                  <FormControl>
                    <MySelect
                      {...field}
                      options={
                        buildingData?.buildings.map(b => ({ value: b.id, label: b.name })) ?? []
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : client ? (
                'Salvar'
              ) : (
                'Cadastrar'
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
