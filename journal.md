# Development Journal

---

## Cloudflare R2 Photos Integration

### Goal
Automatically list and display all photos from a Cloudflare R2 bucket on the photography page, eliminating the need to manually update `lib/photos.ts` every time a new photo is uploaded.

### Background
- Photos are stored in a public R2 bucket: `personal-website-photos`
- Public URL: `https://pub-253f4f98a29547d189d929dd4b0273e2.r2.dev`
- The photography page previously used a hardcoded array of 7 photos in `lib/photos.ts`
- The bucket actually contains 15 photos (8 were missing from the site)

### What We Built
1. **`lib/r2.ts`** — Server-side utility using `@aws-sdk/client-s3` to list R2 bucket objects and `probe-image-size` to auto-detect image dimensions (only downloads a few KB per image via header probing)
2. **Split photography page** into server component (`page.tsx`) + client component (`PhotographyClient.tsx`) so data fetching happens server-side
3. **`PhotoGallery`** now accepts `photos` as a prop instead of importing the hardcoded list
4. **Fallback**: if R2 listing fails, the page falls back to the hardcoded `lib/photos.ts` list

### Environment Variables Required
```
R2_ACCOUNT_ID=<cloudflare account id>
R2_ACCESS_KEY_ID=<r2 api token access key>
R2_SECRET_ACCESS_KEY=<r2 api token secret>
R2_BUCKET_NAME=personal-website-photos
```
Set in both `.env.local` (local dev) and Vercel (production).

### Issues Encountered

#### Issue 1: Photos not showing after first deploy
**Symptom**: Photography page still showed only the 7 hardcoded photos after deploying.
**Cause**: The photography page was statically prerendered at build time (`○ Static` in build output). Since the R2 call happened at build time and may have failed (env vars not yet set), it fell back to the hardcoded list and cached that result.
**Fix**: Added `export const dynamic = "force-dynamic"` to `app/personal/photography/page.tsx` to force server-side rendering on every request.

#### Issue 2: S3 client created at module load time
**Symptom**: Photos still not appearing even after adding `force-dynamic`.
**Cause**: The `S3Client` was instantiated at the top level of `lib/r2.ts` (module scope). Environment variables are read once when the module first loads — if they're not available at that point, the endpoint becomes `https://undefined.r2.cloudflarestorage.com` and all requests fail silently.
**Fix**: Moved S3 client creation into a `getS3Client()` function called inside `listR2Photos()`, so env vars are read at request time.

#### Issue 3: Env vars not available in Vercel runtime
**Symptom**: After both fixes above, photos still show only the 7 hardcoded ones on the deployed site.
**Local status**: Works perfectly locally — all 15 photos listed and probed in ~2.3 seconds.
**Discovery**: Created `/api/debug-r2` diagnostic endpoint. Response showed all env vars as `false`/`"missing"` with error `"Resolved credential object is not valid"`.
**Root cause (round 1)**: Env vars were initially set at the **Vercel Team level**, not the **Project level**. Fixed by user.
**Root cause (round 2)**: Even after setting env vars at the project level on `personal-site`, the debug endpoint still showed them as missing. Enhanced the debug endpoint to list all R2-related env keys and show `totalEnvKeys`/`vercelEnv` — confirmed 54 env keys existed but zero contained "R2". This revealed the actual cause:
**Root cause (round 3 — actual fix)**: The repo had **two Vercel projects** linked: `personal-site` and `personal-site-r1fr`. The custom domain `devarapu.dev` was assigned to `personal-site-r1fr`, but env vars were set on `personal-site`. The env vars needed to be added to the correct project.
**Fix**: Added R2 env vars to the `personal-site-r1fr` project in Vercel. Photos now load correctly.
**Status**: RESOLVED

### Lessons Learned
- When a repo has multiple Vercel projects, always verify which project serves the production domain before setting env vars
- A `/api/debug-*` diagnostic endpoint is invaluable for debugging Vercel runtime issues — dump env var names (not values), `vercelEnv`, and `totalEnvKeys` to confirm the right deployment is being hit
- Next.js `force-dynamic` is required for pages that fetch data from external APIs at request time
- S3 clients should be created lazily (inside functions) in serverless environments, not at module scope

### Verified Locally
```
Listed 15 objects in 188 ms
All 15 images probed successfully
Total time: 2327 ms
```

### Timeline
- **2026-03-13**: Initial implementation, discovered static prerendering issue, fixed with force-dynamic, discovered module-level S3 client issue, fixed with lazy init, debugged Vercel env vars across multiple projects, resolved — all 15 photos now loading
