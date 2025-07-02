import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Search, MapPin, Clock, DollarSign } from "lucide-react"

// Mock data for now
const mockJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "FULL_TIME",
    salary: "$120,000 - $150,000",
    description: "We're looking for a senior frontend developer to join our growing team...",
    postedAt: "2 days ago",
    featured: true,
  },
  {
    id: "2",
    title: "Product Manager",
    company: "StartupXYZ",
    location: "Remote",
    type: "FULL_TIME",
    salary: "$100,000 - $130,000",
    description: "Lead product strategy and execution for our innovative platform...",
    postedAt: "1 week ago",
    featured: false,
  },
  {
    id: "3",
    title: "UX Designer",
    company: "Design Studio",
    location: "New York, NY",
    type: "CONTRACT",
    salary: "$80,000 - $100,000",
    description: "Create amazing user experiences for our diverse client portfolio...",
    postedAt: "3 days ago",
    featured: false,
  },
]

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Dream Job</h1>
            <p className="text-gray-600">Discover opportunities from top companies</p>
          </div>
          
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Job title, keywords, or company"
                className="pl-10"
              />
            </div>
            <div className="relative md:w-64">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Location"
                className="pl-10"
              />
            </div>
            <Button size="lg" className="md:w-auto">
              Search Jobs
            </Button>
          </div>
        </div>
      </div>

      {/* Filters and Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Job Type</h4>
                  <div className="space-y-2">
                    {["Full Time", "Part Time", "Contract", "Freelance"].map((type) => (
                      <label key={type} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Experience Level</h4>
                  <div className="space-y-2">
                    {["Entry Level", "Mid Level", "Senior Level", "Executive"].map((level) => (
                      <label key={level} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {mockJobs.length} jobs found
              </h2>
              <select className="border border-gray-300 rounded-md px-3 py-2">
                <option>Sort by: Most Recent</option>
                <option>Sort by: Most Relevant</option>
                <option>Sort by: Salary High to Low</option>
                <option>Sort by: Salary Low to High</option>
              </select>
            </div>

            <div className="space-y-6">
              {mockJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {job.title}
                          </h3>
                          {job.featured && (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <p className="text-lg text-gray-700 mb-2">{job.company}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job.type.replace("_", " ")}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {job.salary}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-sm text-gray-500">{job.postedAt}</span>
                        <Button asChild>
                          <Link href={`/jobs/${job.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-600 line-clamp-2">{job.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="outline" className="bg-primary text-primary-foreground">
                  1
                </Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}