export const login = {
    "tag": "div",
    "attributes": {
        "class": "flex-center",
        "style": `height:100vh`
    },
    "children": [
        {
            "tag": "form",
            "attributes": {
                "submit": "loginUser-User-explorer"
            },
            "children": [
                { "tag": "h2", "content": "Let's Sign-In" },
                {
                    "tag": "div",
                    "children": [
                        { "tag": "label", "attributes": { "for": "username" }, "content": "Username:" },
                        { "tag": "input", "attributes": { "type": "text", "id": "username", "name": "username" } }
                    ]
                },
                {
                    "tag": "div",
                    "children": [
                        { "tag": "label", "attributes": { "for": "password" }, "content": "Password:" },
                        { "tag": "input", "attributes": { "type": "password", "id": "password", "name": "password" } }
                    ]
                },
                {
                    "tag": "div",
                    "children": [
                        { "tag": "input", "attributes": { "type": "submit", "value": "Submit" } }
                    ]
                }

            ]
        }
    ]



}
