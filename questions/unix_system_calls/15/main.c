#include <fcntl.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  int fd1 = open("testfile", O_CREAT | O_RDWR, 0644);
  int fd2 = open("testfile", O_RDWR);
  write(fd1, "ab", 1);
  char c;
  read(fd2, &c, 1);
  write(1, &c, 1);
}
