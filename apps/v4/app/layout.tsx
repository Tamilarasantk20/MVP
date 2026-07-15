import type { Metadata } from "next"
import { Geist, Inter } from "next/font/google"

import "@/app/globals.css"

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" })
const fontHeading = Geist({ subsets: ["latin"], variable: "--font-heading" })

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your payment securely.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontHeading.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
