# GitHub Pages Deployment Guide

## ✅ What's Been Done

1. ✅ Updated `vite.config.js` with base path for GitHub Pages
2. ✅ Created GitHub Actions workflow (`.github/workflows/deploy.yml`)
3. ✅ Committed and pushed changes to GitHub

## 🚀 Final Steps to Enable GitHub Pages

### Step 1: Enable GitHub Pages

1. Go to your repository: https://github.com/ShyamPrasadh/shyam-website
2. Click on **Settings** (top navigation)
3. In the left sidebar, click **Pages**
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - (This should be the default now that we have a workflow)
5. Save the settings

### Step 2: Wait for Deployment

1. Go to the **Actions** tab in your repository
2. You should see a workflow running called "Deploy to GitHub Pages"
3. Wait for it to complete (usually 1-2 minutes)
4. Once complete, a green checkmark will appear

### Step 3: Access Your Site

Your portfolio will be live at:
```
https://shyamprasadh.github.io/shyam-website/
```

## 🔄 Automatic Deployments

From now on, every time you push to the `main` branch:
1. GitHub Actions will automatically build your site
2. Deploy it to GitHub Pages
3. Your live site will update within 1-2 minutes

## 🎨 Making Updates

To update your portfolio:

```bash
cd /Users/shyam/.gemini/antigravity/scratch/shyam_portfolio

# Make your changes...

# Commit and push
git add .
git commit -m "Your update message"
git push

# GitHub will automatically deploy!
```

## 🐛 Troubleshooting

### Deployment Failed

1. Check the Actions tab for error messages
2. Common issues:
   - Build errors (check your code)
   - Missing dependencies (check `package.json`)

### Site Not Loading

1. Verify GitHub Pages is enabled in Settings → Pages
2. Check that the workflow completed successfully
3. Clear your browser cache
4. Wait a few minutes (DNS propagation)

### Assets Not Loading

- Ensure all asset paths are relative (no leading `/`)
- The `base: '/shyam-website/'` in `vite.config.js` handles this

## 📝 Custom Domain (Optional)

To use a custom domain like `shyamprasadh.com`:

1. Go to Settings → Pages
2. Add your custom domain
3. Configure DNS with your domain provider:
   - Add a CNAME record pointing to `shyamprasadh.github.io`
4. Enable "Enforce HTTPS"

## ✨ Your Live URLs

- **GitHub Pages**: https://shyamprasadh.github.io/shyam-website/
- **Repository**: https://github.com/ShyamPrasadh/shyam-website

---

**Next Steps:**
1. Go to your repo Settings → Pages
2. Set Source to "GitHub Actions"
3. Wait for the workflow to complete
4. Visit your live site!
