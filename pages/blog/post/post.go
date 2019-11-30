package post

import (
	"net/http"

	"github.com/aerogo/aero"
	"github.com/akyoto/eduardurbach.com/components"
	"github.com/akyoto/eduardurbach.com/eu"
)

// Get ...
func Get(ctx aero.Context) error {
	id := ctx.Get("id")
	post, err := eu.GetPost(id)

	if err != nil {
		return ctx.Error(http.StatusNotFound, "Blog post doesn't exist", err)
	}

	return ctx.HTML(components.Post(post))
}
