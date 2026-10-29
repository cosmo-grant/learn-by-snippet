package main

import "fmt"

func main() {
	s := []string{"a", "b", "c", "d", "e"}
	x := s[2:4:4]
	x = append(x, "f")
	fmt.Println("s:", s)
	fmt.Println("x:", x)
}
