#include <stdio.h>
#include <sys/wait.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  int x = dup(1);
  printf("%d\n", x);
  write(x, "this", 4);
}
