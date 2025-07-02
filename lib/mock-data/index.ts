// Export all mock data
export * from './users'
export * from './companies'
export * from './jobs'
export * from './applications'
export * from './categories'

// Import all data for easy access
import { mockUsers, User } from './users'
import { mockCompanies, Company } from './companies'
import { mockJobs, Job } from './jobs'
import { mockApplications, Application } from './applications'
import { mockCategories, Category, allCategories } from './categories'

// Combined exports for convenience
export const mockData = {
  users: mockUsers,
  companies: mockCompanies,
  jobs: mockJobs,
  applications: mockApplications,
  categories: mockCategories,
  allCategories,
}

// Data types
export interface MockDataState {
  users: User[]
  companies: Company[]
  jobs: Job[]
  applications: Application[]
  categories: Category[]
  lastUpdated: Date
}

// Helper functions for data management
export function getInitialMockData(): MockDataState {
  return {
    users: [...mockUsers],
    companies: [...mockCompanies],
    jobs: [...mockJobs],
    applications: [...mockApplications],
    categories: [...allCategories],
    lastUpdated: new Date(),
  }
}

// Validation functions
export function validateUser(user: Partial<User>): boolean {
  return !!(user.email && user.name && user.role)
}

export function validateCompany(company: Partial<Company>): boolean {
  return !!(company.name && company.slug && company.industry)
}

export function validateJob(job: Partial<Job>): boolean {
  return !!(job.title && job.description && job.companyId && job.location)
}

export function validateApplication(application: Partial<Application>): boolean {
  return !!(application.jobId && application.userId && application.status)
}

// Search and filter utilities
export function searchJobs(query: string, jobs: Job[]): Job[] {
  if (!query) return jobs
  
  const searchTerm = query.toLowerCase()
  return jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm) ||
    job.description.toLowerCase().includes(searchTerm) ||
    job.location.toLowerCase().includes(searchTerm) ||
    job.requirements.toLowerCase().includes(searchTerm)
  )
}

export function filterJobsByLocation(location: string, jobs: Job[]): Job[] {
  if (!location) return jobs
  return jobs.filter(job => 
    job.location.toLowerCase().includes(location.toLowerCase()) ||
    (job.remote && location.toLowerCase() === 'remote')
  )
}

export function filterJobsByType(jobType: string, jobs: Job[]): Job[] {
  if (!jobType) return jobs
  return jobs.filter(job => job.jobType === jobType)
}

export function filterJobsByExperience(experience: string, jobs: Job[]): Job[] {
  if (!experience) return jobs
  return jobs.filter(job => job.experience === experience)
}

export function filterJobsByCategory(categoryId: string, jobs: Job[]): Job[] {
  if (!categoryId) return jobs
  return jobs.filter(job => job.categoryId === categoryId)
}

export function filterJobsBySalary(minSalary: number, maxSalary: number, jobs: Job[]): Job[] {
  return jobs.filter(job => {
    if (!job.salaryMin || !job.salaryMax) return true
    return job.salaryMin >= minSalary && job.salaryMax <= maxSalary
  })
}

// Data enrichment utilities
export function enrichJobWithCompany(job: Job, companies: Company[]): Job & { company: Company | null } {
  const company = companies.find(c => c.id === job.companyId) || null
  return { ...job, company }
}

export function enrichApplicationWithJob(application: Application, jobs: Job[]): Application & { job: Job | null } {
  const job = jobs.find(j => j.id === application.jobId) || null
  return { ...application, job }
}

export function enrichApplicationWithUser(application: Application, users: User[]): Application & { user: User | null } {
  const user = users.find(u => u.id === application.userId) || null
  return { ...application, user }
}

// Statistics utilities
export function getJobStats(jobs: Job[]) {
  const total = jobs.length
  const published = jobs.filter(j => j.status === 'PUBLISHED').length
  const draft = jobs.filter(j => j.status === 'DRAFT').length
  const closed = jobs.filter(j => j.status === 'CLOSED').length
  const featured = jobs.filter(j => j.featured).length
  const remote = jobs.filter(j => j.remote).length
  
  return {
    total,
    published,
    draft,
    closed,
    featured,
    remote,
  }
}

export function getCompanyStats(companies: Company[]) {
  const total = companies.length
  const verified = companies.filter(c => c.verified).length
  const bySize = {
    startup: companies.filter(c => c.size === 'STARTUP').length,
    small: companies.filter(c => c.size === 'SMALL').length,
    medium: companies.filter(c => c.size === 'MEDIUM').length,
    large: companies.filter(c => c.size === 'LARGE').length,
    enterprise: companies.filter(c => c.size === 'ENTERPRISE').length,
  }
  
  return {
    total,
    verified,
    bySize,
  }
}

export function getUserStats(users: User[]) {
  const total = users.length
  const byRole = {
    admin: users.filter(u => u.role === 'ADMIN').length,
    company: users.filter(u => u.role === 'COMPANY').length,
    applicant: users.filter(u => u.role === 'APPLICANT').length,
  }
  
  return {
    total,
    byRole,
  }
}

// Demo account information
export const demoAccounts = {
  admin: {
    email: "admin@jobboard.com",
    password: "admin123",
    role: "ADMIN",
    description: "Full administrative access to all platform features"
  },
  company: {
    email: "hr@techcorp.com", 
    password: "company123",
    role: "COMPANY",
    description: "Company user can post jobs and manage applications"
  },
  jobSeeker: {
    email: "john@example.com",
    password: "user123", 
    role: "APPLICANT",
    description: "Job seeker can apply to jobs and manage profile"
  }
}