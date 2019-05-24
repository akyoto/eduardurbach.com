package main

import (
	"strings"

	"github.com/aerogo/aero"
	"github.com/aerogo/layout"
	"github.com/akyoto/eduardurbach.com/assets"
	"github.com/akyoto/eduardurbach.com/eu"
	fullpage "github.com/akyoto/eduardurbach.com/layout"
	"github.com/akyoto/eduardurbach.com/pages/blog"
	"github.com/akyoto/eduardurbach.com/pages/contact"
	"github.com/akyoto/eduardurbach.com/pages/home"
	"github.com/akyoto/eduardurbach.com/pages/post"
	"github.com/akyoto/eduardurbach.com/pages/projects"
	"github.com/akyoto/eduardurbach.com/pages/skills"
	"github.com/akyoto/eduardurbach.com/pages/websites"
)

func main() {
	app := aero.New()
	configure(app).Run()
}

func configure(app *aero.Application) *aero.Application {
	l := layout.New(app)
	l.Render = fullpage.Render

	l.Page("/", home.Get)
	l.Page("/blog", blog.Get)
	l.Page("/post/:id", post.Get)
	l.Page("/skills", skills.Get)
	l.Page("/projects", projects.Get)
	l.Page("/websites", websites.Get)
	l.Page("/contact", contact.Get)

	// Certificate
	app.Security.Load("security/server.crt", "security/server.key")

	assets.Configure(app)

	// API
	eu.API.Install(app)

	// Close the database node on shutdown
	app.OnEnd(eu.Node.Close)

	// Prefetch all collections
	eu.DB.Prefetch()

	// Send "Link" header for Cloudflare on HTML responses
	app.Use(func(ctx *aero.Context, next func()) {
		if !strings.HasPrefix(ctx.URI(), "/_/") && strings.Contains(ctx.Request().Header().Get("Accept"), "text/html") {
			ctx.Response().Header().Set("Link", "</styles>; rel=preload; as=style,</scripts>; rel=preload; as=script")
		}

		next()
	})

	return app
}
