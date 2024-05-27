export const shareStoryForm = {
    "tag": "form",
    "attributes": {
        "submit": "share-org-orgList",
        "method": "POST"
    },
    "children": [
        {
            "tag": "div",
            "attributes": { "class": "form-group" },
            "children": [
                { "tag": "label", "attributes": { "for": "collaborator" }, "content": "Select User:" },
                {
                    "tag": "select",
                    "attributes": { "id": "collaborator", "name": "collaborator", "required": "true" },
                    "children": [
                        {
                            "tag": "option",
                            "repeat": " ",
                            "attributes": { "value": "{{_id}}" },
                            "content": "{{username}}"
                        }
                    ]
                }
            ]
        },
        {
            "tag": "div",
            "attributes": { "class": "form-group" },
            "children": [
                { "tag": "label", "attributes": { "for": "permission" }, "content": "Select Permission:" },
                {
                    "tag": "select",
                    "attributes": { "id": "permission", "name": "permission", "required": "true" },
                    "children": [
                        { "tag": "option", "attributes": { "value": "Read" }, "content": "Only Read" },
                        { "tag": "option", "attributes": { "value": "Write" }, "content": "Read and Write" }
                    ]
                }
            ]
        },
        {
            "tag": "div",
            "attributes": { "class": "form-group" },
            "children": [
                { "tag": "button", "attributes": { "type": "submit" }, "content": "Share Story" }
            ]
        }
    ]
}
