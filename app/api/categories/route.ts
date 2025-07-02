import { NextRequest, NextResponse } from "next/server"

// Mock categories data
const mockCategories = [
  {
    id: "cat-1",
    name: "Software Engineering",
    slug: "software-engineering",
    description: "Software development and engineering roles",
    icon: "Code",
    _count: { jobs: 25 },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "cat-2", 
    name: "Design",
    slug: "design",
    description: "UI/UX and graphic design positions",
    icon: "Palette",
    _count: { jobs: 12 },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "cat-3",
    name: "Product Management", 
    slug: "product-management",
    description: "Product strategy and management roles",
    icon: "Package",
    _count: { jobs: 8 },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "cat-4",
    name: "Marketing",
    slug: "marketing", 
    description: "Digital marketing and growth roles",
    icon: "Megaphone",
    _count: { jobs: 15 },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "cat-5",
    name: "Data Science",
    slug: "data-science",
    description: "Data analysis and machine learning roles", 
    icon: "BarChart",
    _count: { jobs: 18 },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeJobs = searchParams.get("includeJobs") === "true"
    
    return NextResponse.json({
      categories: mockCategories,
      success: true
    })
  } catch (error) {
    console.error("Categories API error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}