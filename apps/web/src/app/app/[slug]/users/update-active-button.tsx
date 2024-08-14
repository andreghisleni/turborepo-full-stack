'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useActivateUserMutation } from '@/generated/graphql';

type IProps = {
  id: string;
  isActive: boolean;
  refetch: () => void;
};

export function UpdateActiveButton({ id, isActive, refetch }: IProps) {
  const { toast } = useToast();
  const [activateUserMutation, { loading }] = useActivateUserMutation({
    variables: {
      id,
    },
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

  const handleUpdateUserActive = () => {
    activateUserMutation();
  };

  return (
    <Button disabled={loading} onClick={handleUpdateUserActive}>
      {isActive ? 'Bloquear' : 'Liberar'}
    </Button>
  );
}
