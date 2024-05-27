export const dataTemplate = {
    "tag": "table",
    "attributes": {
      "id": "dataTable"
    },
    "children": [
      {
        "tag": "thead",
        "children": [
          {
            "tag": "tr",

            "children": [
              {
                "tag": "th",
                "content": "Name "
              },
              {
                "tag": "th",
                "content": "Description"
              },
              {
                "tag": "th",
                "content": "Actions"
              }
            ]
          }
        ]
      },
      {
        "tag": "tbody",
        "children": [
          {
            "tag": "tr",
            "repeat": " ",
            "attributes": {
              "data-id": "{{_id}}",
              "click": "getOne-story"
            },

            "children": [
              {
                "tag": "td",
                "attributes": {
                  "data-id": "{{_id}}",
                  "click": "getOne-project"
                },
                "content": "{{name}}"
              },
              {
                "tag": "td",
                "content": "{{desc}}"
              },
              {
                "tag": "td",
                "children": [
                  {
                    "tag": "button",
                    "attributes": {
                      "class": "edit-button",
                      "data-id": "{{_id}}",
                      "click": "getOne-org"
                    },
                    "content": "Edit"
                  },
                  {
                    "tag": "button",
                    "attributes": {
                      "class": "delete-button",
                      "click": "deleteOneByID-story",
                      "data-id": "{{_id}}",
                    },
                    "content": "Delete"
                  },
                  {
                    "tag": "button",
                    "attributes": {
                      "class": "delete-button",
                      "click": "update-page",
                      "href": "#/share-story?id={{_id}}",
                    },
                    "content": "Share"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }