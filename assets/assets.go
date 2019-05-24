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
	Manifest      *manifest.Manifest
	JS            string
	CSS           string
	ServiceWorker string
	Organization  string
)

// load loads all the necessary assets into memory.
func load() {
	var err error

	// Manifest
	Manifest, err = manifest.FromFile("manifest.json")

	if err != nil {
		panic("Couldn't load manifest.json")
	}

	// Service worker
	data, err := ioutil.ReadFile("scripts/ServiceWorker/ServiceWorker.js")

	if err != nil {
		panic("Couldn't load service worker")
	}

	ServiceWorker = unsafe.BytesToString(data)

	// Organization
	data, err = ioutil.ReadFile("organization.json")

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

	app.Get("/scripts", func(ctx *aero.Context) string {
		return ctx.JavaScript(JS)
	})

	app.Get("/styles", func(ctx *aero.Context) string {
		return ctx.CSS(CSS)
	})

	app.Get("/service-worker", func(ctx *aero.Context) string {
		return ctx.JavaScript(ServiceWorker)
	})

	// Web manifest
	app.Get("/manifest.json", func(ctx *aero.Context) string {
		return ctx.JSON(Manifest)
	})

	// Images
	app.Get("/images/*file", func(ctx *aero.Context) string {
		ctx.Response().Header().Set("Access-Control-Allow-Origin", "*")
		return ctx.File("images/" + ctx.Get("file"))
	})
}
