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
        code = (dir / "main.py").read_text()
        output = (dir / "output.txt").read_text()
        explanation = (dir / "explanation.html").read_text()
        preface = (dir / "preface.html").read_text()
        questions.append([preface, code, output, explanation])

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
