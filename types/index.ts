// Basic types without Prisma dependency for initial setup
export interface User {
  id: string
  name?: string
  email: string
  emailVerified?: Date
  image?: string
  role: 'ADMIN' | 'COMPANY' | 'APPLICANT'
  companyId?: string
  createdAt: Date
  updatedAt: Date
}

export interface UserProfile {
  id: string
  userId: string
  phone?: string
  location?: string
  bio?: string
  skills: string[]
  experience?: string
  education?: string
  resumeUrl?: string
  linkedinUrl?: string
  githubUrl?: string
  portfolioUrl?: string
  createdAt: Date
  updatedAt: Date
}

export interface Company {
  id: string
  name: string
  slug: string
  description?: string
  logo?: string
  website?: string
  location?: string
  industry?: string
  size?: string
  founded?: number
  verified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Job {
  id: string
  title: string
  slug: string
  description: string
  requirements?: string
  benefits?: string
  location: string
  remote: boolean
  salaryMin?: number
  salaryMax?: number
  currency: string
  jobType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'FREELANCE' | 'INTERNSHIP'
  experience: 'ENTRY_LEVEL' | 'MID_LEVEL' | 'SENIOR_LEVEL' | 'EXECUTIVE'
  status: 'DRAFT' | 'PUBLISHED' | 'CLOSED' | 'ARCHIVED'
  featured: boolean
  companyId: string
  categoryId?: string
  views: number
  expiresAt?: Date
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Application {
  id: string
  jobId: string
  userId: string
  resumeUrl?: string
  coverLetter?: string
  status: 'PENDING' | 'REVIEWING' | 'SHORTLISTED' | 'INTERVIEWED' | 'REJECTED' | 'ACCEPTED'
  notes?: string
  appliedAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  createdAt: Date
  updatedAt: Date
}

export type UserWithProfile = User & {
  profile?: UserProfile
}

export type UserWithCompany = User & {
  company?: Company
}

export type JobWithCompany = Job & {
  company: Company
  category?: Category
  _count?: {
    applications: number
  }
}

export type JobWithDetails = Job & {
  company: Company
  category?: Category
  applications: Application[]
}

export type ApplicationWithDetails = Application & {
  job: JobWithCompany
  user: UserWithProfile
}

export type CompanyWithStats = Company & {
  _count: {
    jobs: number
    users: number
  }
}

export interface JobFilters {
  search?: string
  location?: string
  jobType?: string[]
  experience?: string[]
  salaryMin?: number
  salaryMax?: number
  category?: string
  remote?: boolean
  featured?: boolean
}

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  error?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}