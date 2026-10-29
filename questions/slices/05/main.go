package main

import (
	"fmt"
	"slices"
)

func main() {
	var s1 []int
	var s2 = []int{}
	fmt.Println(slices.Equal(s1, s2))
	fmt.Println(s1 == nil)
	fmt.Println(s2 == nil)
}
