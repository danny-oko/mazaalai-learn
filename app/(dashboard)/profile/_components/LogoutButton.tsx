'use client'

import { useClerk } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'

export default function LogoutButton() {
  const { signOut } = useClerk()

  const handleLogout = async () => {
    await signOut({ redirectUrl: '/sign-in' })
  }

  return (
    <Button type="button" variant="outline" onClick={handleLogout}>
      Log out
    </Button>
  )
}
