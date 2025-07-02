import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/db"
import { compare } from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signUp: "/register",
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

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          include: {
            company: true,
          },
        })

        if (!user) {
          return null
        }

        // For OAuth users, password might not be set
        if (!user.password) {
          return null
        }

        const isPasswordValid = await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
          companyId: user.companyId,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          include: { company: true },
        })

        if (dbUser) {
          token.role = dbUser.role
          token.companyId = dbUser.companyId
        }
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
      // For OAuth providers, create user profile if it doesn't exist
      if (account?.provider !== "credentials") {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          })

          if (existingUser) {
            return true
          }

          // Create new user with OAuth data
          await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name || "",
              image: user.image,
              role: "APPLICANT", // Default role
            },
          })
        } catch (error) {
          console.error("Error creating user:", error)
          return false
        }
      }

      return true
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      // Log sign-in events for analytics
      console.log(`User ${user.email} signed in with ${account?.provider}`)
    },
    async createUser({ user }) {
      // Create user profile when new user is created
      try {
        await prisma.userProfile.create({
          data: {
            userId: user.id,
          },
        })
      } catch (error) {
        console.error("Error creating user profile:", error)
      }
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