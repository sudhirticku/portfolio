import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Nav from '@/components/Nav'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sudhir — AI Workflows for Recruitment',
  description:
    '7+ years in talent acquisition — now building AI-powered workflows that take the busywork out of hiring.',
  openGraph: {
    title: 'Sudhir — AI Workflows for Recruitment',
    description:
      '7+ years in talent acquisition — now building AI-powered workflows that take the busywork out of hiring.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        <Nav />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  )
}
