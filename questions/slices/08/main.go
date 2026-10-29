package main

import "fmt"

func main() {
	s := []string{"a", "b", "c", "d"}
	x := s[1:3]
	y := s[:3]
	z := s[2:]
	w := s[:]
	fmt.Println("x:", x)
	fmt.Println("y:", y)
	fmt.Println("z:", z)
	fmt.Println("w:", w)
}
