import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/db"
import { compare } from "bcryptjs"

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma), // Disabled for now due to Prisma generation issues
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

        // TODO: Implement database authentication when Prisma is working
        // For now, return a test user for demo purposes
        if (credentials.email === "admin@jobboard.com" && credentials.password === "admin123") {
          return {
            id: "admin-1",
            email: "admin@jobboard.com",
            name: "Admin User",
            role: "ADMIN",
            companyId: null,
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role
        token.companyId = user.companyId
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
      // For OAuth providers, allow sign in 
      if (account?.provider !== "credentials") {
        // TODO: Create user in database when Prisma is working
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