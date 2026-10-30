#include <unistd.h>

int main(int argc, char *argv[]) {
  int p[2];
  char buf[1];
  pipe(p);
  if (fork() == 0) {
    sleep(1);
    close(p[1]);
  } else {
    read(p[0], buf, 1);
  }
}
