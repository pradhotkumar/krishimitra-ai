# KrishiMitra AI - Production Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- AWS Account with appropriate permissions
- Git installed

### Local Development Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd krishimitra-ai
```

2. **Install dependencies**
```bash
cd saas-web-app
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your actual values
```

4. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Production Build

### Build the Next.js Application

```bash
cd saas-web-app
npm run build
npm start
```

### Build Verification
- Check for TypeScript errors
- Verify all pages render correctly
- Test API routes
- Check image optimization

## 🌐 Deployment Options

### Option 1: Vercel (Recommended for Next.js)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
cd saas-web-app
vercel
```

3. **Configure Environment Variables**
- Go to Vercel Dashboard → Project Settings → Environment Variables
- Add all variables from `.env.example`

### Option 2: AWS Amplify

1. **Connect GitHub Repository**
- Go to AWS Amplify Console
- Connect your GitHub repository
- Select the `saas-web-app` folder as root

2. **Configure Build Settings**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - cd saas-web-app
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: saas-web-app/.next
    files:
      - '**/*'
  cache:
    paths:
      - saas-web-app/node_modules/**/*
```

3. **Add Environment Variables**
- In Amplify Console, add all environment variables

### Option 3: Docker + AWS ECS

1. **Create Dockerfile** (in saas-web-app/)
```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

2. **Build and Push**
```bash
docker build -t krishimitra-ai .
docker tag krishimitra-ai:latest <your-ecr-repo>:latest
docker push <your-ecr-repo>:latest
```

## 🔧 AWS Backend Setup

### 1. DynamoDB Tables

Create the following tables:

```bash
# Users Table
aws dynamodb create-table \
  --table-name krishimitra-users \
  --attribute-definitions AttributeName=userId,AttributeType=S \
  --key-schema AttributeName=userId,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST

# Products Table
aws dynamodb create-table \
  --table-name krishimitra-products \
  --attribute-definitions AttributeName=productId,AttributeType=S \
  --key-schema AttributeName=productId,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST

# Orders Table
aws dynamodb create-table \
  --table-name krishimitra-orders \
  --attribute-definitions AttributeName=orderId,AttributeType=S \
  --key-schema AttributeName=orderId,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST
```

### 2. S3 Buckets

```bash
# Data bucket
aws s3 mb s3://krishimitra-data --region ap-south-1

# Uploads bucket
aws s3 mb s3://krishimitra-uploads --region ap-south-1
```

### 3. Lambda Functions

Deploy the backend Lambda function:

```bash
cd backend
pip install -r requirements.txt -t .
zip -r function.zip .
aws lambda create-function \
  --function-name krishimitra-backend \
  --runtime python3.11 \
  --role <your-lambda-role-arn> \
  --handler lambda_function.lambda_handler \
  --zip-file fileb://function.zip
```

### 4. Amazon Lex Bot

1. Go to Amazon Lex Console
2. Create a new bot
3. Import bot definition from `backend/lex/`
4. Build and test the bot
5. Note the Bot ID and Alias ID

### 5. Amazon Connect

1. Create Connect instance
2. Import contact flows
3. Configure phone number
4. Link to Lex bot

## 🔐 Security Checklist

- [ ] All environment variables configured
- [ ] AWS IAM roles with least privilege
- [ ] API rate limiting enabled
- [ ] CORS configured properly
- [ ] HTTPS enforced
- [ ] Secrets stored in AWS Secrets Manager
- [ ] CloudWatch logging enabled
- [ ] WAF rules configured
- [ ] DDoS protection enabled

## 📊 Monitoring Setup

### CloudWatch Dashboards

Create dashboards for:
- API response times
- Error rates
- User activity
- Lambda invocations
- DynamoDB metrics

### Alarms

Set up alarms for:
- High error rates (>5%)
- Slow response times (>3s)
- High Lambda costs
- DynamoDB throttling

## 🧪 Testing

### Run Tests
```bash
cd saas-web-app
npm test
```

### E2E Testing
```bash
npm run test:e2e
```

### Load Testing
Use tools like:
- Apache JMeter
- k6
- Artillery

## 📈 Performance Optimization

### Next.js Optimizations
- ✅ Image optimization enabled
- ✅ Code splitting automatic
- ✅ Static page generation where possible
- ✅ API routes optimized

### CDN Setup
- Use CloudFront for static assets
- Enable caching headers
- Compress responses

### Database Optimization
- Use DynamoDB indexes
- Implement caching (Redis/ElastiCache)
- Batch operations where possible

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: |
          cd saas-web-app
          npm ci
          
      - name: Run tests
        run: |
          cd saas-web-app
          npm test
          
      - name: Build
        run: |
          cd saas-web-app
          npm run build
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🐛 Troubleshooting

### Common Issues

**Build fails with TypeScript errors**
```bash
npm run type-check
```

**Images not loading**
- Check Next.js image domains configuration
- Verify CORS settings

**API routes returning 500**
- Check CloudWatch logs
- Verify environment variables
- Check AWS credentials

**Slow page loads**
- Enable caching
- Optimize images
- Use CDN

## 📞 Support

For issues or questions:
- GitHub Issues: <your-repo-url>/issues
- Email: support@krishimitra.ai
- Documentation: <your-docs-url>

## 📝 License

[Your License Here]

## 🙏 Acknowledgments

- Next.js team
- AWS services
- Open source community
