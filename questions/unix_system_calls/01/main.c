#include <stdio.h>
#include <sys/wait.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  int x;
  char buf[] = "x\n";
  x = dup(1);
  printf("%d\n", x);
  write(x, &buf, 2);
}
