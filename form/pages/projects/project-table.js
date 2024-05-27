export const projectTable = {
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
                        "click": "getOne-project"
                    },

                    "children": [
                        {
                            "tag": "td",
                            "attributes": {
                                "data-id": "{{_id}}",
                                "click": "update-page",
                                "href": "#/getOne-project?projectId={{_id}}"
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
                                        "click": "getOne-project-editProject"
                                    },
                                    "content": "Edit"
                                },
                                {
                                    "tag": "button",
                                    "attributes": {
                                        "class": "delete-button",
                                        "click": "deleteOneByID-project-orgList",
                                        "data-id": "{{_id}}",
                                    },
                                    "content": "Delete"
                                },
                               
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}