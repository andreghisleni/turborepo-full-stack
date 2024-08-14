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
import { MySelect } from '@/components/my-select';
import {
  useGetAllBuildingsAndClientsToUpdateControllerQuery,
  useUpdateControllerMutation,
} from '@/generated/graphql';
import { Controller } from './columns';

interface ControllerFormDialogProps {
  refetch: () => void;
  controller?: Controller;
}

const formSchema = z.object({
  clientId: z.string().min(1),
  buildingId: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  block: z.string().optional(),
  floor: z.string().optional(),
  apartment: z.string().optional(),
});

export function ControllerFormDialog({ refetch, controller }: ControllerFormDialogProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      buildingId: controller?.building?.id ?? '',
      clientId: controller?.client?.id ?? '',
      name: controller?.name ?? '',
      description: controller?.description ?? '',
      block: controller?.block ?? '',
      floor: controller?.floor ?? '',
      apartment: controller?.apartment ?? '',
    },
  });

  const [updateController] = useUpdateControllerMutation({
    onCompleted: () => {
      refetch();
      form.reset();
      setIsOpen(false);
      toast({
        title: 'Controladora atualizado com sucesso',
      });
    },
    onError: error => {
      toast({
        title: 'Erro ao atualizar controladora',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const { data } = useGetAllBuildingsAndClientsToUpdateControllerQuery();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // eslint-disable-line no-console

    try {
      if (controller) {
        await updateController({
          variables: {
            input: {
              id: controller.id,
              ...values,
            },
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
        <Button variant="outline">{controller ? 'Editar' : 'Adicionar'}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{controller ? 'Editar controladora' : 'Cadastrar controladora'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="buildingId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prédio</FormLabel>
                  <FormControl>
                    <MySelect
                      {...field}
                      options={data?.buildings?.map(b => ({ value: b.id, label: b.name })) ?? []}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <FormControl>
                    <MySelect
                      {...field}
                      options={data?.clients?.map(c => ({ value: c.id, label: c.name })) ?? []}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Descrição" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="block"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bloco</FormLabel>
                  <FormControl>
                    <Input placeholder="Bloco" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="floor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Andar</FormLabel>
                  <FormControl>
                    <Input placeholder="Andar" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apartment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apartamento</FormLabel>
                  <FormControl>
                    <Input placeholder="Apartamento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : controller ? (
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
