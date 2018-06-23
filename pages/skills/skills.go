package skills

import (
	"github.com/aerogo/aero"
	"github.com/blitzprog/eduardurbach.com/components"
)

// Get ...
func Get(ctx *aero.Context) string {
	return ctx.HTML(components.Skills())
}
