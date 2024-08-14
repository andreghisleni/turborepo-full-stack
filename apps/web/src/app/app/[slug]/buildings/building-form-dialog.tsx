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
import { getCEP } from '@/utils/brasil-api';
import { inputCepMask } from '@/utils/inputMasks';
import { useCreateBuildingMutation } from '@/generated/graphql';
import { Row } from '@/components/Row';

interface BuildingFormDialogProps {
  refetch: () => void;
}

const formSchema = z.object({
  name: z.string().min(1),

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

export function BuildingFormDialog({ refetch }: BuildingFormDialogProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: {
        state: '',
        city: '',
        neighborhood: '',
        street: '',
        cep: '',
        number: '',
        complement: '',
      },
    },
  });

  const handleCepChange = (cep: string) => {
    if (cep.length !== 9) {
      form.setError('address.cep', {
        type: 'manual',
        message: 'Termine de digitar e aperte tab',
      });
    } else {
      form.clearErrors('address.cep');
    }
  };

  const handleCepUpdate = async (cep: string) => {
    const noMask = cep.replace(/\D/g, '');

    if (noMask.length !== 8) {
      return;
    }

    form.setValue('address.street', '...');
    form.setValue('address.neighborhood', '...');
    form.setValue('address.city', '...');
    form.setValue('address.state', '...');

    const data = await getCEP(cep);
    if (data) {
      form.setValue('address.street', data.street);
      form.setValue('address.neighborhood', data.neighborhood);
      form.setValue('address.city', data.city);
      form.setValue('address.state', data.state);
    } else {
      form.setValue('address.street', 'CEP não encontrado');

      form.setValue('address.neighborhood', '');
      form.setValue('address.city', '');
      form.setValue('address.state', '');
    }
  };

  const [createBuilding] = useCreateBuildingMutation({
    onCompleted: () => {
      refetch();
      form.reset();
      setIsOpen(false);
      toast({
        title: 'Edifício cadastrado com sucesso',
      });
    },
    onError: error => {
      toast({
        title: 'Erro ao cadastrar edifício',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // eslint-disable-line no-console

    try {
      await createBuilding({
        variables: {
          input: {
            name: values.name,
            address: {
              state: values.address.state,
              city: values.address.city,
              neighborhood: values.address.neighborhood,
              street: values.address.street,
              cep: values.address.cep,
              number: values.address.number,
              complement: values.address.complement,
            },
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
        <Button variant="outline">Adicionar</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Cadastrar edifício</DialogTitle>
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
                      onBlurCapture={e => handleCepUpdate(e.target.value)}
                      onChange={e => {
                        handleCepChange(e.target.value);
                        field.onChange(e);
                      }}
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
                    <Input placeholder="Rua" {...field} disabled />
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
                    <Input placeholder="Bairro" {...field} disabled />
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
                      <Input placeholder="UF" {...field} disabled />
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
                      <Input placeholder="Cidade" {...field} disabled />
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

            <Button type="submit" className="w-full">
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
