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

import { CalendarIcon, Loader2 } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Row } from '@/components/Row';
import { Input } from '@/components/ui/input';
import { MySelect } from '@/components/my-select';
import { useToast } from '@/components/ui/use-toast';
import {
  GetSaleDemandDocument,
  GetSaleDemandsDocument,
  useCreateSaleDemandItemMutation,
  useGetClientsAndSellersQuery,
} from '@/generated/graphql';
import { SaleDemand } from './columns';

export const formSaleDemandSchema = z.object({
  // productId: z.string().min(1),
  sellerId: z.string().min(1),
  price: z.coerce.number().positive(),
  quantity: z.coerce.number().positive(),
  addedAt: z.date(),
  saleId: z.string().min(1),
  clientId: z.string().min(1),
});

export type FormSaleDemand = z.infer<typeof formSaleDemandSchema>;

export function SaleDemandForm({ saleDemand }: { saleDemand: SaleDemand }) {
  const { toast } = useToast();
  const form = useForm<FormSaleDemand>({
    resolver: zodResolver(formSaleDemandSchema),
    defaultValues: {
      sellerId: '',
      price: 0.0,
      quantity: 0,
      addedAt: new Date(),
      saleId: '',
      clientId: '',
    },
  });

  const { data } = useGetClientsAndSellersQuery();

  const clients = data?.clients || [];
  const sellers = data?.sellers || [];

  const [createSaleItem] = useCreateSaleDemandItemMutation({
    refetchQueries: [GetSaleDemandDocument, GetSaleDemandsDocument],
    onCompleted: () => {
      toast({ title: 'Item adicionado com sucesso' });
      form.reset();
    },
    onError: error => {
      toast({
        title: 'Erro ao adicionar item',
        variant: 'destructive',
        description: error.message,
      });
      console.error(error); // eslint-disable-line no-console
    },
  });

  async function onSubmit(values: FormSaleDemand) {
    console.log(values); // eslint-disable-line no-console

    await createSaleItem({
      variables: {
        input: {
          saleId: values.saleId,
          productId: saleDemand.product.id,
          sellerId: values.sellerId,
          price: values.price,
          quantity: values.quantity,
          addedAt: values.addedAt,
          saleDemandId: saleDemand.id,
        },
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <input type="hidden" {...form.register('saleId')} />
        <Row className="items-end">
          <FormField
            control={form.control}
            name="addedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data</FormLabel>
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
                        {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={date => date > new Date() || date < new Date('1900-01-01')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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
                    value={field.value}
                    onChange={d => {
                      form.setValue('saleId', clients.find(c => c.id === d)?.sales[0]?.id ?? '');

                      field.onChange(d);
                    }}
                    options={
                      clients?.map(client => ({
                        value: client.id,
                        label: client.name.concat(' - ').concat(client.cpf),
                      })) ?? []
                    }
                    disabled={field.disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sellerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vendedor</FormLabel>
                <FormControl>
                  <MySelect
                    value={field.value}
                    onChange={field.onChange}
                    options={sellers.map(seller => ({
                      label: seller.user.name,
                      value: seller.id,
                    }))}
                    disabled={field.disabled}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {form.formState.isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Cadastrar'
            )}
          </Button>
        </Row>

        {/* <Row>
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
                    value={field.value || ""}
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
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                        disabled={field.disabled}
                      >
                        {field.value ? (
                          format(field.value, "PPP", {
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
        </Row> */}
      </form>
    </Form>
  );
}
