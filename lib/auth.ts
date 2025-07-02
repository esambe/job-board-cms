import { NextAuthOptions } from "next-auth"
// import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
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

        // TODO: Implement database authentication
        // For now, return null to disable credentials auth
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        // TODO: Fetch user from database
        token.role = "APPLICANT" // Default role
        token.companyId = null
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