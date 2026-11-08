#include <stdio.h>
#include <sys/wait.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  fork();
  fork();
  printf("hello\n");
  wait(NULL);
  wait(NULL);
}
