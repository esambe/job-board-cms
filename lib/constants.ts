export const ROLES = {
  ADMIN: 'ADMIN',
  COMPANY: 'COMPANY',
  APPLICANT: 'APPLICANT',
} as const

export const JOB_TYPES = {
  FULL_TIME: 'FULL_TIME',
  PART_TIME: 'PART_TIME',
  CONTRACT: 'CONTRACT',
  FREELANCE: 'FREELANCE',
  INTERNSHIP: 'INTERNSHIP',
} as const

export const EXPERIENCE_LEVELS = {
  ENTRY_LEVEL: 'ENTRY_LEVEL',
  MID_LEVEL: 'MID_LEVEL',
  SENIOR_LEVEL: 'SENIOR_LEVEL',
  EXECUTIVE: 'EXECUTIVE',
} as const

export const JOB_STATUS = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  CLOSED: 'CLOSED',
  ARCHIVED: 'ARCHIVED',
} as const

export const APPLICATION_STATUS = {
  PENDING: 'PENDING',
  REVIEWING: 'REVIEWING',
  SHORTLISTED: 'SHORTLISTED',
  INTERVIEWED: 'INTERVIEWED',
  REJECTED: 'REJECTED',
  ACCEPTED: 'ACCEPTED',
} as const

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const

export const ROUTES = {
  HOME: '/',
  JOBS: '/jobs',
  COMPANIES: '/companies',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  ADMIN: '/admin',
  COMPANY: '/company',
} as const

export const API_ROUTES = {
  JOBS: '/api/jobs',
  COMPANIES: '/api/companies',
  APPLICATIONS: '/api/applications',
  USERS: '/api/users',
  CATEGORIES: '/api/categories',
  UPLOAD: '/api/upload',
  ANALYTICS: '/api/analytics',
} as const