export const editProject = {
    "tag": "form",
    "attributes": {
        "id": "edit-project-form",
        "class": "form",
        "method": "PUT",
        "data-id": "{{_id}}",
        "submit": "updateOneByID-project-projectList"
    },
    "children": [
        {
            "tag": "h2",
            "content": "Edit Project"
        },
        {
            "tag": "div",
            "attributes": { "class": "form-group" },
            "children": [
                { "tag": "label", "attributes": { "for": "project-name" }, "content": "Project Name:" },
                { "tag": "input", "attributes": { "type": "text", "id": "project-name", "name": "name", "required": "true", "value": "{{name}}" } }
            ]
        },
        {
            "tag": "div",
            "attributes": { "class": "form-group" },
            "children": [
                { "tag": "label", "attributes": { "for": "project-description" }, "content": "Project Description:" },
                { "tag": "input", "attributes": { "type": "text", "id": "project-description", "name": "desc", "required": "true", "value": "{{desc}}" } }
            ]
        },
        {
            "tag": "div",
            "attributes": { "class": "form-group" },
            "children": [
                { "tag": "button", "attributes": { "type": "submit", "class": "submit-btn" }, "content": "Save Changes" }
            ]
        }
    ]
}
