import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Job Board CMS",
    template: "%s | Job Board CMS",
  },
  description: "A comprehensive content management system for job boards with advanced features for admins, companies, and job seekers.",
  keywords: ["jobs", "careers", "employment", "hiring", "recruitment"],
  authors: [{ name: "Job Board CMS Team" }],
  creator: "Job Board CMS",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Job Board CMS",
    description: "Find your dream job or hire the best talent with our advanced job board platform.",
    siteName: "Job Board CMS",
  },
  twitter: {
    card: "summary_large_image",
    title: "Job Board CMS",
    description: "Find your dream job or hire the best talent with our advanced job board platform.",
    creator: "@jobboardcms",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}