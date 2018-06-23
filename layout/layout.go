package fullpage

import (
	"github.com/aerogo/aero"
	"github.com/blitzprog/eduardurbach.com/components"
)

// Render layout.
func Render(ctx *aero.Context, content string) string {
	return components.Layout(ctx.App, ctx, content)
}
