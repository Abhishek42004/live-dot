export const editTaskForm = {
    "tag": "form",
    "attributes": {
        "id": "edit-task-form",
        "class": "form",
        "method": "PUT",
        "data-id": "{{_id}}",
        "submit": "updateOneByID-task-orgList"
    },
    "children": [
        {
            "tag": "h2",
            "content": "Edit Task"
        },
        {
            "tag": "div",
            "attributes": { "class": "form-group" },
            "children": [
                { "tag": "label", "attributes": { "for": "task-name" }, "content": "Task Name:" },
                { "tag": "input", "attributes": { "type": "text", "id": "task-name", "name": "name", "required": "true", "value": "{{name}}" } }
            ]
        },
        {
            "tag": "div",
            "attributes": { "class": "form-group" },
            "children": [
                { "tag": "label", "attributes": { "for": "task-description" }, "content": "Task Description:" },
                { "tag": "input", "attributes": { "type": "text", "id": "task-description", "name": "desc", "required": "true", "value": "{{desc}}" } }
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
