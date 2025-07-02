// Data models and mock data with local storage persistence

export interface User {
  id: string
  email: string
  name: string
  role: "ADMIN" | "COMPANY" | "APPLICANT"
  avatar?: string
  companyId?: string
  createdAt: string
  updatedAt: string
}

export interface Company {
  id: string
  name: string
  description: string
  logo?: string
  website?: string
  size: "STARTUP" | "SMALL" | "MEDIUM" | "LARGE" | "ENTERPRISE"
  industry: string
  location: string
  foundedYear?: number
  verified: boolean
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  color: string
  icon?: string
  createdAt: string
  updatedAt: string
}

export interface Job {
  id: string
  title: string
  slug: string
  description: string
  requirements: string
  benefits: string
  location: string
  remote: boolean
  salaryMin?: number
  salaryMax?: number
  currency: string
  jobType: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP"
  experience: "ENTRY_LEVEL" | "MID_LEVEL" | "SENIOR_LEVEL" | "EXECUTIVE"
  status: "DRAFT" | "PUBLISHED" | "CLOSED" | "ARCHIVED"
  featured: boolean
  companyId: string
  company?: Company
  categoryId: string
  category?: Category
  views: number
  applicationCount: number
  deadline?: string
  createdAt: string
  updatedAt: string
}

export interface Application {
  id: string
  jobId: string
  job?: Job
  applicantName: string
  applicantEmail: string
  applicantPhone?: string
  resume?: string
  coverLetter?: string
  status: "PENDING" | "REVIEWED" | "SHORTLISTED" | "REJECTED" | "HIRED"
  notes?: string
  reviewedBy?: string
  reviewedAt?: string
  createdAt: string
  updatedAt: string
}

// Local storage keys
const STORAGE_KEYS = {
  COMPANIES: 'job_board_companies',
  CATEGORIES: 'job_board_categories',
  JOBS: 'job_board_jobs',
  APPLICATIONS: 'job_board_applications',
  USERS: 'job_board_users',
} as const

