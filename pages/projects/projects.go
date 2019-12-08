package projects

import (
	"sort"

	"github.com/aerogo/aero"
	"github.com/akyoto/eduardurbach.com/components"
	"github.com/akyoto/eduardurbach.com/eu"
)

// Get overview of all projects.
func Get(ctx aero.Context) error {
	projects := eu.PublishedProjects()

	sort.Slice(projects, func(i, j int) bool {
		a := projects[i]
		b := projects[j]

		if a.Created == b.Created {
			return a.Title < b.Title
		}

		return a.Created > b.Created
	})

	return ctx.HTML(components.Projects(projects))
}
