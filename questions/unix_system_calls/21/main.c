#include <unistd.h>

int main(int argc, char *argv[]) {
  int p[2];
  char c;
  pipe(p);
  read(p[0], &c, 1);
}
