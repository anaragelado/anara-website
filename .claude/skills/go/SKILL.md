---
name: go
description: Post-task verification checklist for the Anara website. Runs build, lint, and type checks, then optionally verifies visual behaviour in the browser if the Claude Chrome extension is connected. Stops before committing — the user reviews results and commits themselves. Invoke when the user says "/go", "verify", "double-check this", or at the end of any non-trivial code change they ask you to confirm.
---

# /go — Post-task verification

A "did I actually finish this?" checklist for the Anara Gelado Artesanal Next.js project. Run after completing a code change to surface broken builds, lint errors, and visual regressions **before** reporting the task as done.

## Hard rule

**Never commit or push as part of `/go`.** The user reviews results and initiates commits themselves. See AGENTS.md §7.

## Steps

Run these in order. Stop at the first failure and report it — don't continue blindly.

### 1. Type & build check

```bash
npm run build
```

Catches TypeScript errors, broken imports, bad Next.js usage, invalid ISR config. If this fails, fix before continuing.

### 2. Lint

```bash
npm run lint
```

Catches unused vars, bad hook dependencies, accessibility warnings. Fix or justify in the report.

### 3. Visual verification (if Chrome extension connected)

Only run this step when the change touches UI (components, styles, layout, i18n content, images). Skip for pure config/data changes with no visual surface.

Before driving the browser, make sure the dev server is up:

```bash
npm run dev
```

(Run in background if not already running. Wait ~3s for it to be ready.)

Then, via the Claude Chrome extension MCP tools:

1. Navigate to `http://localhost:3000/en` (and `/pt` if the change is locale-sensitive).
2. Screenshot the section(s) affected by the change at desktop width (1440px).
3. Resize to mobile width (390px) and screenshot the same section(s).
4. If the change involves scroll behaviour (sticky, parallax, pinning, Lenis), scroll through and take 2–3 screenshots at different scroll positions to confirm the behaviour is correct.
5. Report what you saw. Flag anything unexpected.

If the extension is not connected, skip this step and tell the user: "Browser verification skipped — Chrome extension not connected."

### 4. Report

Return a concise summary in this shape:

```
Build: ✅ / ❌ (paste error)
Lint: ✅ / ❌ (paste error)
Visual: ✅ <what you confirmed> / ⏭ skipped / ❌ <what's broken>
Next: <what the user should do — usually "review and commit if satisfied">
```

Keep it short. The user doesn't need a transcript of every command — they need the verdict and anything broken.

## What /go does NOT do

- Does not commit, stage, amend, or push anything.
- Does not run `git` at all (read or write).
- Does not open a PR.
- Does not modify source files (it only verifies).
- Does not run tests — this project has none yet. If tests are added later, add a step.

## Tuning

- If `npm run build` is slow (Next.js cold build can take 30–60s), that's normal. Don't add a shorter check as a substitute — build catches things `tsc --noEmit` alone won't.
- If the user invokes `/go` after a tiny change (e.g. a typo fix, a translation string), use judgment — a full build may be overkill. Ask: "Quick lint-only check, or full /go?"
