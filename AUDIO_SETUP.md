# How to Add the Mac Startup Sound

Follow these steps to add the audio from the YouTube video:

## Step 1: Download the Audio

1. Go to a YouTube to MP3 converter like:
   - https://ytmp3.nu/
   - https://y2mate.com/
   - Or use a browser extension

2. Paste this URL: `https://www.youtube.com/watch?v=Wj7J2W448Xw`

3. Download the audio as MP3

## Step 2: Add to Your Project

1. Rename the downloaded file to: `mac-startup.mp3`

2. Place it in this folder:
   ```
   /Users/shyam/.gemini/antigravity/scratch/shyam_portfolio/public/sounds/
   ```

3. The file path should be:
   ```
   /Users/shyam/.gemini/antigravity/scratch/shyam_portfolio/public/sounds/mac-startup.mp3
   ```

## Step 3: Rebuild

Run:
```bash
cd /Users/shyam/.gemini/antigravity/scratch/shyam_portfolio
~/.bun/bin/bun run build
```

The startup sound will now play when the boot animation completes!
