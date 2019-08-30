package sponsor

import (
	"github.com/aerogo/aero"
	"github.com/akyoto/eduardurbach.com/components"
)

// Get ...
func Get(ctx aero.Context) error {
	return ctx.HTML(components.Sponsor())
}
