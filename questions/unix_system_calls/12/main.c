#include <stdio.h>
#include <stdlib.h>

char **split_line(char *line) {
  int line_idx, words_idx;
  char *word_start;
  char **words = malloc(10 * sizeof(char *));

  words_idx = 0;
  word_start = line;
  for (line_idx = 0;; line_idx++) {
    if (*(line + line_idx) == ' ' || *(line + line_idx) == '\0') {
      *(line + line_idx) = '\0';
      words[words_idx] = word_start;
      word_start = line + line_idx + 1;
      words_idx++;
    }
    if (*(line + line_idx) == '\0') {
      break;
    }
  }

  return words;
}

int main(int argc, char **argv) {
  char **words;
  char line[] = "foo bar\n";
  words = split_line(line);
  printf("%s", *words);
}
