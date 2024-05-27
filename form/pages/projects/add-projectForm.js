export const addProjectForm = {
    "tag": "form",
    "attributes": {
        "id": "add-project-form",
        "class": "form",
        "submit": "insertOne-project"
    },
    "children": [
        {
            "tag": "h2",
            "content": "Add Project"
        },
        {
            "tag": "div",
            "attributes": { "class": "form-group" },
            "children": [
                {
                    "tag": "label",
                    "attributes": { "for": "project-name" },
                    "content": "Project Name:"
                },
                {
                    "tag": "input",
                    "attributes": {
                        "type": "text",
                        "id": "project-name",
                        "name": "name",
                        "placeholder": "Enter project name",
                        "required": "true"
                    }
                }
            ]
        },
        {
            "tag": "div",
            "attributes": { "class": "form-group" },
            "children": [
                {
                    "tag": "label",
                    "attributes": { "for": "project-description" },
                    "content": "Project Description:"
                },
                {
                    "tag": "input",
                    "attributes": {
                        "type": "text",
                        "id": "project-description",
                        "name": "desc",
                        "placeholder": "Enter project description",
                        "required": "true"
                    }
                }
            ]
        },
        {
            "tag": "div",
            "attributes": { "class": "form-group" },
            "children": [
                {
                    "tag": "label",
                    "attributes": { "for": "orgId" },
                    "content": "Select Organization:"
                },
                {
                    "tag": "select",
                    "attributes": { "id": "orgId", "name": "orgId", "required": "true" },
                    "children": [
                        {
                            "tag": "option",
                            "repeat": " ",
                            "attributes": { "value": "{{_id}}" },
                            "content": "{{name}}"
                        },


                        /* Add more options dynamically based on fetched organization data */
                    ]
                }
            ]
        },
        {
            "tag": "div",
            "attributes": { "class": "form-group" },
            "children": [
                {
                    "tag": "button",
                    "attributes": { "type": "submit", "class": "submit-btn" },
                    "content": "Add Project"
                }
            ]
        },

    ]
}