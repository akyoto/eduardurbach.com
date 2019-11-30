package assets

import (
	"io/ioutil"
	"strings"

	"github.com/aerogo/aero"
	"github.com/aerogo/manifest"
	"github.com/akyoto/eduardurbach.com/components/css"
	"github.com/akyoto/eduardurbach.com/components/js"
	"github.com/akyoto/stringutils/unsafe"
)

var (
	Manifest     *manifest.Manifest
	JS           string
	CSS          string
	Organization string
)

// load loads all the necessary assets into memory.
func load() {
	var err error

	// Manifest
	Manifest, err = manifest.FromFile("assets/manifest.json")

	if err != nil {
		panic("Couldn't load manifest.json")
	}

	// Organization
	data, err := ioutil.ReadFile("assets/organization.json")

	if err != nil {
		panic("Couldn't load organization.json")
	}

	Organization = unsafe.BytesToString(data)
	Organization = strings.ReplaceAll(Organization, "\n", "")
	Organization = strings.ReplaceAll(Organization, "\t", "")

	// Bundles
	JS = js.Bundle()
	CSS = css.Bundle()
}

// Configure adds all the routes used for media assets.
func Configure(app *aero.Application) {
	load()

	app.Get("/scripts", func(ctx aero.Context) error {
		return ctx.JavaScript(JS)
	})

	app.Get("/styles", func(ctx aero.Context) error {
		return ctx.CSS(CSS)
	})

	// Web manifest
	app.Get("/manifest.json", func(ctx aero.Context) error {
		return ctx.JSON(Manifest)
	})

	// Images
	app.Get("/images/*file", func(ctx aero.Context) error {
		ctx.Response().SetHeader("Access-Control-Allow-Origin", "*")
		return ctx.File("images/" + ctx.Get("file"))
	})
}
