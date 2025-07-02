import { NextRequest, NextResponse } from "next/server"
// import { prisma } from "@/lib/db" // Disabled for now due to Prisma generation issues
import { jobSearchSchema } from "@/lib/validations"

// Mock jobs data for demonstration
const mockJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    slug: "senior-frontend-developer-techcorp",
    description: "We are looking for a senior frontend developer to join our growing team. You will be working on cutting-edge web applications using React, TypeScript, and modern tooling.",
    requirements: "• 5+ years of experience with React and TypeScript\n• Strong understanding of modern JavaScript (ES6+)\n• Experience with state management (Redux, Zustand)",
    benefits: "• Competitive salary and equity package\n• Comprehensive health, dental, and vision insurance\n• 401(k) with company matching",
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
    company: {
      id: "company-1",
      name: "TechCorp Inc.",
      slug: "techcorp-inc",
      logo: null,
      verified: true,
    },
    categoryId: "cat-1",
    category: {
      id: "cat-1",
      name: "Software Engineering",
      slug: "software-engineering",
    },
    _count: {
      applications: 12,
    },
    views: 245,
    publishedAt: new Date("2024-12-28"),
    createdAt: new Date("2024-12-28"),
    updatedAt: new Date("2024-12-30"),
  },
  {
    id: "2",
    title: "Product Manager",
    slug: "product-manager-startupxyz",
    description: "Lead product strategy and execution for our innovative platform. Work closely with engineering, design, and business teams to deliver exceptional user experiences.",
    requirements: "• 3+ years of product management experience\n• Strong analytical and problem-solving skills\n• Experience with product analytics tools",
    benefits: "• Equity package with high growth potential\n• Health insurance and wellness stipend\n• Unlimited PTO policy",
    location: "Austin, TX",
    remote: true,
    salaryMin: 100000,
    salaryMax: 130000,
    currency: "USD",
    jobType: "FULL_TIME",
    experience: "MID_LEVEL",
    status: "PUBLISHED",
    featured: false,
    companyId: "company-2",
    company: {
      id: "company-2",
      name: "StartupXYZ",
      slug: "startupxyz",
      logo: null,
      verified: true,
    },
    categoryId: "cat-2",
    category: {
      id: "cat-2",
      name: "Product Management",
      slug: "product-management",
    },
    _count: {
      applications: 8,
    },
    views: 89,
    publishedAt: new Date("2024-12-25"),
    createdAt: new Date("2024-12-25"),
    updatedAt: new Date("2024-12-25"),
  },
  {
    id: "3",
    title: "UX Designer",
    slug: "ux-designer-design-studio",
    description: "Create amazing user experiences for our diverse client portfolio. You will be responsible for user research, wireframing, prototyping, and collaborating with development teams.",
    requirements: "• 2+ years of UX design experience\n• Proficiency in Figma or Sketch\n• Strong portfolio showcasing UX process",
    benefits: "• Creative and collaborative environment\n• Professional development budget for conferences\n• Flexible schedule and work arrangements",
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
    company: {
      id: "company-3",
      name: "Design Studio",
      slug: "design-studio",
      logo: null,
      verified: true,
    },
    categoryId: "cat-3",
    category: {
      id: "cat-3",
      name: "Design",
      slug: "design",
    },
    _count: {
      applications: 15,
    },
    views: 156,
    publishedAt: new Date("2024-12-27"),
    createdAt: new Date("2024-12-27"),
    updatedAt: new Date("2024-12-27"),
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Parse and validate search parameters
    const params = {
      q: searchParams.get("q") || undefined,
      location: searchParams.get("location") || undefined,
      remote: searchParams.get("remote") === "true" ? true : undefined,
      jobType: searchParams.get("jobType") ? [searchParams.get("jobType")!] : undefined,
      experience: searchParams.get("experience") ? [searchParams.get("experience")!] : undefined,
      category: searchParams.get("category") || undefined,
      salaryMin: searchParams.get("salaryMin") ? parseInt(searchParams.get("salaryMin")!) : undefined,
      salaryMax: searchParams.get("salaryMax") ? parseInt(searchParams.get("salaryMax")!) : undefined,
      company: searchParams.get("company") || undefined,
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "12"),
    }

    // Filter jobs based on criteria (simplified for demo)
    let filteredJobs = mockJobs.filter(job => {
      if (params.q) {
        const searchTerm = params.q.toLowerCase()
        if (!job.title.toLowerCase().includes(searchTerm) && 
            !job.description.toLowerCase().includes(searchTerm) &&
            !job.company.name.toLowerCase().includes(searchTerm)) {
          return false
        }
      }
      
      if (params.location) {
        if (!job.location.toLowerCase().includes(params.location.toLowerCase())) {
          return false
        }
      }
      
      if (params.remote !== undefined && job.remote !== params.remote) {
        return false
      }
      
      if (params.jobType && params.jobType.length > 0 && !params.jobType.includes(job.jobType)) {
        return false
      }
      
      if (params.experience && params.experience.length > 0 && !params.experience.includes(job.experience)) {
        return false
      }
      
      if (params.category && job.category.slug !== params.category) {
        return false
      }
      
      if (params.company && job.company.slug !== params.company) {
        return false
      }
      
      return job.status === "PUBLISHED"
    })

    // Pagination
    const total = filteredJobs.length
    const pages = Math.ceil(total / params.limit)
    const skip = (params.page - 1) * params.limit
    const paginatedJobs = filteredJobs.slice(skip, skip + params.limit)

    return NextResponse.json({
      jobs: paginatedJobs,
      pagination: {
        page: params.page,
        limit: params.limit,
        total,
        pages,
      }
    })
  } catch (error) {
    console.error("Jobs API error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // TODO: Implement job creation with authentication
    return NextResponse.json(
      { message: "Job creation not implemented yet" },
      { status: 501 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}