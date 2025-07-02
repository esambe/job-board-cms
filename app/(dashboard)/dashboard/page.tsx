"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { 
  FileText, 
  Bookmark, 
  Search, 
  Calendar,
  MapPin,
  Clock,
  Building2
} from "lucide-react"

// Mock user dashboard data
const applicationStats = {
  total: 12,
  pending: 5,
  reviewed: 4,
  rejected: 2,
  accepted: 1,
}

const recentApplications = [
  {
    id: "1",
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    status: "PENDING",
    appliedAt: "2 days ago",
    location: "San Francisco, CA",
  },
  {
    id: "2",
    jobTitle: "Product Manager",
    company: "StartupXYZ",
    status: "REVIEWING",
    appliedAt: "1 week ago",
    location: "Remote",
  },
  {
    id: "3",
    jobTitle: "UX Designer",
    company: "Design Studio",
    status: "SHORTLISTED",
    appliedAt: "3 days ago",
    location: "New York, NY",
  },
]

const savedJobs = [
  {
    id: "4",
    title: "Backend Developer",
    company: "Cloud Systems",
    location: "Austin, TX",
    type: "FULL_TIME",
    salary: "$90k - $120k",
    savedAt: "1 day ago",
  },
  {
    id: "5",
    title: "Data Scientist",
    company: "AI Corp",
    location: "Remote",
    type: "FULL_TIME",
    salary: "$110k - $140k",
    savedAt: "3 days ago",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800"
    case "REVIEWING":
      return "bg-blue-100 text-blue-800"
    case "SHORTLISTED":
      return "bg-green-100 text-green-800"
    case "REJECTED":
      return "bg-red-100 text-red-800"
    case "ACCEPTED":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function UserDashboard() {
  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/jobs">
            <Search className="mr-2 h-4 w-4" />
            Browse Jobs
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard/profile">
            Update Profile
          </Link>
        </Button>
      </div>

      {/* Application Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applied</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicationStats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicationStats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviewed</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicationStats.reviewed}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicationStats.rejected}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicationStats.accepted}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>
              Your latest job applications and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentApplications.map((application) => (
                <div key={application.id} className="flex items-start space-x-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {application.jobTitle}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Building2 className="h-3 w-3" />
                      <span>{application.company}</span>
                      <MapPin className="h-3 w-3" />
                      <span>{application.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(application.status)}>
                      {application.status.toLowerCase().replace("_", " ")}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {application.appliedAt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/applications">View All Applications</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Saved Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>Saved Jobs</CardTitle>
            <CardDescription>
              Jobs you've bookmarked for later
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {savedJobs.map((job) => (
                <div key={job.id} className="flex items-start space-x-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {job.title}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Building2 className="h-3 w-3" />
                      <span>{job.company}</span>
                      <MapPin className="h-3 w-3" />
                      <span>{job.location}</span>
                    </div>
                    <p className="text-sm font-medium text-green-600">
                      {job.salary}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">
                      {job.type.replace("_", " ").toLowerCase()}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      Saved {job.savedAt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/saved-jobs">View All Saved Jobs</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}