import { NextRequest, NextResponse } from "next/server"

// Mock jobs data
const mockJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    slug: "senior-frontend-developer-1",
    description: "We're looking for a senior frontend developer to join our growing team. You'll be working on cutting-edge web applications using React, TypeScript, and modern tooling.",
    requirements: "5+ years of experience with React, TypeScript, and modern frontend technologies",
    benefits: "Competitive salary, health insurance, 401k, flexible working hours",
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
      logo: null,
      verified: true,
    },
    categoryId: "cat-1",
    category: {
      id: "cat-1",
      name: "Software Engineering",
      slug: "software-engineering",
    },
    views: 245,
    publishedAt: new Date("2024-12-30T00:00:00Z"),
    createdAt: new Date("2024-12-28T00:00:00Z"),
    updatedAt: new Date("2024-12-30T00:00:00Z"),
  },
  {
    id: "2",
    title: "Product Manager",
    slug: "product-manager-2",
    description: "Lead product strategy and execution for our innovative platform. Work closely with engineering, design, and business teams to deliver exceptional user experiences.",
    requirements: "3+ years of product management experience, strong analytical skills",
    benefits: "Equity package, health insurance, unlimited PTO",
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
    company: {
      id: "company-2",
      name: "StartupXYZ",
      logo: null,
      verified: false,
    },
    categoryId: "cat-2",
    category: {
      id: "cat-2",
      name: "Product Management",
      slug: "product-management",
    },
    views: 89,
    publishedAt: new Date("2024-12-25T00:00:00Z"),
    createdAt: new Date("2024-12-25T00:00:00Z"),
    updatedAt: new Date("2024-12-25T00:00:00Z"),
  },
  {
    id: "3",
    title: "UX Designer",
    slug: "ux-designer-3",
    description: "Create amazing user experiences for our diverse client portfolio. You'll be responsible for user research, wireframing, prototyping, and collaborating with development teams.",
    requirements: "2+ years of UX design experience, proficiency in Figma/Sketch",
    benefits: "Creative environment, professional development budget, flexible schedule",
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
      logo: null,
      verified: true,
    },
    categoryId: "cat-3",
    category: {
      id: "cat-3",
      name: "Design",
      slug: "design",
    },
    views: 156,
    publishedAt: new Date("2024-12-29T00:00:00Z"),
    createdAt: new Date("2024-12-29T00:00:00Z"),
    updatedAt: new Date("2024-12-29T00:00:00Z"),
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const search = searchParams.get("search") || ""
    const location = searchParams.get("location") || ""
    const jobType = searchParams.getAll("jobType")
    const experience = searchParams.getAll("experience")
    const remote = searchParams.get("remote") === "true"
    const featured = searchParams.get("featured") === "true"

    // Filter jobs based on query parameters
    let filteredJobs = mockJobs.filter(job => {
      if (search && !job.title.toLowerCase().includes(search.toLowerCase()) && 
          !job.company.name.toLowerCase().includes(search.toLowerCase())) {
        return false
      }
      
      if (location && !job.location.toLowerCase().includes(location.toLowerCase())) {
        return false
      }
      
      if (jobType.length > 0 && !jobType.includes(job.jobType)) {
        return false
      }
      
      if (experience.length > 0 && !experience.includes(job.experience)) {
        return false
      }
      
      if (remote !== undefined && job.remote !== remote) {
        return false
      }
      
      if (featured && !job.featured) {
        return false
      }
      
      return job.status === "PUBLISHED"
    })

    // Pagination
    const total = filteredJobs.length
    const totalPages = Math.ceil(total / limit)
    const offset = (page - 1) * limit
    const paginatedJobs = filteredJobs.slice(offset, offset + limit)

    return NextResponse.json({
      jobs: paginatedJobs,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
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
    // TODO: Implement job creation
    // For now, return method not allowed
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