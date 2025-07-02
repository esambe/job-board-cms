import { type Prisma } from "@prisma/client"

export type UserWithProfile = Prisma.UserGetPayload<{
  include: {
    profile: true
    company: true
  }
}>

export type JobWithDetails = Prisma.JobGetPayload<{
  include: {
    company: true
    category: true
    applications: {
      include: {
        user: {
          include: {
            profile: true
          }
        }
      }
    }
    _count: {
      select: {
        applications: true
      }
    }
  }
}>

export type ApplicationWithDetails = Prisma.ApplicationGetPayload<{
  include: {
    job: {
      include: {
        company: true
        category: true
      }
    }
    user: {
      include: {
        profile: true
      }
    }
  }
}>

export type CompanyWithJobs = Prisma.CompanyGetPayload<{
  include: {
    jobs: {
      include: {
        category: true
        _count: {
          select: {
            applications: true
          }
        }
      }
    }
    users: true
    _count: {
      select: {
        jobs: true
        users: true
      }
    }
  }
}>

export interface JobFilters {
  search?: string
  location?: string
  jobType?: string[]
  experience?: string[]
  category?: string
  remote?: boolean
  salaryMin?: number
  salaryMax?: number
  company?: string
  page?: number
  limit?: number
  sortBy?: 'createdAt' | 'updatedAt' | 'views' | 'salary'
  sortOrder?: 'asc' | 'desc'
}

export interface CompanyFilters {
  search?: string
  location?: string
  industry?: string
  size?: string
  verified?: boolean
  page?: number
  limit?: number
}

export interface DashboardStats {
  totalJobs: number
  totalApplications: number
  totalCompanies: number
  totalUsers: number
  recentApplications: ApplicationWithDetails[]
  popularJobs: JobWithDetails[]
  topCompanies: CompanyWithJobs[]
}

export interface NotificationPreferences {
  emailNotifications: boolean
  pushNotifications: boolean
  jobAlerts: boolean
  applicationUpdates: boolean
  companyNews: boolean
}

export interface SearchSuggestion {
  type: 'job' | 'company' | 'location' | 'skill'
  value: string
  count?: number
}

export interface AnalyticsData {
  jobViews: Array<{ date: string; views: number }>
  applicationStats: Array<{ status: string; count: number }>
  popularCategories: Array<{ name: string; count: number }>
  salaryDistribution: Array<{ range: string; count: number }>
}