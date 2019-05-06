package websites

import (
	"github.com/aerogo/aero"
	"github.com/akyoto/eduardurbach.com/components"
)

// Get ...
func Get(ctx *aero.Context) string {
	return ctx.HTML(components.Websites())
}
