package middleware

import (
	"github.com/aerogo/aero"
	"github.com/akyoto/eduardurbach.com/components"
	"github.com/akyoto/stringutils/unsafe"
)

// Layout middleware modifies the response body
// to be wrapped around the general layout.
func Layout(next aero.Handler) aero.Handler {
	return func(ctx aero.Context) error {
		ctx.AddModifier(func(content []byte) []byte {
			// Assure that errors are formatted as HTML
			ctx.Response().SetHeader("Content-Type", "text/html; charset=utf-8")

			html := components.Layout(ctx, unsafe.BytesToString(content))
			return unsafe.StringToBytes(html)
		})

		return next(ctx)
	}
}
