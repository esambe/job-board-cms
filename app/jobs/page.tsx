import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Clock, Building2, DollarSign, Search, Filter } from "lucide-react"

// Mock job data
const mockJobs = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    jobType: 'Full-time',
    experience: 'Senior Level',
    salary: '$120,000 - $150,000',
    postedDate: '2 days ago',
    description: 'Join our team as a Senior React Developer and help build the next generation of web applications.',
    remote: false,
    featured: true
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'StartupXYZ',
    location: 'New York, NY',
    jobType: 'Full-time',
    experience: 'Mid Level',
    salary: '$100,000 - $130,000',
    postedDate: '3 days ago',
    description: 'Lead product strategy and work with cross-functional teams to deliver amazing user experiences.',
    remote: true,
    featured: false
  },
  {
    id: '3',
    title: 'UX Designer',
    company: 'Design Studio',
    location: 'Remote',
    jobType: 'Full-time',
    experience: 'Mid Level',
    salary: '$80,000 - $110,000',
    postedDate: '5 days ago',
    description: 'Create beautiful and intuitive user interfaces for our digital products.',
    remote: true,
    featured: true
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'CloudTech Solutions',
    location: 'Austin, TX',
    jobType: 'Full-time',
    experience: 'Senior Level',
    salary: '$110,000 - $140,000',
    postedDate: '1 week ago',
    description: 'Manage cloud infrastructure and automate deployment processes.',
    remote: false,
    featured: false
  },
  {
    id: '5',
    title: 'Frontend Developer',
    company: 'WebFlow Inc.',
    location: 'Los Angeles, CA',
    jobType: 'Full-time',
    experience: 'Entry Level',
    salary: '$70,000 - $90,000',
    postedDate: '1 week ago',
    description: 'Build responsive web applications using modern frontend technologies.',
    remote: true,
    featured: false
  },
  {
    id: '6',
    title: 'Data Scientist',
    company: 'Analytics Pro',
    location: 'Boston, MA',
    jobType: 'Full-time',
    experience: 'Mid Level',
    salary: '$95,000 - $125,000',
    postedDate: '2 weeks ago',
    description: 'Analyze complex datasets and build predictive models to drive business insights.',
    remote: true,
    featured: true
  }
]

export default function JobsPage() {
  const featuredJobs = mockJobs.filter(job => job.featured)
  const allJobs = mockJobs

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Search Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-6">Find Your Next Job</h1>
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search jobs, companies, or keywords..."
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
            Search Jobs
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Featured Jobs */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Featured Jobs</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Building2 className="h-4 w-4" />
                      {job.company}
                    </CardDescription>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Featured
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {job.postedDate}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <DollarSign className="h-4 w-4" />
                  {job.salary}
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {job.description}
                </p>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    Apply Now
                  </Button>
                  <Button variant="outline" size="sm">
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Jobs */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">All Jobs</h2>
          <div className="text-sm text-gray-600">
            Showing {allJobs.length} jobs
          </div>
        </div>
        <div className="space-y-4">
          {allJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      {job.featured && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                      {job.remote && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Remote
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 mb-2">
                      <Building2 className="h-4 w-4" />
                      <span className="font-medium">{job.company}</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {job.salary}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {job.postedDate}
                      </div>
                    </div>
                    <p className="text-gray-700 line-clamp-2">
                      {job.description}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 ml-6">
                    <Button size="sm">
                      Apply Now
                    </Button>
                    <Button variant="outline" size="sm">
                      Save Job
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}