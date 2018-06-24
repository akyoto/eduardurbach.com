package post

import (
	"net/http"

	"github.com/aerogo/aero"
	"github.com/blitzprog/eduardurbach.com/components"
	"github.com/blitzprog/eduardurbach.com/eu"
)

// Get ...
func Get(ctx *aero.Context) string {
	id := ctx.Get("id")
	post, err := eu.GetBlogPost(id)

	if err != nil {
		return ctx.Error(http.StatusNotFound, "Blog post doesn't exist", err)
	}

	return ctx.HTML(components.Post(post))
}
