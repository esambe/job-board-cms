"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Building2,
  Globe,
  MapPin,
  Users,
  Calendar,
  Download
} from "lucide-react"
import Link from "next/link"
import { Company, getCompanies, deleteCompany, initializeData, getJobs } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

const COMPANY_SIZES = {
  STARTUP: "Startup (1-10)",
  SMALL: "Small (11-50)",
  MEDIUM: "Medium (51-200)",
  LARGE: "Large (201-1000)",
  ENTERPRISE: "Enterprise (1000+)"
}

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sizeFilter, setSizeFilter] = useState("all")
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [companyJobCounts, setCompanyJobCounts] = useState<Record<string, number>>({})
  const { toast } = useToast()

  useEffect(() => {
    initializeData()
    loadCompanies()
    loadJobCounts()
  }, [])

  useEffect(() => {
    filterCompanies()
  }, [companies, searchTerm, sizeFilter])

  const loadCompanies = () => {
    setLoading(true)
    try {
      const companiesData = getCompanies()
      setCompanies(companiesData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load companies",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const loadJobCounts = () => {
    try {
      const jobs = getJobs()
      const counts: Record<string, number> = {}
      
      jobs.forEach(job => {
        counts[job.companyId] = (counts[job.companyId] || 0) + 1
      })
      
      setCompanyJobCounts(counts)
    } catch (error) {
      console.error("Failed to load job counts:", error)
    }
  }

  const filterCompanies = () => {
    let filtered = [...companies]

    if (searchTerm) {
      filtered = filtered.filter(company => 
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (sizeFilter !== "all") {
      filtered = filtered.filter(company => company.size === sizeFilter)
    }

    setFilteredCompanies(filtered)
  }

  const handleDeleteCompany = async (companyId: string) => {
    const jobCount = companyJobCounts[companyId] || 0
    
    if (jobCount > 0) {
      toast({
        title: "Cannot Delete Company",
        description: `This company has ${jobCount} active job(s). Please remove all jobs first.`,
        variant: "destructive",
      })
      return
    }

    if (!confirm("Are you sure you want to delete this company? This action cannot be undone.")) {
      return
    }

    try {
      const success = deleteCompany(companyId)
      if (success) {
        loadCompanies()
        toast({
          title: "Success",
          description: "Company deleted successfully",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to delete company",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete company",
        variant: "destructive",
      })
    }
  }

  const handleBulkDelete = async () => {
    if (selectedCompanies.length === 0) return
    
    // Check if any selected companies have jobs
    const companiesWithJobs = selectedCompanies.filter(id => (companyJobCounts[id] || 0) > 0)
    
    if (companiesWithJobs.length > 0) {
      toast({
        title: "Cannot Delete Companies",
        description: `${companiesWithJobs.length} companies have active jobs. Please remove all jobs first.`,
        variant: "destructive",
      })
      return
    }
    
    if (!confirm(`Are you sure you want to delete ${selectedCompanies.length} company(ies)? This action cannot be undone.`)) {
      return
    }

    try {
      selectedCompanies.forEach(companyId => deleteCompany(companyId))
      setSelectedCompanies([])
      loadCompanies()
      toast({
        title: "Success",
        description: `${selectedCompanies.length} company(ies) deleted successfully`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete companies",
        variant: "destructive",
      })
    }
  }

  const handleSelectCompany = (companyId: string) => {
    setSelectedCompanies(prev => 
      prev.includes(companyId) 
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    )
  }

  const handleSelectAll = () => {
    setSelectedCompanies(
      selectedCompanies.length === filteredCompanies.length 
        ? [] 
        : filteredCompanies.map(company => company.id)
    )
  }

  const exportToCSV = () => {
    const headers = ["Name", "Industry", "Location", "Size", "Founded", "Website", "Verified", "Jobs"]
    const rows = filteredCompanies.map(company => [
      company.name,
      company.industry,
      company.location,
      COMPANY_SIZES[company.size],
      company.foundedYear?.toString() || "",
      company.website || "",
      company.verified ? "Yes" : "No",
      (companyJobCounts[company.id] || 0).toString()
    ])

    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `companies-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    
    toast({
      title: "Success",
      description: "Companies exported to CSV successfully",
    })
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Companies</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
            <p className="mt-2 text-sm text-muted-foreground">Loading companies...</p>
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
          <h1 className="text-3xl font-bold">Companies</h1>
          <p className="text-muted-foreground">
            Manage company profiles and information
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button asChild>
            <Link href="/admin/companies/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Company
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={sizeFilter}
              onChange={(e) => setSizeFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="all">All Sizes</option>
              {Object.entries(COMPANY_SIZES).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
            <div className="text-sm text-muted-foreground flex items-center">
              Showing {filteredCompanies.length} of {companies.length} companies
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedCompanies.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                {selectedCompanies.length} company(ies) selected
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

      {/* Companies List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Companies ({filteredCompanies.length})</CardTitle>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedCompanies.length === filteredCompanies.length && filteredCompanies.length > 0}
                onChange={handleSelectAll}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-muted-foreground">Select all</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredCompanies.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No companies found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {searchTerm || sizeFilter !== "all" 
                  ? "Try adjusting your filters"
                  : "Get started by adding a new company"
                }
              </p>
              {!searchTerm && sizeFilter === "all" && (
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/admin/companies/new">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Company
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCompanies.map((company) => (
                <div key={company.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedCompanies.includes(company.id)}
                        onChange={() => handleSelectCompany(company.id)}
                        className="rounded border-gray-300"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg">{company.name}</h3>
                          {company.verified && (
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              Verified
                            </Badge>
                          )}
                        </div>
                        
                        {company.description && (
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                            {company.description}
                          </p>
                        )}
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Building2 className="h-3 w-3" />
                            <span>{company.industry}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{company.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{COMPANY_SIZES[company.size]}</span>
                          </div>
                          {company.foundedYear && (
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>Founded {company.foundedYear}</span>
                            </div>
                          )}
                          {company.website && (
                            <div className="flex items-center space-x-1">
                              <Globe className="h-3 w-3" />
                              <a 
                                href={company.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                Website
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right text-sm">
                        <div className="font-medium">
                          {companyJobCounts[company.id] || 0} Job{(companyJobCounts[company.id] || 0) !== 1 ? 's' : ''}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Created {new Date(company.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/companies/${company.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/companies/${company.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteCompany(company.id)}
                          disabled={companyJobCounts[company.id] > 0}
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