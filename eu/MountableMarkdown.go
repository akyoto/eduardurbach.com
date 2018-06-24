package eu

import (
	"strings"
)

// MountableMarkdown adds the mountable class to all headers and paragraphs.
func MountableMarkdown(html string) string {
	processTag := func(code string, tag string) string {
		return strings.Replace(code, "<"+tag+">", "<"+tag+" class='mountable'>", -1)
	}

	html = processTag(html, "p")
	html = processTag(html, "ul")
	html = processTag(html, "ol")
	html = processTag(html, "blockquote")
	html = processTag(html, "pre")
	html = processTag(html, "h2")
	html = processTag(html, "h3")
	html = processTag(html, "h4")
	html = processTag(html, "h5")
	html = processTag(html, "h6")

	return html
}
