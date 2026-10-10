#include <stdio.h>
#include <sys/wait.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  int x;
  if (fork() > 0) {
    wait(&x);
    printf("%d\n", x);
  }
}
