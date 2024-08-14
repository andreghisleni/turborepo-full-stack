import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Unauthorized() {
  return (
    <div className="mx-auto my-auto flex max-w-md flex-col items-center rounded-lg bg-card p-8 shadow-md">
      <h1 className="mb-4 text-4xl font-bold text-destructive">401</h1>
      <h2 className="mb-4 text-2xl font-semibold">Não Autorizado</h2>
      <p className="mb-6 text-center text-muted-foreground">
        Você não tem permissão para acessar esta página.
      </p>
      <Button asChild>
        <Link href="/auth/sign-in">Voltar para a Página Inicial</Link>
      </Button>
    </div>
  );
}
