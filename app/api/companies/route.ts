import { NextRequest, NextResponse } from "next/server"

// Mock companies data
const mockCompanies = [
  {
    id: "company-1",
    name: "TechCorp Inc.",
    slug: "techcorp-inc",
    description: "Leading technology company focused on innovative solutions for the modern workplace. We build cutting-edge software that helps businesses transform their operations.",
    logo: null,
    website: "https://techcorp.com",
    location: "San Francisco, CA",
    industry: "Technology",
    size: "201-500",
    founded: 2015,
    verified: true,
    _count: { jobs: 15, users: 45 },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "company-2",
    name: "StartupXYZ",
    slug: "startupxyz",
    description: "Fast-growing startup revolutionizing the way people work and collaborate. We're on a mission to make remote work more productive and engaging.",
    logo: null,
    website: "https://startupxyz.com",
    location: "Austin, TX",
    industry: "SaaS",
    size: "11-50",
    founded: 2020,
    verified: true,
    _count: { jobs: 8, users: 12 },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "company-3",
    name: "Design Studio",
    slug: "design-studio", 
    description: "Creative agency specializing in brand identity and digital experiences. We work with clients ranging from startups to Fortune 500 companies.",
    logo: null,
    website: "https://designstudio.com",
    location: "New York, NY",
    industry: "Design",
    size: "11-50",
    founded: 2018,
    verified: true,
    _count: { jobs: 6, users: 18 },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "company-4",
    name: "DataCorp Analytics",
    slug: "datacorp-analytics",
    description: "Data-driven company providing insights and analytics solutions for businesses. We help companies make better decisions through data.",
    logo: null,
    website: "https://datacorp.com",
    location: "Seattle, WA",
    industry: "Analytics",
    size: "51-200",
    founded: 2017,
    verified: true,
    _count: { jobs: 12, users: 28 },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "company-5",
    name: "CloudTech Solutions",
    slug: "cloudtech-solutions",
    description: "Cloud infrastructure and DevOps solutions provider. We help businesses scale their operations with reliable cloud infrastructure.",
    logo: null,
    website: "https://cloudtech.com",
    location: "Remote",
    industry: "Cloud Computing",
    size: "101-200",
    founded: 2019,
    verified: true,
    _count: { jobs: 18, users: 35 },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const search = searchParams.get("search") || ""
    const industry = searchParams.get("industry") || ""
    const size = searchParams.get("size") || ""
    const verified = searchParams.get("verified")

    // Filter companies
    let filteredCompanies = mockCompanies.filter(company => {
      if (search && !company.name.toLowerCase().includes(search.toLowerCase()) &&
          !company.description.toLowerCase().includes(search.toLowerCase())) {
        return false
      }
      
      if (industry && company.industry !== industry) {
        return false
      }
      
      if (size && company.size !== size) {
        return false
      }
      
      if (verified === "true" && !company.verified) {
        return false
      }
      
      return true
    })

    // Pagination
    const total = filteredCompanies.length
    const pages = Math.ceil(total / limit)
    const skip = (page - 1) * limit
    const paginatedCompanies = filteredCompanies.slice(skip, skip + limit)

    return NextResponse.json({
      companies: paginatedCompanies,
      pagination: {
        page,
        limit,
        total,
        pages,
      }
    })
  } catch (error) {
    console.error("Companies API error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}