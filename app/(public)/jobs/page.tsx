"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Search, MapPin, Clock, DollarSign, Filter, X, Eye, Users } from "lucide-react"
import { Job, getJobs, getCategories, getCompanies, initializeData } from "@/lib/data"

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

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [companies, setCompanies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([])
  const [selectedExperience, setSelectedExperience] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [remoteOnly, setRemoteOnly] = useState(false)
  const [featuredOnly, setFeaturedOnly] = useState(false)
  const [salaryRange, setSalaryRange] = useState({ min: "", max: "" })
  const [sortBy, setSortBy] = useState("recent")

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const jobsPerPage = 10

  useEffect(() => {
    initializeData()
    loadData()
  }, [])

  useEffect(() => {
    filterAndSortJobs()
  }, [
    jobs, searchTerm, locationFilter, selectedJobTypes, selectedExperience,
    selectedCategories, selectedCompanies, remoteOnly, featuredOnly, salaryRange, sortBy
  ])

  const loadData = () => {
    setLoading(true)
    try {
      const jobsData = getJobs().filter(job => job.status === "PUBLISHED")
      const categoriesData = getCategories()
      const companiesData = getCompanies()
      
      setJobs(jobsData)
      setCategories(categoriesData)
      setCompanies(companiesData)
    } catch (error) {
      console.error("Failed to load data:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortJobs = () => {
    let filtered = [...jobs]

    // Text search
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Location filter
    if (locationFilter) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      )
    }

    // Job type filter
    if (selectedJobTypes.length > 0) {
      filtered = filtered.filter(job => selectedJobTypes.includes(job.jobType))
    }

    // Experience level filter
    if (selectedExperience.length > 0) {
      filtered = filtered.filter(job => selectedExperience.includes(job.experience))
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(job => selectedCategories.includes(job.categoryId))
    }

    // Company filter
    if (selectedCompanies.length > 0) {
      filtered = filtered.filter(job => selectedCompanies.includes(job.companyId))
    }

    // Remote only filter
    if (remoteOnly) {
      filtered = filtered.filter(job => job.remote)
    }

    // Featured only filter
    if (featuredOnly) {
      filtered = filtered.filter(job => job.featured)
    }

    // Salary range filter
    if (salaryRange.min || salaryRange.max) {
      filtered = filtered.filter(job => {
        if (!job.salaryMin || !job.salaryMax) return false
        
        const minSalary = parseInt(salaryRange.min) || 0
        const maxSalary = parseInt(salaryRange.max) || Infinity
        
        return job.salaryMin >= minSalary && job.salaryMax <= maxSalary
      })
    }

    // Sort jobs
    switch (sortBy) {
      case "recent":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "salary-high":
        filtered.sort((a, b) => (b.salaryMax || 0) - (a.salaryMax || 0))
        break
      case "salary-low":
        filtered.sort((a, b) => (a.salaryMin || 0) - (b.salaryMin || 0))
        break
      case "applications":
        filtered.sort((a, b) => b.applicationCount - a.applicationCount)
        break
      default:
        break
    }

    setFilteredJobs(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handleFilterChange = (filterType: string, value: string, checked: boolean) => {
    switch (filterType) {
      case "jobType":
        setSelectedJobTypes(prev => 
          checked ? [...prev, value] : prev.filter(t => t !== value)
        )
        break
      case "experience":
        setSelectedExperience(prev => 
          checked ? [...prev, value] : prev.filter(e => e !== value)
        )
        break
      case "category":
        setSelectedCategories(prev => 
          checked ? [...prev, value] : prev.filter(c => c !== value)
        )
        break
      case "company":
        setSelectedCompanies(prev => 
          checked ? [...prev, value] : prev.filter(c => c !== value)
        )
        break
    }
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setLocationFilter("")
    setSelectedJobTypes([])
    setSelectedExperience([])
    setSelectedCategories([])
    setSelectedCompanies([])
    setRemoteOnly(false)
    setFeaturedOnly(false)
    setSalaryRange({ min: "", max: "" })
  }

  const hasActiveFilters = () => {
    return searchTerm || locationFilter || selectedJobTypes.length > 0 || 
           selectedExperience.length > 0 || selectedCategories.length > 0 || 
           selectedCompanies.length > 0 || remoteOnly || featuredOnly || 
           salaryRange.min || salaryRange.max
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)
  const startIndex = (currentPage - 1) * jobsPerPage
  const endIndex = startIndex + jobsPerPage
  const currentJobs = filteredJobs.slice(startIndex, endIndex)

  const formatSalary = (job: Job) => {
    if (!job.salaryMin || !job.salaryMax) return null
    return `$${job.salaryMin.toLocaleString()} - $${job.salaryMax.toLocaleString()}`
  }

  const formatPostedDate = (date: string) => {
    const now = new Date()
    const posted = new Date(date)
    const diffInDays = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "Yesterday"
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    return `${Math.floor(diffInDays / 30)} months ago`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
              <p className="mt-2 text-sm text-muted-foreground">Loading jobs...</p>
            </div>
          </div>
        </div>
      </div>
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative md:w-64">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Location"
                className="pl-10"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>
            <Button size="lg" onClick={() => filterAndSortJobs()}>
              Search Jobs
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Filters</CardTitle>
                  {hasActiveFilters() && (
                    <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                      <X className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Quick Filters */}
                  <div>
                    <h4 className="font-medium mb-3">Quick Filters</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300"
                          checked={remoteOnly}
                          onChange={(e) => setRemoteOnly(e.target.checked)}
                        />
                        <span className="text-sm">Remote Only</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300"
                          checked={featuredOnly}
                          onChange={(e) => setFeaturedOnly(e.target.checked)}
                        />
                        <span className="text-sm">Featured Jobs</span>
                      </label>
                    </div>
                  </div>

                  {/* Job Type */}
                  <div>
                    <h4 className="font-medium mb-3">Job Type</h4>
                    <div className="space-y-2">
                      {Object.entries(JOB_TYPES).map(([key, label]) => (
                        <label key={key} className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300"
                            checked={selectedJobTypes.includes(key)}
                            onChange={(e) => handleFilterChange("jobType", key, e.target.checked)}
                          />
                          <span className="text-sm">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Experience Level */}
                  <div>
                    <h4 className="font-medium mb-3">Experience Level</h4>
                    <div className="space-y-2">
                      {Object.entries(EXPERIENCE_LEVELS).map(([key, label]) => (
                        <label key={key} className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300"
                            checked={selectedExperience.includes(key)}
                            onChange={(e) => handleFilterChange("experience", key, e.target.checked)}
                          />
                          <span className="text-sm">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Categories */}
                  {categories.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-3">Categories</h4>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <label key={category.id} className="flex items-center space-x-2">
                            <input 
                              type="checkbox" 
                              className="rounded border-gray-300"
                              checked={selectedCategories.includes(category.id)}
                              onChange={(e) => handleFilterChange("category", category.id, e.target.checked)}
                            />
                            <span className="text-sm">{category.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Companies */}
                  {companies.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-3">Companies</h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {companies.map((company) => (
                          <label key={company.id} className="flex items-center space-x-2">
                            <input 
                              type="checkbox" 
                              className="rounded border-gray-300"
                              checked={selectedCompanies.includes(company.id)}
                              onChange={(e) => handleFilterChange("company", company.id, e.target.checked)}
                            />
                            <span className="text-sm">{company.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Salary Range */}
                  <div>
                    <h4 className="font-medium mb-3">Salary Range</h4>
                    <div className="space-y-2">
                      <Input
                        placeholder="Min salary"
                        type="number"
                        value={salaryRange.min}
                        onChange={(e) => setSalaryRange(prev => ({ ...prev, min: e.target.value }))}
                      />
                      <Input
                        placeholder="Max salary"
                        type="number"
                        value={salaryRange.max}
                        onChange={(e) => setSalaryRange(prev => ({ ...prev, max: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
                </h2>
                {hasActiveFilters() && (
                  <p className="text-sm text-gray-500">
                    Showing filtered results from {jobs.length} total jobs
                  </p>
                )}
              </div>
              <select 
                className="border border-gray-300 rounded-md px-3 py-2"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recent">Most Recent</option>
                <option value="salary-high">Salary: High to Low</option>
                <option value="salary-low">Salary: Low to High</option>
                <option value="applications">Most Applied</option>
              </select>
            </div>

            {currentJobs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="mx-auto h-12 w-12" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-4">
                  {hasActiveFilters() 
                    ? "Try adjusting your filters to see more results"
                    : "No jobs are currently available"
                  }
                </p>
                {hasActiveFilters() && (
                  <Button variant="outline" onClick={clearAllFilters}>
                    Clear All Filters
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  {currentJobs.map((job) => (
                    <Card key={job.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl font-semibold text-gray-900">
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
                            <div className="flex items-center gap-2 mb-2">
                              <Link 
                                href={`/companies/${job.company?.id}`}
                                className="text-gray-600 font-medium hover:text-blue-600 transition-colors"
                              >
                                {job.company?.name}
                              </Link>
                              {job.company?.verified && (
                                <Badge variant="outline" className="text-xs">Verified</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{job.location}</span>
                                {job.remote && <span className="text-blue-600">(Remote)</span>}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{JOB_TYPES[job.jobType]}</span>
                              </div>
                              {formatSalary(job) && (
                                <div className="flex items-center gap-1">
                                  <DollarSign className="h-4 w-4" />
                                  <span>{formatSalary(job)}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                <span>{job.views} views</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{job.applicationCount} applications</span>
                              </div>
                              <span>Posted {formatPostedDate(job.createdAt)}</span>
                            </div>
                          </div>
                          <div className="text-right">
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
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2 mt-8">
                    <Button 
                      variant="outline" 
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                      Previous
                    </Button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1
                      return (
                        <Button 
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      )
                    })}
                    
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <span>...</span>
                        <Button 
                          variant="outline"
                          onClick={() => setCurrentPage(totalPages)}
                        >
                          {totalPages}
                        </Button>
                      </>
                    )}
                    
                    <Button 
                      variant="outline" 
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}