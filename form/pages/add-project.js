export const addProjectPage = {
    "tag": "div",
    "attributes": {
        "class": "explorer"
    },

    "children": [
        {
            "tag": "aside",
            "attributes": {
                "class": "sidebar"
            },
            "children": [
                {
                    "tag": "h2",
                    "content": "Sidebar"
                },
                {
                    "tag": "ul",
                    "children": [
                        {
                            "tag": "li",
                            "content": "ADD STORY",
                            attributes: {
                                href: "#/add-story",
                                "click": "update-page"
                            }
                        },
                        {
                            "tag": "li",
                            "content": "ADD File",
                            attributes: {
                                href: "#/add-file",
                                "click": "update-page"
                            }
                        },
                        {
                            "tag": "li",
                            "content": "View Story",
                            attributes: {
                                href: "#/get-story",
                                "click": "update-page"
                            }
                        },
                        {
                            "tag": "li",
                            "content": "ADD PROJECT",
                            attributes: {
                                href: "#/add-project",
                                "click": "update-page"
                            }
                        },
                        {
                            "tag": "li",
                            "content": "GET ALL PROJECTS",
                            attributes: {
                                href: "#/get-projects",
                                "click": "update-page"
                            }
                        },
                        {
                            "tag": "li",
                            "content": "ADD TASK",
                            attributes: {
                                href: "#/add-task",
                                "click": "update-page"
                            }
                        },
                        {
                            "tag": "li",
                            "content": "View Tasks",
                            attributes: {
                                "click": "update-page",
                                "href": "#/next"
                            }
                        },
                        {
                            "tag": "li",
                            "content": "Item 3"
                        }
                    ]
                }
            ]
        },
        {
            "tag": "form",
            "attributes": {
                "id": "add-project-form",
                "submit": "insertOne-project",
                "method": "POST"
            },
            "children": [
                {
                    "tag": "label",
                    "attributes": {
                        "for": "project-name"
                    },
                    "content": "Project Name:"
                },
                {
                    "tag": "input",
                    "attributes": {
                        "type": "text",
                        "id": "project-name",
                        "name": "projectName",
                        "required": "true"
                    }
                },
                {
                    "tag": "label",
                    "attributes": {
                        "for": "project-description"
                    },
                    "content": "Project Description:"
                },
                {
                    "tag": "textarea",
                    "attributes": {
                        "id": "project-description",
                        "name": "projectDescription",
                        "rows": "4",
                        "required": "true"
                    }
                },
                {
                    "tag": "button",
                    "attributes": {
                        "type": "submit"
                    },
                    "content": "Project Task"
                }
            ]
        }
    ]
}
