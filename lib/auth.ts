import { NextAuthOptions } from "next-auth"
// import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { MockDataStorage } from "@/lib/storage"
// import { prisma } from "@/lib/db"
// import { compare } from "bcryptjs"

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Use mock data for authentication
        const user = MockDataStorage.findUserByEmail(credentials.email)
        
        if (!user) {
          return null
        }

        // In a real app, passwords would be hashed
        // For mock data, we do simple comparison
        if (user.password !== credentials.password) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          companyId: user.companyId,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        // User info from authorization
        token.role = user.role || "APPLICANT"
        token.companyId = user.companyId || null
      }

      if (trigger === "update" && session) {
        token.name = session.name
        token.email = session.email
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.companyId = token.companyId as string | null
      }

      return session
    },
    async signIn({ user, account, profile }) {
      // For OAuth providers, create user in mock data if doesn't exist
      if (account?.provider !== "credentials" && user.email) {
        const existingUser = MockDataStorage.findUserByEmail(user.email)
        if (!existingUser) {
          // Create new user in mock data
          const newUser = {
            id: `oauth-${Date.now()}`,
            email: user.email,
            password: "", // OAuth users don't have passwords
            name: user.name || "OAuth User",
            role: "APPLICANT" as const,
            image: user.image || undefined,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
          MockDataStorage.addUser(newUser)
        }
        return true
      }

      return true
    },
  },
}

declare module "next-auth" {
  interface User {
    role?: string
    companyId?: string | null
  }

  interface Session {
    user: {
      id: string
      email: string
      name: string
      image?: string
      role: string
      companyId?: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
    companyId?: string | null
  }
}