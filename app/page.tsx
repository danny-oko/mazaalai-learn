import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

import { Button } from '@/components/ui/button'

export default async function EntryPage() {
  const { userId } = await auth()

  if (userId) {
    redirect('/home')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F4EFE8] px-6">
      <div className="w-full max-w-md space-y-4 rounded-xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Welcome to Mazaalai Learn</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to continue your lessons, or create a new account to get started.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild className="sm:flex-1">
            <Link href="/sign-in">Log in</Link>
          </Button>
          <Button asChild variant="outline" className="sm:flex-1">
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
