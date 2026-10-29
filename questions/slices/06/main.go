package main

import "fmt"

func main() {
	s := []int{}
	for i := range 5 {
		s = append(s, i)
		fmt.Println(cap(s))
	}
}
