"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  ArrowLeft,
  Upload,
  Send,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import Link from "next/link"
import { Job, getJobs, createApplication, initializeData } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

export default function JobApplicationPage() {
  const params = useParams()
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    applicantName: "",
    applicantEmail: "",
    applicantPhone: "",
    coverLetter: "",
    resume: null as File | null,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    initializeData()
    loadJob()
  }, [params.id])

  const loadJob = () => {
    setLoading(true)
    try {
      const jobs = getJobs()
      const foundJob = jobs.find(j => j.id === params.id)
      
      if (foundJob) {
        if (foundJob.status !== "PUBLISHED" || (foundJob.deadline && new Date() > new Date(foundJob.deadline))) {
          toast({
            title: "Application Closed",
            description: "This job is no longer accepting applications.",
            variant: "destructive",
          })
          router.push(`/jobs/${params.id}`)
          return
        }
        setJob(foundJob)
      } else {
        toast({
          title: "Job Not Found",
          description: "The job you're trying to apply to doesn't exist.",
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
      router.push("/jobs")
    } finally {
      setLoading(false)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.applicantName.trim()) {
      newErrors.applicantName = "Full name is required"
    }

    if (!formData.applicantEmail.trim()) {
      newErrors.applicantEmail = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.applicantEmail)) {
      newErrors.applicantEmail = "Please enter a valid email address"
    }

    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = "Cover letter is required"
    } else if (formData.coverLetter.trim().length < 50) {
      newErrors.coverLetter = "Cover letter should be at least 50 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Resume file must be less than 5MB",
          variant: "destructive",
        })
        return
      }

      // Check file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]
      
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF or Word document",
          variant: "destructive",
        })
        return
      }

      setFormData(prev => ({ ...prev, resume: file }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors below",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)

    try {
      // Simulate file upload (in a real app, you'd upload to a file service)
      const resumeUrl = formData.resume ? `uploads/resumes/${Date.now()}-${formData.resume.name}` : undefined

      const applicationData = {
        jobId: params.id as string,
        applicantName: formData.applicantName,
        applicantEmail: formData.applicantEmail,
        applicantPhone: formData.applicantPhone || undefined,
        coverLetter: formData.coverLetter,
        resume: resumeUrl,
        status: "PENDING" as const,
      }

      const newApplication = createApplication(applicationData)

      if (newApplication) {
        setSubmitted(true)
        
        // Simulate sending email notification
        setTimeout(() => {
          toast({
            title: "Email Sent",
            description: "Confirmation email sent to your address",
          })
        }, 1000)

        toast({
          title: "Application Submitted",
          description: "Your application has been submitted successfully!",
        })
      } else {
        throw new Error("Failed to create application")
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Failed to submit your application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
              <p className="mt-2 text-sm text-muted-foreground">Loading application form...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!job) {
    return null // Will redirect
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h1>
                  <p className="text-gray-600 mb-6">
                    Thank you for applying to <strong>{job.title}</strong> at <strong>{job.company?.name}</strong>.
                    We'll review your application and get back to you soon.
                  </p>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
                    <ul className="text-sm text-blue-800 text-left space-y-1">
                      <li>• You'll receive a confirmation email shortly</li>
                      <li>• Our team will review your application</li>
                      <li>• We'll contact you if your profile matches our requirements</li>
                      <li>• You can track your application status in your dashboard</li>
                    </ul>
                  </div>

                  <div className="flex space-x-4 justify-center">
                    <Button asChild>
                      <Link href={`/jobs/${job.id}`}>
                        View Job Details
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/jobs">
                        Browse More Jobs
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href={`/jobs/${job.id}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Job Details
              </Link>
            </Button>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Apply for Position</h1>
            <div className="text-gray-600">
              <p className="font-semibold">{job.title}</p>
              <p>{job.company?.name} • {job.location}</p>
            </div>
          </div>

          {/* Application Form */}
          <Card>
            <CardHeader>
              <CardTitle>Application Details</CardTitle>
              <CardDescription>
                Please fill out all required fields to submit your application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  
                  <div>
                    <Label htmlFor="applicantName">Full Name *</Label>
                    <Input
                      id="applicantName"
                      value={formData.applicantName}
                      onChange={(e) => handleInputChange("applicantName", e.target.value)}
                      placeholder="Enter your full name"
                      className={errors.applicantName ? "border-red-500" : ""}
                    />
                    {errors.applicantName && (
                      <p className="text-sm text-red-600 mt-1">{errors.applicantName}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="applicantEmail">Email Address *</Label>
                    <Input
                      id="applicantEmail"
                      type="email"
                      value={formData.applicantEmail}
                      onChange={(e) => handleInputChange("applicantEmail", e.target.value)}
                      placeholder="Enter your email address"
                      className={errors.applicantEmail ? "border-red-500" : ""}
                    />
                    {errors.applicantEmail && (
                      <p className="text-sm text-red-600 mt-1">{errors.applicantEmail}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="applicantPhone">Phone Number (Optional)</Label>
                    <Input
                      id="applicantPhone"
                      type="tel"
                      value={formData.applicantPhone}
                      onChange={(e) => handleInputChange("applicantPhone", e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Resume Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Resume</h3>
                  
                  <div>
                    <Label htmlFor="resume">Upload Resume (Optional)</Label>
                    <div className="mt-2">
                      <label htmlFor="resume" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            {formData.resume ? (
                              <span className="font-semibold">{formData.resume.name}</span>
                            ) : (
                              <>
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </>
                            )}
                          </p>
                          <p className="text-xs text-gray-500">PDF, DOC, DOCX (MAX. 5MB)</p>
                        </div>
                        <input
                          id="resume"
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Cover Letter</h3>
                  
                  <div>
                    <Label htmlFor="coverLetter">Tell us why you're interested in this position *</Label>
                    <Textarea
                      id="coverLetter"
                      value={formData.coverLetter}
                      onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                      placeholder="Write a brief cover letter explaining why you're the perfect fit for this role..."
                      rows={8}
                      className={errors.coverLetter ? "border-red-500" : ""}
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.coverLetter ? (
                        <p className="text-sm text-red-600">{errors.coverLetter}</p>
                      ) : (
                        <p className="text-sm text-gray-500">
                          Minimum 50 characters ({formData.coverLetter.length}/50)
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Consent */}
                <div className="bg-gray-50 border rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-600">
                      <p className="font-semibold mb-1">Data Processing Consent</p>
                      <p>
                        By submitting this application, you consent to the processing of your personal data 
                        for recruitment purposes. Your data will be handled in accordance with our privacy policy.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex space-x-4">
                  <Button type="submit" className="flex-1" disabled={submitting}>
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Application
                      </>
                    )}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href={`/jobs/${job.id}`}>Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}