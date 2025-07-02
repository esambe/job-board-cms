import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building2, MapPin, Users, Briefcase, Search, Globe, CheckCircle } from "lucide-react"

// Mock company data
const mockCompanies = [
  {
    id: '1',
    name: 'TechCorp Inc.',
    logo: null,
    description: 'Leading technology company focused on innovative software solutions.',
    location: 'San Francisco, CA',
    industry: 'Technology',
    size: '1000-5000 employees',
    website: 'https://techcorp.com',
    verified: true,
    openJobs: 25,
    founded: 2010
  },
  {
    id: '2',
    name: 'StartupXYZ',
    logo: null,
    description: 'Fast-growing startup revolutionizing the e-commerce space.',
    location: 'New York, NY',
    industry: 'E-commerce',
    size: '50-200 employees',
    website: 'https://startupxyz.com',
    verified: true,
    openJobs: 8,
    founded: 2018
  },
  {
    id: '3',
    name: 'Design Studio',
    logo: null,
    description: 'Creative agency specializing in digital design and user experience.',
    location: 'Los Angeles, CA',
    industry: 'Design',
    size: '10-50 employees',
    website: 'https://designstudio.com',
    verified: true,
    openJobs: 5,
    founded: 2015
  },
  {
    id: '4',
    name: 'CloudTech Solutions',
    logo: null,
    description: 'Cloud infrastructure and DevOps solutions provider.',
    location: 'Austin, TX',
    industry: 'Cloud Computing',
    size: '200-500 employees',
    website: 'https://cloudtech.com',
    verified: true,
    openJobs: 12,
    founded: 2012
  },
  {
    id: '5',
    name: 'WebFlow Inc.',
    logo: null,
    description: 'Modern web development platform and tools.',
    location: 'Seattle, WA',
    industry: 'Software',
    size: '500-1000 employees',
    website: 'https://webflow.com',
    verified: true,
    openJobs: 18,
    founded: 2013
  },
  {
    id: '6',
    name: 'Analytics Pro',
    logo: null,
    description: 'Data analytics and business intelligence solutions.',
    location: 'Boston, MA',
    industry: 'Analytics',
    size: '100-500 employees',
    website: 'https://analyticspro.com',
    verified: false,
    openJobs: 7,
    founded: 2016
  }
]

export default function CompaniesPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Search Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-6">Discover Great Companies</h1>
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search companies by name or industry..."
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Location"
                className="pl-10"
              />
            </div>
          </div>
          <Button size="lg" className="gap-2">
            <Search className="h-4 w-4" />
            Search Companies
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Companies</p>
                <p className="text-2xl font-bold">567</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Verified Companies</p>
                <p className="text-2xl font-bold">425</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open Positions</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
              <Briefcase className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Industries</p>
                <p className="text-2xl font-bold">28</p>
              </div>
              <Globe className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Companies Grid */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Companies</h2>
          <div className="text-sm text-gray-600">
            Showing {mockCompanies.length} companies
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockCompanies.map((company) => (
            <Card key={company.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {company.name}
                        {company.verified && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </CardTitle>
                      <CardDescription>{company.industry}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-700 line-clamp-2">
                  {company.description}
                </p>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {company.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {company.size}
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    {company.openJobs} open positions
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Founded {company.founded}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    View Jobs
                  </Button>
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Load More Section */}
      <div className="text-center pt-8">
        <Button variant="outline" size="lg">
          Load More Companies
        </Button>
      </div>
    </div>
  )
}