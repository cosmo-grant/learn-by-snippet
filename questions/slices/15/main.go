package main

import "fmt"

func main() {
	x := [3]int{1, 2, 3}
	y := x[:]
	y[0] = 666
	fmt.Println(x)
	fmt.Println(y)
}
