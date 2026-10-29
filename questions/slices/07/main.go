package main

import (
	"fmt"
	"reflect"
)

func main() {
	s := []string{"a", "b", "c", "d"}
	x := s[1:3]
	fmt.Println(reflect.TypeOf(x))
}
