package main

import "fmt"

func main() {
	s := []string{"a", "b", "c"}
	x := s[:2:2]
	x = append(x, "d")
	fmt.Println("s:", s)
	fmt.Println("x:", x)
}
