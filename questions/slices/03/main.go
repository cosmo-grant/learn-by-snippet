package main

import "fmt"

func main() {
	x := make([]int, 3)
	x = append(x, 100)
	fmt.Println(x)
}
