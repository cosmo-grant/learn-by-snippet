package main

import "fmt"

func main() {
	s := []int{1, 2, 3}
	a := [3]int(s)
	s[0] = 10
	a[2] = 30
	fmt.Println("s:", s)
	fmt.Println("a:", a)
}
