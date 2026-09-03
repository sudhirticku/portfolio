# Sudhir's Portfolio

Personal portfolio with AI workflow projects and anime picks — powered by Next.js and Notion.

---

## Step 1 — Add your Notion keys

1. Copy the example env file:
   ```
   cp .env.local.example .env.local
   ```

2. Open `.env.local` in any text editor and fill in the four values:

   **NOTION_API_KEY**
   - Go to https://www.notion.so/my-integrations
   - Click "New integration", give it a name (e.g. "Portfolio"), pick your workspace
   - Copy the "Internal Integration Secret" — that's your key

   **NOTION_PROJECTS_DB_ID** and **NOTION_ANIME_DB_ID**
   - Open each database in Notion in your browser
   - The URL looks like: `notion.so/your-workspace/abc123def456...?v=...`
   - The long string between the last `/` and the `?v=` is the database ID
   - Make sure you've shared each database with your integration (open the database → "..." menu → "Add connections" → find your integration)

3. The Giscus fields (`NEXT_PUBLIC_GISCUS_*`) can stay blank for now — the comment widget will show a placeholder until you set them up. Come back to these after you've created a GitHub repo and set up Giscus at https://giscus.app.

---

## Step 2 — Run it locally

You need Node.js installed (download from https://nodejs.org if you don't have it).

```bash
# Install dependencies (only needed the first time)
npm install

# Start the development server
npm run dev
```

Then open http://localhost:3000 in your browser. The site auto-refreshes as you make changes.

---

## Step 3 — Deploy to Vercel

Vercel is the easiest way to host a Next.js site — it's free for personal projects.

1. Push this folder to a GitHub repository (create one at https://github.com/new)
2. Go to https://vercel.com and sign in with GitHub
3. Click "Add New Project" → import your repository
4. On the configuration screen, click "Environment Variables" and add the same four keys from your `.env.local` file
5. Click "Deploy"

Vercel will give you a live URL. Every time you push changes to GitHub, Vercel automatically rebuilds the site.

### Keeping content fresh

The site re-fetches from Notion every hour automatically (via Next.js ISR). So after you add or edit something in Notion, it will appear on your live site within an hour without you needing to do anything.

---

## Notion database setup

### Projects database — required properties

| Property name   | Type            |
|-----------------|-----------------|
| Name            | Title           |
| Tagline         | Rich text       |
| Category        | Multi-select    |
| BuildDownloadURL| URL             |
| DemoLink        | URL             |
| CoverImage      | Files & media   |

The body of each Notion page becomes the full project documentation on the detail page.

### Anime database — required properties

| Property name      | Type      |
|--------------------|-----------|
| Title              | Title     |
| Rating             | Number    |
| Status             | Select    |
| Poster             | Files & media |
| StandoutAIFlavor   | Rich text |

Status options: `Watching`, `Completed`, `Recommended`
