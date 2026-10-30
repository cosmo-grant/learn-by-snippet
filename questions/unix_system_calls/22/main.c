#include <unistd.h>

int main(int argc, char *argv[]) {
  int p[2];
  char buf[1];
  pipe(p);
  if (fork() == 0) {
    sleep(1);
    write(p[1], "x", 1);
  } else {
    read(p[0], buf, 1);
    write(1, buf, 1);
  }
}
