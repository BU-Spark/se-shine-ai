import './globals.css'
import type { Metadata } from 'next'
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'Shine AI',
  description: 'shine ai description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* used suppressHydrationWarning to stop chrome extension error... */}
      <body suppressHydrationWarning={true}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
