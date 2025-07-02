"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Briefcase, 
  Building2, 
  Users, 
  FileText, 
  TrendingUp, 
  Eye,
  Calendar,
  DollarSign
} from "lucide-react"

// Mock dashboard data
const stats = [
  {
    title: "Total Jobs",
    value: "156",
    change: "+12%",
    changeType: "positive" as const,
    icon: Briefcase,
  },
  {
    title: "Active Companies",
    value: "43",
    change: "+3%",
    changeType: "positive" as const,
    icon: Building2,
  },
  {
    title: "Total Users",
    value: "2,847",
    change: "+18%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Applications",
    value: "1,294",
    change: "+8%",
    changeType: "positive" as const,
    icon: FileText,
  },
]

const recentJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    status: "Published",
    applications: 12,
    views: 245,
    postedAt: "2 days ago",
  },
  {
    id: "2",
    title: "Product Manager",
    company: "StartupXYZ",
    status: "Published",
    applications: 8,
    views: 89,
    postedAt: "1 week ago",
  },
  {
    id: "3",
    title: "UX Designer",
    company: "Design Studio",
    status: "Published",
    applications: 15,
    views: 156,
    postedAt: "3 days ago",
  },
]

const recentApplications = [
  {
    id: "1",
    candidateName: "John Doe",
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    status: "Pending",
    appliedAt: "2 hours ago",
  },
  {
    id: "2",
    candidateName: "Jane Smith",
    jobTitle: "Product Manager",
    company: "StartupXYZ",
    status: "Reviewed",
    appliedAt: "5 hours ago",
  },
  {
    id: "3",
    candidateName: "Mike Johnson",
    jobTitle: "UX Designer",
    company: "Design Studio",
    status: "Shortlisted",
    appliedAt: "1 day ago",
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Jobs */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Jobs</CardTitle>
            <CardDescription>
              Latest job postings and their performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentJobs.map((job) => (
                <div key={job.id} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {job.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {job.company}
                    </p>
                  </div>
                  <div className="ml-auto flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <FileText className="h-3 w-3" />
                      <span>{job.applications}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{job.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{job.postedAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>
              Latest job applications submitted
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentApplications.map((application) => (
                <div key={application.id} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {application.candidateName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {application.jobTitle} at {application.company}
                    </p>
                  </div>
                  <div className="ml-auto text-sm">
                    <div className="text-right">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        application.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                        application.status === "Reviewed" ? "bg-blue-100 text-blue-800" :
                        application.status === "Shortlisted" ? "bg-green-100 text-green-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {application.status}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">
                        {application.appliedAt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}