package eu

import (
	"github.com/aerogo/nano"
)

// BlogPost represents a single article in the blog.
type BlogPost struct {
	ID      string
	Title   string
	Text    string
	Created string
}

// Link returns the path to the blog post.
func (post *BlogPost) Link() string {
	return "/post/" + post.ID
}

// Save saves the blog post in the database.
func (post *BlogPost) Save() {
	DB.Set("BlogPost", post.ID, post)
}

// GetBlogPost returns a single blog post by the given |id|.
func GetBlogPost(id string) (*BlogPost, error) {
	obj, err := DB.Get("BlogPost", id)

	if err != nil {
		return nil, err
	}

	return obj.(*BlogPost), nil
}

// StreamBlogPosts returns a stream of all blog posts.
func StreamBlogPosts() chan *BlogPost {
	channel := make(chan *BlogPost, nano.ChannelBufferSize)

	go func() {
		for obj := range DB.All("BlogPost") {
			channel <- obj.(*BlogPost)
		}

		close(channel)
	}()

	return channel
}

// AllBlogPosts returns a slice of all blog posts.
func AllBlogPosts() []*BlogPost {
	var all []*BlogPost

	for obj := range StreamBlogPosts() {
		all = append(all, obj)
	}

	return all
}
