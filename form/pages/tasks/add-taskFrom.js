export const addTaskFrom = {
    "tag": "form",
    "attributes": {
        "id": "add-task-form",
        "class": "form",
        "submit": "insertOne-task"
    },
    "children": [
        {
            "tag": "h2",
            "content": "Add Task"
        },
        {
            "tag": "div",
            "attributes": { "class": "form-group" },
            "children": [
                { "tag": "label", "attributes": { "for": "name" }, "content": "Task Name:" },
                { "tag": "input", "attributes": { "type": "text", "id": "task-name", "name": "name", "placeholder": "Enter task name", "required": "true" } }
            ]
        },
        {
            "tag": "div",
            "attributes": { "class": "form-group" },
            "children": [
                {
                    "tag": "label",
                    "attributes": { "for": "task-description" },
                    "content": "task Description:"
                },
                {
                    "tag": "input",
                    "attributes": {
                        "type": "text",
                        "id": "task-description",
                        "name": "desc",
                        "placeholder": "Enter task description",
                        "required": "true"
                    }
                }
            ]
        },
        {
            "tag": "div",
            "attributes": { "class": "form-group" },
            "children": [
                { "tag": "label", "attributes": { "for": "project-id" }, "content": "Select Project:" },
                {
                    "tag": "select",
                    "attributes": { "id": "project-id", "name": "projectId", "required": "true" },
                    "children": [
                        {
                            "tag": "option",
                            "repeat": " ",
                            "attributes": { "value": "{{_id}}" },
                            "content": "{{name}}"
                        }
                        /* Add more options dynamically based on fetched project data */
                    ]
                }
            ]
        },
        {
            "tag": "div",
            "attributes": { "class": "form-group" },
            "children": [
                { "tag": "button", "attributes": { "type": "submit", "class": "submit-btn" }, "content": "Add Task" }
            ]
        }
    ]
}
