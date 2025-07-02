# Job Board CMS

A comprehensive content management system for job boards built with Next.js 14, TypeScript, Tailwind CSS, and Prisma.

![Homepage](https://github.com/user-attachments/assets/a9ffe5c9-ffd7-4a7f-9f64-c2a896786417)

## 🚀 Features

### For Job Seekers
- **Advanced Job Search**: Search jobs by title, keywords, location, and company
- **Smart Filters**: Filter by job type, experience level, salary range, and remote work options
- **Application Tracking**: Track all your job applications and their status
- **Saved Jobs**: Bookmark interesting positions for later
- **Profile Management**: Create and maintain your professional profile
- **Resume Upload**: Upload and manage your resume and documents

### For Companies
- **Job Posting**: Create and publish job listings with rich text descriptions
- **Application Management**: Review, track, and manage candidate applications
- **Company Profile**: Showcase your company with branding and detailed information
- **Analytics Dashboard**: Track job performance, views, and application metrics
- **Candidate Pipeline**: Manage the hiring process from application to offer

### For Administrators
- **Complete Control**: Full platform administration and moderation capabilities
- **User Management**: Manage users, companies, and role assignments
- **Job Moderation**: Review and approve job postings before publication
- **Analytics & Insights**: Comprehensive platform analytics and reporting
- **Content Management**: Manage categories, featured jobs, and platform settings

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui for consistent, accessible design
- **Backend**: Next.js API Routes with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with multiple providers (Google, GitHub, Credentials)
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React icons
- **Charts**: Recharts for analytics visualization

## 📦 Project Structure

```
job-board-cms/
├── app/                          # Next.js 14 App Router
│   ├── (admin)/                  # Admin dashboard and management
│   ├── (auth)/                   # Authentication pages
│   ├── (company)/                # Company dashboard and job management
│   ├── (dashboard)/              # User dashboard and profile
│   ├── (public)/                 # Public pages (jobs, companies, etc.)
│   ├── api/                      # API routes
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── loading.tsx               # Global loading component
├── components/                   # Reusable React components
│   ├── ui/                       # shadcn/ui components
│   ├── layout/                   # Layout components (header, footer, etc.)
│   ├── dashboard/                # Dashboard-specific components
│   ├── forms/                    # Form components
│   ├── job/                      # Job-related components
│   ├── company/                  # Company-related components
│   ├── application/              # Application components
│   └── common/                   # Common utility components
├── lib/                          # Utility libraries
│   ├── auth.ts                   # NextAuth configuration
│   ├── db.ts                     # Database connection
│   ├── utils.ts                  # Utility functions
│   ├── validations.ts            # Zod schemas
│   ├── constants.ts              # App constants
│   ├── email.ts                  # Email utilities
│   └── upload.ts                 # File upload utilities
├── types/                        # TypeScript type definitions
├── hooks/                        # Custom React hooks
├── prisma/                       # Database schema and migrations
│   ├── schema.prisma             # Prisma schema
│   ├── seed.ts                   # Database seeding
│   └── migrations/               # Database migrations
├── public/                       # Static assets
└── ...config files
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- (Optional) Google OAuth credentials for Google sign-in
- (Optional) GitHub OAuth credentials for GitHub sign-in

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/job-board-cms.git
   cd job-board-cms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/job_board_cms"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret-here"
   
   # OAuth providers (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"
   ```

4. **Database setup**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push database schema
   npm run db:push
   
   # (Optional) Seed database with sample data
   npm run db:seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

## 🔐 Authentication

The application supports multiple authentication methods:

- **Email/Password**: Traditional email and password authentication
- **Google OAuth**: Sign in with Google account
- **GitHub OAuth**: Sign in with GitHub account

### User Roles

- **Applicant**: Job seekers who can search, apply, and manage applications
- **Company**: Organizations that can post jobs and manage hiring
- **Admin**: Platform administrators with full system access

## 🗃️ Database Schema

The application uses a comprehensive database schema with the following main entities:

- **Users**: User accounts with profiles and role-based access
- **Companies**: Organization profiles with jobs and branding
- **Jobs**: Job listings with detailed information and requirements
- **Applications**: Job applications linking users to jobs
- **Categories**: Job categories for organization
- **Sessions/Accounts**: Authentication and session management

## 🎨 Design System

The application uses a custom design system built on Tailwind CSS:

- **Color Palette**: Primary blue (#3B82F6) with semantic color variants
- **Typography**: Inter font family for headings and body text
- **Components**: Consistent, accessible components via shadcn/ui
- **Responsive**: Mobile-first responsive design
- **Dark Mode**: System-aware dark mode support

## 🔒 Security Features

- **Authentication**: Secure authentication with NextAuth.js
- **Authorization**: Role-based access control (RBAC)
- **Data Validation**: Server-side validation with Zod schemas
- **CSRF Protection**: Built-in CSRF protection
- **Input Sanitization**: Automatic input sanitization
- **Rate Limiting**: API rate limiting (to be implemented)

## 📊 Performance

- **Server-Side Rendering**: Next.js SSR for optimal SEO
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting and lazy loading
- **Caching**: Efficient data caching with TanStack Query
- **Database Optimization**: Optimized database queries with Prisma

## 🚀 Deployment

The application can be deployed on various platforms:

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Static site hosting with serverless functions
- **Railway**: Full-stack deployment with PostgreSQL
- **DigitalOcean**: App Platform deployment
- **AWS**: EC2 with RDS or Lambda + RDS

## 📈 Roadmap

### Phase 1 (Current)
- [x] Basic project setup and configuration
- [x] Authentication system with multiple providers
- [x] Public job board with search and filters
- [x] User dashboard and profile management
- [x] Admin dashboard with basic management
- [ ] Complete API implementation
- [ ] Database integration with Prisma

### Phase 2 (Upcoming)
- [ ] Company dashboard and job management
- [ ] Application system and workflow
- [ ] Email notifications and alerts
- [ ] File upload for resumes and logos
- [ ] Advanced search with Elasticsearch
- [ ] Payment integration for featured jobs

### Phase 3 (Future)
- [ ] Mobile app with React Native
- [ ] AI-powered job matching
- [ ] Video interviews integration
- [ ] Analytics and reporting dashboard
- [ ] Multi-language support
- [ ] Advanced SEO optimization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@jobboardcms.com or join our [Discord community](https://discord.gg/jobboardcms).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Prisma](https://prisma.io/) for the excellent database toolkit
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [Radix UI](https://radix-ui.com/) for accessible component primitives