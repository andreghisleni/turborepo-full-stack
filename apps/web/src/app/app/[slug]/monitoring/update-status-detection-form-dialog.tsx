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
import { Loader2, Lock, Unlock } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useGetAllBuildingsAndClientsToUpdateControllerQuery,
  useUpdateStatusDetectionMutation,
} from '@/generated/graphql';
import { Textarea } from '@/components/ui/textarea';
import { Controller } from './columns';

interface UpdateStatusDetectionFormDialogProps {
  refetch: () => void;
  controller: Controller;
}

const formSchema = z.object({
  message: z.string().min(1),
});

export function UpdateStatusDetectionFormDialog({
  refetch,
  controller,
}: UpdateStatusDetectionFormDialogProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  const [updateStatusDetection] = useUpdateStatusDetectionMutation({
    onCompleted: () => {
      refetch();
      form.reset();
      setIsOpen(false);
      toast({
        title: 'Status da controladora atualizado com sucesso',
      });
    },
    onError: error => {
      toast({
        title: 'Erro ao atualizar status da controladora',
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
        await updateStatusDetection({
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
        <Button variant="outline">
          {controller.statusDetection === 0 ? <Unlock /> : <Lock />}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {' '}
            {controller.statusDetection === 0
              ? 'Bloquear controladora'
              : 'Desbloquear controladora'}{' '}
            {controller.name}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Motivo do {controller.statusDetection === 0 ? 'Bloqueio' : 'Desbloqueio'}
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Motivo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : controller.statusDetection === 0 ? (
                'Bloquear'
              ) : (
                'Desbloquear'
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
