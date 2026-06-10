# Finish & verify the testimonials feature

**Context (already done — no action needed):** All code is committed and pushed to `main`
(commit `09a8ceb`) and Vercel is auto-deploying it. The site is at
**https://khwahish-website.vercel.app** (custom domain: khwahishtaneja.ca).

The steps below make testimonial submissions work in production and verify the whole flow.
**Step 2 is the one that matters most** — without it, submitting a testimonial on the live
site will error.

---

## Step 1 — Confirm the deploy finished
1. Go to **https://vercel.com** and log in.
2. Open the project **`khwahish-website`**.
3. On the **Deployments** tab, confirm the newest deployment (commit message starts with
   *"Remove assistant feature…"*) shows status **Ready** (green).

✅ **Done when:** the latest deployment is "Ready."

---

## Step 2 — Create & connect a Blob store ⭐ (critical)
*Without this, submitting a testimonial on the live site will error.*

1. In the project, click the **Storage** tab (top nav).
2. Click **Create Database** (may be labelled **Create** or **Connect Store**).
3. Choose **Blob**.
4. Name it `testimonials-blob` → click **Create**.
5. When asked which **project** and **environments** to connect, select project
   **`khwahish-website`** and check **Production, Preview, and Development** → **Connect**.

✅ **Done when:** the Storage tab lists `testimonials-blob` as connected to the project.
This automatically adds a `BLOB_READ_WRITE_TOKEN` environment variable — nothing to copy
or paste manually.

---

## Step 3 — Redeploy so the token takes effect
The new token only reaches the app on the next deployment.

1. Go to the **Deployments** tab.
2. On the most recent deployment, click the **⋯** (three-dots) menu → **Redeploy** →
   confirm **Redeploy**.
3. Wait for it to reach **Ready**.

✅ **Done when:** a fresh deployment (timestamped after Step 2) shows "Ready."

---

## Step 4 — Test the live submission end-to-end
1. Visit **https://khwahish-website.vercel.app/testimonials**.
2. Scroll to **"Leave a Review."** Fill in: First name = `Test`, Role = `Test`,
   Review = `Testing submission flow`, then click **Submit my review**.
3. You should see the **"Thank you!"** confirmation message.
4. Back in Vercel: **Storage** tab → open **`testimonials-blob`** → **Browser** (file list).
   Confirm a file exists under **`testimonials/submissions/`** (named like `<long-id>.json`).
5. **Delete that test file** (select it → Delete) so the test review isn't left in the inbox.

✅ **Done when:** the test submission showed "Thank you!", appeared in the Blob browser,
and the test file was deleted.

---

## Step 5 (optional, one-time) — Fix git commit identity
Future commits are currently labelled with the laptop's auto-generated name. To attribute
them to Khwahish, run in a terminal:

```
git config --global user.name "Khwahish Taneja"
git config --global user.email "khwahishtaneja0105@gmail.com"
```

---

## Reference: how to publish a real testimonial later (not a step now)
1. A visitor submits a review → it lands in **Storage → testimonials-blob →
   `testimonials/submissions/`**.
2. Open the file and read the review.
3. To publish it, add an entry to **`data/testimonials.ts`** (fields: `name`, `context`,
   `quote`, `featured`). Set `featured: true` to also show it on the homepage section
   (which stays hidden until at least one featured testimonial exists).
4. Commit & push → Vercel redeploys → it goes live.

**Never add fabricated or placeholder quotes — only real submissions.**
