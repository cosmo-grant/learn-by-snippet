package main

import "fmt"

func main() {
	s := []string{"a", "b", "c"}
	x := s[:2]
	x[0] = "x"
	fmt.Println("s:", s)
	fmt.Println("x:", x)
}
