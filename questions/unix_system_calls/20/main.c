#include <stdio.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  int p[2];
  pipe(p);
  printf("%d %d\n", p[0], p[1]);
}
