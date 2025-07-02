"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft,
  MapPin, 
  Clock, 
  DollarSign,
  Calendar,
  Users,
  Building2,
  Globe,
  Share2,
  Bookmark,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import Link from "next/link"
import { Job, getJobs, updateJob, initializeData } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

const JOB_TYPES = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time", 
  CONTRACT: "Contract",
  INTERNSHIP: "Internship"
}

const EXPERIENCE_LEVELS = {
  ENTRY_LEVEL: "Entry Level",
  MID_LEVEL: "Mid Level",
  SENIOR_LEVEL: "Senior Level",
  EXECUTIVE: "Executive"
}

export default function JobDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    initializeData()
    loadJob()
    checkBookmarkStatus()
    updateJobViews()
  }, [params.id])

  const loadJob = () => {
    setLoading(true)
    try {
      const jobs = getJobs()
      const foundJob = jobs.find(j => j.id === params.id)
      
      if (foundJob) {
        setJob(foundJob)
      } else {
        toast({
          title: "Job Not Found",
          description: "The job you're looking for doesn't exist or has been removed.",
          variant: "destructive",
        })
        router.push("/jobs")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load job details",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const checkBookmarkStatus = () => {
    try {
      const bookmarkedJobs = JSON.parse(localStorage.getItem('bookmarked_jobs') || '[]')
      setIsBookmarked(bookmarkedJobs.includes(params.id))
    } catch (error) {
      console.error("Failed to check bookmark status:", error)
    }
  }

  const updateJobViews = () => {
    try {
      // Update view count for the job
      updateJob(params.id as string, { views: (job?.views || 0) + 1 })
    } catch (error) {
      console.error("Failed to update job views:", error)
    }
  }

  const handleBookmark = () => {
    try {
      const bookmarkedJobs = JSON.parse(localStorage.getItem('bookmarked_jobs') || '[]')
      
      if (isBookmarked) {
        const updated = bookmarkedJobs.filter((id: string) => id !== params.id)
        localStorage.setItem('bookmarked_jobs', JSON.stringify(updated))
        setIsBookmarked(false)
        toast({
          title: "Bookmark Removed",
          description: "Job removed from your bookmarks",
        })
      } else {
        const updated = [...bookmarkedJobs, params.id]
        localStorage.setItem('bookmarked_jobs', JSON.stringify(updated))
        setIsBookmarked(true)
        toast({
          title: "Bookmark Added",
          description: "Job saved to your bookmarks",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update bookmark",
        variant: "destructive",
      })
    }
  }

  const handleShare = async () => {
    const url = window.location.href
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: job?.title,
          text: `Check out this job: ${job?.title} at ${job?.company?.name}`,
          url: url,
        })
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to copying URL
      try {
        await navigator.clipboard.writeText(url)
        toast({
          title: "Link Copied",
          description: "Job link copied to clipboard",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to copy link",
          variant: "destructive",
        })
      }
    }
  }

  const isJobExpired = () => {
    if (!job?.deadline) return false
    return new Date() > new Date(job.deadline)
  }

  const isJobClosed = () => {
    return job?.status === "CLOSED" || job?.status === "ARCHIVED"
  }

  const canApply = () => {
    return job?.status === "PUBLISHED" && !isJobExpired() && !isJobClosed()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
              <p className="mt-2 text-sm text-muted-foreground">Loading job details...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
            <p className="text-gray-600 mb-8">The job you're looking for doesn't exist or has been removed.</p>
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
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" asChild>
              <Link href="/jobs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Jobs
              </Link>
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleBookmark}>
                <Bookmark className={`mr-2 h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Job Header */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                  {job.featured && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      Featured
                    </Badge>
                  )}
                  {!canApply() && (
                    <Badge variant="destructive">
                      {isJobExpired() ? 'Expired' : 'Closed'}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center space-x-6 text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Building2 className="h-4 w-4" />
                    <Link 
                      href={`/companies/${job.company?.id}`}
                      className="font-medium hover:text-blue-600"
                    >
                      {job.company?.name}
                    </Link>
                    {job.company?.verified && (
                      <Badge variant="outline" className="text-xs">Verified</Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                    {job.remote && <span className="text-blue-600">(Remote)</span>}
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{JOB_TYPES[job.jobType]}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{EXPERIENCE_LEVELS[job.experience]}</span>
                  </div>
                  {job.salaryMin && job.salaryMax && (
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-3 w-3" />
                      <span>
                        ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()} {job.currency}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap">{job.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Requirements */}
              {job.requirements && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <p className="whitespace-pre-wrap">{job.requirements}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Benefits */}
              {job.benefits && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <p className="whitespace-pre-wrap">{job.benefits}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Apply for this position</CardTitle>
                  {job.deadline && (
                    <CardDescription>
                      Application deadline: {new Date(job.deadline).toLocaleDateString()}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  {canApply() ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Applications are open</span>
                      </div>
                      <Button className="w-full" size="lg" asChild>
                        <Link href={`/jobs/${job.id}/apply`}>
                          Apply Now
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">
                          {isJobExpired() ? 'Application deadline has passed' : 'This position is no longer accepting applications'}
                        </span>
                      </div>
                      <Button className="w-full" disabled>
                        Apply Now
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Company Info */}
              {job.company && (
                <Card>
                  <CardHeader>
                    <CardTitle>About {job.company.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {job.company.description && (
                        <p className="text-sm text-gray-600">
                          {job.company.description}
                        </p>
                      )}
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Industry:</span>
                          <span>{job.company.industry}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Size:</span>
                          <span>{job.company.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Location:</span>
                          <span>{job.company.location}</span>
                        </div>
                        {job.company.foundedYear && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Founded:</span>
                            <span>{job.company.foundedYear}</span>
                          </div>
                        )}
                      </div>

                      {job.company.website && (
                        <Button variant="outline" className="w-full" asChild>
                          <a href={job.company.website} target="_blank" rel="noopener noreferrer">
                            <Globe className="mr-2 h-4 w-4" />
                            Visit Website
                          </a>
                        </Button>
                      )}

                      <Button variant="outline" className="w-full" asChild>
                        <Link href={`/companies/${job.company.id}`}>
                          <Building2 className="mr-2 h-4 w-4" />
                          View Company Profile
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Job Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Views:</span>
                      <span>{job.views}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Applications:</span>
                      <span>{job.applicationCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Category:</span>
                      <span>{job.category?.name}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}