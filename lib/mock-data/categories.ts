export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  jobCount?: number
  parentId?: string
  children?: Category[]
  createdAt: Date
  updatedAt: Date
}

export const mockCategories: Category[] = [
  {
    id: "cat-tech",
    name: "Technology",
    slug: "technology",
    description: "Software development, engineering, and IT roles",
    icon: "💻",
    jobCount: 25,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-12-01"),
  },
  {
    id: "cat-design",
    name: "Design",
    slug: "design",
    description: "UI/UX, graphic design, and creative roles",
    icon: "🎨",
    jobCount: 8,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-12-01"),
  },
  {
    id: "cat-marketing",
    name: "Marketing",
    slug: "marketing",
    description: "Digital marketing, content, and growth roles",
    icon: "📈",
    jobCount: 12,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-12-01"),
  },
  {
    id: "cat-sales",
    name: "Sales",
    slug: "sales",
    description: "Sales representatives, account management, and business development",
    icon: "💼",
    jobCount: 10,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-12-01"),
  },
  {
    id: "cat-finance",
    name: "Finance",
    slug: "finance",
    description: "Financial analysis, accounting, and investment roles",
    icon: "💰",
    jobCount: 7,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-12-01"),
  },
  {
    id: "cat-healthcare",
    name: "Healthcare",
    slug: "healthcare",
    description: "Medical, nursing, and healthcare administration roles",
    icon: "🏥",
    jobCount: 6,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-12-01"),
  },
  {
    id: "cat-education",
    name: "Education",
    slug: "education",
    description: "Teaching, training, and educational administration",
    icon: "📚",
    jobCount: 5,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-12-01"),
  },
  {
    id: "cat-operations",
    name: "Operations",
    slug: "operations",
    description: "Operations management, logistics, and supply chain",
    icon: "⚙️",
    jobCount: 4,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-12-01"),
  },
  {
    id: "cat-hr",
    name: "Human Resources",
    slug: "human-resources",
    description: "HR management, recruiting, and people operations",
    icon: "👥",
    jobCount: 3,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-12-01"),
  },
  {
    id: "cat-legal",
    name: "Legal",
    slug: "legal",
    description: "Legal counsel, compliance, and regulatory affairs",
    icon: "⚖️",
    jobCount: 2,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-12-01"),
  },
]

// Subcategories for Technology
export const techSubcategories: Category[] = [
  {
    id: "cat-frontend",
    name: "Frontend Development",
    slug: "frontend-development",
    parentId: "cat-tech",
    jobCount: 8,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-12-01"),
  },
  {
    id: "cat-backend",
    name: "Backend Development",
    slug: "backend-development",
    parentId: "cat-tech",
    jobCount: 7,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-12-01"),
  },
  {
    id: "cat-fullstack",
    name: "Full Stack Development",
    slug: "fullstack-development",
    parentId: "cat-tech",
    jobCount: 6,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-12-01"),
  },
  {
    id: "cat-mobile",
    name: "Mobile Development",
    slug: "mobile-development",
    parentId: "cat-tech",
    jobCount: 4,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-12-01"),
  },
  {
    id: "cat-devops",
    name: "DevOps",
    slug: "devops",
    parentId: "cat-tech",
    jobCount: 5,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-12-01"),
  },
  {
    id: "cat-data",
    name: "Data Science",
    slug: "data-science",
    parentId: "cat-tech",
    jobCount: 4,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-12-01"),
  },
  {
    id: "cat-ai",
    name: "AI/Machine Learning",
    slug: "ai-machine-learning",
    parentId: "cat-tech",
    jobCount: 3,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-12-01"),
  },
  {
    id: "cat-security",
    name: "Cybersecurity",
    slug: "cybersecurity",
    parentId: "cat-tech",
    jobCount: 3,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-12-01"),
  },
]

// Combine all categories
export const allCategories = [...mockCategories, ...techSubcategories]