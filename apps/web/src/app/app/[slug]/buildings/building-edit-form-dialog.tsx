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
import { useUpdateBuildingMutation } from '@/generated/graphql';
import { Building } from './columns';

interface BuildingFormDialogProps {
  refetch: () => void;
  building: Building;
}

const formSchema = z.object({
  name: z.string().min(1),
});

export function EditBuildingFormDialog({ refetch, building }: BuildingFormDialogProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: building.name || '',
    },
  });

  const [updateBuilding] = useUpdateBuildingMutation({
    onCompleted: () => {
      refetch();
      form.reset();
      setIsOpen(false);
      toast({
        title: 'Edifício editado com sucesso',
      });
    },
    onError: error => {
      toast({
        title: 'Erro ao editar edifício',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // eslint-disable-line no-console

    try {
      await updateBuilding({
        variables: {
          input: {
            name: values.name,
            id: building.id,
          },
        },
      });
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Editar</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar edifício</DialogTitle>
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

            <Button type="submit" className="w-full">
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Editar'
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
