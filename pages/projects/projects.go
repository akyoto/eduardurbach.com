package projects

import (
	"sort"

	"github.com/aerogo/aero"
	"github.com/akyoto/eduardurbach.com/components"
	"github.com/akyoto/eduardurbach.com/eu"
)

// Get overview of all projects.
func Get(ctx aero.Context) error {
	projects := eu.AllProjects()

	sort.Slice(projects, func(i, j int) bool {
		return projects[i].Created > projects[j].Created
	})

	return ctx.HTML(components.Projects(projects))
}
