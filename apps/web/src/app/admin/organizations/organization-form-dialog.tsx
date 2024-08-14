'use organization';

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
  useCreateOrganizationMutation,
  useGetAllUsersToOrganizationsQuery,
} from '@/generated/graphql';
import { MySelect } from '@/components/my-select';
import { removeCharacters } from '@/utils/remove-characters';
import { Organization } from './columns';

interface OrganizationFormDialogProps {
  refetch: () => void;
  organization?: Organization;
}

const formSchema = z.object({
  name: z.string().min(1),
  ownerId: z.string(),
  shouldAttachUsersByDomain: z.coerce.boolean(),
  slug: z.string(),
  domain: z.string(),
});

export function OrganizationFormDialog({ refetch, organization }: OrganizationFormDialogProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: organization?.name ?? '',
      ownerId: organization?.owner.id ?? '',
      shouldAttachUsersByDomain: organization?.shouldAttachUsersByDomain ?? false,
      slug: organization?.slug ?? '',
      domain: organization?.domain ?? '',
    },
  });

  const [createOrganization] = useCreateOrganizationMutation({
    onCompleted: () => {
      refetch();
      form.reset();
      setIsOpen(false);
      toast({
        title: 'Organização cadastrada com sucesso',
      });
    },
    onError: error => {
      toast({
        title: 'Erro ao cadastrar organização',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // const [updateOrganization] = useUpdateOrganizationMutation({
  //   onCompleted: () => {
  //     refetch();
  //     form.reset();
  //     setIsOpen(false);
  //     toast({
  //       title: 'Organização atualizada com sucesso',
  //     });
  //   },
  //   onError: error => {
  //     toast({
  //       title: 'Erro ao atualizar organização',
  //       description: error.message,
  //       variant: 'destructive',
  //     });
  //   },
  // });

  const { data: users } = useGetAllUsersToOrganizationsQuery();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // eslint-disable-line no-console

    try {
      if (organization) {
        // await updateOrganization({
        //   variables: {
        //     input: {
        //       id: organization.id,
        //       ...values,
        //     },
        //   },
        // });
      } else {
        await createOrganization({
          variables: {
            input: values,
          },
        });
      }
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
    }
  }

  form.watch('name') && form.setValue('slug', removeCharacters(form.watch('name')));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{organization ? 'Editar' : 'Adicionar'}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{organization ? 'Editar Organização' : 'Cadastrar Organização'}</DialogTitle>
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
              name="ownerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dono</FormLabel>
                  <FormControl>
                    <MySelect
                      {...field}
                      options={
                        users?.users.map(user => ({
                          label: user.name,
                          value: user.id,
                        })) ?? []
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shouldAttachUsersByDomain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vincular usuários por domínio</FormLabel>
                  <FormControl>
                    <Input type="checkbox" {...field} value={field.value ? 'true' : 'false'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug (url)</FormLabel>
                  <FormControl>
                    <Input placeholder="Slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domínio</FormLabel>
                  <FormControl>
                    <Input placeholder="Domínio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : organization ? (
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
