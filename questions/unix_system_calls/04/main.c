#include <stdio.h>
#include <sys/wait.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  int ret = fork();
  wait(NULL);
  printf("%d\n", ret == 0);
}
