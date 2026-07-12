# Agent Instructions

## Start Here

- Repo: `$HOME/Projects/Whack-A-Mole/`.
- Durable project context: `$HOME/Projects/Agentic_Engineering/projects/whack-a-mole/`.
- Read first: `README.md`, then `src/index.js`, `test/solution.test.js`, and the Engineering `ai-handoff.md`.
- Keep application code unchanged unless the user explicitly asks for code changes.

## Working Rules

- Keep code changes focused.
- Do not make broad refactors without asking.
- At session close, update `$HOME/Projects/Engineering/projects/whack-a-mole/ai-handoff.md`.
- Never commit directly to `main`.
- Always create a new branch if on the `main` branch.
- Always ask to confirm commits before committing, and include a suggested commit message.
- Create a PR for review. Do not merge PRs unless specifically directed to do so.

## Project Notes

- This is a vanilla HTML/CSS/JavaScript Whack-a-Mole capstone project.
- Tooling uses npm, Parcel 1, Jest, and Puppeteer.
- `npm test` is currently blocked on modern Node by a Parcel/deasync native binding issue; see the Engineering handoff for details.
- Tests inspect some function source strings, so prefer minimal behavior-preserving edits over stylistic rewrites.
