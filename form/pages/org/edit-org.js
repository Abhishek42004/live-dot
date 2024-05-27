export const editOrg = {
    "tag": "form",
    "attributes": {
        "id": "edit-org-form",
        "class": "form",
        "method": "PUT",
        "data-id": "{{_id}}",
        "submit": "updateOneByID-org-orgList"
    },
    "children": [
        {
            "tag": "h2",
            "content": "Edit Organization"
        },
        {
            "tag": "div",
            "attributes": {
                "class": "form-group"
            },
            "children": [
                {
                    "tag": "label",
                    "attributes": {
                        "for": "org-name"
                    },
                    "content": "Organization Name:"
                },
                {
                    "tag": "input",
                    "attributes": {
                        "type": "text",
                        "id": "org-name",
                        "name": "name",

                        "required": "true",
                        "value": "{{name}}"
                    }
                }
            ]
        },
        {
            "tag": "div",
            "attributes": {
                "class": "form-group"
            },
            "children": [
                {
                    "tag": "label",
                    "attributes": {
                        "for": "org-description"
                    },
                    "content": "Organization Description:"
                },
                {
                    "tag": "input",
                    "attributes": {
                        "id": "org-description",
                        "name": "desc",
                        "rows": "4",
                        "type": "text",
                        "required": "true",
                        "value": "{{desc}}"
                    }
                }
            ]
        },
        {
            "tag": "div",
            "attributes": {
                "class": "form-group"
            },
            "children": [
                {
                    "tag": "button",
                    "attributes": {
                        "type": "submit",
                        "class": "submit-btn"
                    },
                    "content": "Save Changes"
                }
            ]
        }
    ]
}