// Initialize default data
const defaultCategories: Category[] = [
  {
    id: "cat-1",
    name: "Engineering",
    slug: "engineering",
    description: "Software development and engineering roles",
    color: "#3B82F6",
    icon: "Code",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cat-2",
    name: "Product",
    slug: "product",
    description: "Product management and strategy",
    color: "#10B981",
    icon: "Package",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cat-3",
    name: "Design",
    slug: "design",
    description: "UI/UX and graphic design",
    color: "#F59E0B",
    icon: "Palette",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cat-4",
    name: "Marketing",
    slug: "marketing",
    description: "Digital marketing and growth",
    color: "#EF4444",
    icon: "Megaphone",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cat-5",
    name: "Sales",
    slug: "sales",
    description: "Sales and business development",
    color: "#8B5CF6",
    icon: "TrendingUp",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const defaultCompanies: Company[] = [
  {
    id: "company-1",
    name: "TechCorp Inc.",
    description: "Leading technology company focused on innovative solutions for the modern world.",
    website: "https://techcorp.com",
    size: "LARGE",
    industry: "Technology",
    location: "San Francisco, CA",
    foundedYear: 2015,
    verified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "company-2",
    name: "StartupXYZ",
    description: "Fast-growing startup revolutionizing the way people work remotely.",
    website: "https://startupxyz.com",
    size: "STARTUP",
    industry: "SaaS",
    location: "Remote",
    foundedYear: 2021,
    verified: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "company-3",
    name: "Design Studio",
    description: "Creative agency specializing in digital design and user experience.",
    website: "https://designstudio.com",
    size: "SMALL",
    industry: "Design",
    location: "New York, NY",
    foundedYear: 2018,
    verified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "company-4",
    name: "Global Finance Corp",
    description: "International financial services company with offices worldwide.",
    website: "https://globalfinance.com",
    size: "ENTERPRISE",
    industry: "Finance",
    location: "London, UK",
    foundedYear: 2005,
    verified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const defaultJobs: Job[] = [
  {
    id: "job-1",
    title: "Senior Frontend Developer",
    slug: "senior-frontend-developer-1",
    description: "We're looking for a senior frontend developer to join our growing team. You'll be working on cutting-edge web applications using React, TypeScript, and modern tooling.",
    requirements: "5+ years of experience with React, TypeScript, and modern frontend technologies. Experience with Next.js, Tailwind CSS, and state management libraries.",
    benefits: "Competitive salary, health insurance, 401k, flexible working hours, remote work options, professional development budget.",
    location: "San Francisco, CA",
    remote: false,
    salaryMin: 120000,
    salaryMax: 150000,
    currency: "USD",
    jobType: "FULL_TIME",
    experience: "SENIOR_LEVEL",
    status: "PUBLISHED",
    featured: true,
    companyId: "company-1",
    categoryId: "cat-1",
    views: 245,
    applicationCount: 12,
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "job-2",
    title: "Product Manager",
    slug: "product-manager-2",
    description: "Join our product team to drive the vision and strategy for our core platform. You'll work closely with engineering, design, and business teams.",
    requirements: "3+ years of product management experience, preferably in SaaS or technology companies. Strong analytical skills and experience with product metrics.",
    benefits: "Stock options, health benefits, flexible PTO, learning stipend, modern office environment.",
    location: "Remote",
    remote: true,
    salaryMin: 100000,
    salaryMax: 130000,
    currency: "USD",
    jobType: "FULL_TIME",
    experience: "MID_LEVEL",
    status: "PUBLISHED",
    featured: false,
    companyId: "company-2",
    categoryId: "cat-2",
    views: 89,
    applicationCount: 8,
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "job-3",
    title: "UX Designer",
    slug: "ux-designer-3",
    description: "Create amazing user experiences for our diverse client portfolio. You'll be responsible for user research, wireframing, prototyping, and collaborating with development teams.",
    requirements: "2+ years of UX design experience, proficiency in Figma/Sketch, understanding of design systems and user-centered design principles.",
    benefits: "Creative environment, professional development budget, flexible schedule, design conference attendance.",
    location: "New York, NY",
    remote: false,
    salaryMin: 80000,
    salaryMax: 100000,
    currency: "USD",
    jobType: "CONTRACT",
    experience: "MID_LEVEL",
    status: "PUBLISHED",
    featured: false,
    companyId: "company-3",
    categoryId: "cat-3",
    views: 156,
    applicationCount: 15,
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

const defaultApplications: Application[] = [
  {
    id: "app-1",
    jobId: "job-1",
    applicantName: "John Doe",
    applicantEmail: "john.doe@email.com",
    applicantPhone: "+1-555-0123",
    coverLetter: "I'm excited about this opportunity to work with your team...",
    status: "PENDING",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "app-2",
    jobId: "job-2",
    applicantName: "Jane Smith",
    applicantEmail: "jane.smith@email.com",
    applicantPhone: "+1-555-0124",
    coverLetter: "I believe my product management experience would be valuable...",
    status: "REVIEWED",
    reviewedBy: "admin",
    reviewedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "app-3",
    jobId: "job-3",
    applicantName: "Mike Johnson",
    applicantEmail: "mike.johnson@email.com",
    applicantPhone: "+1-555-0125",
    coverLetter: "As a passionate UX designer, I'm thrilled about the possibility...",
    status: "SHORTLISTED",
    reviewedBy: "admin",
    reviewedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
]

// Storage helper functions
export class LocalStorage {
  static get<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error(`Error reading from localStorage:`, error)
      return defaultValue
    }
  }

  static set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return
    
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error writing to localStorage:`, error)
    }
  }

  static remove(key: string): void {
    if (typeof window === 'undefined') return
    
    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing from localStorage:`, error)
    }
  }
}

// Data access functions
export function getCompanies(): Company[] {
  const companies = LocalStorage.get(STORAGE_KEYS.COMPANIES, defaultCompanies)
  return companies
}

export function setCompanies(companies: Company[]): void {
  LocalStorage.set(STORAGE_KEYS.COMPANIES, companies)
}

export function getCategories(): Category[] {
  const categories = LocalStorage.get(STORAGE_KEYS.CATEGORIES, defaultCategories)
  return categories
}

export function setCategories(categories: Category[]): void {
  LocalStorage.set(STORAGE_KEYS.CATEGORIES, categories)
}

export function getJobs(): Job[] {
  const jobs = LocalStorage.get(STORAGE_KEYS.JOBS, defaultJobs)
  
  // Populate related data
  const companies = getCompanies()
  const categories = getCategories()
  
  return jobs.map(job => ({
    ...job,
    company: companies.find(c => c.id === job.companyId),
    category: categories.find(c => c.id === job.categoryId),
  }))
}

export function setJobs(jobs: Job[]): void {
  // Remove populated data before storing
  const jobsToStore = jobs.map(job => ({
    ...job,
    company: undefined,
    category: undefined,
  }))
  LocalStorage.set(STORAGE_KEYS.JOBS, jobsToStore)
}

export function getApplications(): Application[] {
  const applications = LocalStorage.get(STORAGE_KEYS.APPLICATIONS, defaultApplications)
  
  // Populate related data
  const jobs = getJobs()
  
  return applications.map(app => ({
    ...app,
    job: jobs.find(j => j.id === app.jobId),
  }))
}

export function setApplications(applications: Application[]): void {
  // Remove populated data before storing
  const appsToStore = applications.map(app => ({
    ...app,
    job: undefined,
  }))
  LocalStorage.set(STORAGE_KEYS.APPLICATIONS, appsToStore)
}

// Initialize data on first load
export function initializeData(): void {
  // This will only set defaults if nothing exists in localStorage
  getCompanies()
  getCategories()
  getJobs()
  getApplications()
}

// Utility functions
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// CRUD operations
export function createJob(jobData: Omit<Job, 'id' | 'slug' | 'views' | 'applicationCount' | 'createdAt' | 'updatedAt'>): Job {
  const jobs = getJobs()
  const newJob: Job = {
    ...jobData,
    id: generateId(),
    slug: createSlug(jobData.title),
    views: 0,
    applicationCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  
  jobs.push(newJob)
  setJobs(jobs)
  return newJob
}

export function updateJob(id: string, updates: Partial<Job>): Job | null {
  const jobs = getJobs()
  const index = jobs.findIndex(job => job.id === id)
  
  if (index === -1) return null
  
  jobs[index] = {
    ...jobs[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  
  setJobs(jobs)
  return jobs[index]
}

export function deleteJob(id: string): boolean {
  const jobs = getJobs()
  const filteredJobs = jobs.filter(job => job.id !== id)
  
  if (filteredJobs.length === jobs.length) return false
  
  setJobs(filteredJobs)
  return true
}

export function createCompany(companyData: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>): Company {
  const companies = getCompanies()
  const newCompany: Company = {
    ...companyData,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  
  companies.push(newCompany)
  setCompanies(companies)
  return newCompany
}

export function updateCompany(id: string, updates: Partial<Company>): Company | null {
  const companies = getCompanies()
  const index = companies.findIndex(company => company.id === id)
  
  if (index === -1) return null
  
  companies[index] = {
    ...companies[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  
  setCompanies(companies)
  return companies[index]
}

export function deleteCompany(id: string): boolean {
  const companies = getCompanies()
  const filteredCompanies = companies.filter(company => company.id !== id)
  
  if (filteredCompanies.length === companies.length) return false
  
  setCompanies(filteredCompanies)
  return true
}

export function createApplication(applicationData: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>): Application {
  const applications = getApplications()
  const newApplication: Application = {
    ...applicationData,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  
  applications.push(newApplication)
  setApplications(applications)
  
  // Update application count for the job
  const jobs = getJobs()
  const jobIndex = jobs.findIndex(job => job.id === applicationData.jobId)
  if (jobIndex !== -1) {
    jobs[jobIndex].applicationCount += 1
    setJobs(jobs)
  }
  
  return newApplication
}

export function updateApplication(id: string, updates: Partial<Application>): Application | null {
  const applications = getApplications()
  const index = applications.findIndex(app => app.id === id)
  
  if (index === -1) return null
  
  applications[index] = {
    ...applications[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  
  setApplications(applications)
  return applications[index]
}

export function deleteApplication(id: string): boolean {
  const applications = getApplications()
  const application = applications.find(app => app.id === id)
  const filteredApplications = applications.filter(app => app.id !== id)
  
  if (filteredApplications.length === applications.length) return false
  
  setApplications(filteredApplications)
  
  // Update application count for the job
  if (application) {
    const jobs = getJobs()
    const jobIndex = jobs.findIndex(job => job.id === application.jobId)
    if (jobIndex !== -1 && jobs[jobIndex].applicationCount > 0) {
      jobs[jobIndex].applicationCount -= 1
      setJobs(jobs)
    }
  }
  
  return true
}