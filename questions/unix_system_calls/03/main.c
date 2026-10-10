#include <fcntl.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  int fd = dup(1);
  if (fork() == 0) {
    write(fd, "x\n", 2);
  }
}
