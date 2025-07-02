import { z } from 'zod'
import { JOB_TYPES, EXPERIENCE_LEVELS, ROLES } from './constants'

export const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum([ROLES.ADMIN, ROLES.COMPANY, ROLES.APPLICANT]),
})

export const userProfileSchema = z.object({
  phone: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().optional(),
  skills: z.array(z.string()).optional(),
  experience: z.string().optional(),
  education: z.string().optional(),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  portfolioUrl: z.string().url().optional().or(z.literal('')),
})

export const companySchema = z.object({
  name: z.string().min(2, 'Company name must be at least 2 characters'),
  description: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  location: z.string().optional(),
  industry: z.string().optional(),
  size: z.string().optional(),
  founded: z.number().optional(),
})

export const jobSchema = z.object({
  title: z.string().min(2, 'Job title must be at least 2 characters'),
  description: z.string().min(10, 'Job description must be at least 10 characters'),
  requirements: z.string().optional(),
  benefits: z.string().optional(),
  location: z.string().min(2, 'Location is required'),
  remote: z.boolean().default(false),
  salaryMin: z.number().optional(),
  salaryMax: z.number().optional(),
  currency: z.string().default('USD'),
  jobType: z.enum([
    JOB_TYPES.FULL_TIME,
    JOB_TYPES.PART_TIME,
    JOB_TYPES.CONTRACT,
    JOB_TYPES.FREELANCE,
    JOB_TYPES.INTERNSHIP,
  ]),
  experience: z.enum([
    EXPERIENCE_LEVELS.ENTRY_LEVEL,
    EXPERIENCE_LEVELS.MID_LEVEL,
    EXPERIENCE_LEVELS.SENIOR_LEVEL,
    EXPERIENCE_LEVELS.EXECUTIVE,
  ]).default(EXPERIENCE_LEVELS.MID_LEVEL),
  categoryId: z.string().optional(),
  featured: z.boolean().default(false),
  expiresAt: z.date().optional(),
})

export const applicationSchema = z.object({
  jobId: z.string().cuid(),
  coverLetter: z.string().optional(),
  resumeUrl: z.string().optional(),
})

export const categorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters'),
  description: z.string().optional(),
  icon: z.string().optional(),
})

export const jobFilterSchema = z.object({
  search: z.string().optional(),
  location: z.string().optional(),
  jobType: z.array(z.string()).optional(),
  experience: z.array(z.string()).optional(),
  salaryMin: z.number().optional(),
  salaryMax: z.number().optional(),
  category: z.string().optional(),
  remote: z.boolean().optional(),
  featured: z.boolean().optional(),
})

export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
})

// Form schemas for client-side validation
export type UserFormData = z.infer<typeof userSchema>
export type UserProfileFormData = z.infer<typeof userProfileSchema>
export type CompanyFormData = z.infer<typeof companySchema>
export type JobFormData = z.infer<typeof jobSchema>
export type ApplicationFormData = z.infer<typeof applicationSchema>
export type CategoryFormData = z.infer<typeof categorySchema>
export type JobFiltersData = z.infer<typeof jobFilterSchema>
export type PaginationData = z.infer<typeof paginationSchema>