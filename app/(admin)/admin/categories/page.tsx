"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  FolderOpen,
  Palette,
  Save,
  X
} from "lucide-react"
import { Category, getCategories, setCategories, generateId, initializeData, getJobs } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

const PRESET_COLORS = [
  "#3B82F6", // Blue
  "#10B981", // Green  
  "#F59E0B", // Yellow
  "#EF4444", // Red
  "#8B5CF6", // Purple
  "#06B6D4", // Cyan
  "#F97316", // Orange
  "#84CC16", // Lime
  "#EC4899", // Pink
  "#6B7280"  // Gray
]

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [categoryJobCounts, setCategoryJobCounts] = useState<Record<string, number>>({})
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: PRESET_COLORS[0],
    icon: ""
  })

  useEffect(() => {
    initializeData()
    loadCategories()
    loadJobCounts()
  }, [])

  useEffect(() => {
    filterCategories()
  }, [categories, searchTerm])

  const loadCategories = () => {
    setLoading(true)
    try {
      const categoriesData = getCategories()
      setCategories(categoriesData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load categories",
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
        counts[job.categoryId] = (counts[job.categoryId] || 0) + 1
      })
      
      setCategoryJobCounts(counts)
    } catch (error) {
      console.error("Failed to load job counts:", error)
    }
  }

  const filterCategories = () => {
    let filtered = [...categories]

    if (searchTerm) {
      filtered = filtered.filter(category => 
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredCategories(filtered)
  }

  const handleSaveCategory = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive",
      })
      return
    }

    try {
      let updatedCategories = [...categories]
      
      if (editingCategory) {
        // Update existing category
        const index = updatedCategories.findIndex(cat => cat.id === editingCategory.id)
        if (index !== -1) {
          updatedCategories[index] = {
            ...editingCategory,
            ...formData,
            slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
            updatedAt: new Date().toISOString()
          }
        }
      } else {
        // Create new category
        const newCategory: Category = {
          id: generateId(),
          ...formData,
          slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        updatedCategories.push(newCategory)
      }

      setCategories(updatedCategories)
      setCategories(updatedCategories) // This saves to localStorage
      
      // Reset form
      setFormData({
        name: "",
        description: "",
        color: PRESET_COLORS[0],
        icon: ""
      })
      setEditingCategory(null)
      setIsCreating(false)
      
      toast({
        title: "Success",
        description: editingCategory ? "Category updated successfully" : "Category created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save category",
        variant: "destructive",
      })
    }
  }

  const handleEditCategory = (category: Category) => {
    setFormData({
      name: category.name,
      description: category.description || "",
      color: category.color,
      icon: category.icon || ""
    })
    setEditingCategory(category)
    setIsCreating(true)
  }

  const handleDeleteCategory = (categoryId: string) => {
    const jobCount = categoryJobCounts[categoryId] || 0
    
    if (jobCount > 0) {
      toast({
        title: "Cannot Delete Category",
        description: `This category has ${jobCount} job(s). Please move or remove all jobs first.`,
        variant: "destructive",
      })
      return
    }

    if (!confirm("Are you sure you want to delete this category? This action cannot be undone.")) {
      return
    }

    try {
      const updatedCategories = categories.filter(cat => cat.id !== categoryId)
      setCategories(updatedCategories)
      
      toast({
        title: "Success",
        description: "Category deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error", 
        description: "Failed to delete category",
        variant: "destructive",
      })
    }
  }

  const handleCancel = () => {
    setFormData({
      name: "",
      description: "",
      color: PRESET_COLORS[0],
      icon: ""
    })
    setEditingCategory(null)
    setIsCreating(false)
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Categories</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
            <p className="mt-2 text-sm text-muted-foreground">Loading categories...</p>
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
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-muted-foreground">
            Manage job categories and organize listings
          </p>
        </div>
        <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>{editingCategory ? "Edit Category" : "Create New Category"}</CardTitle>
            <CardDescription>
              {editingCategory ? "Update the category details" : "Add a new category to organize job listings"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g. Engineering"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="icon">Icon (optional)</Label>
                <Input
                  id="icon"
                  placeholder="e.g. Code, Package, etc."
                  value={formData.icon}
                  onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of this category..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            <div>
              <Label>Color</Label>
              <div className="flex items-center space-x-2 mt-2">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 ${
                      formData.color === color ? 'border-gray-900' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setFormData(prev => ({ ...prev, color }))}
                  />
                ))}
                <Input
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                  className="w-16 h-8 p-1"
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleSaveCategory}>
                <Save className="mr-2 h-4 w-4" />
                {editingCategory ? "Update" : "Create"} Category
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories List */}
      <Card>
        <CardHeader>
          <CardTitle>Categories ({filteredCategories.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No categories found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {searchTerm 
                  ? "Try adjusting your search"
                  : "Get started by creating your first category"
                }
              </p>
              {!searchTerm && (
                <div className="mt-6">
                  <Button onClick={() => setIsCreating(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Category
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCategories.map((category) => (
                <div key={category.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        />
                        <h3 className="font-semibold text-lg">{category.name}</h3>
                      </div>
                      
                      {category.description && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {category.description}
                        </p>
                      )}
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <FolderOpen className="h-3 w-3" />
                          <span>{categoryJobCounts[category.id] || 0} Job{(categoryJobCounts[category.id] || 0) !== 1 ? 's' : ''}</span>
                        </div>
                        {category.icon && (
                          <div className="flex items-center space-x-1">
                            <Palette className="h-3 w-3" />
                            <span>{category.icon}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-xs text-muted-foreground mt-2">
                        Created {new Date(category.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditCategory(category)}
                        disabled={isCreating}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteCategory(category.id)}
                        disabled={categoryJobCounts[category.id] > 0}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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