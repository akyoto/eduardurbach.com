package eu

import (
	"github.com/aerogo/api"
	"github.com/aerogo/nano"
)

// Node represents the database node.
var Node = nano.New(nano.Configuration{
	Directory: "db",
	Port:      5000,
})

// DB is the main database client.
var DB = Node.Namespace("eu").RegisterTypes(
	(*Post)(nil),
	(*Project)(nil),
)

// API is the automatically created API for the database.
var API = api.New("/api/", DB)
