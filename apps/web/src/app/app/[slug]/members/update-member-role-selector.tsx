'use client';

import { MySelect } from '@/components/my-select';
import { useToast } from '@/components/ui/use-toast';
import { UpdateMemberRoleInput_RoleEnum_0, useUpdateMemberRoleMutation } from '@/generated/graphql';
import { organization } from '@full-stack/authorization';

type IProps = {
  id: string;
  role: organization.Role;
  refetch: () => void;
};

export function UpdateMemberRoleSelector({ id, role, refetch }: IProps) {
  const { toast } = useToast();
  const [updateMemberRoleMutation, { loading }] = useUpdateMemberRoleMutation({
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

  async function handleUpdateMemberActive(t: organization.Role) {
    await updateMemberRoleMutation({
      variables: {
        input: {
          memberId: id,
          role: t as UpdateMemberRoleInput_RoleEnum_0,
        },
      },
    });
  }

  return (
    <MySelect
      value={role}
      onChange={value => handleUpdateMemberActive(value as organization.Role)}
      options={[
        { label: 'Admin', value: 'ADMIN' },
        { label: 'Member', value: 'MEMBER' },
        { label: 'Billing', value: 'BILLING' },
      ]}
      disabled={loading}
      className="w-40"
    />
  );
}
