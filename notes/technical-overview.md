---
slug: github-data-blog-note-technical-overview
id: github-data-blog-note-technical-overview
title: data-blog Overview
repo: justin-napolitano/data-blog
githubUrl: https://github.com/justin-napolitano/data-blog
generatedAt: '2025-11-24T18:34:38.948Z'
source: github-auto
summary: >-
  This repo is a data-focused blog platform built with Gatsby. It integrates
  Markdown and HTML for publishing data analyses and research posts.
tags: []
seoPrimaryKeyword: ''
seoSecondaryKeywords: []
seoOptimized: false
topicFamily: null
topicFamilyConfidence: null
kind: note
entryLayout: note
showInProjects: false
showInNotes: true
showInWriting: false
showInLogs: false
---

This repo is a data-focused blog platform built with Gatsby. It integrates Markdown and HTML for publishing data analyses and research posts.

## Key Features

- Static site generation with Gatsby (using React)
- Markdown and HTML content support
- Syntax highlighting (via PrismJS)
- Custom GraphQL queries for dynamic content
- Python script for automated builds

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/justin-napolitano/data-blog.git
   cd data-blog
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   # yarn install
   ```

3. **Run the development server:**

   ```bash
   npm run develop
   # or
   # yarn develop
   ```

Open `http://localhost:8000` in your browser to view it.

## Important Note

Run the Python build script for site automation:

```bash
python python-build.py
```

This handles the cleaning, building, and pushing to your repository.
