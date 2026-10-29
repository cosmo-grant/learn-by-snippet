package main

import "fmt"

func main() {
	s := []int{1, 2, 3, 4}
	a := [3]int(s)
	fmt.Println(a)
}
