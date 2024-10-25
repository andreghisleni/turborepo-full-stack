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

import { ptBR } from 'date-fns/locale';

import { CalendarIcon } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { ProductInput } from '@/components/product-input';
import { Row } from '@/components/Row';
import { Input } from '@/components/ui/input';
import { SaleDemand } from './columns';

export const formSaleDemandSchema = z.object({
  productId: z.string().min(1),
  note: z.string().nullable(),
  emittedAt: z.date(),
  quantity: z.number().int().positive(),
});

export type FormSaleDemand = z.infer<typeof formSaleDemandSchema>;

export function SaleDemandView({ saleDemand }: { saleDemand: SaleDemand }) {
  const form = useForm<FormSaleDemand>({
    resolver: zodResolver(formSaleDemandSchema),
    defaultValues: {
      productId: saleDemand.product.id,
      note: saleDemand.note,
      emittedAt: new Date(saleDemand.emittedAt),
      quantity: saleDemand.product.inventoryItems.reduce((acc, item) => acc + item.quantity, 0),
    },
    disabled: true,
  });

  async function onSubmit(values: FormSaleDemand) {
    console.log(values); // eslint-disable-line no-console
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Row>
          <ProductInput
            control={form.control}
            name="productId"
            product={saleDemand.product as unknown as any}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Row>

        <Row>
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
                    disabled={field.disabled}
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
                        disabled={field.disabled}
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
        </Row>
      </form>
    </Form>
  );
}
