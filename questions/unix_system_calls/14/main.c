#include <fcntl.h>
#include <sys/wait.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  if (fork() == 0) {
    close(1);
  } else {
    wait(0);
    write(1, "x\n", 2);
  }
}
