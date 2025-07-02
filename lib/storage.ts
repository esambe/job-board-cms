import { MockDataState, getInitialMockData, User, Company, Job, Application, Category } from './mock-data'

// Storage keys
const STORAGE_KEYS = {
  MOCK_DATA: 'job-board-mock-data',
  CURRENT_USER: 'job-board-current-user',
  USER_PREFERENCES: 'job-board-user-preferences',
  SAVED_JOBS: 'job-board-saved-jobs',
} as const

// Type for saved jobs
export interface SavedJob {
  jobId: string
  userId: string
  savedAt: Date
}

// Type for user preferences
export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system'
  emailNotifications?: boolean
  jobAlerts?: boolean
  profileVisibility?: 'public' | 'private'
  preferredLocations?: string[]
  preferredJobTypes?: string[]
}

// Storage utilities
export class LocalStorage {
  // Check if localStorage is available
  static isAvailable(): boolean {
    try {
      const test = '__localStorage_test__'
      localStorage.setItem(test, 'test')
      localStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  }

  // Generic get method with type safety
  static get<T>(key: string, defaultValue?: T): T | null {
    if (!this.isAvailable()) return defaultValue || null

    try {
      const item = localStorage.getItem(key)
      if (item === null) return defaultValue || null
      return JSON.parse(item) as T
    } catch (error) {
      console.error(`Error reading from localStorage for key "${key}":`, error)
      return defaultValue || null
    }
  }

  // Generic set method
  static set<T>(key: string, value: T): boolean {
    if (!this.isAvailable()) return false

    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(`Error writing to localStorage for key "${key}":`, error)
      return false
    }
  }

  // Remove item
  static remove(key: string): boolean {
    if (!this.isAvailable()) return false

    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(`Error removing from localStorage for key "${key}":`, error)
      return false
    }
  }

  // Clear all storage
  static clear(): boolean {
    if (!this.isAvailable()) return false

    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error('Error clearing localStorage:', error)
      return false
    }
  }
}

// Mock data storage manager
export class MockDataStorage {
  // Get current mock data state
  static getData(): MockDataState {
    const stored = LocalStorage.get<MockDataState>(STORAGE_KEYS.MOCK_DATA)
    if (stored) {
      // Parse dates that were stringified
      stored.lastUpdated = new Date(stored.lastUpdated)
      stored.users = stored.users.map(user => ({
        ...user,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      }))
      stored.companies = stored.companies.map(company => ({
        ...company,
        createdAt: new Date(company.createdAt),
        updatedAt: new Date(company.updatedAt),
      }))
      stored.jobs = stored.jobs.map(job => ({
        ...job,
        publishedAt: job.publishedAt ? new Date(job.publishedAt) : undefined,
        expiresAt: job.expiresAt ? new Date(job.expiresAt) : undefined,
        createdAt: new Date(job.createdAt),
        updatedAt: new Date(job.updatedAt),
      }))
      stored.applications = stored.applications.map(app => ({
        ...app,
        reviewedAt: app.reviewedAt ? new Date(app.reviewedAt) : undefined,
        createdAt: new Date(app.createdAt),
        updatedAt: new Date(app.updatedAt),
      }))
      stored.categories = stored.categories.map(category => ({
        ...category,
        createdAt: new Date(category.createdAt),
        updatedAt: new Date(category.updatedAt),
      }))
      return stored
    }

    // If no stored data, return initial mock data
    const initialData = getInitialMockData()
    this.setData(initialData)
    return initialData
  }

  // Save mock data state
  static setData(data: MockDataState): boolean {
    return LocalStorage.set(STORAGE_KEYS.MOCK_DATA, {
      ...data,
      lastUpdated: new Date(),
    })
  }

  // Reset to initial mock data
  static resetData(): MockDataState {
    const initialData = getInitialMockData()
    this.setData(initialData)
    return initialData
  }

  // Get specific data type
  static getUsers(): User[] {
    return this.getData().users
  }

  static getCompanies(): Company[] {
    return this.getData().companies
  }

  static getJobs(): Job[] {
    return this.getData().jobs
  }

  static getApplications(): Application[] {
    return this.getData().applications
  }

  static getCategories(): Category[] {
    return this.getData().categories
  }

