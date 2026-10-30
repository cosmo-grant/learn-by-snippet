#include <stdio.h>
#include <unistd.h>

int x = 111;

int main(int argc, char *argv[]) {
  if (argc == 1) {
    x = 222;
    execl(argv[0], argv[0], "again", (char *)NULL);
  }
  printf("%d\n", x);
}
