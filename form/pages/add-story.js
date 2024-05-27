export const addStoryPage = {
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
                            "attributes": {
                                "href": "#/add-project",
                                "click": "update-page"
                            }
                        },
                        {
                            "tag": "li",
                            "content": "GET ALL PROJECTS",
                            "attributes": {
                                "href": "#/get-projects",
                                "click": "update-page"
                            }
                        },
                        {
                            "tag": "li",
                            "content": "ADD TASK",
                            "attributes": {
                                "href": "#/add-task",
                                "click": "update-page"
                            }
                        },
                        {
                            "tag": "li",
                            "content": "View Tasks",
                            "attributes": {
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
                "id": "add-story-form",
                "submit": "insertOne-story",
                "method": "POST"
            },
            "children": [
                {
                    "tag": "label",
                    "attributes": {
                        "for": "story-title"
                    },
                    "content": "Story Title:"
                },
                {
                    "tag": "input",
                    "attributes": {
                        "type": "text",
                        "id": "story-title",
                        "name": "storyTitle",
                        "required": "true"
                    }
                },
                {
                    "tag": "label",
                    "attributes": {
                        "for": "story-description"
                    },
                    "content": "Story Description:"
                },
                {
                    "tag": "textarea",
                    "attributes": {
                        "id": "story-description",
                        "name": "storyDescription",
                        "rows": "4",
                        "required": "true"
                    }
                },
                {
                    "tag": "button",
                    "attributes": {
                        "type": "submit"
                    },
                    "content": "Add Story"
                }
            ]
        }
    ]
};
