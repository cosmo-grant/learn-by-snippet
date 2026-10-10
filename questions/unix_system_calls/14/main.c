#include <stdio.h>
#include <sys/wait.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  if (fork() > 0) {
    if (fork() > 0) {
      wait(0);
      printf("here\n");
    } else {
      sleep(1);
    }
  } else {
    sleep(2);
  }
}
