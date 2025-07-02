import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  MapPin, 
  Users, 
  ExternalLink,
  CheckCircle,
  Building2,
  Filter
} from "lucide-react"

async function getCompanies(searchParams: any) {
  try {
    const params = new URLSearchParams()
    if (searchParams.search) params.append('search', searchParams.search)
    if (searchParams.industry) params.append('industry', searchParams.industry)
    if (searchParams.size) params.append('size', searchParams.size)
    if (searchParams.verified) params.append('verified', searchParams.verified)
    if (searchParams.page) params.append('page', searchParams.page)
    
    const res = await fetch(`http://localhost:3000/api/companies?${params}`, {
      cache: 'no-store'
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch companies')
    }
    
    return await res.json()
  } catch (error) {
    console.error('Error fetching companies:', error)
    return { companies: [], pagination: { page: 1, limit: 20, total: 0, pages: 0 } }
  }
}

function CompanyCard({ company }: { company: any }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-gray-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">
                  <Link 
                    href={`/companies/${company.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {company.name}
                  </Link>
                </CardTitle>
                {company.verified && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
              </div>
              <CardDescription className="flex items-center gap-1">
                <span>{company.industry}</span>
                <span>•</span>
                <span>{company.size} employees</span>
              </CardDescription>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {company.website && (
              <Button variant="outline" size="sm" asChild>
                <a href={company.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {company.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{company.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{company._count.jobs} open jobs</span>
            </div>
          </div>
          
          <Link href={`/companies/${company.slug}`}>
            <Button variant="outline" size="sm">
              View Company
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default async function CompaniesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const data = await getCompanies(searchParams)
  const { companies, pagination } = data

  const industries = [
    "Technology",
    "SaaS", 
    "Design",
    "Analytics",
    "Cloud Computing",
    "Marketing",
    "Finance",
    "Healthcare"
  ]

  const companySizes = [
    "1-10",
    "11-50", 
    "51-200",
    "201-500",
    "500+"
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Discover Amazing Companies
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find your next opportunity with innovative companies that are changing the world
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <form className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search companies..."
                  className="pl-10"
                  name="search"
                  defaultValue={searchParams.search}
                />
              </div>
              <Button type="submit" size="lg" className="px-8">
                Search Companies
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Industry Filter */}
                <div>
                  <h4 className="font-medium mb-3">Industry</h4>
                  <div className="space-y-2">
                    {industries.map((industry) => (
                      <label key={industry} className="flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name="industry"
                          value={industry}
                          defaultChecked={searchParams.industry === industry}
                          className="text-primary"
                        />
                        <span>{industry}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Company Size Filter */}
                <div>
                  <h4 className="font-medium mb-3">Company Size</h4>
                  <div className="space-y-2">
                    {companySizes.map((size) => (
                      <label key={size} className="flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name="size"
                          value={size}
                          defaultChecked={searchParams.size === size}
                          className="text-primary"
                        />
                        <span>{size} employees</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Verified Filter */}
                <div>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      name="verified"
                      value="true"
                      defaultChecked={searchParams.verified === "true"}
                      className="text-primary"
                    />
                    <span>Verified companies only</span>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Companies Grid */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {pagination.total} companies found
              </h2>
              
              <select className="px-3 py-2 border rounded-md text-sm">
                <option>Sort by: Most Recent</option>
                <option>Sort by: Name A-Z</option>
                <option>Sort by: Name Z-A</option>
                <option>Sort by: Most Jobs</option>
              </select>
            </div>

            {/* Companies List */}
            <div className="space-y-6">
              {companies.length > 0 ? (
                companies.map((company: any) => (
                  <CompanyCard key={company.id} company={company} />
                ))
              ) : (
                <div className="text-center py-12">
                  <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No companies found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search criteria or browse all companies
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    disabled={pagination.page === 1}
                    asChild
                  >
                    <Link href={{
                      pathname: '/companies',
                      query: { ...searchParams, page: pagination.page - 1 }
                    }}>
                      Previous
                    </Link>
                  </Button>
                  
                  {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                    const page = i + 1
                    return (
                      <Button
                        key={page}
                        variant={pagination.page === page ? "default" : "outline"}
                        asChild
                      >
                        <Link href={{
                          pathname: '/companies',
                          query: { ...searchParams, page }
                        }}>
                          {page}
                        </Link>
                      </Button>
                    )
                  })}
                  
                  <Button
                    variant="outline"
                    disabled={pagination.page === pagination.pages}
                    asChild
                  >
                    <Link href={{
                      pathname: '/companies',
                      query: { ...searchParams, page: pagination.page + 1 }
                    }}>
                      Next
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}