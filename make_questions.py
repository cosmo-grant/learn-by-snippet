# /// script
# requires-python = ">=3.14"
# dependencies = [
#     "jinja2",
# ]
# ///

from pathlib import Path
from jinja2 import Environment, FileSystemLoader


def get_quiz_questions(quiz):
    dirs = [path for path in quiz.iterdir() if path.is_dir()]
    dirs.sort()
    questions = []

    for dir in dirs:
        mains = list((dir.glob("main.*")))
        assert len(mains) == 1, f"Expected exactly one main.* file in {dir} but found {mains}"
        main_ = mains[0]
        code = (main_).read_text()
        output = (dir / "output.txt").read_text()
        explanation = (dir / "explanation.html").read_text()
        preface = (dir / "preface.html").read_text()
        highlightjs_alias = main_.suffix.removeprefix(".")  # https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md
        questions.append([preface, code, output, explanation, highlightjs_alias])

    return questions


def main() -> None:
    quiz_dirs = [path for path in Path("questions").iterdir() if path.is_dir()]
    questions_per_quiz = {
        quiz_dir.name: get_quiz_questions(quiz_dir) for quiz_dir in quiz_dirs
    }

    env = Environment(loader=FileSystemLoader("templates/"))
    template = env.get_template("questions_per_quiz.jinja")
    rendered = template.render(questions_per_quiz=questions_per_quiz.items())

    with open("questions_per_quiz.js", "w") as f:
        f.write(rendered)

    # FIXME: how to make css depend on which quiz you pick
    # with open("questions-vars.css", "w") as f:
    #     f.write(f":root {{ --max-snippet-lines: {max_code_lines}; }}\n")
    #     f.write(f":root {{ --max-answer-lines: {max_answer_lines}; }}\n")


if __name__ == "__main__":
    main()
