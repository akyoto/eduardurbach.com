package main

import (
	"strings"

	"github.com/aerogo/aero"
	"github.com/akyoto/eduardurbach.com/assets"
	"github.com/akyoto/eduardurbach.com/eu"
	"github.com/akyoto/eduardurbach.com/pages"
	"github.com/akyoto/eduardurbach.com/pages/blog"
	"github.com/akyoto/eduardurbach.com/pages/post"
	"github.com/akyoto/eduardurbach.com/pages/projects"
	"github.com/akyoto/eduardurbach.com/pages/sponsor"
)

func main() {
	app := aero.New()
	configure(app).Run()
}

func configure(app *aero.Application) *aero.Application {
	// Pages
	pages.Get(app, "/", blog.Get)
	pages.Get(app, "/post/:id", post.Get)
	pages.Get(app, "/projects", projects.Get)
	pages.Get(app, "/sponsor", sponsor.Get)

	// Certificate
	app.Security.Load("security/server.crt", "security/server.key")

	// Assets
	assets.Configure(app)

	// API
	eu.API.Install(app)

	// Close the database node on shutdown
	app.OnEnd(eu.Node.Close)

	// Prefetch all collections
	eu.DB.Prefetch()

	// Don't push when an underscore URL has been requested
	app.AddPushCondition(func(ctx aero.Context) bool {
		return !strings.HasPrefix(ctx.Path(), "/_")
	})

	// // Send "Link" header for Cloudflare on HTML responses
	// app.Use(func(ctx aero.Context, next func()) {
	// 	if !strings.HasPrefix(ctx.Path(), "/_/") && strings.Contains(ctx.Request().Header("Accept"), "text/html") {
	// 		ctx.Response().SetHeader("Link", "</styles>; rel=preload; as=style,</scripts>; rel=preload; as=script")
	// 	}

	// 	next()
	// })

	return app
}
