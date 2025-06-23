# Frontend Deployment Guide - Vercel

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Vercel CLI** (optional): `npm i -g vercel`

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"

2. **Import Repository**
   - Connect your GitHub account if not already connected
   - Select your repository: `culture` (or your repo name)
   - Vercel will auto-detect it's a Vue.js project

3. **Configure Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` (since your frontend is in a subdirectory)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Environment Variables**
   - Add the following environment variable:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: `https://culture-backend.up.railway.app/api/v1`

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete

### Option 2: Deploy via Vercel CLI

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Follow the prompts**
   - Set up and deploy: `Y`
   - Which scope: Select your account
   - Link to existing project: `N`
   - Project name: `culture-frontend` (or your preferred name)
   - In which directory is your code located: `./` (current directory)
   - Want to override the settings: `N`

5. **Set environment variable**
   ```bash
   vercel env add VITE_API_BASE_URL
   # Enter: https://culture-backend.up.railway.app/api/v1
   ```

## Configuration Files

### vercel.json
- Handles SPA routing (all routes redirect to index.html)
- Sets up CORS headers for API calls
- Configures build settings

### Environment Variables
- `VITE_API_BASE_URL`: Points to your Railway backend

## Post-Deployment

1. **Test the deployment**
   - Visit your Vercel URL
   - Test navigation between pages
   - Test API calls to your backend

2. **Custom Domain** (Optional)
   - Go to your project settings in Vercel
   - Add your custom domain
   - Configure DNS settings

3. **Environment Variables**
   - You can update environment variables in the Vercel dashboard
   - Changes require a redeploy

## Troubleshooting

### Build Errors
- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify the build command works locally

### API Connection Issues
- Verify the backend URL is correct
- Check CORS settings on your backend
- Test API endpoints directly

### Routing Issues
- Ensure `vercel.json` has the correct rewrite rules
- Test all routes work properly

## Local Development

To test locally with production settings:

```bash
cd frontend
npm install
VITE_API_BASE_URL=https://culture-backend.up.railway.app/api/v1 npm run dev
```

## Automatic Deployments

- Vercel automatically deploys on every push to your main branch
- You can configure branch deployments in project settings
- Preview deployments are created for pull requests 