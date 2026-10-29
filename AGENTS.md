# AGENTS.md

## What this is

A static-site quiz generator: read a Python/C/Go snippet, predict the output.
Covers multiple topics (quizzes), not just concurrency — see `questions/`
(`concurrency`, `slices`, `sockets`, `unix_system_calls`). `draft_questions/`
holds work-in-progress questions not yet wired into a quiz.

## Data flow (the part that's easy to get wrong)

1. Each quiz is a dir under `questions/`, e.g. `questions/concurrency/`, with
   `title.txt`, `preamble.txt`, and numbered question dirs (`01/`, `02/`, ...).
2. Each question dir has `main.<ext>` (the snippet), `output.txt`, `explanation.html`,
   `preface.html`. All `main.*` files within one quiz must share the same extension
   (`get_quiz_extension` asserts this) — don't mix languages within a quiz dir.
3. `make questions` runs `make_questions.py`, which reads all quiz dirs and writes
   **`questions_per_quiz.js`** (defines `QUESTIONS_PER_QUIZ`), loaded by `index.html`
   and consumed by `quiz.js`. This file is generated — don't hand-edit it.
4. There is no templating step (no Jinja2, no `templates/` dir) — the generator
   writes the JS file directly with `json.dumps`.

## Commands

- `make questions` — regenerate `questions_per_quiz.js` after editing any question files.
- `make format` — `uv tool run ruff format .` + `prettier --write .`. Run before committing.
- `make preview` — serve the site locally with `live-server`.
- `make view` — open the deployed GitHub Pages site.
- `uv tool run ruff check .` — lint (not run by `make format`, which only formats).
- There are no automated tests and no CI config in this repo.

## Scripts use PEP 723 inline metadata

`make_questions.py`, `consecutive_questions.py`, `space_questions.py`, and
`notes_to_questions.py` each declare their own deps in a `# /// script` header, not
a root `pyproject.toml`/`requirements.txt`. Run them with `uv run <file>.py`.

- `consecutive_questions.py <quiz_dir>` — renumbers a quiz's question dirs to be consecutive.
- `space_questions.py <quiz_dir>` — appends `00` to each question dir name, to free up
  numbers for inserting a new question in between.
- `notes_to_questions.py` — imports questions from a local Anki collection; depends on
  the `anki` package and reads the collection file from an OS-specific path
  (`~/.local/share/Anki2/...` on Linux, `~/Library/Application Support/Anki2/...` on macOS).

## Snippet checking

Snippet correctness (does the code actually produce `output.txt`?) is checked with the
external [snippet-checker](https://pypi.org/project/snippet-checker/) tool, configured via
`questions/snippet_checker.toml` (per-quiz/per-question `snippet_checker.toml` overrides exist,
e.g. to disable output checking for timing-sensitive snippets). This isn't wired into `make`;
run it separately if verifying snippet output.

## Conventions worth preserving

- Explicit imports (`from time import sleep`, not `import time`).
- Python >= 3.14, built-in generics (`list[str]`, not `List[str]`).
- Return type annotations required, e.g. `def main() -> None:`.
