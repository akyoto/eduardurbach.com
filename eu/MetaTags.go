package eu

import "sort"

// MetaTags represent meta information about pages.
type MetaTags struct {
	HTML      map[string]string
	OpenGraph map[string]string
}

// SortedKeys creates slices and sorts the tags.
func (metaTags *MetaTags) SortedKeys() ([]string, []string) {
	var html []string
	var openGraph []string

	for name := range metaTags.HTML {
		html = append(html, name)
	}

	sort.Strings(html)

	for name := range metaTags.OpenGraph {
		openGraph = append(openGraph, name)
	}

	sort.Strings(openGraph)

	return html, openGraph
}
