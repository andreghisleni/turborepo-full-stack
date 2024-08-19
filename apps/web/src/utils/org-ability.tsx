import { Button } from '@/components/ui/button';
import { organization } from '@full-stack/authorization';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import Link from 'next/link';

type PolicyOrgHandlerCallback = (ability: organization.AppAbility) => boolean;

export function OrgAbilityCan(a: PolicyOrgHandlerCallback) {
  const memberRole = getCookie('member-role', { cookies });

  if (memberRole) {
    try {
      const ur = JSON.parse(memberRole);

      if (ur.id && ur.role) {
        const ability = organization.defineAbilityFor({
          id: ur.id,
          role: ur.role,
        });

        if (!a(ability)) {
          throw new Error('Usuário não autorizado');
        }
      }
    } catch {
      return (
        <div className="mx-auto my-auto flex max-w-md flex-col items-center rounded-lg bg-card p-8 shadow-md">
          <h1 className="mb-4 text-4xl font-bold text-destructive">401</h1>
          <h2 className="mb-4 text-2xl font-semibold">Não Autorizado</h2>
          <p className="mb-6 text-center text-muted-foreground">
            Você não tem permissão para acessar esta página.
          </p>
          <Button asChild>
            <Link href="/">Voltar para a Página Inicial</Link>
          </Button>
        </div>
      );
    }
  }
}
