import { NextRequest, NextResponse } from "next/server"
import { MockDataStorage, DataBackup } from "@/lib/storage"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    // Check if user is admin
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 403 }
      )
    }

    const { action } = await request.json()

    switch (action) {
      case "reset":
        // Reset to initial mock data
        const initialData = MockDataStorage.resetData()
        return NextResponse.json({
          message: "Data reset to initial state successfully",
          stats: {
            users: initialData.users.length,
            companies: initialData.companies.length,
            jobs: initialData.jobs.length,
            applications: initialData.applications.length,
            categories: initialData.categories.length,
          }
        })

      case "export":
        // Export current data
        const exportData = DataBackup.exportData()
        return NextResponse.json({
          message: "Data exported successfully",
          data: exportData,
        })

      case "import":
        // Import data from request
        const { data } = await request.json()
        if (!data) {
          return NextResponse.json(
            { error: "No data provided for import" },
            { status: 400 }
          )
        }
        
        const success = DataBackup.importData(data)
        if (!success) {
          return NextResponse.json(
            { error: "Failed to import data" },
            { status: 400 }
          )
        }

        return NextResponse.json({
          message: "Data imported successfully"
        })

      case "clear":
        // Clear all data
        DataBackup.clearAllData()
        return NextResponse.json({
          message: "All data cleared successfully"
        })

      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error("Data management error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check if user is admin
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 403 }
      )
    }

    // Get current data statistics
    const data = MockDataStorage.getData()
    
    return NextResponse.json({
      stats: {
        users: data.users.length,
        companies: data.companies.length,
        jobs: data.jobs.length,
        applications: data.applications.length,
        categories: data.categories.length,
        lastUpdated: data.lastUpdated,
      },
      storage: {
        isAvailable: typeof window !== 'undefined' && 'localStorage' in window,
      }
    })
  } catch (error) {
    console.error("Data stats error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}