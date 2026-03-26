# Blog Writing Guidelines — bmnova.com

> Internal reference for writing blog posts optimized for GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization).
> This file is **not published** to the site. It exists to keep our content strategy consistent.

---

## Why These Rules Exist

AI-powered search engines (ChatGPT, Perplexity, Google AI Overviews) pull answers directly from web content. To appear in those answers, content must be structured, authoritative, and directly useful — not just keyword-stuffed. These guidelines are built around that reality.

---

## Content Structure Rules

### Answer First
- **Lead with the answer in the first 2–3 sentences.** Don't build up to it — give it immediately.
- Imagine someone asked a question out loud. Your opening should answer it before they finish reading the second line.

### Short Paragraphs
- Keep paragraphs to **2–4 lines**.
- One idea per paragraph. If you have two ideas, use two paragraphs.

### One Focus Per Section
- Each H2 or H3 heading should address **exactly one question**.
- Don't combine "what is X" and "how to do X" under the same heading.

### Search-Intent Headings
- Frame headings around real user queries:
  - ✅ "What Is X?"
  - ✅ "How to Do X Step by Step"
  - ✅ "Why Does X Happen?"
  - ❌ "An Introduction to X"
  - ❌ "Let's Explore X"

---

## Writing Style Rules

### Natural Language
- Write like you're explaining to a smart colleague, not presenting at a conference.
- Avoid corporate, robotic, or overly formal tone.

### No Filler Intros
- Don't start with "In today's fast-paced world..." or "Have you ever wondered..."
- Cut the first paragraph if it doesn't add information.

### Short, Clear Key Sentences
- The most important sentences should be the simplest ones.
- If a sentence is doing too much work, split it.

### Use Synonyms, Not Keyword Spam
- Naturally vary terminology. Don't repeat the exact same phrase every paragraph.
- AI engines understand semantic meaning — synonyms help, stuffing hurts.

---

## Formatting Rules

### Use Lists
- Bullet points and numbered lists are easy for AI to extract and cite.
- Use them for: steps, comparisons, tips, requirements, options.

### Use Step-by-Step Numbering
- For "how to" content, always use 1, 2, 3 format — not prose.
- Each step should be one action, not multiple.

### Use Tables for Comparisons
- Comparison content (X vs Y, options, plans) must use a table.
- Tables are highly effective for AI-cited structured answers.

### Use H1 / H2 / H3 Cleanly
- One H1 per post (the title).
- H2 for major sections.
- H3 for subsections within a major section.
- Never skip levels (don't jump from H2 to H4).

---

## Depth & Focus Rules

### Go Deep on One Topic
- One strong, deep post on a single topic beats ten shallow posts.
- Cover the topic well enough that a reader doesn't need to go elsewhere.

### Explain Technical Terms Inline
- When you use a technical term, immediately follow it with a short plain-language explanation.
- Example: "schema markup (a type of code that tells search engines what your content means)"

---

## Trust & Authority Rules

### Add Trust Signals
- Include at least one of: a data point, a real example, a source reference, or a concrete case from our own work.
- Vague claims ("many users prefer...") are weak. Specific claims ("in our testing, X improved Y") are strong.

### Be Accurate
- Use current information. Outdated content loses ranking and credibility over time.
- Update posts when the underlying information changes.

### Cite Sources When Relevant
- Link to documentation, studies, or official sources when making claims.
- Don't cite to look credible — only cite when the source genuinely adds value.

---

## Brand & Consistency Rules

### Mention bmnova Naturally
- The site name and brand should appear naturally in the content — not forced.
- Good: "We built this feature for one of our bmnova projects..."
- Bad: "bmnova.com is the best place to learn about..."

### Build Series, Not One-Offs
- Identify a niche and create consistent series of posts on related topics.
- Series build topical authority; isolated posts don't compound.

### Stay Niche
- Don't try to cover everything. Pick a focused area and own it.
- A general site competes with everyone. A niche site can win a specific space.

---

## GEO / AEO-Specific Rules

### Add a "Quick Answer" Section
- Include a short **TL;DR or Quick Answer** block near the top for every post.
- This is what AI search engines are most likely to extract and display.

### Add an FAQ Section
- End every post with 3–5 frequently asked questions and direct answers.
- Keep each answer under 3 sentences.

### Use Schema Markup
- Implement `FAQPage` schema for FAQ sections.
- Implement `HowTo` schema for step-by-step guides.
- Schema helps AI engines understand content structure.

### Optimize for Page Speed and Mobile
- Slow pages get deprioritized. Keep post pages lean.
- All posts must be fully readable on mobile without horizontal scrolling or broken layout.

---

## Things to Avoid

| Avoid | Because |
|-------|---------|
| Clickbait headlines | AI engines learn to distrust them |
| Duplicate or copied content | Not indexed or cited |
| Fluff and padding | Dilutes the signal-to-noise ratio |
| Overusing the exact same keyword | Semantic spam, not helpful |
| Mixing multiple topics in one post | Confuses both readers and AI |
| One-time posts with no follow-up | Doesn't build topical authority |

---

## Post Checklist

Before publishing any post, verify:

- [ ] First 2–3 sentences directly answer the main question
- [ ] All paragraphs are 2–4 lines
- [ ] H1 / H2 / H3 structure is clean and sequential
- [ ] At least one list or numbered steps
- [ ] At least one trust signal (data, example, source)
- [ ] Quick Answer / TL;DR block near the top
- [ ] FAQ section at the bottom
- [ ] Technical terms are explained inline
- [ ] No filler intro, no clickbait title
- [ ] bmnova mentioned naturally at least once
- [ ] Content is accurate and current
- [ ] Schema markup added (FAQ and/or HowTo where applicable)
- [ ] Mobile-friendly and fast to load

---

## Backlog

- [ ] **Blog i18n — Türkçe lokalizasyon**: Blog altyapısına dil desteği ekle. Frontmatter'a `lang` field eklenecek, `posts.ts` locale bazlı filtrelenecek, `/blog` sayfası locale'e göre doğru postları gösterecek. URL'ler Türkçe slug ile olacak (örn. `/blog/saglikli-kilo-yonetimi`). Mevcut tüm postların Türkçe versiyonları yazılacak. Öncelik yüksek — Türkçe GEO/AEO rekabeti düşük, etki büyük.
