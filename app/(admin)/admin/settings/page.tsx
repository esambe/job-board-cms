"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Save, 
  Settings as SettingsIcon,
  Globe,
  Mail,
  Bell,
  Shield,
  Database,
  Trash2
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Settings {
  siteName: string
  siteDescription: string
  siteUrl: string
  contactEmail: string
  supportEmail: string
  allowRegistration: boolean
  requireEmailVerification: boolean
  allowCompanyRegistration: boolean
  moderateJobs: boolean
  featuredJobsEnabled: boolean
  enableNotifications: boolean
  enableSEO: boolean
  maxJobsPerCompany: number
  jobExpiryDays: number
  timezone: string
  currency: string
  language: string
}

const DEFAULT_SETTINGS: Settings = {
  siteName: "Job Board CMS",
  siteDescription: "A comprehensive content management system for job boards",
  siteUrl: "https://jobboard.example.com",
  contactEmail: "contact@jobboard.example.com",
  supportEmail: "support@jobboard.example.com",
  allowRegistration: true,
  requireEmailVerification: false,
  allowCompanyRegistration: true,
  moderateJobs: false,
  featuredJobsEnabled: true,
  enableNotifications: true,
  enableSEO: true,
  maxJobsPerCompany: 50,
  jobExpiryDays: 30,
  timezone: "UTC",
  currency: "USD",
  language: "en"
}

const CURRENCIES = [
  { value: "USD", label: "US Dollar" },
  { value: "EUR", label: "Euro" },
  { value: "GBP", label: "British Pound" },
  { value: "CAD", label: "Canadian Dollar" },
  { value: "AUD", label: "Australian Dollar" },
]

const TIMEZONES = [
  { value: "UTC", label: "UTC" },
  { value: "America/New_York", label: "Eastern Time" },
  { value: "America/Chicago", label: "Central Time" },
  { value: "America/Denver", label: "Mountain Time" },
  { value: "America/Los_Angeles", label: "Pacific Time" },
  { value: "Europe/London", label: "London" },
  { value: "Europe/Paris", label: "Paris" },
  { value: "Asia/Tokyo", label: "Tokyo" },
]

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = () => {
    try {
      const savedSettings = localStorage.getItem('job_board_settings')
      if (savedSettings) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) })
      }
    } catch (error) {
      console.error("Failed to load settings:", error)
    }
  }

  const handleSaveSettings = async () => {
    setLoading(true)
    
    try {
      localStorage.setItem('job_board_settings', JSON.stringify(settings))
      
      toast({
        title: "Success",
        description: "Settings saved successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleResetSettings = () => {
    if (confirm("Are you sure you want to reset all settings to defaults? This action cannot be undone.")) {
      setSettings(DEFAULT_SETTINGS)
      localStorage.removeItem('job_board_settings')
      
      toast({
        title: "Success",
        description: "Settings reset to defaults",
      })
    }
  }

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all data? This will remove all jobs, companies, applications, and categories. This action cannot be undone.")) {
      localStorage.removeItem('job_board_jobs')
      localStorage.removeItem('job_board_companies')
      localStorage.removeItem('job_board_applications')
      localStorage.removeItem('job_board_categories')
      
      toast({
        title: "Success",
        description: "All data cleared successfully",
      })
    }
  }

  const updateSetting = (key: keyof Settings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Configure your job board platform
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleResetSettings}>
            Reset to Defaults
          </Button>
          <Button onClick={handleSaveSettings} disabled={loading}>
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <CardTitle>General</CardTitle>
          </div>
          <CardDescription>
            Basic site information and configuration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => updateSetting('siteName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="siteUrl">Site URL</Label>
              <Input
                id="siteUrl"
                value={settings.siteUrl}
                onChange={(e) => updateSetting('siteUrl', e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="siteDescription">Site Description</Label>
            <Textarea
              id="siteDescription"
              value={settings.siteDescription}
              onChange={(e) => updateSetting('siteDescription', e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="currency">Default Currency</Label>
              <select
                id="currency"
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                value={settings.currency}
                onChange={(e) => updateSetting('currency', e.target.value)}
              >
                {CURRENCIES.map((currency) => (
                  <option key={currency.value} value={currency.value}>
                    {currency.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <select
                id="timezone"
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                value={settings.timezone}
                onChange={(e) => updateSetting('timezone', e.target.value)}
              >
                {TIMEZONES.map((timezone) => (
                  <option key={timezone.value} value={timezone.value}>
                    {timezone.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="language">Language</Label>
              <select
                id="language"
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                value={settings.language}
                onChange={(e) => updateSetting('language', e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <CardTitle>Contact</CardTitle>
          </div>
          <CardDescription>
            Email addresses for system communications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={(e) => updateSetting('contactEmail', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={settings.supportEmail}
                onChange={(e) => updateSetting('supportEmail', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User & Registration Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <CardTitle>User Registration</CardTitle>
          </div>
          <CardDescription>
            Control user registration and access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="allowRegistration"
                checked={settings.allowRegistration}
                onChange={(e) => updateSetting('allowRegistration', e.target.checked)}
              />
              <Label htmlFor="allowRegistration">Allow user registration</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="requireEmailVerification"
                checked={settings.requireEmailVerification}
                onChange={(e) => updateSetting('requireEmailVerification', e.target.checked)}
              />
              <Label htmlFor="requireEmailVerification">Require email verification</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="allowCompanyRegistration"
                checked={settings.allowCompanyRegistration}
                onChange={(e) => updateSetting('allowCompanyRegistration', e.target.checked)}
              />
              <Label htmlFor="allowCompanyRegistration">Allow company registration</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <SettingsIcon className="h-5 w-5" />
            <CardTitle>Job Management</CardTitle>
          </div>
          <CardDescription>
            Configure job posting and management options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="moderateJobs"
                checked={settings.moderateJobs}
                onChange={(e) => updateSetting('moderateJobs', e.target.checked)}
              />
              <Label htmlFor="moderateJobs">Moderate job postings before publishing</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featuredJobsEnabled"
                checked={settings.featuredJobsEnabled}
                onChange={(e) => updateSetting('featuredJobsEnabled', e.target.checked)}
              />
              <Label htmlFor="featuredJobsEnabled">Enable featured jobs</Label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="maxJobsPerCompany">Max jobs per company</Label>
              <Input
                id="maxJobsPerCompany"
                type="number"
                value={settings.maxJobsPerCompany}
                onChange={(e) => updateSetting('maxJobsPerCompany', parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="jobExpiryDays">Job expiry (days)</Label>
              <Input
                id="jobExpiryDays"
                type="number"
                value={settings.jobExpiryDays}
                onChange={(e) => updateSetting('jobExpiryDays', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <CardTitle>System</CardTitle>
          </div>
          <CardDescription>
            System-wide features and notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="enableNotifications"
                checked={settings.enableNotifications}
                onChange={(e) => updateSetting('enableNotifications', e.target.checked)}
              />
              <Label htmlFor="enableNotifications">Enable email notifications</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="enableSEO"
                checked={settings.enableSEO}
                onChange={(e) => updateSetting('enableSEO', e.target.checked)}
              />
              <Label htmlFor="enableSEO">Enable SEO optimization</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <CardTitle>Data Management</CardTitle>
          </div>
          <CardDescription>
            Manage your data and backups
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex space-x-4">
            <Button variant="destructive" onClick={handleClearData}>
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All Data
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Warning: This will permanently delete all jobs, companies, applications, and categories. 
            This action cannot be undone.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}