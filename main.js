{
	"version": 2,
	"name": "Express API Gateway",
	"cache_ttl": "3600s",
	"timeout": "7200ms",
	"extra_config": {
		"github_com/devopsfaith/krakend-cors": {
			"allow-origins": ["*"],
			"allow-methods": ["GET", "POST", "DELETE", "PUT"],
			"expose_headers": ["Origin", "Content-Length", "Content-Type", "Authorization", "grant"],
			"allow_credentials": true,
			"max-age": "24h"
		},
		"github.com/devopsfaith/krakend-ratelimit/juju/router": {
			"maxRate": 0
		},
		"github.com/devopsfaith/krakend-jsonschema": {
			"type": "object",
			"properties": {
				"status": {
					"type": "string"
				},
				"code": {
					"type": "number"
				},
				"method": {
					"type": "string"
				},
				"message": {
					"type": "string"
				}
			}
		}
	},
	"endpoints": [
		{
			"endpoint": "/create",
			"method": "POST",
			"concurrent_calls": 1,
			"header_to_pass": ["Origin", "Content-Type", "Authorization", "grant"],
			"output_encoding": "no-op",
			"backend": [
				{
					"host": ["http://webapp:3000"],
					"method": "POST",
					"url_pattern": "/api/v1/book/create",
					"encoding": "no-op",
					"is_collection": false,
					"disable_host_sanitize": false
				}
			]
		},
		{
			"endpoint": "/results",
			"method": "GET",
			"concurrent_calls": 1,
			"header_to_pass": ["Origin", "Content-Type", "Authorization", "grant"],
			"output_encoding": "no-op",
			"backend": [
				{
					"host": ["http://webapp:3000"],
					"method": "GET",
					"url_pattern": "/api/v1/book/results",
					"encoding": "no-op",
					"is_collection": false,
					"disable_host_sanitize": false
				}
			]
		},
		{
			"endpoint": "/users",
			"method": "GET",
			"concurrent_calls": 1,
			"header_to_pass": ["Origin", "Content-Type", "Authorization", "grant"],
			"output_encoding": "json",
			"backend": [
				{
					"host": ["https://jsonplaceholder.typicode.com"],
					"method": "GET",
					"url_pattern": "/users",
					"encoding": "json",
					"is_collection": true,
					"disable_host_sanitize": false
				}
			]
		},
		{
			"endpoint": "/posts",
			"method": "POST",
			"concurrent_calls": 1,
			"header_to_pass": ["Origin", "Content-Type", "Authorization", "grant"],
			"output_encoding": "json",
			"backend": [
				{
					"host": ["https://jsonplaceholder.typicode.com"],
					"method": "POST",
					"url_pattern": "/posts",
					"encoding": "json",
					"is_collection": false,
					"disable_host_sanitize": false
				}
			]
		}
	]
}