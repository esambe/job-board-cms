import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount)
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}

export function formatRelativeTime(date: Date | string) {
  const now = new Date()
  const target = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000)

  if (diffInSeconds < 60) return "just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`
  return `${Math.floor(diffInSeconds / 31536000)}y ago`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export function generateSlug(title: string, id?: string): string {
  const baseSlug = slugify(title)
  return id ? `${baseSlug}-${id.slice(-8)}` : baseSlug
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + "..."
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export function formatJobType(jobType: string): string {
  return jobType.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
}

export function getJobTypeColor(jobType: string): string {
  const colors: Record<string, string> = {
    FULL_TIME: "bg-green-100 text-green-800",
    PART_TIME: "bg-blue-100 text-blue-800",
    CONTRACT: "bg-purple-100 text-purple-800",
    FREELANCE: "bg-orange-100 text-orange-800",
    INTERNSHIP: "bg-yellow-100 text-yellow-800",
  }
  return colors[jobType] || "bg-gray-100 text-gray-800"
}

export function getApplicationStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    REVIEWING: "bg-blue-100 text-blue-800",
    SHORTLISTED: "bg-purple-100 text-purple-800",
    INTERVIEWED: "bg-indigo-100 text-indigo-800",
    REJECTED: "bg-red-100 text-red-800",
    ACCEPTED: "bg-green-100 text-green-800",
  }
  return colors[status] || "bg-gray-100 text-gray-800"
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function getImagePlaceholder(text: string, size: number = 40): string {
  const initials = getInitials(text)
  return `https://via.placeholder.com/${size}x${size}/3B82F6/FFFFFF?text=${initials}`
}