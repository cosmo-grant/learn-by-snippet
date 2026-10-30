#include <stdio.h>
#include <stdlib.h>
#include <sys/wait.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  int x;
  if (fork() == 0) {
    exit(1);
  } else {
    wait(&x);
    printf("%d\n", WEXITSTATUS(x));
  }
}
