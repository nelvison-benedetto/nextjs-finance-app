import AppHeader from '@/shared/components/layout/AppHeader'
import type { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppHeader className="my-8" />
      <main>{children}</main>
      <footer className="mt-auto py-8 text-center">
        Footer
      </footer>
    </>
  )
}
