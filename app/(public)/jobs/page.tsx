"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Search, MapPin, Clock, DollarSign, Filter } from "lucide-react"
import { formatCurrency, formatRelativeTime, formatJobType } from "@/lib/utils"

interface Job {
  id: string
  title: string
  company: {
    name: string
    logo?: string
    verified: boolean
  }
  location: string
  remote: boolean
  jobType: string
  experience: string
  salaryMin?: number
  salaryMax?: number
  currency: string
  description: string
  featured: boolean
  publishedAt: string
  views: number
}

interface JobsResponse {
  jobs: Job[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [location, setLocation] = useState("")
  const [jobType, setJobType] = useState<string[]>([])
  const [experience, setExperience] = useState<string[]>([])
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    totalPages: 0,
  })

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: "20",
      })
      
      if (search) params.set("search", search)
      if (location) params.set("location", location)
      jobType.forEach(type => params.append("jobType", type))
      experience.forEach(exp => params.append("experience", exp))

      const response = await fetch(`/api/jobs?${params}`)
      if (!response.ok) throw new Error("Failed to fetch jobs")
      
      const data: JobsResponse = await response.json()
      setJobs(data.jobs)
      setPagination({
        page: data.pagination.page,
        total: data.pagination.total,
        totalPages: data.pagination.totalPages,
      })
    } catch (error) {
      console.error("Error fetching jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [pagination.page])

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, page: 1 }))
    fetchJobs()
  }

  const toggleJobType = (type: string) => {
    setJobType(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  const toggleExperience = (exp: string) => {
    setExperience(prev => 
      prev.includes(exp) 
        ? prev.filter(e => e !== exp)
        : [...prev, exp]
    )
  }

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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="relative md:w-64">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Location"
                className="pl-10"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button size="lg" className="md:w-auto" onClick={handleSearch}>
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
                    {[
                      { value: "FULL_TIME", label: "Full Time" },
                      { value: "PART_TIME", label: "Part Time" },
                      { value: "CONTRACT", label: "Contract" },
                      { value: "FREELANCE", label: "Freelance" },
                      { value: "INTERNSHIP", label: "Internship" }
                    ].map((type) => (
                      <label key={type.value} className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300"
                          checked={jobType.includes(type.value)}
                          onChange={() => toggleJobType(type.value)}
                        />
                        <span className="text-sm">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Experience Level</h4>
                  <div className="space-y-2">
                    {[
                      { value: "ENTRY_LEVEL", label: "Entry Level" },
                      { value: "MID_LEVEL", label: "Mid Level" },
                      { value: "SENIOR_LEVEL", label: "Senior Level" },
                      { value: "EXECUTIVE", label: "Executive" }
                    ].map((level) => (
                      <label key={level.value} className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300"
                          checked={experience.includes(level.value)}
                          onChange={() => toggleExperience(level.value)}
                        />
                        <span className="text-sm">{level.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={handleSearch}
                  className="w-full"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Apply Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {loading ? "Loading..." : `${pagination.total} jobs found`}
              </h2>
              <select className="border border-gray-300 rounded-md px-3 py-2">
                <option>Sort by: Most Recent</option>
                <option>Sort by: Most Relevant</option>
                <option>Sort by: Salary High to Low</option>
                <option>Sort by: Salary Low to High</option>
              </select>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {jobs.map((job) => (
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
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-lg text-gray-700">{job.company.name}</p>
                            {job.company.verified && (
                              <Badge variant="outline" className="text-xs">
                                ✓ Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {job.remote ? "Remote" : job.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {formatJobType(job.jobType)}
                            </div>
                            {job.salaryMin && job.salaryMax && (
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <span>👁️</span>
                              {job.views} views
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-sm text-gray-500">
                            {formatRelativeTime(job.publishedAt)}
                          </span>
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
            )}

            {/* Pagination */}
            {!loading && pagination.totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    disabled={pagination.page === 1}
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  >
                    Previous
                  </Button>
                  
                  <span className="px-3 py-2 text-sm">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  
                  <Button 
                    variant="outline"
                    disabled={pagination.page === pagination.totalPages}
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  >
                    Next
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