import { redirect } from 'next/navigation'

export default async function EntryPage() {
  redirect('/sign-in')
}
