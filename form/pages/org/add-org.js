export const addOrg = {
    "tag": "div",
    "attributes": {
        "class": "explorer",
        "style": "display:flex"
    },

    "children": [
        {
            "tag": "aside",
            "children": [
                {
                    "tag": "nav",
                    "children": [
                        { "tag": "br" },
                        {
                            "tag": "ul",
                            "children": [
                                {
                                    "tag": "li", "children": [{
                                        "tag": "a", "attributes": {
                                            "click": "update-page",
                                            "href": "#/add-org"
                                        }, "content": "Add Org"
                                    }]
                                },
                                {
                                    "tag": "li", "children": [{
                                        "tag": "a", "attributes": {
                                            "click": "update-page",
                                            "href": "#/get-org"
                                        }, "content": "View Org"
                                    }]
                                },
                                { "tag": "li", "children": [{ "tag": "a", "attributes": { "href": "#" }, "content": "View users" }] }
                            ]
                        }
                    ]
                }
            ]
        }, 
        {
            "tag": "div",

            "attributes": {
                "style": `min-height:100vh;width: -webkit-fill-available;padding:1rem`,
                "id": "appBody",
                "class": "flex-center"
            },
            children: [
                {
                    "tag": "form",
                    "attributes": {
                        "id": "add-org-form",
                        "class": "form",
                        "submit": "insertOne-org"
                    },
                    "children": [
                        {
                            "tag": "h2",
                            "content": "Add Organization"
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
                                        "placeholder": "Enter organization name",
                                        "required": "true"
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
                                        "type": "text",
                                        "rows": "4",
                                        "placeholder": "Enter organization description",
                                        "required": "true"
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
                                    "content": "Add Organization"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}