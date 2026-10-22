# /// script
# requires-python = ">=3.14"
# dependencies = []
# ///

import json
from pathlib import Path


def get_quiz_questions(quiz):
    dirs = [path for path in quiz.iterdir() if path.is_dir()]
    dirs.sort()
    questions = []

    for dir in dirs:
        mains = list(dir.glob("main.*"))
        assert len(mains) == 1, (
            f"Expected exactly one main.* file in {dir} but found {mains}"
        )
        main_ = mains[0]
        questions.append(
            # Keys should be camelCase, since we'll dump to a js file.
            {
                "code": (main_).read_text(),
                "output": (dir / "output.txt").read_text(),
                "explanation": (dir / "explanation.html").read_text(),
                "preface": (dir / "preface.html").read_text(),
                "highlightjsAlias": main_.suffix.removeprefix(
                    "."
                ),  # https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md
            }
        )

    return questions


def main() -> None:
    quiz_dirs = [path for path in Path("questions").iterdir() if path.is_dir()]
    questions_per_quiz = {
        quiz_dir.name: get_quiz_questions(quiz_dir) for quiz_dir in quiz_dirs
    }

    with open("questions_per_quiz.js", "w") as f:
        f.write(
            f"""\
// Generated automatically. Do not edit.

const QUESTIONS_PER_QUIZ = {json.dumps(questions_per_quiz, indent=2)};
"""
        )

    # FIXME: how to make css depend on which quiz you pick
    # with open("questions-vars.css", "w") as f:
    #     f.write(f":root {{ --max-snippet-lines: {max_code_lines}; }}\n")
    #     f.write(f":root {{ --max-answer-lines: {max_answer_lines}; }}\n")


if __name__ == "__main__":
    main()
