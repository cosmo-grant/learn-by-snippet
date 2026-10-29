package main

import "fmt"

func main() {
	s := []string{"a", "b", "c", "d"}
	x := s[1:3]
	fmt.Println(cap(s), cap(x))
}
