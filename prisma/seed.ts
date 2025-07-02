import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@jobboard.com' },
    update: {},
    create: {
      email: 'admin@jobboard.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  // Create categories
  const categories = [
    { name: 'Software Engineering', slug: 'software-engineering', description: 'Software development and engineering roles', icon: 'Code' },
    { name: 'Design', slug: 'design', description: 'UI/UX and graphic design positions', icon: 'Palette' },
    { name: 'Marketing', slug: 'marketing', description: 'Digital marketing and growth roles', icon: 'Megaphone' },
    { name: 'Sales', slug: 'sales', description: 'Sales and business development positions', icon: 'TrendingUp' },
    { name: 'Product Management', slug: 'product-management', description: 'Product strategy and management roles', icon: 'Package' },
    { name: 'Data Science', slug: 'data-science', description: 'Data analysis and machine learning roles', icon: 'BarChart' },
    { name: 'DevOps', slug: 'devops', description: 'Infrastructure and deployment roles', icon: 'Server' },
    { name: 'Customer Success', slug: 'customer-success', description: 'Customer support and success roles', icon: 'Users' },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
  }

  // Create companies
  const companies = [
    {
      name: 'TechCorp Inc.',
      slug: 'techcorp-inc',
      description: 'Leading technology company focused on innovative solutions for the modern workplace.',
      website: 'https://techcorp.com',
      location: 'San Francisco, CA',
      industry: 'Technology',
      size: '201-500',
      founded: 2015,
      verified: true,
    },
    {
      name: 'StartupXYZ',
      slug: 'startupxyz',
      description: 'Fast-growing startup revolutionizing the way people work and collaborate.',
      website: 'https://startupxyz.com',
      location: 'Austin, TX',
      industry: 'SaaS',
      size: '11-50',
      founded: 2020,
      verified: true,
    },
    {
      name: 'Design Studio',
      slug: 'design-studio',
      description: 'Creative agency specializing in brand identity and digital experiences.',
      website: 'https://designstudio.com',
      location: 'New York, NY',
      industry: 'Design',
      size: '11-50',
      founded: 2018,
      verified: true,
    },
    {
      name: 'DataCorp Analytics',
      slug: 'datacorp-analytics',
      description: 'Data-driven company providing insights and analytics solutions for businesses.',
      website: 'https://datacorp.com',
      location: 'Seattle, WA',
      industry: 'Analytics',
      size: '51-200',
      founded: 2017,
      verified: true,
    },
    {
      name: 'CloudTech Solutions',
      slug: 'cloudtech-solutions',
      description: 'Cloud infrastructure and DevOps solutions provider.',
      website: 'https://cloudtech.com',
      location: 'Remote',
      industry: 'Cloud Computing',
      size: '101-200',
      founded: 2019,
      verified: true,
    },
  ]

  const createdCompanies = []
  for (const company of companies) {
    const createdCompany = await prisma.company.upsert({
      where: { slug: company.slug },
      update: {},
      create: company,
    })
    createdCompanies.push(createdCompany)
  }

  // Create company users
  const companyPassword = await hash('company123', 12)
  for (let i = 0; i < createdCompanies.length; i++) {
    const company = createdCompanies[i]
    await prisma.user.upsert({
      where: { email: `hr@${company.slug}.com` },
      update: {},
      create: {
        email: `hr@${company.slug}.com`,
        name: `${company.name} HR`,
        password: companyPassword,
        role: 'COMPANY',
        companyId: company.id,
      },
    })
  }

  // Get categories for job creation
  const softwareCategory = await prisma.category.findUnique({ where: { slug: 'software-engineering' } })
  const designCategory = await prisma.category.findUnique({ where: { slug: 'design' } })
  const marketingCategory = await prisma.category.findUnique({ where: { slug: 'marketing' } })
  const productCategory = await prisma.category.findUnique({ where: { slug: 'product-management' } })
  const dataCategory = await prisma.category.findUnique({ where: { slug: 'data-science' } })

  // Create jobs
  const jobs = [
    {
      title: 'Senior Frontend Developer',
      slug: 'senior-frontend-developer-techcorp',
      description: 'We are looking for a senior frontend developer to join our growing team. You will be working on cutting-edge web applications using React, TypeScript, and modern tooling. You will collaborate with designers and backend engineers to deliver exceptional user experiences.',
      requirements: '• 5+ years of experience with React and TypeScript\n• Strong understanding of modern JavaScript (ES6+)\n• Experience with state management (Redux, Zustand)\n• Knowledge of testing frameworks (Jest, React Testing Library)\n• Familiarity with build tools (Webpack, Vite)\n• Experience with version control (Git)',
      benefits: '• Competitive salary and equity package\n• Comprehensive health, dental, and vision insurance\n• 401(k) with company matching\n• Flexible working hours and remote work options\n• Professional development budget\n• Modern office with free snacks and drinks',
      location: 'San Francisco, CA',
      remote: false,
      salaryMin: 120000,
      salaryMax: 150000,
      currency: 'USD',
      jobType: 'FULL_TIME',
      experience: 'SENIOR_LEVEL',
      status: 'PUBLISHED',
      featured: true,
      companyId: createdCompanies[0].id,
      categoryId: softwareCategory?.id,
      views: 245,
      publishedAt: new Date('2024-12-28'),
    },
    {
      title: 'Product Manager',
      slug: 'product-manager-startupxyz',
      description: 'Lead product strategy and execution for our innovative platform. Work closely with engineering, design, and business teams to deliver exceptional user experiences that drive business growth.',
      requirements: '• 3+ years of product management experience\n• Strong analytical and problem-solving skills\n• Experience with product analytics tools\n• Excellent communication and leadership skills\n• Understanding of agile development methodologies\n• Bachelor\'s degree in relevant field',
      benefits: '• Equity package with high growth potential\n• Health insurance and wellness stipend\n• Unlimited PTO policy\n• Learning and development budget\n• Remote-first culture\n• Regular team retreats',
      location: 'Austin, TX',
      remote: true,
      salaryMin: 100000,
      salaryMax: 130000,
      currency: 'USD',
      jobType: 'FULL_TIME',
      experience: 'MID_LEVEL',
      status: 'PUBLISHED',
      featured: false,
      companyId: createdCompanies[1].id,
      categoryId: productCategory?.id,
      views: 89,
      publishedAt: new Date('2024-12-25'),
    },
    {
      title: 'UX Designer',
      slug: 'ux-designer-design-studio',
      description: 'Create amazing user experiences for our diverse client portfolio. You will be responsible for user research, wireframing, prototyping, and collaborating with development teams to bring designs to life.',
      requirements: '• 2+ years of UX design experience\n• Proficiency in Figma or Sketch\n• Strong portfolio showcasing UX process\n• Experience with user research and testing\n• Understanding of accessibility principles\n• Excellent communication skills',
      benefits: '• Creative and collaborative environment\n• Professional development budget for conferences\n• Flexible schedule and work arrangements\n• Health and dental insurance\n• Profit sharing program\n• Access to latest design tools',
      location: 'New York, NY',
      remote: false,
      salaryMin: 80000,
      salaryMax: 100000,
      currency: 'USD',
      jobType: 'CONTRACT',
      experience: 'MID_LEVEL',
      status: 'PUBLISHED',
      featured: false,
      companyId: createdCompanies[2].id,
      categoryId: designCategory?.id,
      views: 156,
      publishedAt: new Date('2024-12-27'),
    },
    {
      title: 'Data Scientist',
      slug: 'data-scientist-datacorp',
      description: 'Join our data science team to build machine learning models and extract insights from large datasets. You will work on exciting projects involving predictive analytics, recommendation systems, and business intelligence.',
      requirements: '• Master\'s degree in Data Science, Statistics, or related field\n• 3+ years of experience with Python and R\n• Strong knowledge of machine learning algorithms\n• Experience with SQL and big data technologies\n• Familiarity with cloud platforms (AWS, GCP)\n• Excellent analytical and problem-solving skills',
      benefits: '• Competitive salary with performance bonuses\n• Comprehensive benefits package\n• Access to cutting-edge technology and tools\n• Conference attendance and training opportunities\n• Collaborative and innovative work environment\n• Flexible working arrangements',
      location: 'Seattle, WA',
      remote: true,
      salaryMin: 110000,
      salaryMax: 140000,
      currency: 'USD',
      jobType: 'FULL_TIME',
      experience: 'MID_LEVEL',
      status: 'PUBLISHED',
      featured: true,
      companyId: createdCompanies[3].id,
      categoryId: dataCategory?.id,
      views: 198,
      publishedAt: new Date('2024-12-26'),
    },
    {
      title: 'DevOps Engineer',
      slug: 'devops-engineer-cloudtech',
      description: 'Design and maintain scalable cloud infrastructure. Work with development teams to implement CI/CD pipelines, monitoring solutions, and automation tools to support our growing platform.',
      requirements: '• 4+ years of DevOps or infrastructure experience\n• Strong knowledge of AWS, Docker, and Kubernetes\n• Experience with Infrastructure as Code (Terraform)\n• Proficiency in scripting languages (Python, Bash)\n• Understanding of monitoring and logging tools\n• Experience with CI/CD pipelines',
      benefits: '• Fully remote position\n• Competitive salary and equity\n• Annual technology allowance\n• Health and wellness benefits\n• Professional certification support\n• Flexible time off policy',
      location: 'Remote',
      remote: true,
      salaryMin: 105000,
      salaryMax: 135000,
      currency: 'USD',
      jobType: 'FULL_TIME',
      experience: 'SENIOR_LEVEL',
      status: 'PUBLISHED',
      featured: false,
      companyId: createdCompanies[4].id,
      categoryId: softwareCategory?.id,
      views: 134,
      publishedAt: new Date('2024-12-29'),
    },
  ]

  for (const job of jobs) {
    await prisma.job.upsert({
      where: { slug: job.slug },
      update: {},
      create: job,
    })
  }

  // Create some test applicants
  const applicantPassword = await hash('user123', 12)
  const applicants = [
    {
      email: 'john.doe@email.com',
      name: 'John Doe',
      password: applicantPassword,
      role: 'APPLICANT' as const,
    },
    {
      email: 'jane.smith@email.com',
      name: 'Jane Smith',
      password: applicantPassword,
      role: 'APPLICANT' as const,
    },
    {
      email: 'mike.johnson@email.com',
      name: 'Mike Johnson',
      password: applicantPassword,
      role: 'APPLICANT' as const,
    },
  ]

  const createdApplicants = []
  for (const applicant of applicants) {
    const createdApplicant = await prisma.user.upsert({
      where: { email: applicant.email },
      update: {},
      create: applicant,
    })
    createdApplicants.push(createdApplicant)

    // Create user profiles
    await prisma.userProfile.upsert({
      where: { userId: createdApplicant.id },
      update: {},
      create: {
        userId: createdApplicant.id,
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        bio: 'Passionate software developer with experience in modern web technologies.',
        skills: ['JavaScript', 'React', 'TypeScript', 'Node.js', 'Python'],
        experience: '3 years of full-stack development experience',
        education: 'Bachelor of Science in Computer Science',
        linkedinUrl: 'https://linkedin.com/in/johndoe',
        githubUrl: 'https://github.com/johndoe',
      },
    })
  }

  // Create some applications
  const publishedJobs = await prisma.job.findMany({
    where: { status: 'PUBLISHED' },
    take: 3,
  })

  const applicationStatuses = ['PENDING', 'REVIEWING', 'SHORTLISTED', 'INTERVIEWED', 'REJECTED', 'ACCEPTED'] as const

  for (let i = 0; i < publishedJobs.length; i++) {
    const job = publishedJobs[i]
    const applicant = createdApplicants[i]
    
    await prisma.application.upsert({
      where: { 
        jobId_userId: {
          jobId: job.id,
          userId: applicant.id,
        }
      },
      update: {},
      create: {
        jobId: job.id,
        userId: applicant.id,
        coverLetter: `I am very interested in the ${job.title} position at your company. I believe my skills and experience make me a great fit for this role.`,
        status: applicationStatuses[Math.floor(Math.random() * applicationStatuses.length)],
        appliedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random date within last week
      },
    })
  }

  console.log('✅ Database seeded successfully!')
  console.log(`👤 Admin user: admin@jobboard.com / admin123`)
  console.log(`🏢 Company users: hr@[company-slug].com / company123`)
  console.log(`👥 Test users: john.doe@email.com, jane.smith@email.com, mike.johnson@email.com / user123`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })