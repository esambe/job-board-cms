"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Database, 
  Download, 
  Upload, 
  RotateCcw, 
  Trash2, 
  AlertTriangle,
  CheckCircle,
  Info
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { demoAccounts } from "@/lib/mock-data"

interface DataStats {
  users: number
  companies: number
  jobs: number
  applications: number
  categories: number
  lastUpdated: string
}

export default function AdminSettings() {
  const [stats, setStats] = useState<DataStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/data')
      if (!response.ok) throw new Error('Failed to fetch stats')
      const data = await response.json()
      setStats(data.stats)
    } catch (error) {
      console.error('Error fetching stats:', error)
      toast({
        title: "Error",
        description: "Failed to fetch data statistics",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const handleDataAction = async (action: string, confirmMessage?: string) => {
    if (confirmMessage && !confirm(confirmMessage)) {
      return
    }

    try {
      setActionLoading(action)
      const response = await fetch('/api/admin/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Operation failed')
      }

      const result = await response.json()
      
      toast({
        title: "Success",
        description: result.message,
      })

      // Refresh stats
      await fetchStats()

      // If it's an export, download the file
      if (action === 'export' && result.data) {
        const blob = new Blob([result.data], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `job-board-data-${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error(`Error with ${action}:`, error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : `Failed to ${action} data`,
        variant: "destructive",
      })
    } finally {
      setActionLoading(null)
    }
  }

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setActionLoading('import')
      const text = await file.text()
      
      const response = await fetch('/api/admin/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'import', data: text }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Import failed')
      }

      const result = await response.json()
      
      toast({
        title: "Success",
        description: result.message,
      })

      await fetchStats()
    } catch (error) {
      console.error('Error importing data:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to import data",
        variant: "destructive",
      })
    } finally {
      setActionLoading(null)
      // Reset the input
      event.target.value = ''
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your job board platform settings and data
        </p>
      </div>

      {/* Mock Data Information */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          This job board runs entirely on mock data stored in your browser's localStorage. 
          No database setup is required - everything works immediately out of the box!
        </AlertDescription>
      </Alert>

      {/* Data Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Overview
          </CardTitle>
          <CardDescription>
            Current statistics for your mock data
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          ) : stats ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.users}</div>
                <div className="text-sm text-muted-foreground">Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.companies}</div>
                <div className="text-sm text-muted-foreground">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.jobs}</div>
                <div className="text-sm text-muted-foreground">Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{stats.applications}</div>
                <div className="text-sm text-muted-foreground">Applications</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">{stats.categories}</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              Failed to load statistics
            </div>
          )}
        </CardContent>
      </Card>

      {/* Demo Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Demo Accounts</CardTitle>
          <CardDescription>
            Use these predefined accounts to test different user roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(demoAccounts).map(([key, account]) => (
              <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{account.email}</span>
                    <Badge variant="outline">{account.role}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Password: <code className="bg-gray-100 px-1 rounded">{account.password}</code>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {account.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Management
          </CardTitle>
          <CardDescription>
            Export, import, or reset your mock data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Export Data */}
            <div className="space-y-2">
              <h4 className="font-medium">Export Data</h4>
              <p className="text-sm text-muted-foreground">
                Download your current data as a JSON file for backup
              </p>
              <Button
                onClick={() => handleDataAction('export')}
                disabled={actionLoading === 'export'}
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                {actionLoading === 'export' ? 'Exporting...' : 'Export Data'}
              </Button>
            </div>

            {/* Import Data */}
            <div className="space-y-2">
              <h4 className="font-medium">Import Data</h4>
              <p className="text-sm text-muted-foreground">
                Restore data from a previously exported JSON file
              </p>
              <div className="relative">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  disabled={actionLoading === 'import'}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button disabled={actionLoading === 'import'} className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  {actionLoading === 'import' ? 'Importing...' : 'Import Data'}
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Reset Data */}
            <div className="space-y-2">
              <h4 className="font-medium">Reset to Original</h4>
              <p className="text-sm text-muted-foreground">
                Restore all data to the original mock dataset
              </p>
              <Button
                onClick={() => handleDataAction('reset', 
                  'Are you sure you want to reset all data to the original state? This will permanently delete any changes you\'ve made.'
                )}
                disabled={actionLoading === 'reset'}
                variant="outline"
                className="w-full"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                {actionLoading === 'reset' ? 'Resetting...' : 'Reset Data'}
              </Button>
            </div>

            {/* Clear All Data */}
            <div className="space-y-2">
              <h4 className="font-medium text-red-600">Clear All Data</h4>
              <p className="text-sm text-muted-foreground">
                Remove all data from localStorage (destructive action)
              </p>
              <Button
                onClick={() => handleDataAction('clear',
                  'Are you sure you want to clear ALL data? This action cannot be undone and will remove everything from localStorage.'
                )}
                disabled={actionLoading === 'clear'}
                variant="destructive"
                className="w-full"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {actionLoading === 'clear' ? 'Clearing...' : 'Clear All Data'}
              </Button>
            </div>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> All data is stored in your browser's localStorage. 
              Clearing browser data or using incognito mode will reset everything.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}