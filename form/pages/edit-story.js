export const editStoryPage = {
    "tag": "form",
    "attributes": {
        "id": "add-story-form",
        "method": "POST",
        "data-id": "{{_id}}",
        "submit": "updateOneByID-story"
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
                "required": "true",
                "value": "{{storyTitle}}"
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
            "tag": "input",
            "attributes": {
                "type": "text",
                "id": "story-description",
                "name": "storyDescription",
                "rows": "4",
                "required": "true",
                "value": "{{storyDescription}}"
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