import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./client-layout"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Inter Leges - Diritto e Innovazione",
  description:
    "La rivista giuridica online per giovani giuristi. Articoli di qualità accademica su diritto civile, penale, amministrativo e costituzionale.",
  keywords: "diritto, giurisprudenza, rivista giuridica, articoli legali, diritto civile, diritto penale",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.jpg", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.jpg", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.jpg", sizes: "180x180", type: "image/png" }],
    other: [
      { url: "/android-chrome-192x192.jpg", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.jpg", sizes: "512x512", type: "image/png" },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it">
      <body className={`font-sans ${playfair.variable} ${inter.variable}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
