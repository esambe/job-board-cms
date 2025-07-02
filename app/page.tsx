import { Button } from "@/components/ui/button"
import { Building2, Users, Briefcase, Search } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Job Board CMS
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Comprehensive Content Management System for job boards with modern UI/UX 
            for all user roles - Admin, Company, and Applicants
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="gap-2">
              <Search className="h-5 w-5" />
              Find Jobs
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Building2 className="h-5 w-5" />
              Post Jobs
            </Button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Admin Dashboard</h3>
            <p className="text-gray-600">
              Comprehensive admin interface with analytics, user management, and job moderation
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Company Portal</h3>
            <p className="text-gray-600">
              Modern dashboard for companies to manage job postings and track applications
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Job Search</h3>
            <p className="text-gray-600">
              Advanced job search with filters, categories, and personalized recommendations
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Built With Modern Technology</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4">
            <div className="font-semibold text-lg">Next.js 14+</div>
            <div className="text-gray-600">App Router</div>
          </div>
          <div className="p-4">
            <div className="font-semibold text-lg">TypeScript</div>
            <div className="text-gray-600">Type Safety</div>
          </div>
          <div className="p-4">
            <div className="font-semibold text-lg">Tailwind CSS</div>
            <div className="text-gray-600">Modern Styling</div>
          </div>
          <div className="p-4">
            <div className="font-semibold text-lg">Prisma</div>
            <div className="text-gray-600">Database ORM</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Job Board CMS. Built with Next.js and modern web technologies.</p>
        </div>
      </footer>
    </div>
  )
}
