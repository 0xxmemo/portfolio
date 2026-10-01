---
name: tailark
description: Use Tailark marketing blocks to design or refresh this Astro portfolio, configure Tailark registries, discover section patterns, and adapt them without migrating to React.
---

# Tailark portfolio workflow

## Read first
- Official MCP guide: https://tailark.com/docs/mcp
- Setup and authentication: https://tailark.com/docs/quick-setup
- Registry overview: https://tailark.com/docs
- Inspect `components.json`, the homepage, shared CSS, portfolio data, and the git diff before changing anything. This project is Astro + Tailwind v4, not React. Never run shadcn init over its styles.

## Registries and secrets
This project's `components.json` uses the documented Radix endpoints:
- `@tailark`: `https://tailark.com/r/radix/{name}.json`, header `x-api-key: ${TAILARK_API_KEY}`.
- `@tailark-oss`: `https://oss.tailark.com/r/radix/{name}.json`, no authentication.
Base UI equivalents omit `/radix`. Do not mix base libraries or infer block names.

Keep `TAILARK_API_KEY` in ignored `.env.local`. Never print the file, embed the key in this skill, commit it, pass it in URLs, or include it in browser code. The shadcn MCP is already configured locally; no separate Tailark MCP server is needed. A running MCP may not reload `.env.local`. If it reports MISSING_ENV_VARS, do not claim authentication succeeded; use the CLI fallback below or ask the user to reconnect their MCP after exporting the environment variable.

## Discover → inspect → adapt
1. Use shadcn MCP search/list against `@tailark` and `@tailark-oss` for the relevant hero, navigation, content, and footer patterns.
2. View the exact returned item with `view_items_in_registries` and request examples where available. Check dependencies, accessibility, license notices, file targets, and suitability before adding anything.
3. CLI fallback loads the local key without echoing it:
   ```sh
   bun --env-file=.env.local node_modules/shadcn/dist/index.js search @tailark --query hero --limit 5
   bun --env-file=.env.local node_modules/shadcn/dist/index.js view @tailark/<returned-item-name>
   ```
   Use current CLI help if options differ. Never guess item IDs.
4. In Astro, adapt the inspected layout/composition into semantic `.astro` components. Do not install React page kits or interactive Radix components unless React integration is explicitly warranted. For additions, preview with `--dry-run` and avoid overwriting existing files.
5. Keep factual content in `src/data/portfolio.ts`; reuse social icons and existing links. Preserve disabled links and legacy deep links.

## Design direction
Corporate but personable: warm neutral surfaces, charcoal text, a single evergreen accent, clear hierarchy, generous whitespace, fine borders, restrained radii. Use normal scrolling, readable work summaries, accessible navigation, and optimized real portrait photography. Personality should come from editorial details and subtle hover states, not space canvases, typing loops, pervasive glass, or scroll trapping.

## Verify
Run `bun run lint` and `bun run build`, launch `bun run dev`, and drive the actual page at desktop/mobile widths. Inspect screenshots, menu/filter interactions, keyboard focus, deep links, back/forward, reduced motion, and no-JavaScript visibility. Run the shadcn audit checklist. Verify no secret entered the diff or build. Do not deploy or commit without a user request.
