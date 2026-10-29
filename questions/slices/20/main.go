package main

import "fmt"

func modify(s2 []int) {
	s2 = append(s2, 999)
	fmt.Println(s2)
}

func main() {
	s1 := []int{0, 1, 2, 3}
	fmt.Println(s1)
	modify(s1)
	fmt.Println(s1)
}
