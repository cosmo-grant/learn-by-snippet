#include <fcntl.h>
#include <stdio.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  int fd1 = open("a_file", O_CREAT | O_RDWR, 0644);
  int fd2 = open("a_file", O_RDWR);
  write(fd1, "ab", 2);
  char c;
  read(fd2, &c, 1);
  printf("%c\n", c);
}
