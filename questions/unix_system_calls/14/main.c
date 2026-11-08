#include <fcntl.h>
#include <sys/wait.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  if (fork() == 0) {
    close(1);
  } else {
    wait(NULL);
    write(1, "x\n", 2);
  }
}
