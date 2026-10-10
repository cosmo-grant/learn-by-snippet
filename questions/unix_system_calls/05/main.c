#include <fcntl.h>
#include <stdio.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  int x;
  x = open(argv[0], O_RDONLY);
  printf("%d\n", x);
}
