# Agent Instructions

## Start Here

- Repo: `$HOME/Projects/Whack-A-Mole/`.
- Durable project context: `$HOME/Projects/Agentic_Engineering/projects/whack-a-mole/`.
- Read first: `README.md`, `VERSION.md`, `package.json`, `src/index.js`, `test/solution.test.js`, and the durable `ai-handoff.md`.
- Keep application code unchanged unless the user explicitly asks for code changes.

## Working Rules

- Keep code changes focused.
- Do not make broad refactors without asking.
- At session close, update `$HOME/Projects/Agentic_Engineering/projects/whack-a-mole/ai-handoff.md`.
- Never commit directly to `main`.
- Always create a new branch if on the `main` branch.
- Always ask to confirm commits before committing, and include a suggested commit message.
- Create a PR for review. Do not merge PRs unless specifically directed to do so.

## Project Notes

- This is a vanilla HTML/CSS/JavaScript Whack-a-Mole capstone project.
- Tooling uses npm, Parcel 2, Jest, and Puppeteer. Node `22.23.4` is pinned in `.nvmrc`.
- `npm test` selects a free port, starts Parcel, passes its URL to Puppeteer, and stops the server when tests finish.
- `npm run build` creates the production build in `dist/`.
- `package.json` is the canonical SemVer version. Bump it and `package-lock.json` together, append a matching release note to `VERSION.md`, and do not hardcode the landing-page version; `src/index.js` imports it from the package metadata.
- Tests inspect some function behavior/source; keep edits focused and validate with `npm run build` and `npm test`.
