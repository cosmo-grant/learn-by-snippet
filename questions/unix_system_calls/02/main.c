#include <fcntl.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  if (argc == 1) {
    dup(1);
    execl(argv[0], argv[0], "extra", (char *)NULL);
  } else {
    write(3, "x\n", 2);
  }
}