  // Update specific data type
  static updateUsers(users: User[]): boolean {
    const data = this.getData()
    data.users = users
    return this.setData(data)
  }

  static updateCompanies(companies: Company[]): boolean {
    const data = this.getData()
    data.companies = companies
    return this.setData(data)
  }

  static updateJobs(jobs: Job[]): boolean {
    const data = this.getData()
    data.jobs = jobs
    return this.setData(data)
  }

  static updateApplications(applications: Application[]): boolean {
    const data = this.getData()
    data.applications = applications
    return this.setData(data)
  }

  static updateCategories(categories: Category[]): boolean {
    const data = this.getData()
    data.categories = categories
    return this.setData(data)
  }

  // Add new items
  static addUser(user: User): boolean {
    const users = this.getUsers()
    users.push(user)
    return this.updateUsers(users)
  }

  static addCompany(company: Company): boolean {
    const companies = this.getCompanies()
    companies.push(company)
    return this.updateCompanies(companies)
  }

  static addJob(job: Job): boolean {
    const jobs = this.getJobs()
    jobs.push(job)
    return this.updateJobs(jobs)
  }

  static addApplication(application: Application): boolean {
    const applications = this.getApplications()
    applications.push(application)
    return this.updateApplications(applications)
  }

  // Update existing items
  static updateUser(userId: string, updates: Partial<User>): boolean {
    const users = this.getUsers()
    const index = users.findIndex(u => u.id === userId)
    if (index === -1) return false

    users[index] = { ...users[index], ...updates, updatedAt: new Date() }
    return this.updateUsers(users)
  }

  static updateJob(jobId: string, updates: Partial<Job>): boolean {
    const jobs = this.getJobs()
    const index = jobs.findIndex(j => j.id === jobId)
    if (index === -1) return false

    jobs[index] = { ...jobs[index], ...updates, updatedAt: new Date() }
    return this.updateJobs(jobs)
  }

  static updateApplication(applicationId: string, updates: Partial<Application>): boolean {
    const applications = this.getApplications()
    const index = applications.findIndex(a => a.id === applicationId)
    if (index === -1) return false

    applications[index] = { ...applications[index], ...updates, updatedAt: new Date() }
    return this.updateApplications(applications)
  }

  // Delete items
  static deleteUser(userId: string): boolean {
    const users = this.getUsers()
    const filtered = users.filter(u => u.id !== userId)
    return this.updateUsers(filtered)
  }

  static deleteJob(jobId: string): boolean {
    const jobs = this.getJobs()
    const filtered = jobs.filter(j => j.id !== jobId)
    return this.updateJobs(filtered)
  }

  static deleteApplication(applicationId: string): boolean {
    const applications = this.getApplications()
    const filtered = applications.filter(a => a.id !== applicationId)
    return this.updateApplications(applications)
  }

  // Find items
  static findUser(userId: string): User | null {
    return this.getUsers().find(u => u.id === userId) || null
  }

  static findUserByEmail(email: string): User | null {
    return this.getUsers().find(u => u.email === email) || null
  }

  static findCompany(companyId: string): Company | null {
    return this.getCompanies().find(c => c.id === companyId) || null
  }

  static findJob(jobId: string): Job | null {
    return this.getJobs().find(j => j.id === jobId) || null
  }
}

// Current user storage
export class CurrentUserStorage {
  static getCurrentUser(): User | null {
    return LocalStorage.get<User>(STORAGE_KEYS.CURRENT_USER)
  }

  static setCurrentUser(user: User | null): boolean {
    if (user === null) {
      return LocalStorage.remove(STORAGE_KEYS.CURRENT_USER)
    }
    return LocalStorage.set(STORAGE_KEYS.CURRENT_USER, user)
  }

  static clearCurrentUser(): boolean {
    return LocalStorage.remove(STORAGE_KEYS.CURRENT_USER)
  }
}

// User preferences storage
export class UserPreferencesStorage {
  static getPreferences(userId: string): UserPreferences {
    const allPreferences = LocalStorage.get<Record<string, UserPreferences>>(
      STORAGE_KEYS.USER_PREFERENCES,
      {}
    ) || {}
    return allPreferences[userId] || {}
  }

