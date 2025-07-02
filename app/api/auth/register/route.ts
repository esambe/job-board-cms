import { NextRequest, NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { registerSchema } from "@/lib/validations"
// import { prisma } from "@/lib/db" // Disabled for now due to Prisma generation issues

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request data
    const result = registerSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: result.error.issues },
        { status: 400 }
      )
    }

    const { name, email, password, role } = result.data

    // TODO: Implement database integration when Prisma is working
    // For now, return success for demonstration
    
    return NextResponse.json(
      { 
        message: "User created successfully (demo mode)",
        user: {
          id: "demo-" + Date.now(),
          name,
          email,
          role,
          companyId: null,
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}