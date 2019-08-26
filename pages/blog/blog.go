package blog

import (
	"sort"

	"github.com/aerogo/aero"
	"github.com/akyoto/eduardurbach.com/components"
	"github.com/akyoto/eduardurbach.com/eu"
)

// Get overview of all posts.
func Get(ctx aero.Context) error {
	posts := eu.AllPosts()

	sort.Slice(posts, func(i, j int) bool {
		return posts[i].Created > posts[j].Created
	})

	return ctx.HTML(components.Blog(posts))
}
