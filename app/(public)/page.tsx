import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Job Board CMS
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A comprehensive content management system for job boards
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/jobs">Browse Jobs</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>For Job Seekers</CardTitle>
              <CardDescription>
                Find your dream job with our advanced search and filtering
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Advanced job search and filters</li>
                <li>• Save jobs and track applications</li>
                <li>• Get job alerts and notifications</li>
                <li>• Upload resume and create profile</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>For Companies</CardTitle>
              <CardDescription>
                Post jobs and manage your hiring process efficiently
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Post and manage job listings</li>
                <li>• Track and review applications</li>
                <li>• Company profile and branding</li>
                <li>• Analytics and reporting</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>For Admins</CardTitle>
              <CardDescription>
                Complete control over your job board platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• User and company management</li>
                <li>• Job moderation and approval</li>
                <li>• System analytics and insights</li>
                <li>• Platform configuration</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Get Started Today
          </h2>
          <p className="text-gray-600 mb-8">
            Join thousands of job seekers and companies using our platform
          </p>
          <Button asChild size="lg">
            <Link href="/register">Create Account</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}