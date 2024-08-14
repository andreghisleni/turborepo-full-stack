'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inputCepMask } from '@/utils/inputMasks';
import { Row } from '@/components/Row';
import { Building } from './columns';

interface ShowBuildingAddressProps {
  building: Building;
}

const formSchema = z.object({
  address: z.object({
    state: z.string().min(1),
    city: z.string().min(1),
    neighborhood: z.string().min(1),
    street: z.string().min(1),
    cep: z.string().min(1),
    number: z.string().min(1),
    complement: z.string().optional(),
  }),
});

export function ShowBuildingAddress({ building }: ShowBuildingAddressProps) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: {
        state: building.address.state || '',
        city: building.address.city || '',
        neighborhood: building.address.neighborhood || '',
        street: building.address.street || '',
        cep: building.address.cep || '',
        number: building.address.number || '',
        complement: building.address.complement || '',
      },
    },
    values: {
      address: {
        state: building.address.state || '',
        city: building.address.city || '',
        neighborhood: building.address.neighborhood || '',
        street: building.address.street || '',
        cep: building.address.cep || '',
        number: building.address.number || '',
        complement: building.address.complement || '',
      },
    },
    disabled: true,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // eslint-disable-line no-console
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Ver Endereço</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Endereço: {building.name}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="address.cep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP (Busca os dados do endereço ao clicar tab)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="00000-000"
                      maxLength={9}
                      {...field}
                      value={inputCepMask(field.value ?? '')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rua</FormLabel>
                  <FormControl>
                    <Input placeholder="Rua" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input placeholder="Bairro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Row>
              <FormField
                control={form.control}
                name="address.state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UF</FormLabel>
                    <FormControl>
                      <Input placeholder="UF" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Cidade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Row>
            <Row>
              <FormField
                control={form.control}
                name="address.number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input placeholder="Número" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.complement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complemento</FormLabel>
                    <FormControl>
                      <Input placeholder="Complemento" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Row>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
