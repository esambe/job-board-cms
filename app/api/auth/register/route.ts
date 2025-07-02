import { NextRequest, NextResponse } from "next/server"
import { MockDataStorage } from "@/lib/storage"
import { User } from "@/lib/mock-data"
import { registerSchema } from "@/lib/validations"

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

    // Check if user already exists
    const existingUser = MockDataStorage.findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      )
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      email,
      password, // In a real app, this would be hashed
      name,
      role: role as "ADMIN" | "COMPANY" | "APPLICANT",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Add user to mock data
    const success = MockDataStorage.addUser(newUser)
    
    if (!success) {
      return NextResponse.json(
        { message: "Failed to create user" },
        { status: 500 }
      )
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser
    
    return NextResponse.json(
      { 
        message: "User created successfully",
        user: userWithoutPassword
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