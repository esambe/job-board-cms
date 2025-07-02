export interface Application {
  id: string
  jobId: string
  userId: string
  status: "PENDING" | "REVIEWING" | "SHORTLISTED" | "REJECTED" | "ACCEPTED"
  coverLetter?: string
  resume?: string
  additionalInfo?: string
  notes?: string
  reviewedAt?: Date
  reviewedBy?: string
  createdAt: Date
  updatedAt: Date
}

export const mockApplications: Application[] = [
  // Applications for Senior Frontend Developer (job-1)
  {
    id: "app-1",
    jobId: "job-1",
    userId: "user-1",
    status: "PENDING",
    coverLetter: "I am excited to apply for the Senior Frontend Developer position at TechCorp. With 5 years of experience in React and TypeScript, I believe I would be a perfect fit for your team. I have led several frontend projects and am passionate about creating exceptional user experiences.",
    resume: "john_doe_resume.pdf",
    additionalInfo: "Portfolio available at: https://johndoe.dev",
    createdAt: new Date("2024-12-30T10:30:00Z"),
    updatedAt: new Date("2024-12-30T10:30:00Z"),
  },
  {
    id: "app-2",
    jobId: "job-1",
    userId: "user-3",
    status: "REVIEWING",
    coverLetter: "As a UX Designer with strong frontend development skills, I'm interested in transitioning to a more technical role. My design background gives me unique insights into creating user-friendly interfaces.",
    resume: "mike_johnson_resume.pdf",
    notes: "Interesting profile - design background could be valuable for frontend role",
    reviewedAt: new Date("2024-12-30T14:20:00Z"),
    reviewedBy: "company-1",
    createdAt: new Date("2024-12-29T16:45:00Z"),
    updatedAt: new Date("2024-12-30T14:20:00Z"),
  },
  
  // Applications for Product Manager (job-2)
  {
    id: "app-3",
    jobId: "job-2",
    userId: "user-2",
    status: "SHORTLISTED",
    coverLetter: "I'm thrilled to apply for the Product Manager role at AI Innovations. My 7 years of experience in B2B SaaS product management align perfectly with your needs. I've successfully launched multiple products and have experience with AI/ML product development.",
    resume: "jane_smith_resume.pdf",
    additionalInfo: "Led product team that increased user engagement by 150%",
    notes: "Strong candidate with relevant AI product experience",
    reviewedAt: new Date("2024-12-29T11:15:00Z"),
    reviewedBy: "company-2",
    createdAt: new Date("2024-12-28T09:20:00Z"),
    updatedAt: new Date("2024-12-29T11:15:00Z"),
  },
  
  // Applications for UX Designer (job-3)
  {
    id: "app-4",
    jobId: "job-3",
    userId: "user-3",
    status: "ACCEPTED",
    coverLetter: "I'm passionate about creating inclusive and accessible digital experiences. My portfolio demonstrates my ability to solve complex UX challenges and work collaboratively with development teams.",
    resume: "mike_johnson_resume.pdf",
    additionalInfo: "Award-winning designer with 4 years of experience in design systems",
    notes: "Excellent portfolio, strong cultural fit, immediate availability",
    reviewedAt: new Date("2024-12-28T16:30:00Z"),
    reviewedBy: "hr@designstudio.com",
    createdAt: new Date("2024-12-27T14:10:00Z"),
    updatedAt: new Date("2024-12-28T16:30:00Z"),
  },
  
  // Applications for Data Scientist (job-4)
  {
    id: "app-5",
    jobId: "job-4",
    userId: "user-4",
    status: "REVIEWING",
    coverLetter: "With my PhD in Statistics and 6 years of industry experience, I'm excited about the opportunity to apply machine learning to healthcare challenges. My research background in statistical modeling aligns well with your data science needs.",
    resume: "sarah_wilson_resume.pdf",
    additionalInfo: "Published 15 papers in top-tier journals, strong Python/R skills",
    notes: "PhD background is impressive, checking references",
    reviewedAt: new Date("2024-12-29T13:45:00Z"),
    reviewedBy: "company-3",
    createdAt: new Date("2024-12-26T11:30:00Z"),
    updatedAt: new Date("2024-12-29T13:45:00Z"),
  },
  {
    id: "app-6",
    jobId: "job-4",
    userId: "user-1",
    status: "REJECTED",
    coverLetter: "Although my background is primarily in frontend development, I have been studying data science and machine learning in my spare time. I believe my technical background would help me transition into this role.",
    resume: "john_doe_resume.pdf",
    notes: "Good technical background but lacks data science experience",
    reviewedAt: new Date("2024-12-28T10:00:00Z"),
    reviewedBy: "company-3",
    createdAt: new Date("2024-12-27T08:15:00Z"),
    updatedAt: new Date("2024-12-28T10:00:00Z"),
  },
  
  // Applications for DevOps Engineer (job-5)
  {
    id: "app-7",
    jobId: "job-5",
    userId: "user-5",
    status: "PENDING",
    coverLetter: "I'm excited to apply for the DevOps Engineer position. My 5 years of experience with AWS, Kubernetes, and automation tools make me well-suited for this role. I'm passionate about building reliable, scalable infrastructure.",
    resume: "alex_chen_resume.pdf",
    additionalInfo: "AWS certified, extensive Kubernetes experience",
    createdAt: new Date("2024-12-30T08:45:00Z"),
    updatedAt: new Date("2024-12-30T08:45:00Z"),
  },
  
  // Applications for Backend Developer (job-6)
  {
    id: "app-8",
    jobId: "job-6",
    userId: "user-1",
    status: "REVIEWING",
    coverLetter: "While my recent experience has been in frontend development, I have strong backend skills in Node.js and Python. I'm looking to focus more on backend development and would love to contribute to Microsoft's innovative projects.",
    resume: "john_doe_resume.pdf",
    notes: "Frontend background but shows backend potential",
    reviewedAt: new Date("2024-12-29T15:30:00Z"),
    reviewedBy: "company-2",
    createdAt: new Date("2024-12-25T13:20:00Z"),
    updatedAt: new Date("2024-12-29T15:30:00Z"),
  },
  
  // Applications for Mobile App Developer (job-7)
  {
    id: "app-9",
    jobId: "job-7",
    userId: "user-3",
    status: "PENDING",
    coverLetter: "As a UX Designer with mobile app design experience, I'm interested in expanding into mobile development. I have been learning React Native and believe my design background would be valuable for creating user-friendly mobile experiences.",
    resume: "mike_johnson_resume.pdf",
    additionalInfo: "Strong mobile design portfolio, learning React Native",
    createdAt: new Date("2024-12-29T12:10:00Z"),
    updatedAt: new Date("2024-12-29T12:10:00Z"),
  },
  
  // Applications for Full Stack Engineer (job-8)
  {
    id: "app-10",
    jobId: "job-8",
    userId: "user-1",
    status: "SHORTLISTED",
    coverLetter: "I'm excited about the Full Stack Engineer opportunity at Green Energy Corp. My experience spans both frontend and backend development, and I'm passionate about contributing to sustainable technology solutions.",
    resume: "john_doe_resume.pdf",
    notes: "Strong full-stack skills, passion for green technology aligns with company mission",
    reviewedAt: new Date("2024-12-28T14:45:00Z"),
    reviewedBy: "hr@greenenergy.com",
    createdAt: new Date("2024-12-24T10:30:00Z"),
    updatedAt: new Date("2024-12-28T14:45:00Z"),
  },
  
  // Applications for Cybersecurity Analyst (job-9)
  {
    id: "app-11",
    jobId: "job-9",
    userId: "user-5",
    status: "REVIEWING",
    coverLetter: "My DevOps background has given me extensive experience with security practices and tools. I'm interested in transitioning to a dedicated cybersecurity role and believe my infrastructure knowledge would be valuable.",
    resume: "alex_chen_resume.pdf",
    notes: "Good security background from DevOps, need to assess cybersecurity depth",
    reviewedAt: new Date("2024-12-27T16:20:00Z"),
    reviewedBy: "security-lead",
    createdAt: new Date("2024-12-23T14:55:00Z"),
    updatedAt: new Date("2024-12-27T16:20:00Z"),
  },
  
  // Applications for AI/ML Engineer (job-10)
  {
    id: "app-12",
    jobId: "job-10",
    userId: "user-4",
    status: "PENDING",
    coverLetter: "I'm thrilled to apply for the AI/ML Engineer position at Google. My PhD in Statistics and extensive machine learning experience make me well-suited for this role. I'm excited about the opportunity to work on cutting-edge AI technologies.",
    resume: "sarah_wilson_resume.pdf",
    additionalInfo: "PhD in Statistics, 6 years ML experience, published researcher",
    createdAt: new Date("2024-12-30T09:15:00Z"),
    updatedAt: new Date("2024-12-30T09:15:00Z"),
  },
  
  // Applications for Digital Marketing Manager (job-11)
  {
    id: "app-13",
    jobId: "job-11",
    userId: "user-2",
    status: "REJECTED",
    coverLetter: "While my background is primarily in product management, I have worked closely with marketing teams and understand digital marketing principles. I'm interested in transitioning to a marketing-focused role.",
    resume: "jane_smith_resume.pdf",
    notes: "Strong analytical skills but lacks hands-on marketing experience",
    reviewedAt: new Date("2024-12-26T11:30:00Z"),
    reviewedBy: "marketing-director",
    createdAt: new Date("2024-12-21T15:40:00Z"),
    updatedAt: new Date("2024-12-26T11:30:00Z"),
  },
  
  // Applications for Sales Development Representative (job-13)
  {
    id: "app-14",
    jobId: "job-13",
    userId: "user-3",
    status: "PENDING",
    coverLetter: "I'm interested in starting my sales career with FinTech Pro. My design background has taught me to understand customer needs and communicate effectively. I'm eager to learn sales skills and contribute to the team's success.",
    resume: "mike_johnson_resume.pdf",
    additionalInfo: "Design background provides strong customer empathy",
    createdAt: new Date("2024-12-28T16:25:00Z"),
    updatedAt: new Date("2024-12-28T16:25:00Z"),
  },
  
  // Applications for Account Executive (job-14)
  {
    id: "app-15",
    jobId: "job-14",
    userId: "user-2",
    status: "SHORTLISTED",
    coverLetter: "My product management experience has involved working closely with enterprise clients and understanding their business needs. I'm excited about transitioning to a client-facing sales role where I can leverage my technical background.",
    resume: "jane_smith_resume.pdf",
    notes: "Product management background valuable for technical sales",
    reviewedAt: new Date("2024-12-25T13:15:00Z"),
    reviewedBy: "sales-manager",
    createdAt: new Date("2024-12-18T11:20:00Z"),
    updatedAt: new Date("2024-12-25T13:15:00Z"),
  },
  
  // Applications for Financial Analyst (job-15)
  {
    id: "app-16",
    jobId: "job-15",
    userId: "user-4",
    status: "REVIEWING",
    coverLetter: "My strong analytical background in data science translates well to financial analysis. I have experience with statistical modeling and data analysis tools that would be valuable for financial forecasting and reporting.",
    resume: "sarah_wilson_resume.pdf",
    notes: "Strong quantitative background, checking for finance-specific experience",
    reviewedAt: new Date("2024-12-24T10:45:00Z"),
    reviewedBy: "finance-director",
    createdAt: new Date("2024-12-17T14:30:00Z"),
    updatedAt: new Date("2024-12-24T10:45:00Z"),
  },
  
  // Applications for Healthcare Data Analyst (job-16)
  {
    id: "app-17",
    jobId: "job-16",
    userId: "user-4",
    status: "ACCEPTED",
    coverLetter: "I'm passionate about using data science to improve healthcare outcomes. My PhD in Statistics and experience with large datasets make me well-suited for healthcare data analysis. I understand the importance of HIPAA compliance and data privacy in healthcare.",
    resume: "sarah_wilson_resume.pdf",
    additionalInfo: "Strong healthcare data experience, HIPAA training completed",
    notes: "Perfect fit - PhD, healthcare experience, immediate availability",
    reviewedAt: new Date("2024-12-22T15:20:00Z"),
    reviewedBy: "healthtech-lead",
    createdAt: new Date("2024-12-16T09:45:00Z"),
    updatedAt: new Date("2024-12-22T15:20:00Z"),
  },
  
  // Applications for Software Engineer Intern (job-20)
  {
    id: "app-18",
    jobId: "job-20",
    userId: "user-1",
    status: "REVIEWING",
    coverLetter: "Although I have 5 years of professional experience, I'm interested in the internship program to learn Meta's engineering culture and contribute to innovative projects. I believe my experience could also help mentor other interns.",
    resume: "john_doe_resume.pdf",
    notes: "Overqualified but shows genuine interest in company culture",
    reviewedAt: new Date("2024-12-23T11:30:00Z"),
    reviewedBy: "intern-coordinator",
    createdAt: new Date("2024-12-12T13:15:00Z"),
    updatedAt: new Date("2024-12-23T11:30:00Z"),
  },
  
  // Applications for Frontend Developer - Contract (job-21)
  {
    id: "app-19",
    jobId: "job-21",
    userId: "user-1",
    status: "ACCEPTED",
    coverLetter: "I'm available for a 3-6 month contract engagement and have extensive React and TypeScript experience. My portfolio demonstrates my ability to deliver high-quality frontend solutions quickly and efficiently.",
    resume: "john_doe_resume.pdf",
    additionalInfo: "Available immediately, strong portfolio of React projects",
    notes: "Perfect fit for contract role, negotiated rate at $75/hour",
    reviewedAt: new Date("2024-12-21T14:00:00Z"),
    reviewedBy: "tech-lead",
    createdAt: new Date("2024-12-11T10:20:00Z"),
    updatedAt: new Date("2024-12-21T14:00:00Z"),
  },
  
  // Applications for Senior Engineering Manager (job-22)
  {
    id: "app-20",
    jobId: "job-22",
    userId: "user-1",
    status: "REVIEWING",
    coverLetter: "While I don't have formal management experience, I have been mentoring junior developers and leading technical initiatives. I'm interested in transitioning to engineering management and believe my technical background would be valuable.",
    resume: "john_doe_resume.pdf",
    notes: "Strong technical background but lacks management experience",
    reviewedAt: new Date("2024-12-20T16:45:00Z"),
    reviewedBy: "engineering-director",
    createdAt: new Date("2024-12-10T12:30:00Z"),
    updatedAt: new Date("2024-12-20T16:45:00Z"),
  },
  
  // Applications for Part-time UX Designer (job-23)
  {
    id: "app-21",
    jobId: "job-23",
    userId: "user-3",
    status: "PENDING",
    coverLetter: "I'm looking for a part-time design role that offers flexibility while allowing me to continue growing my design skills. My portfolio demonstrates my ability to create user-centered designs and work collaboratively with teams.",
    resume: "mike_johnson_resume.pdf",
    additionalInfo: "Seeking work-life balance, available 25 hours/week",
    createdAt: new Date("2024-12-29T17:10:00Z"),
    updatedAt: new Date("2024-12-29T17:10:00Z"),
  },
  
  // Applications for Robotics Engineer (job-24)
  {
    id: "app-22",
    jobId: "job-24",
    userId: "user-5",
    status: "SHORTLISTED",
    coverLetter: "My DevOps and automation experience has given me exposure to robotic systems and control software. I'm excited about transitioning to robotics engineering and contributing to innovative automation solutions.",
    resume: "alex_chen_resume.pdf",
    notes: "Automation background relevant, strong programming skills",
    reviewedAt: new Date("2024-12-19T13:20:00Z"),
    reviewedBy: "robotics-lead",
    createdAt: new Date("2024-12-08T15:45:00Z"),
    updatedAt: new Date("2024-12-19T13:20:00Z"),
  },
  
  // Applications for Growth Marketing Manager (job-26)
  {
    id: "app-23",
    jobId: "job-26",
    userId: "user-2",
    status: "PENDING",
    coverLetter: "My product management experience has involved growth metrics, user acquisition, and data-driven decision making. I'm excited about focusing specifically on growth marketing and applying my analytical skills to marketing challenges.",
    resume: "jane_smith_resume.pdf",
    additionalInfo: "Strong analytical background, growth metrics experience",
    createdAt: new Date("2024-12-30T11:40:00Z"),
    updatedAt: new Date("2024-12-30T11:40:00Z"),
  },
  
  // Applications for Cloud Solutions Architect (job-29)
  {
    id: "app-24",
    jobId: "job-29",
    userId: "user-5",
    status: "REVIEWING",
    coverLetter: "My DevOps experience with AWS and infrastructure as code makes me well-suited for a cloud architecture role. I have experience designing scalable, secure cloud solutions and working with enterprise clients.",
    resume: "alex_chen_resume.pdf",
    notes: "Strong cloud experience, checking for architecture-level thinking",
    reviewedAt: new Date("2024-12-28T12:15:00Z"),
    reviewedBy: "cloud-architect",
    createdAt: new Date("2024-12-05T16:30:00Z"),
    updatedAt: new Date("2024-12-28T12:15:00Z"),
  },
  
  // Applications for Senior Data Engineer (job-30)
  {
    id: "app-25",
    jobId: "job-30",
    userId: "user-4",
    status: "SHORTLISTED",
    coverLetter: "My data science background has involved extensive work with data pipelines and infrastructure. I'm interested in focusing on the engineering side of data systems and contributing to scalable data platform development.",
    resume: "sarah_wilson_resume.pdf",
    notes: "Strong data background, good fit for data engineering role",
    reviewedAt: new Date("2024-12-27T10:30:00Z"),
    reviewedBy: "data-engineering-lead",
    createdAt: new Date("2024-12-02T14:20:00Z"),
    updatedAt: new Date("2024-12-27T10:30:00Z"),
  },
]

// Helper function to get applications by job ID
export function getApplicationsByJobId(jobId: string): Application[] {
  return mockApplications.filter(app => app.jobId === jobId)
}

// Helper function to get applications by user ID
export function getApplicationsByUserId(userId: string): Application[] {
  return mockApplications.filter(app => app.userId === userId)
}

// Helper function to get applications by status
export function getApplicationsByStatus(status: Application['status']): Application[] {
  return mockApplications.filter(app => app.status === status)
}

// Helper function to get application statistics
export function getApplicationStats() {
  const total = mockApplications.length
  const pending = mockApplications.filter(app => app.status === 'PENDING').length
  const reviewing = mockApplications.filter(app => app.status === 'REVIEWING').length
  const shortlisted = mockApplications.filter(app => app.status === 'SHORTLISTED').length
  const rejected = mockApplications.filter(app => app.status === 'REJECTED').length
  const accepted = mockApplications.filter(app => app.status === 'ACCEPTED').length
  
  return {
    total,
    pending,
    reviewing,
    shortlisted,
    rejected,
    accepted,
  }
}