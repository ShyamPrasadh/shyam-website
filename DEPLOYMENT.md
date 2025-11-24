# Deployment Guide - GitHub & Vercel

## ✅ Git Repository Setup (Complete!)

Your code has been initialized as a Git repository and all files have been committed.

## 📤 Push to GitHub

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Repository name: `portfolio` (or any name you prefer)
3. Description: "macOS-style interactive portfolio"
4. **Keep it Public** (required for free Vercel deployment)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Step 2: Push Your Code

After creating the repository, run these commands:

```bash
cd /Users/shyam/.gemini/antigravity/scratch/shyam_portfolio

# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push your code
git branch -M main
git push -u origin main
```

## 🚀 Deploy to Vercel

### Option 1: Vercel Dashboard (Recommended)

1. Go to [Vercel](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Add New" → "Project"
4. Import your `portfolio` repository
5. Vercel will auto-detect Vite configuration
6. Click "Deploy"

**That's it!** Vercel will:
- Build your project automatically
- Deploy to a `.vercel.app` URL
- Set up automatic deployments for future commits

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd /Users/shyam/.gemini/antigravity/scratch/shyam_portfolio
vercel

# Follow the prompts
```

## 🎵 Adding Your Custom Startup Sound

**Important**: The `public/sounds/mac-startup.mp3` file is already in the repository. If you haven't added your custom sound yet:

1. Download your preferred Mac startup sound
2. Replace `public/sounds/mac-startup.mp3` with your file
3. Commit and push:
   ```bash
   git add public/sounds/mac-startup.mp3
   git commit -m "Add custom startup sound"
   git push
   ```

Vercel will automatically redeploy with the new sound!

## 🔧 Environment Variables (Optional)

If you need any environment variables:

1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add your variables
4. Redeploy

## 📝 Custom Domain (Optional)

1. Go to your Vercel project
2. Settings → Domains
3. Add your custom domain
4. Follow Vercel's DNS configuration instructions

## 🐛 Troubleshooting

### Build Fails on Vercel

- Check the build logs in Vercel dashboard
- Ensure `package.json` has correct build script
- Verify all dependencies are in `package.json`

### Startup Sound Not Playing

- Ensure the file is in `public/sounds/mac-startup.mp3`
- Check browser console for errors
- Some browsers block auto-play audio (the splash screen handles this)

## ✨ Your Portfolio URLs

After deployment, you'll get:
- **Vercel URL**: `https://your-project.vercel.app`
- **Custom Domain**: (if configured)

---

Need help? Check the Vercel docs: https://vercel.com/docs
