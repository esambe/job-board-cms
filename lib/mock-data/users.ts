export interface User {
  id: string
  email: string
  password: string // In real app this would be hashed
  name: string
  role: "ADMIN" | "COMPANY" | "APPLICANT"
  image?: string
  companyId?: string
  profile?: {
    bio?: string
    skills?: string[]
    experience?: string
    education?: string
    location?: string
    phone?: string
    website?: string
    resume?: string
  }
  createdAt: Date
  updatedAt: Date
}

export const mockUsers: User[] = [
  // Admin Users
  {
    id: "admin-1",
    email: "admin@jobboard.com",
    password: "admin123",
    name: "Admin User",
    role: "ADMIN",
    image: "https://via.placeholder.com/150/3B82F6/FFFFFF?text=AU",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  
  // Company Users
  {
    id: "company-1",
    email: "hr@techcorp.com",
    password: "company123",
    name: "Sarah Johnson",
    role: "COMPANY",
    companyId: "techcorp",
    image: "https://via.placeholder.com/150/10B981/FFFFFF?text=SJ",
    profile: {
      bio: "HR Manager at TechCorp with 8 years of experience in talent acquisition.",
      phone: "+1-555-0101",
      location: "San Francisco, CA",
    },
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-12-01"),
  },
  {
    id: "company-2",
    email: "hiring@microsoft.com",
    password: "company123",
    name: "Michael Chen",
    role: "COMPANY",
    companyId: "microsoft",
    image: "https://via.placeholder.com/150/8B5CF6/FFFFFF?text=MC",
    profile: {
      bio: "Senior Recruiter at Microsoft, specializing in engineering talent.",
      phone: "+1-555-0102",
      location: "Seattle, WA",
    },
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-12-01"),
  },
  {
    id: "company-3",
    email: "talent@google.com",
    password: "company123",
    name: "Emily Rodriguez",
    role: "COMPANY",
    companyId: "google",
    image: "https://via.placeholder.com/150/F59E0B/FFFFFF?text=ER",
    profile: {
      bio: "Talent Acquisition Lead at Google, passionate about diversity in tech.",
      phone: "+1-555-0103",
      location: "Mountain View, CA",
    },
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-12-01"),
  },

  // Job Seekers
  {
    id: "user-1",
    email: "john@example.com",
    password: "user123",
    name: "John Doe",
    role: "APPLICANT",
    image: "https://via.placeholder.com/150/EF4444/FFFFFF?text=JD",
    profile: {
      bio: "Full-stack developer with 5 years of experience in React and Node.js. Passionate about creating user-friendly applications.",
      skills: ["JavaScript", "React", "Node.js", "TypeScript", "Python", "PostgreSQL"],
      experience: "5 years",
      education: "BS Computer Science, Stanford University",
      location: "San Francisco, CA",
      phone: "+1-555-0201",
      website: "https://johndoe.dev",
      resume: "john_doe_resume.pdf",
    },
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-12-15"),
  },
  {
    id: "user-2",
    email: "jane@example.com",
    password: "user123",
    name: "Jane Smith",
    role: "APPLICANT",
    image: "https://via.placeholder.com/150/06B6D4/FFFFFF?text=JS",
    profile: {
      bio: "Product Manager with expertise in B2B SaaS products. Strong background in user research and data-driven decision making.",
      skills: ["Product Management", "User Research", "Data Analysis", "Agile", "Scrum", "Figma"],
      experience: "7 years",
      education: "MBA, Harvard Business School",
      location: "New York, NY",
      phone: "+1-555-0202",
      website: "https://janesmith.pm",
      resume: "jane_smith_resume.pdf",
    },
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-12-10"),
  },
  {
    id: "user-3",
    email: "mike@example.com",
    password: "user123",
    name: "Mike Johnson",
    role: "APPLICANT",
    image: "https://via.placeholder.com/150/84CC16/FFFFFF?text=MJ",
    profile: {
      bio: "UX Designer passionate about creating inclusive and accessible digital experiences. 4 years of experience in design systems.",
      skills: ["UI/UX Design", "Figma", "Sketch", "Adobe Creative Suite", "Design Systems", "User Research"],
      experience: "4 years",
      education: "BFA Design, Art Center College of Design",
      location: "Los Angeles, CA",
      phone: "+1-555-0203",
      website: "https://mikejohnson.design",
      resume: "mike_johnson_resume.pdf",
    },
    createdAt: new Date("2024-04-01"),
    updatedAt: new Date("2024-12-05"),
  },
  {
    id: "user-4",
    email: "sarah@example.com",
    password: "user123",
    name: "Sarah Wilson",
    role: "APPLICANT",
    image: "https://via.placeholder.com/150/EC4899/FFFFFF?text=SW",
    profile: {
      bio: "Data Scientist with expertise in machine learning and statistical analysis. PhD in Statistics with industry experience.",
      skills: ["Python", "R", "Machine Learning", "SQL", "TensorFlow", "Pandas", "Scikit-learn"],
      experience: "6 years",
      education: "PhD Statistics, MIT",
      location: "Boston, MA",
      phone: "+1-555-0204",
      website: "https://sarahwilson.data",
      resume: "sarah_wilson_resume.pdf",
    },
    createdAt: new Date("2024-04-15"),
    updatedAt: new Date("2024-12-08"),
  },
  {
    id: "user-5",
    email: "alex@example.com",
    password: "user123",
    name: "Alex Chen",
    role: "APPLICANT",
    image: "https://via.placeholder.com/150/8B5CF6/FFFFFF?text=AC",
    profile: {
      bio: "DevOps Engineer specializing in cloud infrastructure and automation. AWS certified with Kubernetes expertise.",
      skills: ["AWS", "Kubernetes", "Docker", "Terraform", "Jenkins", "Python", "Linux"],
      experience: "5 years",
      education: "BS Computer Engineering, UC Berkeley",
      location: "Austin, TX",
      phone: "+1-555-0205",
      website: "https://alexchen.dev",
      resume: "alex_chen_resume.pdf",
    },
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-12-12"),
  },
]