# UVC Lab Website

**Urban Visual Computing Lab** - Department of Computer Science, Purdue University

## Quick Start

```bash
# Serve locally
cd uvc_lab_website
python3 -m http.server 8000
# Open http://localhost:8000
```

## How to Add Content

All content is stored as JSON in the `data/` folder. Edit these files directly (via GitHub's web editor or locally) and push - no build step needed.

### Add a Publication

1. Drop the PDF into `papers/` (e.g., `papers/lastname2026-short-title.pdf`)
2. Add a thumbnail image to `images/publications/`
3. Add an entry to `data/publications.json`:

```json
{
  "slug": "lastname2026-short-title",
  "title": "Full Paper Title Here",
  "authors": "Last, F., Last2, F2., & Last3, F3.",
  "venue": "Conference or Journal Name",
  "venueDetails": "Volume(Issue), Pages",
  "year": 2026,
  "abstract": "The abstract of the paper...",
  "doi": "https://doi.org/10.xxxx/xxxxx",
  "pdf": "papers/lastname2026-short-title.pdf",
  "bibtex": "@article{lastname2026short,\n  title={...},\n  author={...},\n  journal={...},\n  year={2026}\n}",
  "thumbnail": "images/publications/short-title.jpg",
  "video": "",
  "code": "",
  "tags": ["tag1", "tag2"]
}
```

### Add a Person

Add an entry to `data/people.json`:

```json
{
  "name": "Full Name",
  "role": "PhD Student",
  "category": "phd",
  "photo": "images/people/name.jpg",
  "bio": "Research interests in...",
  "website": "https://...",
  "scholar": "https://scholar.google.com/...",
  "github": "https://github.com/..."
}
```

Categories: `faculty`, `phd`, `ms`, `undergrad`, `alumni`

### Add News

Add an entry to `data/news.json`:

```json
{
  "date": "2026-04-01",
  "title": "Title of the news item",
  "description": "Brief description...",
  "link": "",
  "type": "general"
}
```

Types: `general`, `publication`, `award`

### Add an Award

Add an entry to `data/awards.json`:

```json
{
  "date": "2026-01-15",
  "title": "Award Name - Conference/Org",
  "description": "Details about the award.",
  "link": ""
}
```

### Add a Research Project

Add an entry to `data/projects.json`:

```json
{
  "title": "Project Name",
  "slug": "project-slug",
  "description": "Brief project description.",
  "image": "images/projects/project.jpg",
  "link": "",
  "tags": ["tag1", "tag2"]
}
```

## Deployment

This site is deployed via GitHub Pages. Push to `main` and it auto-deploys.

To set up:
1. Go to repo Settings → Pages
2. Source: Deploy from branch → `main` → `/ (root)`
3. Save

## Structure

```
data/           ← Edit these JSON files to manage content
papers/         ← Publication PDFs
images/         ← All images (people, projects, publications)
css/style.css   ← Styles
js/             ← Page rendering scripts
*.html          ← Page templates
```
