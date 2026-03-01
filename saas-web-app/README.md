# KrishiMitra AI - SaaS Web Application

AI-powered agricultural assistant providing crop guidance, weather intelligence, government schemes information, and market insights for Indian farmers.

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
saas-web-app/
├── app/                    # Next.js 14 App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── chat/              # Chat dashboard
│   ├── about/             # About page
│   └── contact/           # Contact page
├── components/            # React components
│   ├── Header.tsx
│   └── Footer.tsx
├── types/                 # TypeScript type definitions
│   └── index.ts
├── public/                # Static assets
└── package.json
```

## 🎨 Features

### Current Features (Frontend Only)
- ✅ Responsive homepage with hero section
- ✅ Interactive chat interface (UI only)
- ✅ Language selector (Hindi/English)
- ✅ About page with mission and technology info
- ✅ Contact form with validation
- ✅ Mobile-responsive design
- ✅ Glassmorphism UI effects
- ✅ Agricultural theming

### Coming Soon (Backend Integration)
- 🔄 Real AI responses via Amazon Bedrock
- 🔄 Session management with DynamoDB
- 🔄 Contact form submission to backend
- 🔄 AWS Lambda backend functions
- 🔄 API Gateway integration

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **React 18** - UI library

### Backend (To be implemented)
- **AWS Lambda** - Serverless compute
- **Amazon Bedrock** - AI foundation models (Claude 3 Sonnet)
- **DynamoDB** - NoSQL database
- **API Gateway** - RESTful APIs
- **AWS Amplify** - Hosting and deployment

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🎯 Pages

### Homepage (`/`)
- Hero section with CTAs
- Trust strip showing AWS services
- Features section
- Voice helpline information
- Chat preview
- AWS architecture overview

### Chat Dashboard (`/chat`)
- Interactive chat interface
- Language selector (Hindi/English)
- Message history
- Typing indicators
- Demo responses (replace with real API)

### About (`/about`)
- Mission statement
- Features overview
- Technology stack
- Target audience
- Hackathon information

### Contact (`/contact`)
- Contact form with validation
- Contact information
- Office hours
- Social media links

## 🌐 Deployment

### AWS Amplify (Recommended)

1. Connect your Git repository to AWS Amplify
2. Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
         - .next/cache/**/*
   ```
3. Deploy automatically on push to main branch

### Environment Variables

Create `.env.local` for local development:

```env
NEXT_PUBLIC_API_GATEWAY_URL=https://api.krishimitra.com
NEXT_PUBLIC_AWS_REGION=us-east-1
NEXT_PUBLIC_ENVIRONMENT=development
```

## 🔧 Backend Setup (Next Steps)

To connect the frontend to the backend:

1. **Deploy Lambda Functions**
   - Chat handler
   - Contact form handler
   - Health check endpoint

2. **Configure API Gateway**
   - POST /api/chat
   - POST /api/contact
   - GET /api/health

3. **Set up DynamoDB Tables**
   - Messages table
   - Contact submissions table

4. **Configure Amazon Bedrock**
   - Enable Claude 3 Sonnet model
   - Set up IAM permissions

5. **Update Frontend API Client**
   - Replace demo responses with real API calls
   - Add error handling
   - Implement retry logic

## 🎨 Design System

### Colors
- **Primary**: #2E7D32 (Green)
- **Accent**: #A5D6A7 (Light Green)
- **Background**: #F4F9F4 (Off-white)
- **Text**: #1B1B1B (Dark Gray)

### Typography
- **Font**: Inter
- **H1**: 52px bold
- **H2**: 36px semi-bold
- **Body**: 16px

### Components
- **Buttons**: Rounded full, hover scale effect
- **Cards**: White background, soft shadow, glassmorphism
- **Navigation**: Sticky top, blur background

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🌍 Multilingual Support

- **Hindi** (हिंदी): Primary language for farmers
- **English**: Secondary language

## 📄 License

This project was created for the AI For Bharat Hackathon.

## 🤝 Contributing

This is a hackathon project. For questions or suggestions, please use the contact form.

## 📞 Support

- **Web Chat**: Available on /chat page
- **Voice Helpline**: 1800-XXX-XXXX (Coming soon)
- **Email**: support@krishimitra.ai

---

Built with ❤️ for Indian farmers using AWS cloud technology.
