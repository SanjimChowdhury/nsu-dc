# Image Rendering Issue on Vercel - RESOLVED

## Problem Summary
Images were rendering correctly locally but showing only alt text on Vercel deployment.

## Root Causes Identified

### 1. **Media Folder in `.gitignore`** ⚠️ (PRIMARY ISSUE)
The `/media` folder was excluded in `.gitignore` (line 43), which meant:
- All images uploaded via Payload CMS were stored locally in the `media` folder
- These files were **never pushed to Git/Vercel**
- On Vercel, the media folder was empty, causing images to fail loading

### 2. **Using Regular `<img>` Tags**
Most components were using HTML `<img>` tags instead of Next.js `Image` component:
- Less optimized performance
- Potential issues with static path resolution on Vercel
- Missing automatic image optimization

### 3. **External Domains Not Whitelisted**
The `next.config.mjs` was missing some external image domains (already had `placehold.co`).

## Solutions Implemented ✅

### 1. **Copied Media Files to `/public` Folder**
```powershell
Copy-Item -Path "media\*" -Destination "public\" -Recurse -Force
```
- The `/public` folder is automatically deployed with your Next.js app
- Files in `/public` are served at the root path (e.g., `/public/logo.png` → `/logo.png`)

### 2. **Converted `<img>` to Next.js `Image` Component**
Updated the following files:
- ✅ `src/components/Header.tsx` - All 3 img tags converted
- ✅ `src/components/Footer.tsx` - Logo converted
- ✅ `src/components/AboutUsSection.tsx` - Both desktop and mobile images converted

Benefits:
- Automatic image optimization
- Lazy loading
- Responsive images
- Better performance on Vercel

### 3. **Removed `/media` from `.gitignore`**
- Now media files can be committed to Git
- Will be available on Vercel deployment

## Next Steps for Deployment 🚀

### Immediately Before Deploying:

1. **Commit all changes:**
```bash
git add .
git commit -m "Fix: Convert images to Next.js Image component and move to public folder"
git push origin main
```

2. **Verify the following files are in your public folder:**
- `/public/nsu-logo-small.png`
- `/public/IMG_7185-1.jpg`
- `/public/IMG_7185.jpg`
- `/public/IMG_7188.jpg`
- `/public/IMG_7288.jpg`
- `/public/nsudc-logo-1.png`
- `/public/nsudc-logo-2.png`
- `/public/nsudc-logo-3.png`
- `/public/nsudc-logo.png`

3. **Update Payload CMS image references in admin panel:**
   - Go to your admin panel (`/admin`)
   - Update any images that reference `/media/` to reference `/` instead
   - Or re-upload images (they will now be stored and deployed properly)

### Long-term Solution (Recommended):

For a production application, consider using **cloud storage** for media files:

#### **Option A: Vercel Blob Storage** (Recommended)
```bash
pnpm add @vercel/blob
```

Update `payload.config.ts`:
```typescript
import { vercelBlobStorage } from '@payloadcms/plugin-cloud-storage/vercel-blob'

export default buildConfig({
  // ... other config
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
```

Then add to `.env`:
```
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

#### **Option B: Cloudinary** (Alternative)
```bash
pnpm add @payloadcms/plugin-cloud-storage @payloadcms/plugin-cloudinary
```

#### **Option C: AWS S3** (Alternative)
```bash
pnpm add @payloadcms/plugin-cloud-storage @aws-sdk/client-s3
```

## Verification Checklist ✓

Before deploying to Vercel, ensure:

- [ ] All images are copied to `/public` folder
- [ ] All `<img>` tags converted to `<Image>` components
- [ ] `/media` removed from `.gitignore`
- [ ] Changes committed and pushed to Git
- [ ] Environment variables are set in Vercel dashboard:
  - `DATABASE_URI`
  - `PAYLOAD_SECRET`
  - Any other required env vars
- [ ] Build succeeds locally: `pnpm build`
- [ ] If using external image domains, they're in `next.config.mjs`

## Common Issues & Troubleshooting

### Issue: Images still not showing after deployment
**Solution:** Check Vercel build logs to ensure `/public` folder was included in deployment

### Issue: Some images work, others don't
**Solution:** Ensure all image paths are correct and case-sensitive (Vercel is case-sensitive, Windows is not)

### Issue: 403 Forbidden on images
**Solution:** Check `next.config.mjs` `images.remotePatterns` for external domains

### Issue: New uploads via CMS don't appear on Vercel
**Solution:** Implement cloud storage solution (Vercel Blob, Cloudinary, or S3)

## Resources

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Vercel Blob Storage](https://vercel.com/docs/storage/vercel-blob)
- [Payload Cloud Storage Plugin](https://payloadcms.com/docs/upload/overview#cloud-storage)
