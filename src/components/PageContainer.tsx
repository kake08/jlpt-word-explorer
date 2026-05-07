import type { ReactNode } from 'react'

type PageContainerProps = {
  children: ReactNode
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
      {children}
    </main>
  )
}
