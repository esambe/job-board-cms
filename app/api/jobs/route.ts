import { NextRequest, NextResponse } from 'next/server'

// Mock data for demo purposes
const mockJobs = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: { name: 'TechCorp Inc.', logo: null },
    location: 'San Francisco, CA',
    jobType: 'FULL_TIME',
    experience: 'SENIOR_LEVEL',
    salary: '$120,000 - $150,000',
    status: 'PUBLISHED',
    publishedAt: new Date('2024-01-15'),
    applications: 25
  },
  {
    id: '2',
    title: 'Product Manager',
    company: { name: 'StartupXYZ', logo: null },
    location: 'New York, NY',
    jobType: 'FULL_TIME',
    experience: 'MID_LEVEL',
    salary: '$100,000 - $130,000',
    status: 'PUBLISHED',
    publishedAt: new Date('2024-01-14'),
    applications: 18
  },
  {
    id: '3',
    title: 'UX Designer',
    company: { name: 'Design Studio', logo: null },
    location: 'Remote',
    jobType: 'FULL_TIME',
    experience: 'MID_LEVEL',
    salary: '$80,000 - $110,000',
    status: 'PUBLISHED',
    publishedAt: new Date('2024-01-13'),
    applications: 32
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''

    let filteredJobs = mockJobs
    
    if (search) {
      filteredJobs = mockJobs.filter(job => 
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex)

    return NextResponse.json({
      data: paginatedJobs,
      pagination: {
        page,
        limit,
        total: filteredJobs.length,
        pages: Math.ceil(filteredJobs.length / limit)
      },
      success: true
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch jobs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // In a real app, you would validate the data and save to database
    const newJob = {
      id: String(mockJobs.length + 1),
      ...data,
      status: 'DRAFT',
      publishedAt: null,
      applications: 0
    }

    return NextResponse.json({
      data: newJob,
      success: true,
      message: 'Job created successfully'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create job' },
      { status: 500 }
    )
  }
}