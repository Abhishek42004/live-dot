export const taskTable = {
    "tag": "table",
    "attributes": {
        "id": "taskTable"
    },
    "children": [
        {
            "tag": "thead",
            "children": [
                {
                    "tag": "tr",
                    "children": [
                        { "tag": "th", "content": "Name" },
                        { "tag": "th", "content": "Description" },
                        { "tag": "th", "content": "Actions" }
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

                    },
                    "children": [
                        {
                            "tag": "td",
                            "attributes": {
                                "data-id": "{{_id}}",
                                "click": "update-page",
                                "href": "#/getOne-task?taskId={{_id}}"
                            },
                            "content": "{{name}}"
                        },
                        { "tag": "td", "content": "{{desc}}" },
                        {
                            "tag": "td",
                            "children": [
                                {
                                    "tag": "button",
                                    "attributes": {
                                        "class": "edit-button",
                                        "data-id": "{{_id}}",
                                        "click": "getOne-task-editTask"
                                    },
                                    "content": "Edit"
                                },
                                {
                                    "tag": "button",
                                    "attributes": {
                                        "class": "delete-button",
                                        "click": "deleteOneByID-task-orgList",
                                        "data-id": "{{_id}}"
                                    },
                                    "content": "Delete"
                                }
                                
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
