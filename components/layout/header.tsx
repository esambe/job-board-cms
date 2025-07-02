"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, Menu, Briefcase, Building2 } from "lucide-react"

interface HeaderProps {
  variant?: "public" | "admin" | "company" | "applicant"
}

export function Header({ variant = "public" }: HeaderProps) {
  const getNavItems = () => {
    switch (variant) {
      case "admin":
        return [
          { href: "/admin/dashboard", label: "Dashboard" },
          { href: "/admin/jobs", label: "Jobs" },
          { href: "/admin/companies", label: "Companies" },
          { href: "/admin/users", label: "Users" },
          { href: "/admin/applications", label: "Applications" },
        ]
      case "company":
        return [
          { href: "/company/dashboard", label: "Dashboard" },
          { href: "/company/jobs", label: "My Jobs" },
          { href: "/company/applications", label: "Applications" },
          { href: "/company/profile", label: "Company Profile" },
        ]
      case "applicant":
        return [
          { href: "/dashboard", label: "Dashboard" },
          { href: "/dashboard/applications", label: "My Applications" },
          { href: "/dashboard/saved-jobs", label: "Saved Jobs" },
          { href: "/dashboard/profile", label: "Profile" },
        ]
      default:
        return [
          { href: "/jobs", label: "Jobs" },
          { href: "/companies", label: "Companies" },
          { href: "/about", label: "About" },
          { href: "/contact", label: "Contact" },
        ]
    }
  }

  const getTitle = () => {
    switch (variant) {
      case "admin":
        return "Admin Panel"
      case "company":
        return "Company Portal"
      case "applicant":
        return "Job Dashboard"
      default:
        return "Job Board CMS"
    }
  }

  const getIcon = () => {
    switch (variant) {
      case "admin":
        return <User className="h-6 w-6" />
      case "company":
        return <Building2 className="h-6 w-6" />
      case "applicant":
        return <Briefcase className="h-6 w-6" />
      default:
        return <Briefcase className="h-6 w-6" />
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href={variant === "public" ? "/" : `/${variant}/dashboard`} className="mr-6 flex items-center space-x-2">
            {getIcon()}
            <span className="hidden font-bold sm:inline-block">
              {getTitle()}
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {getNavItems().map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <Button variant="outline" size="icon" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search component would go here */}
          </div>
          <nav className="flex items-center">
            {variant === "public" ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User Menu</span>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}