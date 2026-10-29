package main

import "fmt"

func main() {
	s := []string{"a", "b", "c"}
	x := s[:2]
	s[0] = "s"
	fmt.Println("s:", s)
	fmt.Println("x:", x)
}
