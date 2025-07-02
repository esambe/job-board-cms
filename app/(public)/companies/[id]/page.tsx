"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft,
  MapPin, 
  Globe,
  Calendar,
  Users,
  Building2,
  Briefcase,
  Eye,
  DollarSign,
  Clock
} from "lucide-react"
import Link from "next/link"
import { Company, Job, getCompanies, getJobs, initializeData } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

const COMPANY_SIZES = {
  STARTUP: "Startup (1-10 employees)",
  SMALL: "Small (11-50 employees)",
  MEDIUM: "Medium (51-200 employees)",
  LARGE: "Large (201-1000 employees)",
  ENTERPRISE: "Enterprise (1000+ employees)"
}

const JOB_TYPES = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time", 
  CONTRACT: "Contract",
  INTERNSHIP: "Internship"
}

export default function CompanyProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [company, setCompany] = useState<Company | null>(null)
  const [companyJobs, setCompanyJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    initializeData()
    loadCompanyData()
  }, [params.id])

  const loadCompanyData = () => {
    setLoading(true)
    try {
      const companies = getCompanies()
      const foundCompany = companies.find(c => c.id === params.id)
      
      if (foundCompany) {
        setCompany(foundCompany)
        
        // Load company jobs
        const jobs = getJobs()
        const companyJobsList = jobs.filter(job => 
          job.companyId === foundCompany.id && job.status === "PUBLISHED"
        )
        setCompanyJobs(companyJobsList)
      } else {
        toast({
          title: "Company Not Found",
          description: "The company you're looking for doesn't exist.",
          variant: "destructive",
        })
        router.push("/jobs")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load company details",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
              <p className="mt-2 text-sm text-muted-foreground">Loading company profile...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Company Not Found</h1>
            <p className="text-gray-600 mb-8">The company you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/jobs">Back to Jobs</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/jobs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Jobs
            </Link>
          </Button>

          {/* Company Header */}
          <div className="flex items-start space-x-6 mb-8">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                {company.logo ? (
                  <img 
                    src={company.logo} 
                    alt={`${company.name} logo`}
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                ) : (
                  <Building2 className="w-12 h-12 text-white" />
                )}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
                {company.verified && (
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Verified
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-6 text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <Building2 className="h-4 w-4" />
                  <span>{company.industry}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{COMPANY_SIZES[company.size]}</span>
                </div>
                {company.foundedYear && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Founded {company.foundedYear}</span>
                  </div>
                )}
              </div>
              
              {company.website && (
                <Button variant="outline" asChild>
                  <a href={company.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="mr-2 h-4 w-4" />
                    Visit Website
                  </a>
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* About Company */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>About {company.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {company.description ? (
                    <div className="prose max-w-none">
                      <p className="whitespace-pre-wrap text-gray-700">{company.description}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No company description available.</p>
                  )}
                </CardContent>
              </Card>

              {/* Open Positions */}
              <Card>
                <CardHeader>
                  <CardTitle>Open Positions ({companyJobs.length})</CardTitle>
                  <CardDescription>
                    Current job openings at {company.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {companyJobs.length === 0 ? (
                    <div className="text-center py-8">
                      <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Open Positions</h3>
                      <p className="text-gray-500">
                        {company.name} doesn't have any open positions at the moment.
                      </p>
                      <Button variant="outline" className="mt-4" asChild>
                        <Link href="/jobs">Browse Other Jobs</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {companyJobs.map((job) => (
                        <div key={job.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold text-lg text-gray-900">
                                  <Link 
                                    href={`/jobs/${job.id}`}
                                    className="hover:text-blue-600 transition-colors"
                                  >
                                    {job.title}
                                  </Link>
                                </h3>
                                {job.featured && (
                                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                    Featured
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-3 w-3" />
                                  <span>{job.location}</span>
                                  {job.remote && <span className="text-blue-600">(Remote)</span>}
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{JOB_TYPES[job.jobType]}</span>
                                </div>
                                {job.salaryMin && job.salaryMax && (
                                  <div className="flex items-center space-x-1">
                                    <DollarSign className="h-3 w-3" />
                                    <span>
                                      ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}
                                    </span>
                                  </div>
                                )}
                              </div>
                              
                              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                {job.description}
                              </p>
                              
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Eye className="h-3 w-3" />
                                  <span>{job.views} views</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users className="h-3 w-3" />
                                  <span>{job.applicationCount} applications</span>
                                </div>
                                <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                            
                            <div className="flex-shrink-0 ml-4">
                              <Button asChild>
                                <Link href={`/jobs/${job.id}`}>
                                  View Details
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Company Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Company Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Industry:</span>
                      <span className="font-medium">{company.industry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Company Size:</span>
                      <span className="font-medium">{COMPANY_SIZES[company.size]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Location:</span>
                      <span className="font-medium">{company.location}</span>
                    </div>
                    {company.foundedYear && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Founded:</span>
                        <span className="font-medium">{company.foundedYear}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-500">Open Jobs:</span>
                      <span className="font-medium">{companyJobs.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Total Views:</span>
                      <span className="font-semibold">
                        {companyJobs.reduce((sum, job) => sum + job.views, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Total Applications:</span>
                      <span className="font-semibold">
                        {companyJobs.reduce((sum, job) => sum + job.applicationCount, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Active Jobs:</span>
                      <span className="font-semibold">{companyJobs.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact */}
              {company.website && (
                <Card>
                  <CardHeader>
                    <CardTitle>Get in Touch</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" asChild>
                      <a href={company.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="mr-2 h-4 w-4" />
                        Visit Company Website
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}