#include <unistd.h>

int main(int argc, char *argv[]) {
  int p[2];
  char buf[1];
  pipe(p);
  read(p[0], buf, 1);
}
