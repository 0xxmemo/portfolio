---
name: linkedin-sync
description: Convert the user's HTML resume at portfolio/resume.html into paste-ready LinkedIn profile blocks (Headline, About, Experience, Education, Skills, Projects, Honors). Use when the user asks to update LinkedIn from the resume, sync resume to LinkedIn, generate LinkedIn copy, or anything like "match my LinkedIn to my CV". Trigger phrases include "update LinkedIn", "sync LinkedIn", "LinkedIn from resume", "LinkedIn copy", "LinkedIn paste blocks".
---

# linkedin-sync

LinkedIn's public API is **read-only** for member profiles — there is no legitimate way to write Experience, About, Skills, etc. programmatically. Browser automation (Playwright/Selenium) violates LinkedIn's ToS and risks account restriction. So this skill does the next-best thing: it produces **paste-ready blocks** from `resume.html` that the user copies into LinkedIn's edit forms by hand. Five to ten minutes total.

Do not offer to automate the actual LinkedIn submission. Do not suggest scraping or browser-driving LinkedIn. If the user pushes for full automation, restate the ToS/ban risk once and stop.

## Source of truth

`<repo>/resume.html` — single self-contained HTML file. See `.claude/skills/edit-resume/SKILL.md` for the structure (sections, `.entry` / `.edu-row` / `.skills` / `.projects` / `.awards-line` conventions).

Read `resume.html` fresh every time the skill is invoked — never rely on prior conversation state. The user may have edited it since.

## LinkedIn field limits (hard caps — enforce these)

| Field | Limit |
|---|---|
| Headline | 220 characters |
| About (Summary) | 2,600 characters |
| Experience > Title | 100 characters |
| Experience > Description | 2,000 characters per role |
| Education > Degree / Field of study | 100 each |
| Skills | up to 100 entries, ~100 chars each |
| Honors & Awards > Title | 255 characters |
| Projects > Name | 255 characters; description 2,000 |

If any generated block exceeds its cap, **trim it yourself before showing the user** and add a `⚠ trimmed from N → cap` note above that block.

## Output format

Print each LinkedIn section as its own fenced block with a clear header so the user can copy without picking around HTML. Use this exact shape:

```
━━━ HEADLINE (LinkedIn → Edit intro → Headline) ━━━
<plain text, ≤220 chars>
[char count: NNN/220]
```

```
━━━ ABOUT (LinkedIn → Edit intro → About) ━━━
<plain text, blank lines preserved>
[char count: NNN/2600]
```

For Experience, emit **one block per role**, in the same order as the resume:

```
━━━ EXPERIENCE 1/4: Floor Markets (LinkedIn → Add position) ━━━
Title:    Senior Software Engineer
Company:  Floor Markets
Location: Switzerland (Remote)
Dates:    May 2025 — Present
Employment type: Full-time   ← user picks; suggest based on context
---
Description:
<plain text, bullets as "• ", blank line between paragraphs>
[char count: NNN/2000]
```

Same shape for Education, Projects, Honors & Awards (label them clearly and number them).

For Skills, emit one block — a comma-separated list, deduplicated, **flattened from the resume's category buckets** (LinkedIn doesn't have categories). Cap at 50 to stay below the soft "endorsement-friendly" ceiling unless the resume genuinely has more.

```
━━━ SKILLS (LinkedIn → Add skill, paste one at a time) ━━━
TypeScript, Python, Solidity, React, Next.js, ...
[count: NN/50 suggested · LinkedIn allows up to 100]
```

## HTML → plain-text conversion rules

- Strip all tags. Decode entities (`&amp;` → `&`, `&middot;` → `·`).
- `<b>` / `<strong>` content stays as-is; LinkedIn About supports a Unicode-bold trick but **don't apply it** — it hurts ATS parsing and looks weird in many clients. Plain text only.
- `<ul><li>` → bullets prefixed with `• ` (U+2022 + space), one per line.
- `<a href="...">label</a>` → render as `label (https://url)` only when the URL is informative to a recruiter (project links, company sites). Drop URL-only redundant links from About/Headline — LinkedIn has dedicated link fields elsewhere.
- Collapse whitespace; keep one blank line between paragraphs and between bullet groups.

## Headline construction

The resume's `.role` + `.tagline` together usually fit 220 chars and read well on LinkedIn. Format:

```
<role> · <tagline pieces joined by " · ">
```

Example from the current resume:
`Senior Software & Product Engineer · Software Architect · Onchain Protocols · AI Tooling · TypeScript`

If it overflows 220, drop tagline pieces from the right.

## About construction

Use the resume's `<section class="summary"><p>` as the spine. Then append one short paragraph with the contact line (email + site) **only if** the user explicitly asks — LinkedIn already has a Contact Info panel and duplicating there looks spammy.

Don't invent content. If the summary feels thin, say so and offer to expand it via the `edit-resume` skill instead of padding here.

## Experience construction

For each `<div class="entry">`:

- **Title** comes from `.entry-sub` (everything before the first `·`).
- **Company** comes from `.entry-head .left` (strip the `: <a>...</a>` tail and any `(acquired by …)` parenthetical — LinkedIn's company field doesn't accept it; mention the acquisition in the description instead).
- **Location** comes from `.entry-sub` (everything after the last `·`). If it says `(Remote)`, also tick LinkedIn's "Remote" location-type checkbox — call this out in the block.
- **Dates** — convert `Mon YYYY - Mon YYYY` to LinkedIn's two-field format. Note `Present` roles need the "I currently work here" toggle.
- **Description** — flatten the `<ul>` into `• ` bullets. Preserve quantitative claims verbatim (`30+ modules`, `$1M grant`, `15%` etc.) — they're the load-bearing parts.

## Education / Projects / Honors

- **Education**: one block per `.edu-row`. Map `<b>School</b>` → School field, `.meta` → Field of study and Degree. If dates are missing on a row (e.g. Koç row), leave the date fields empty rather than guessing.
- **Projects**: one block per `<li>` in `<ul class="projects">`. Project name = the link label; URL = the `href`; description = the `.desc` text with leading `: ` stripped.
- **Honors**: parse `<p class="awards-line">` by `·` separators. Each award becomes its own block with title, issuer (parenthetical or trailing source), and date if present.

## Workflow

1. Read `resume.html`. Don't shell out to extractors — Read + your own parsing is fine for a single 400-line file.
2. Generate all blocks in a single response, in this order: Headline → About → Experience (each role) → Education (each row) → Skills → Projects → Honors.
3. End with a short checklist of LinkedIn-side toggles the user must set manually (Remote, Currently working here, Employment type, "Notify network" off if syncing many fields at once).
4. **Do not** create a file for the output. Print to chat. The user copies from there.
5. **Do not** snapshot the resume or run any `bin/` scripts — this skill is read-only relative to the resume.

## When the user says "just give me the diff"

If the user pastes their current LinkedIn text (or a screenshot) and wants only the fields that need changing, do that instead: compare resume → LinkedIn, list only the deltas, same block format. Skip unchanged sections entirely.

## What to refuse politely

- "Just log into LinkedIn and update it for me" → no, ToS + ban risk.
- "Use Playwright to fill the forms" → see above; offer to set up a *human-in-the-loop* Playwright helper only if the user explicitly accepts the risk after being told.
- "Pull my current LinkedIn and merge it with the resume" → can't read LinkedIn without scraping; ask the user to paste the current profile text instead.
