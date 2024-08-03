import { ArrowLeft } from 'lucide-react'
import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'
import Link from 'next/link'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { SubmitForm } from './submit-form'

export const metadata: Metadata = {
  title: 'Cadastrar Grupo escoteiro',
}

export default async function SubmitPage() {
  unstable_noStore()

  return (
    <div className="flex w-full justify-center">
      <Card className="w-full max-w-[500px]">
        <CardHeader className="space-y-4">
          <Link href="/app/scout-group" className="flex gap-4">
            <ArrowLeft /> Voltar
          </Link>
          <CardTitle>Cadastrar grupo escoteiro</CardTitle>
        </CardHeader>
        <CardContent>
          <SubmitForm />
        </CardContent>
      </Card>
    </div>
  )
}
