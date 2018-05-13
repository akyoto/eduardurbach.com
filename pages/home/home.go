package home

import (
	"github.com/aerogo/aero"
	"github.com/blitzprog/blitzprog.org/components"
)

// Get ...
func Get(ctx *aero.Context) string {
	return ctx.HTML(components.Home())
}
