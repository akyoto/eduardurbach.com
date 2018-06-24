package eu

import (
	"github.com/aerogo/nano"
)

// Post represents a single article in the blog.
type Post struct {
	ID      string
	Title   string
	Text    string
	Created string
}

// Link returns the path to the blog post.
func (post *Post) Link() string {
	return "/post/" + post.ID
}

// Save saves the blog post in the database.
func (post *Post) Save() {
	DB.Set("Post", post.ID, post)
}

// GetPost returns a single blog post by the given |id|.
func GetPost(id string) (*Post, error) {
	obj, err := DB.Get("Post", id)

	if err != nil {
		return nil, err
	}

	return obj.(*Post), nil
}

// StreamPosts returns a stream of all blog posts.
func StreamPosts() chan *Post {
	channel := make(chan *Post, nano.ChannelBufferSize)

	go func() {
		for obj := range DB.All("Post") {
			channel <- obj.(*Post)
		}

		close(channel)
	}()

	return channel
}

// AllPosts returns a slice of all blog posts.
func AllPosts() []*Post {
	var all []*Post

	for obj := range StreamPosts() {
		all = append(all, obj)
	}

	return all
}
