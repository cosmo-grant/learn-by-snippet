#include <stdio.h>
#include <sys/wait.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  if (fork() == 0) {
    sleep(1);
  } else {
    wait(0);
    printf("here\n");
  }
}
