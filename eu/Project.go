package eu

import (
	"github.com/aerogo/nano"
)

// Project represents a single project.
type Project struct {
	ID      string
	Title   string
	Text    string
	Created string
}

// Link returns the path to the project.
func (project *Project) Link() string {
	return "/project/" + project.ID
}

// Save saves the project in the database.
func (project *Project) Save() {
	DB.Set("Project", project.ID, project)
}

// GetProject returns a single project by the given |id|.
func GetProject(id string) (*Project, error) {
	obj, err := DB.Get("Project", id)

	if err != nil {
		return nil, err
	}

	return obj.(*Project), nil
}

// StreamProjects returns a stream of all projects.
func StreamProjects() chan *Project {
	channel := make(chan *Project, nano.ChannelBufferSize)

	go func() {
		for obj := range DB.All("Project") {
			channel <- obj.(*Project)
		}

		close(channel)
	}()

	return channel
}

// AllProjects returns a slice of all projects.
func AllProjects() []*Project {
	var all []*Project

	for obj := range StreamProjects() {
		all = append(all, obj)
	}

	return all
}
