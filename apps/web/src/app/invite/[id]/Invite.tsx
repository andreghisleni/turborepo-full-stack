'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useAcceptInviteMutation, useGetMyInviteQuery } from '@/generated/graphql';
import { useAuth } from '@/hooks/auth';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export function Invite({ id }: { id: string }) {
  const { toast } = useToast();
  const { data, loading, error, refetch } = useGetMyInviteQuery({ variables: { id } });
  const { user } = useAuth();
  const [acceptInvite] = useAcceptInviteMutation({
    variables: { id },
    onCompleted: () => {
      toast({
        title: 'Convite aceito',
        description: 'Você agora é um membro da organização',
      });
      refetch();
    },
    onError: () => {
      toast({
        title: 'Erro ao aceitar convite',
        description: 'Não foi possível aceitar o convite, tente novamente mais tarde',
      });
    },
  });
  const [rejectInvite] = useAcceptInviteMutation({
    variables: { id },
    onCompleted: () => {
      toast({
        title: 'Convite rejeitado',
        description: 'Você recusou o convite para participar da organização',
      });
      refetch();
    },
    onError: () => {
      toast({
        title: 'Erro ao rejeitar convite',
        description: 'Não foi possível rejeitar o convite, tente novamente mais tarde',
      });
    },
  });

  if (loading) {
    return <Loader2 className="h-48 w-48 animate-spin" />;
  }

  if (error) {
    return (
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-center">Erro ao carregar</CardTitle>
        </CardHeader>

        <CardContent className="flex gap-8">
          Não identificamos o seu convite, provavelmente o convite foi feito com outro email.
        </CardContent>
      </Card>
    );
  }

  if (data?.invite.acceptedAt) {
    return (
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-center">Convite já aceito</CardTitle>
          <CardDescription className="text-center">
            Você já aceitou o convite para participar da organização{' '}
            {data?.invite.organization.name}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button asChild>
            <Link href={`/api/auth/organization/${data.invite.organization.slug}`}>
              Acessar plataforma
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (data?.invite.rejectedAt) {
    return (
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-center">Convite rejeitado</CardTitle>
        </CardHeader>

        <CardContent className="flex gap-8">
          Você recusou o convite para participar da organização {data?.invite.organization.name}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-center">Olá {user?.name}</CardTitle>
        <CardDescription className="text-center">
          Você foi convidado para participar da organização {data?.invite.organization.name} pelo
          usuário {data?.invite.author?.name}, gostaria de aceitar o convite para colaborar?
        </CardDescription>
      </CardHeader>

      <CardContent className="flex gap-8">
        <Button className="w-full" onClick={() => acceptInvite()}>
          Aceitar
        </Button>
        <Button className="w-full" variant="destructive" onClick={() => rejectInvite()}>
          Rejeitar
        </Button>
      </CardContent>
    </Card>
  );
}
