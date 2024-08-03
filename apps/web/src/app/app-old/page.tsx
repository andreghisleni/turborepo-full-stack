// import { auth } from '@full-stack/auth'
import { auth } from '@full-stack/auth'
import { redirect } from 'next/navigation'

export default async function Homepage() {
  const session = await auth()

  if (session) {
    if (session.user.type === 'ADMIN') {
      redirect(`/app/dashboard`)
    }
    if (session.user.type === 'DEFAULT') {
      redirect(`/app/scout-group`)
    }
  }

  redirect('/')
}
