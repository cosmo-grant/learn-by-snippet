#include <stdio.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  printf("hi\n");
  fork();
  printf("bye\n");
}
