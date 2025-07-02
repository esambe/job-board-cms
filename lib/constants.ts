export const JOB_TYPES = [
  { value: "FULL_TIME", label: "Full Time" },
  { value: "PART_TIME", label: "Part Time" },
  { value: "CONTRACT", label: "Contract" },
  { value: "FREELANCE", label: "Freelance" },
  { value: "INTERNSHIP", label: "Internship" },
] as const

export const EXPERIENCE_LEVELS = [
  { value: "ENTRY_LEVEL", label: "Entry Level" },
  { value: "MID_LEVEL", label: "Mid Level" },
  { value: "SENIOR_LEVEL", label: "Senior Level" },
  { value: "EXECUTIVE", label: "Executive" },
] as const

export const APPLICATION_STATUSES = [
  { value: "PENDING", label: "Pending" },
  { value: "REVIEWING", label: "Reviewing" },
  { value: "SHORTLISTED", label: "Shortlisted" },
  { value: "INTERVIEWED", label: "Interviewed" },
  { value: "REJECTED", label: "Rejected" },
  { value: "ACCEPTED", label: "Accepted" },
] as const

export const JOB_STATUSES = [
  { value: "DRAFT", label: "Draft" },
  { value: "PUBLISHED", label: "Published" },
  { value: "CLOSED", label: "Closed" },
  { value: "ARCHIVED", label: "Archived" },
] as const

export const USER_ROLES = [
  { value: "ADMIN", label: "Admin" },
  { value: "COMPANY", label: "Company" },
  { value: "APPLICANT", label: "Applicant" },
] as const

export const COMPANY_SIZES = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1000 employees" },
  { value: "1000+", label: "1000+ employees" },
] as const

export const INDUSTRIES = [
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "consulting", label: "Consulting" },
  { value: "marketing", label: "Marketing" },
  { value: "media", label: "Media & Entertainment" },
  { value: "nonprofit", label: "Non-profit" },
  { value: "government", label: "Government" },
  { value: "other", label: "Other" },
] as const

export const CURRENCIES = [
  { value: "USD", label: "USD ($)", symbol: "$" },
  { value: "EUR", label: "EUR (€)", symbol: "€" },
  { value: "GBP", label: "GBP (£)", symbol: "£" },
  { value: "CAD", label: "CAD ($)", symbol: "C$" },
  { value: "AUD", label: "AUD ($)", symbol: "A$" },
] as const

export const SALARY_RANGES = [
  { min: 0, max: 30000, label: "Under $30k" },
  { min: 30000, max: 50000, label: "$30k - $50k" },
  { min: 50000, max: 75000, label: "$50k - $75k" },
  { min: 75000, max: 100000, label: "$75k - $100k" },
  { min: 100000, max: 150000, label: "$100k - $150k" },
  { min: 150000, max: 200000, label: "$150k - $200k" },
  { min: 200000, max: null, label: "$200k+" },
] as const

export const POPULAR_LOCATIONS = [
  "New York, NY",
  "San Francisco, CA",
  "Los Angeles, CA",
  "Chicago, IL",
  "Seattle, WA",
  "Boston, MA",
  "Austin, TX",
  "Denver, CO",
  "Atlanta, GA",
  "Miami, FL",
  "Remote",
] as const

export const SKILLS = [
  // Programming Languages
  "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "PHP", "Ruby", "Go", "Rust",
  // Frontend
  "React", "Vue.js", "Angular", "Svelte", "HTML", "CSS", "Tailwind CSS", "Bootstrap",
  // Backend
  "Node.js", "Express.js", "Django", "Flask", "Spring Boot", "ASP.NET", "Laravel",
  // Databases
  "PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite", "Oracle",
  // Cloud & DevOps
  "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "CI/CD", "Terraform",
  // Tools & Technologies
  "Git", "GraphQL", "REST API", "Microservices", "Agile", "Scrum",
  // Design
  "UI/UX Design", "Figma", "Adobe Creative Suite", "Sketch",
  // Marketing
  "SEO", "SEM", "Social Media Marketing", "Content Marketing", "Email Marketing",
  // Business
  "Project Management", "Data Analysis", "Business Intelligence", "Sales",
] as const

export const DEFAULT_JOB_CATEGORIES = [
  { name: "Software Engineering", slug: "software-engineering", icon: "Code" },
  { name: "Data Science", slug: "data-science", icon: "BarChart3" },
  { name: "Product Management", slug: "product-management", icon: "Package" },
  { name: "Design", slug: "design", icon: "Palette" },
  { name: "Marketing", slug: "marketing", icon: "Megaphone" },
  { name: "Sales", slug: "sales", icon: "TrendingUp" },
  { name: "Customer Support", slug: "customer-support", icon: "Headphones" },
  { name: "Human Resources", slug: "human-resources", icon: "Users" },
  { name: "Finance", slug: "finance", icon: "DollarSign" },
  { name: "Operations", slug: "operations", icon: "Settings" },
] as const

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const

export const FILE_UPLOAD = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"],
  ALLOWED_RESUME_TYPES: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
} as const

export const SEARCH = {
  MIN_SEARCH_LENGTH: 2,
  DEBOUNCE_DELAY: 300,
  MAX_SUGGESTIONS: 10,
} as const