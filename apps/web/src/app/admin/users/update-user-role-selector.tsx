'use client';

import { MySelect } from '@/components/my-select';
import { useToast } from '@/components/ui/use-toast';
import { UpdateRoleInput_RoleEnum_0, useUpdateRoleMutation } from '@/generated/graphql';

type IProps = {
  id: string;
  role: 'ADMIN' | 'DEFAULT';
  refetch: () => void;
};

enum ValuesEnum {
  ADMIN = 'Admin',
  DEFAULT = 'Default',
}

export function UpdateUserRoleSelector({ id, role, refetch }: IProps) {
  const { toast } = useToast();
  const [updateRoleMutation, { loading }] = useUpdateRoleMutation({
    onCompleted: () => {
      toast({
        title: 'Sucesso',
        description: 'Usuário atualizado com sucesso',
      });
      refetch();
    },
    onError: error => {
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  async function handleUpdateUserActive(t: 'ADMIN' | 'DEFAULT') {
    await updateRoleMutation({
      variables: {
        input: {
          userId: id,
          role: UpdateRoleInput_RoleEnum_0[ValuesEnum[t]],
        },
      },
    });
  }

  return (
    <MySelect
      value={role}
      onChange={value => handleUpdateUserActive(value as 'ADMIN' | 'DEFAULT')}
      options={[
        { value: 'ADMIN', label: 'Admin' },
        { value: 'DEFAULT', label: 'Default' },
      ]}
      disabled={loading}
      className="w-40"
    />
  );
}
