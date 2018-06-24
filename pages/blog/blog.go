package blog

import (
	"github.com/aerogo/aero"
	"github.com/blitzprog/eduardurbach.com/components"
	"github.com/blitzprog/eduardurbach.com/eu"
)

// Get overview of all posts.
func Get(ctx *aero.Context) string {
	posts := eu.AllBlogPosts()

	return ctx.HTML(components.Blog(posts))
}
