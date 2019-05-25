package eu

import (
	"strings"
)

// MountableMarkdown adds the mountable class to all headers and paragraphs.
func MountableMarkdown(html string) string {
	html = addMountableClass(html, "p")
	html = addMountableClass(html, "ul")
	html = addMountableClass(html, "ol")
	html = addMountableClass(html, "blockquote")
	html = addMountableClass(html, "pre")
	html = addMountableClass(html, "h2")
	html = addMountableClass(html, "h3")
	html = addMountableClass(html, "h4")
	html = addMountableClass(html, "h5")
	html = addMountableClass(html, "h6")

	return html
}

// addMountableClass
func addMountableClass(code string, tag string) string {
	return strings.ReplaceAll(code, "<"+tag+">", "<"+tag+" class='mountable'>")
}
