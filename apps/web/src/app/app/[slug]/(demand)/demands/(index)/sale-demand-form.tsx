'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import { z } from '@/utils/pt-zod';

import { useToast } from '@/components/ui/use-toast';

import { ptBR } from 'date-fns/locale';

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { useEffect, useState } from 'react';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { ProductInput } from '@/components/product-input';
import {
  GetSaleDemandsDocument,
  useCreateSaleDemandMutation,
  useUpdateSaleDemandMutation,
} from '@/generated/graphql';

export const formSaleDemandSchema = z.object({
  productId: z.string().min(1),
  note: z.string().nullable(),
  emittedAt: z.date(),
});

export type FormSaleDemand = z.infer<typeof formSaleDemandSchema>;

export function SaleDemandForm() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [createSaleDemand] = useCreateSaleDemandMutation({
    refetchQueries: [GetSaleDemandsDocument],
  });

  const [updateSaleDemand] = useUpdateSaleDemandMutation({
    refetchQueries: [GetSaleDemandsDocument],
  });

  const form = useForm<FormSaleDemand>({
    resolver: zodResolver(formSaleDemandSchema),
    defaultValues: {
      ...{
        productId: '',
        note: '',
        emittedAt: new Date(),
      },
      // ...saleItem,
    },
  });

  const saleItem = false;

  async function onSubmit(values: FormSaleDemand) {
    console.log(values); // eslint-disable-line no-console
    try {
      saleItem
        ? await updateSaleDemand({
            // variables: {
            //   input: {
            //     id: saleItem.id,
            //     type: "STORE",
            //   },
            // },
          })
        : await createSaleDemand({
            variables: {
              input: {
                productId: values.productId,
                note: values.note,
                emittedAt: values.emittedAt,
              },
            },
          });

      form.reset();
      setIsOpen(false);
      router.refresh();
      toast({
        title: saleItem
          ? 'Demanda de venda atualizada com sucesso'
          : 'Demanda de venda cadastrada com sucesso',
      });
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
      toast({
        title: saleItem ? 'Erro ao atualizar item da venda' : 'Erro ao cadastrar item da venda',

        variant: 'destructive',
      });
    }
  }

  useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen, form]);

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">{saleItem ? 'Editar' : 'Adicionar'}</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{saleItem ? 'Editar' : 'Cadastrar'} Demanda de venda</SheetTitle>
          <SheetDescription>
            {saleItem ? 'Editar' : 'Cadastrar novo'} Demanda de venda
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <ProductInput control={form.control} name="productId" />

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observação</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Observação"
                      className="w-full"
                      value={field.value || ''}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emittedAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cadastrado em</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP', {
                              locale: ptBR,
                            })
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        // disabled={(date) =>
                        //   date > new Date() || date < new Date("1900-01-01")
                        // }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : saleItem ? (
                'Atualizar'
              ) : (
                'Cadastrar'
              )}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
