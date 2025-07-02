import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Calendar,
  ExternalLink,
  Bookmark,
  Share2,
  Eye,
  Building2,
  CheckCircle
} from "lucide-react"

async function getJob(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/jobs/${id}`, {
      cache: 'no-store'
    })
    
    if (!res.ok) {
      return null
    }
    
    const data = await res.json()
    return data.job
  } catch (error) {
    console.error('Error fetching job:', error)
    return null
  }
}

function formatSalary(min: number, max: number, currency: string) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  
  return `${formatter.format(min)} - ${formatter.format(max)}`
}

function formatJobType(jobType: string) {
  return jobType.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ')
}

function formatExperienceLevel(level: string) {
  return level.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ')
}

function formatDate(date: string | Date) {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
    Math.ceil((dateObj.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
    'day'
  )
}

export default async function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = await getJob(params.id)
  
  if (!job) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link href="/jobs" className="hover:text-primary">
              Jobs
            </Link>
            <span>/</span>
            <span className="text-gray-900">{job.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-gray-400" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                    {job.featured && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Link 
                      href={`/companies/${job.company.slug}`}
                      className="text-lg text-primary hover:underline font-medium"
                    >
                      {job.company.name}
                    </Link>
                    {job.company.verified && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                      {job.remote && <Badge variant="outline">Remote</Badge>}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatJobType(job.jobType)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span>{formatSalary(job.salaryMin, job.salaryMax, job.currency)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{formatExperienceLevel(job.experience)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Save Job
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button size="lg" className="px-8">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <div className="whitespace-pre-line">{job.description}</div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            {job.requirements && (
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-gray max-w-none">
                    <div className="whitespace-pre-line">{job.requirements}</div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Benefits */}
            {job.benefits && (
              <Card>
                <CardHeader>
                  <CardTitle>Benefits & Perks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-gray max-w-none">
                    <div className="whitespace-pre-line">{job.benefits}</div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Button */}
            <Card>
              <CardContent className="p-6">
                <Button size="lg" className="w-full mb-4">
                  Apply for this Job
                </Button>
                <div className="text-center text-sm text-gray-600">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Eye className="h-4 w-4" />
                    <span>{job.views} views</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{job._count.applications} applications</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Details */}
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Job Type</h4>
                  <p className="text-gray-600">{formatJobType(job.jobType)}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Experience Level</h4>
                  <p className="text-gray-600">{formatExperienceLevel(job.experience)}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Category</h4>
                  <Link 
                    href={`/jobs?category=${job.category.slug}`}
                    className="text-primary hover:underline"
                  >
                    {job.category.name}
                  </Link>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Posted</h4>
                  <p className="text-gray-600">{formatDate(job.publishedAt)}</p>
                </div>
                
                {job.expiresAt && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Expires</h4>
                      <p className="text-gray-600">{formatDate(job.expiresAt)}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>About {job.company.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">{job.company.name}</h4>
                    <p className="text-sm text-gray-600">{job.company.industry}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm">{job.company.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Company Size</span>
                    <span className="font-medium">{job.company.size} employees</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium">{job.company.location}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href={`/companies/${job.company.slug}`}>
                      View Company
                    </Link>
                  </Button>
                  {job.company.website && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={job.company.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}