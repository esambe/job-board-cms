import { NextRequest, NextResponse } from "next/server"
import { MockDataStorage } from "@/lib/storage"
import { searchJobs, filterJobsByLocation, filterJobsByType, filterJobsByExperience, filterJobsByCategory, enrichJobWithCompany } from "@/lib/mock-data"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Get query parameters
    const search = searchParams.get("search") || ""
    const location = searchParams.get("location") || ""
    const jobType = searchParams.getAll("jobType")
    const experience = searchParams.getAll("experience")
    const category = searchParams.get("category") || ""
    const remote = searchParams.get("remote")
    const featured = searchParams.get("featured") === "true"
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const sortBy = searchParams.get("sortBy") || "createdAt"
    const sortOrder = searchParams.get("sortOrder") || "desc"

    // Get jobs from mock data
    let jobs = MockDataStorage.getJobs()
    const companies = MockDataStorage.getCompanies()

    // Filter jobs
    if (search) {
      jobs = searchJobs(search, jobs)
    }
    if (location) {
      jobs = filterJobsByLocation(location, jobs)
    }
    if (jobType.length > 0) {
      jobs = jobs.filter(job => jobType.includes(job.jobType))
    }
    if (experience.length > 0) {
      jobs = jobs.filter(job => experience.includes(job.experience))
    }
    if (category) {
      jobs = filterJobsByCategory(category, jobs)
    }
    if (remote === "true") {
      jobs = jobs.filter(job => job.remote)
    } else if (remote === "false") {
      jobs = jobs.filter(job => !job.remote)
    }
    if (featured) {
      jobs = jobs.filter(job => job.featured)
    }

    // Only show published jobs
    jobs = jobs.filter(job => job.status === "PUBLISHED")

    // Sort jobs
    jobs.sort((a, b) => {
      let aValue: any = a[sortBy as keyof typeof a]
      let bValue: any = b[sortBy as keyof typeof b]
      
      if (sortBy === "createdAt" || sortBy === "updatedAt" || sortBy === "publishedAt") {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      }
      
      if (sortOrder === "desc") {
        return bValue - aValue
      } else {
        return aValue - bValue
      }
    })

    // Pagination
    const total = jobs.length
    const totalPages = Math.ceil(total / limit)
    const offset = (page - 1) * limit
    const paginatedJobs = jobs.slice(offset, offset + limit)

    // Enrich jobs with company data
    const enrichedJobs = paginatedJobs.map(job => enrichJobWithCompany(job, companies))

    return NextResponse.json({
      jobs: enrichedJobs,
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
    // TODO: Implement job creation with mock data
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