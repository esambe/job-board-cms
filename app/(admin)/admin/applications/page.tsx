"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Filter, 
  Eye, 
  Mail,
  Phone,
  Calendar,
  Briefcase,
  Building2,
  Download,
  User,
  FileText
} from "lucide-react"
import Link from "next/link"
import { Application, getApplications, updateApplication, initializeData } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

const APPLICATION_STATUS = {
  PENDING: "Pending",
  REVIEWED: "Reviewed", 
  SHORTLISTED: "Shortlisted",
  REJECTED: "Rejected",
  HIRED: "Hired"
}

const STATUS_COLORS = {
  PENDING: "bg-yellow-100 text-yellow-800",
  REVIEWED: "bg-blue-100 text-blue-800",
  SHORTLISTED: "bg-purple-100 text-purple-800", 
  REJECTED: "bg-red-100 text-red-800",
  HIRED: "bg-green-100 text-green-800"
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedApplications, setSelectedApplications] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    initializeData()
    loadApplications()
  }, [])

  useEffect(() => {
    filterApplications()
  }, [applications, searchTerm, statusFilter])

  const loadApplications = () => {
    setLoading(true)
    try {
      const applicationsData = getApplications()
      setApplications(applicationsData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load applications",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filterApplications = () => {
    let filtered = [...applications]

    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.applicantEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.job?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.job?.company?.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(app => app.status === statusFilter)
    }

    // Sort by most recent first
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    setFilteredApplications(filtered)
  }

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    try {
      const updates = {
        status: newStatus as Application['status'],
        reviewedBy: "admin", // In a real app, this would be the current user
        reviewedAt: new Date().toISOString()
      }
      
      const updatedApplication = updateApplication(applicationId, updates)
      
      if (updatedApplication) {
        loadApplications()
        toast({
          title: "Success",
          description: "Application status updated successfully",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to update application status",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      })
    }
  }

  const handleBulkStatusUpdate = async (newStatus: string) => {
    if (selectedApplications.length === 0) return
    
    try {
      selectedApplications.forEach(appId => {
        updateApplication(appId, {
          status: newStatus as Application['status'],
          reviewedBy: "admin",
          reviewedAt: new Date().toISOString()
        })
      })
      
      setSelectedApplications([])
      loadApplications()
      toast({
        title: "Success",
        description: `${selectedApplications.length} application(s) updated successfully`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update applications",
        variant: "destructive",
      })
    }
  }

  const handleSelectApplication = (applicationId: string) => {
    setSelectedApplications(prev => 
      prev.includes(applicationId) 
        ? prev.filter(id => id !== applicationId)
        : [...prev, applicationId]
    )
  }

  const handleSelectAll = () => {
    setSelectedApplications(
      selectedApplications.length === filteredApplications.length 
        ? [] 
        : filteredApplications.map(app => app.id)
    )
  }

  const exportToCSV = () => {
    const headers = ["Applicant", "Email", "Phone", "Job", "Company", "Status", "Applied Date", "Reviewed By", "Reviewed Date"]
    const rows = filteredApplications.map(app => [
      app.applicantName,
      app.applicantEmail,
      app.applicantPhone || "",
      app.job?.title || "",
      app.job?.company?.name || "",
      APPLICATION_STATUS[app.status],
      new Date(app.createdAt).toLocaleDateString(),
      app.reviewedBy || "",
      app.reviewedAt ? new Date(app.reviewedAt).toLocaleDateString() : ""
    ])

    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `applications-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    
    toast({
      title: "Success",
      description: "Applications exported to CSV successfully",
    })
  }

  const getStatusBadge = (status: string) => {
    return (
      <Badge className={STATUS_COLORS[status as keyof typeof STATUS_COLORS]}>
        {APPLICATION_STATUS[status as keyof typeof APPLICATION_STATUS]}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Applications</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
            <p className="mt-2 text-sm text-muted-foreground">Loading applications...</p>
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
          <h1 className="text-3xl font-bold">Applications</h1>
          <p className="text-muted-foreground">
            Review and manage job applications
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(APPLICATION_STATUS).map(([status, label]) => {
          const count = applications.filter(app => app.status === status).length
          return (
            <Card key={status}>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{count}</div>
                <p className="text-xs text-muted-foreground">{label}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search applications..."
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
              {Object.entries(APPLICATION_STATUS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
            <div className="text-sm text-muted-foreground flex items-center">
              Showing {filteredApplications.length} of {applications.length} applications
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedApplications.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                {selectedApplications.length} application(s) selected
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleBulkStatusUpdate("REVIEWED")}
                >
                  Mark as Reviewed
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleBulkStatusUpdate("SHORTLISTED")}
                >
                  Shortlist
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => handleBulkStatusUpdate("REJECTED")}
                >
                  Reject
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Applications List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Applications ({filteredApplications.length})</CardTitle>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedApplications.length === filteredApplications.length && filteredApplications.length > 0}
                onChange={handleSelectAll}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-muted-foreground">Select all</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No applications found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your filters"
                  : "Applications will appear here as candidates apply to jobs"
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredApplications.map((application) => (
                <div key={application.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedApplications.includes(application.id)}
                        onChange={() => handleSelectApplication(application.id)}
                        className="rounded border-gray-300"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg">{application.applicantName}</h3>
                          {getStatusBadge(application.status)}
                        </div>
                        
                        <div className="text-sm text-muted-foreground mb-2">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Mail className="h-3 w-3" />
                              <span>{application.applicantEmail}</span>
                            </div>
                            {application.applicantPhone && (
                              <div className="flex items-center space-x-1">
                                <Phone className="h-3 w-3" />
                                <span>{application.applicantPhone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Briefcase className="h-3 w-3" />
                            <span>{application.job?.title}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Building2 className="h-3 w-3" />
                            <span>{application.job?.company?.name}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>Applied {new Date(application.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        {application.coverLetter && (
                          <div className="mt-2 text-sm text-gray-600">
                            <p className="line-clamp-2">{application.coverLetter}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right text-sm">
                        {application.reviewedBy && application.reviewedAt && (
                          <div className="text-xs text-muted-foreground">
                            Reviewed by {application.reviewedBy}
                            <br />
                            {new Date(application.reviewedAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <select
                          value={application.status}
                          onChange={(e) => handleStatusChange(application.id, e.target.value)}
                          className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                        >
                          {Object.entries(APPLICATION_STATUS).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                          ))}
                        </select>
                        
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/applications/${application.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
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