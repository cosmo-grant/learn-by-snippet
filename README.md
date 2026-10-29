# README

[cosmo-grant.github.io/learn-by-snippet](https://cosmo-grant.github.io/learn-by-snippet/)

## What is this?

A collection of coding quizzes: read a snippet, predict the output.

Like [Learn X in Y minutes](https://learnxinyminutes.com/),
but active learning, and focused on concepts, not syntax or APIs.

Work in progress, always.

## What do they cover?

Python concurrency, Unix system calls, Go slices, ...

## But they don't cover xyz!

Contributions welcome.

## Keyboard support?

- <kbd>0</kbd> for `✘`, <kbd>1</kbd> for `✔`.
- <kbd>&crarr;</kbd> or <kbd>Space</kbd> to advance
- <kbd>&larr;</kbd> or <kbd>&rarr;</kbd> to move between viewable questions

## Did you use LLMs?

For styling, yes, plus small tasks here and there.
I wrote everything else, for better or worse, including all questions and explanations.

I originally followed the example of [fstrings-wtf](https://github.com/mitsuhiko/fstrings-wtf/),
though I've deviated a bit since.

## "The" output?

A snippet's output is not determined by its code.

- memory addresses vary across runs
- errnos vary across platforms
- timing depends on machine, contention, battery life, ...
- compile or runtime options
- printing to terminal or file
- and many more

Assume a typical machine under typical conditions.
Where indeterminacy remains, just predict _an_ output.

## How did you check the snippets?

[snippet-checker](https://pypi.org/project/snippet-checker/)

## Found a bug?

Great! Please open an issue.

## Have a suggestion?

Great! Please open an issue.

## Want more questions like these?

You might like [my anki decks](https://ankiweb.net/shared/by-author/777251159).
