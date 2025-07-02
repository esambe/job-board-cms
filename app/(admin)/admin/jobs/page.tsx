"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  MoreHorizontal,
  Download,
  Users,
  MapPin,
  Clock,
  DollarSign
} from "lucide-react"
import Link from "next/link"
import { Job, getJobs, deleteJob, initializeData } from "@/lib/data"
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

const JOB_STATUS = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
  CLOSED: "Closed",
  ARCHIVED: "Archived"
}

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedJobs, setSelectedJobs] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    initializeData()
    loadJobs()
  }, [])

  useEffect(() => {
    filterJobs()
  }, [jobs, searchTerm, statusFilter, typeFilter])

  const loadJobs = () => {
    setLoading(true)
    try {
      const jobsData = getJobs()
      setJobs(jobsData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load jobs",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filterJobs = () => {
    let filtered = [...jobs]

    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(job => job.status === statusFilter)
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter(job => job.jobType === typeFilter)
    }

    setFilteredJobs(filtered)
  }

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job? This action cannot be undone.")) {
      return
    }

    try {
      const success = deleteJob(jobId)
      if (success) {
        loadJobs()
        toast({
          title: "Success",
          description: "Job deleted successfully",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to delete job",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete job",
        variant: "destructive",
      })
    }
  }

  const handleBulkDelete = async () => {
    if (selectedJobs.length === 0) return
    
    if (!confirm(`Are you sure you want to delete ${selectedJobs.length} job(s)? This action cannot be undone.`)) {
      return
    }

    try {
      selectedJobs.forEach(jobId => deleteJob(jobId))
      setSelectedJobs([])
      loadJobs()
      toast({
        title: "Success",
        description: `${selectedJobs.length} job(s) deleted successfully`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete jobs",
        variant: "destructive",
      })
    }
  }

  const handleSelectJob = (jobId: string) => {
    setSelectedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    )
  }

  const handleSelectAll = () => {
    setSelectedJobs(
      selectedJobs.length === filteredJobs.length 
        ? [] 
        : filteredJobs.map(job => job.id)
    )
  }

  const exportToCSV = () => {
    const headers = ["Title", "Company", "Location", "Type", "Status", "Applications", "Views", "Created"]
    const rows = filteredJobs.map(job => [
      job.title,
      job.company?.name || "",
      job.location,
      JOB_TYPES[job.jobType],
      JOB_STATUS[job.status],
      job.applicationCount.toString(),
      job.views.toString(),
      new Date(job.createdAt).toLocaleDateString()
    ])

    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `jobs-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    
    toast({
      title: "Success",
      description: "Jobs exported to CSV successfully",
    })
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      DRAFT: "secondary",
      PUBLISHED: "default",
      CLOSED: "destructive", 
      ARCHIVED: "outline"
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {JOB_STATUS[status as keyof typeof JOB_STATUS]}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Jobs</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
            <p className="mt-2 text-sm text-muted-foreground">Loading jobs...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Jobs</h1>
          <p className="text-muted-foreground">
            Manage job postings and track their performance
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button asChild>
            <Link href="/admin/jobs/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Job
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="all">All Status</option>
              {Object.entries(JOB_STATUS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="all">All Types</option>
              {Object.entries(JOB_TYPES).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
            <div className="text-sm text-muted-foreground flex items-center">
              Showing {filteredJobs.length} of {jobs.length} jobs
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedJobs.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                {selectedJobs.length} job(s) selected
              </div>
              <div className="flex space-x-2">
                <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Jobs List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Jobs ({filteredJobs.length})</CardTitle>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedJobs.length === filteredJobs.length && filteredJobs.length > 0}
                onChange={handleSelectAll}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-muted-foreground">Select all</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No jobs found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {searchTerm || statusFilter !== "all" || typeFilter !== "all" 
                  ? "Try adjusting your filters"
                  : "Get started by creating a new job posting"
                }
              </p>
              {!searchTerm && statusFilter === "all" && typeFilter === "all" && (
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/admin/jobs/new">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Job
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedJobs.includes(job.id)}
                        onChange={() => handleSelectJob(job.id)}
                        className="rounded border-gray-300"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg">{job.title}</h3>
                          {job.featured && (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                              Featured
                            </Badge>
                          )}
                          {getStatusBadge(job.status)}
                        </div>
                        
                        <div className="text-sm text-muted-foreground mb-2">
                          <span className="font-medium">{job.company?.name}</span>
                          {job.company?.verified && (
                            <Badge variant="outline" className="ml-2 text-xs">Verified</Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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
                                ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()} {job.currency}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right text-sm">
                        <div className="flex items-center space-x-4 text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{job.applicationCount}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{job.views}</span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Created {new Date(job.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/jobs/${job.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/jobs/${job.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteJob(job.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}