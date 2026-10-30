#include <stdio.h>
#include <sys/wait.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  int x;
  x = wait(NULL);
  printf("%d\n", x);
}
