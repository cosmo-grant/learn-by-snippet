# /// script
# requires-python = ">=3.14"
# dependencies = [
#     "anki",
# ]
# ///

import platform
import re
from argparse import ArgumentParser
from pathlib import Path

from anki.storage import Collection


def unescape_html(html: str) -> str:
    """
    Replace html tags or entity names with text equivalents.

    Anki treats note fields as html, so some characters in the notes are escaped or replaced by html tags.
    Unescape them here, replacing them with their text equivalents, e.g. &lt; becomes <.

    Some of these escapes probably don't occur in the notes, but it does no harm to include them in case.
    """
    return (
        html.replace("<br>", "\n")
        .replace("&lt;", "<")
        .replace("&gt;", ">")
        .replace("&nbsp;", " ")
        .replace("&amp;", "&")
        .replace("&apos;", "'")
        .replace("&quot;", '"')
    )


def markdown_code(code: str) -> str:
    "Process an anki code field, which is html, returning source code."
    code = re.sub(r'<pre><code class="lang-\w+">', "", code)
    code = code.removesuffix("</code></pre>")
    code = unescape_html(code)
    return code


def markdown_output(output: str) -> str:
    "Process an anki output field, which is html, returning plaintext."
    output = output.removeprefix("<pre><samp>").removesuffix("</samp></pre>")
    output = unescape_html(output)
    return output


def main() -> None:
    parser = ArgumentParser()
    parser.add_argument("tag", help="Tag of 'Code output' notes to extract.")
    parser.add_argument(
        "dest", type=Path, help="Directory in which to write questions."
    )
    args = parser.parse_args()

    system = platform.system()
    if system == "Linux":
        path = Path.home() / ".local/share/Anki2/cosmo/collection.anki2"
    elif system == "Darwin":
        path = Path.home() / "Library/Application Support/Anki2/cosmo/collection.anki2"
    else:
        raise RuntimeError("Unsupported platform")

    collection = Collection(str(path))
    note_ids = collection.find_notes("")
    notes = [collection.get_note(id) for id in note_ids]
    target_notes = [
        note
        for note in notes
        if args.tag in note.tags and note.note_type()["name"] == "Code output"  # ty:ignore[not-subscriptable]
    ]
    print(f"Found {len(target_notes)} target notes.")

    args.dest.mkdir()

    for i, note in enumerate(target_notes, start=1):
        fields = dict(note.items())
        code = markdown_code(fields["Code"])
        output = markdown_output(fields["Output"])
        explanation = unescape_html(fields["Explanation"])

        question_dir = args.dest / format(i, "02d")
        question_dir.mkdir()
        Path(question_dir / "main.py").write_text(code)
        Path(question_dir / "output.txt").write_text(output)
        Path(question_dir / "explanation.html").write_text(explanation)
        Path(question_dir / "preface.html").touch()


if __name__ == "__main__":
    main()
