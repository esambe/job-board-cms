import * as z from "zod"

// Auth validation schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  role: z.enum(["APPLICANT", "COMPANY"]).default("APPLICANT"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// User profile validation
export const userProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  skills: z.array(z.string()).optional(),
  experience: z.string().optional(),
  education: z.string().optional(),
  linkedinUrl: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  portfolioUrl: z.string().url("Invalid portfolio URL").optional().or(z.literal("")),
})

// Company validation
export const companySchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  description: z.string().max(1000, "Description must be less than 1000 characters").optional(),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  location: z.string().optional(),
  industry: z.string().optional(),
  size: z.string().optional(),
  founded: z.number().min(1800).max(new Date().getFullYear()).optional(),
})

// Job validation
export const jobSchema = z.object({
  title: z.string().min(2, "Job title must be at least 2 characters"),
  description: z.string().min(50, "Job description must be at least 50 characters"),
  requirements: z.string().optional(),
  benefits: z.string().optional(),
  location: z.string().min(2, "Location is required"),
  remote: z.boolean().default(false),
  salaryMin: z.number().min(0).optional(),
  salaryMax: z.number().min(0).optional(),
  currency: z.string().default("USD"),
  jobType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "FREELANCE", "INTERNSHIP"]),
  experience: z.enum(["ENTRY_LEVEL", "MID_LEVEL", "SENIOR_LEVEL", "EXECUTIVE"]).default("MID_LEVEL"),
  categoryId: z.string().optional(),
  featured: z.boolean().default(false),
  expiresAt: z.date().optional(),
}).refine((data) => {
  if (data.salaryMin && data.salaryMax) {
    return data.salaryMax >= data.salaryMin
  }
  return true
}, {
  message: "Maximum salary must be greater than or equal to minimum salary",
  path: ["salaryMax"],
})

// Application validation
export const applicationSchema = z.object({
  jobId: z.string().cuid("Invalid job ID"),
  coverLetter: z.string().max(1000, "Cover letter must be less than 1000 characters").optional(),
  resumeUrl: z.string().url("Invalid resume URL").optional(),
})

// Category validation
export const categorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
  description: z.string().max(500, "Description must be less than 500 characters").optional(),
  icon: z.string().optional(),
})

// Search validation
export const jobSearchSchema = z.object({
  q: z.string().optional(),
  location: z.string().optional(),
  jobType: z.array(z.string()).optional(),
  experience: z.array(z.string()).optional(),
  category: z.string().optional(),
  remote: z.boolean().optional(),
  salaryMin: z.number().min(0).optional(),
  salaryMax: z.number().min(0).optional(),
  company: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z.enum(["createdAt", "updatedAt", "views", "salary"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
})

// File upload validation
export const fileUploadSchema = z.object({
  file: z.object({
    name: z.string(),
    type: z.string(),
    size: z.number().max(5 * 1024 * 1024, "File size must be less than 5MB"),
  }),
  folder: z.enum(["resumes", "logos", "avatars"]).default("resumes"),
})

// Admin validation schemas
export const adminUserUpdateSchema = z.object({
  role: z.enum(["ADMIN", "COMPANY", "APPLICANT"]),
  companyId: z.string().optional(),
})

export const adminJobModerationSchema = z.object({
  status: z.enum(["DRAFT", "PUBLISHED", "CLOSED", "ARCHIVED"]),
  featured: z.boolean(),
  notes: z.string().optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type UserProfileFormData = z.infer<typeof userProfileSchema>
export type CompanyFormData = z.infer<typeof companySchema>
export type JobFormData = z.infer<typeof jobSchema>
export type ApplicationFormData = z.infer<typeof applicationSchema>
export type CategoryFormData = z.infer<typeof categorySchema>
export type JobSearchParams = z.infer<typeof jobSearchSchema>
export type FileUploadData = z.infer<typeof fileUploadSchema>
export type AdminUserUpdateData = z.infer<typeof adminUserUpdateSchema>
export type AdminJobModerationData = z.infer<typeof adminJobModerationSchema>