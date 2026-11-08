#include <stdio.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  int p[2];
  char c;
  pipe(p);
  if (fork() == 0) {
    sleep(1);
    write(p[1], "x", 1);
  } else {
    read(p[0], &c, 1);
    printf("%c\n", c);
  }
}