  static setPreferences(userId: string, preferences: UserPreferences): boolean {
    const allPreferences = LocalStorage.get<Record<string, UserPreferences>>(
      STORAGE_KEYS.USER_PREFERENCES,
      {}
    ) || {}
    allPreferences[userId] = { ...allPreferences[userId], ...preferences }
    return LocalStorage.set(STORAGE_KEYS.USER_PREFERENCES, allPreferences)
  }

  static clearPreferences(userId: string): boolean {
    const allPreferences = LocalStorage.get<Record<string, UserPreferences>>(
      STORAGE_KEYS.USER_PREFERENCES,
      {}
    ) || {}
    delete allPreferences[userId]
    return LocalStorage.set(STORAGE_KEYS.USER_PREFERENCES, allPreferences)
  }
}

// Saved jobs storage
export class SavedJobsStorage {
  static getSavedJobs(userId: string): SavedJob[] {
    const allSaved = LocalStorage.get<Record<string, SavedJob[]>>(
      STORAGE_KEYS.SAVED_JOBS,
      {}
    ) || {}
    const userSaved = allSaved[userId] || []
    
    // Parse dates
    return userSaved.map(saved => ({
      ...saved,
      savedAt: new Date(saved.savedAt),
    }))
  }

  static saveJob(userId: string, jobId: string): boolean {
    const allSaved = LocalStorage.get<Record<string, SavedJob[]>>(
      STORAGE_KEYS.SAVED_JOBS,
      {}
    ) || {}
    
    if (!allSaved[userId]) {
      allSaved[userId] = []
    }

    // Check if already saved
    const isAlreadySaved = allSaved[userId].some(saved => saved.jobId === jobId)
    if (isAlreadySaved) return true

    allSaved[userId].push({
      jobId,
      userId,
      savedAt: new Date(),
    })

    return LocalStorage.set(STORAGE_KEYS.SAVED_JOBS, allSaved)
  }

  static unsaveJob(userId: string, jobId: string): boolean {
    const allSaved = LocalStorage.get<Record<string, SavedJob[]>>(
      STORAGE_KEYS.SAVED_JOBS,
      {}
    ) || {}
    
    if (!allSaved[userId]) return true

    allSaved[userId] = allSaved[userId].filter(saved => saved.jobId !== jobId)
    return LocalStorage.set(STORAGE_KEYS.SAVED_JOBS, allSaved)
  }

  static isJobSaved(userId: string, jobId: string): boolean {
    const savedJobs = this.getSavedJobs(userId)
    return savedJobs.some(saved => saved.jobId === jobId)
  }
}

// Utility to export/import data for backup
export class DataBackup {
  static exportData(): string {
    const data = {
      mockData: MockDataStorage.getData(),
      currentUser: CurrentUserStorage.getCurrentUser(),
      userPreferences: LocalStorage.get(STORAGE_KEYS.USER_PREFERENCES),
      savedJobs: LocalStorage.get(STORAGE_KEYS.SAVED_JOBS),
      exportedAt: new Date(),
    }
    return JSON.stringify(data, null, 2)
  }

  static importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData)
      
      if (data.mockData) {
        LocalStorage.set(STORAGE_KEYS.MOCK_DATA, data.mockData)
      }
      if (data.currentUser) {
        LocalStorage.set(STORAGE_KEYS.CURRENT_USER, data.currentUser)
      }
      if (data.userPreferences) {
        LocalStorage.set(STORAGE_KEYS.USER_PREFERENCES, data.userPreferences)
      }
      if (data.savedJobs) {
        LocalStorage.set(STORAGE_KEYS.SAVED_JOBS, data.savedJobs)
      }
      
      return true
    } catch (error) {
      console.error('Error importing data:', error)
      return false
    }
  }

  static clearAllData(): boolean {
    try {
      LocalStorage.remove(STORAGE_KEYS.MOCK_DATA)
      LocalStorage.remove(STORAGE_KEYS.CURRENT_USER)
      LocalStorage.remove(STORAGE_KEYS.USER_PREFERENCES)
      LocalStorage.remove(STORAGE_KEYS.SAVED_JOBS)
      return true
    } catch (error) {
      console.error('Error clearing data:', error)
      return false
    }
  }
}