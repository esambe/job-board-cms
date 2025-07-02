import { NextRequest, NextResponse } from "next/server"

// Mock job data - same as in main jobs route but with full details
const mockJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    slug: "senior-frontend-developer-techcorp",
    description: `We are looking for a senior frontend developer to join our growing team. You will be working on cutting-edge web applications using React, TypeScript, and modern tooling.

## About the Role

As a Senior Frontend Developer, you'll be responsible for building and maintaining our web applications, working closely with our design and backend teams to deliver exceptional user experiences.

## Responsibilities

- Build responsive web applications using React and TypeScript
- Collaborate with designers to implement pixel-perfect UIs
- Write clean, maintainable, and well-tested code
- Mentor junior developers and participate in code reviews
- Stay up-to-date with the latest frontend technologies and best practices

## What We Offer

- Opportunity to work on challenging and impactful projects
- Collaborative and supportive team environment
- Professional development opportunities
- Modern tech stack and tools`,
    requirements: `• 5+ years of experience with React and TypeScript
• Strong understanding of modern JavaScript (ES6+)
• Experience with state management (Redux, Zustand)
• Knowledge of testing frameworks (Jest, React Testing Library)
• Familiarity with build tools (Webpack, Vite)
• Experience with version control (Git)
• Understanding of web performance optimization
• Knowledge of accessibility best practices`,
    benefits: `• Competitive salary and equity package
• Comprehensive health, dental, and vision insurance
• 401(k) with company matching
• Flexible working hours and remote work options
• Professional development budget ($2,000/year)
• Modern office with free snacks and drinks
• Team events and retreats
• Latest MacBook Pro and equipment`,
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
      description: "Leading technology company focused on innovative solutions for the modern workplace.",
      website: "https://techcorp.com",
      location: "San Francisco, CA",
      industry: "Technology",
      size: "201-500",
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
    expiresAt: new Date("2025-02-28"),
  },
  {
    id: "2",
    title: "Product Manager",
    slug: "product-manager-startupxyz",
    description: `Lead product strategy and execution for our innovative platform. Work closely with engineering, design, and business teams to deliver exceptional user experiences that drive business growth.

## About the Role

We're looking for an experienced Product Manager to join our fast-growing team. You'll own the product roadmap and work cross-functionally to bring new features to life.

## Key Responsibilities

- Define and execute product strategy and roadmap
- Gather and prioritize product requirements
- Work closely with engineering and design teams
- Analyze product metrics and user feedback
- Conduct market research and competitive analysis`,
    requirements: `• 3+ years of product management experience
• Strong analytical and problem-solving skills
• Experience with product analytics tools (Mixpanel, Amplitude)
• Excellent communication and leadership skills
• Understanding of agile development methodologies
• Bachelor's degree in relevant field
• Experience with B2B SaaS products preferred`,
    benefits: `• Equity package with high growth potential
• Health insurance and wellness stipend
• Unlimited PTO policy
• Learning and development budget
• Remote-first culture with flexible hours
• Regular team retreats and events
• Top-tier equipment and home office setup`,
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
      description: "Fast-growing startup revolutionizing the way people work and collaborate.",
      website: "https://startupxyz.com",
      location: "Austin, TX",
      industry: "SaaS",
      size: "11-50",
    },
    categoryId: "cat-3",
    category: {
      id: "cat-3",
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
    expiresAt: new Date("2025-01-25"),
  },
  {
    id: "3", 
    title: "UX Designer",
    slug: "ux-designer-design-studio",
    description: `Create amazing user experiences for our diverse client portfolio. You will be responsible for user research, wireframing, prototyping, and collaborating with development teams to bring designs to life.

## About the Role

Join our creative team as a UX Designer and help shape digital experiences for clients across various industries. You'll work on projects ranging from mobile apps to enterprise software.

## What You'll Do

- Conduct user research and usability testing
- Create wireframes, prototypes, and design systems
- Collaborate with developers to implement designs
- Present design concepts to clients and stakeholders`,
    requirements: `• 2+ years of UX design experience
• Proficiency in Figma or Sketch
• Strong portfolio showcasing UX process
• Experience with user research and testing
• Understanding of accessibility principles
• Excellent communication skills
• Knowledge of design systems and component libraries`,
    benefits: `• Creative and collaborative environment
• Professional development budget for conferences
• Flexible schedule and work arrangements
• Health and dental insurance
• Profit sharing program
• Access to latest design tools and software
• Beautiful studio space in Manhattan`,
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
      description: "Creative agency specializing in brand identity and digital experiences.",
      website: "https://designstudio.com",
      location: "New York, NY",
      industry: "Design",
      size: "11-50",
    },
    categoryId: "cat-2",
    category: {
      id: "cat-2",
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
    expiresAt: new Date("2025-01-27"),
  },
]

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const jobId = params.id
    
    const job = mockJobs.find(j => j.id === jobId)
    
    if (!job) {
      return NextResponse.json(
        { message: "Job not found" },
        { status: 404 }
      )
    }

    // Increment view count (in real app, this would update the database)
    job.views += 1

    return NextResponse.json({ job })
  } catch (error) {
    console.error("Job details API error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}