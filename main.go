package main

import (
	"github.com/aerogo/aero"
	"github.com/aerogo/layout"
	"github.com/blitzprog/blitzprog.org/components/css"
	"github.com/blitzprog/blitzprog.org/components/js"
	"github.com/blitzprog/blitzprog.org/layout"
)

func main() {
	app := aero.New()
	configure(app).Run()
}

func configure(app *aero.Application) *aero.Application {
	l := layout.New(app)
	l.Render = fullpage.Render

	l.Page("/", func(ctx *aero.Context) string {
		return ctx.HTML("Hello World")
	})

	// Script bundle
	scriptBundle := js.Bundle()

	app.Get("/scripts", func(ctx *aero.Context) string {
		return ctx.JavaScript(scriptBundle)
	})

	// CSS bundle
	cssBundle := css.Bundle()

	app.Get("/styles", func(ctx *aero.Context) string {
		return ctx.CSS(cssBundle)
	})

	return app
}
