export const viewProject =
{
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
        }
        ,
        {
            "tag": "div",
            "attributes": {
                "style": `min-height:100vh;width: -webkit-fill-available;padding:1rem`,
                "id": "appBody",
            },
            "children": [
                {
                    "tag": "div",
                    "attributes": {
                        "style": "justify-content:space-between",
                        "class": "flex-center",
                    },
                    "children": [
                        {
                            "tag": "h2",
                            "content": "Projects "
                        },
                        {
                            "tag": "button",
                            "content": "Add Project",
                            "attributes": {
                                "click": "update-page",
                                "href": "#/add-project"
                            }

                        }
                    ]

                },
                {
                    "tag": "div",
                    "attributes": {
                        "id": "projectTable"
                    },

                }
            ]
        }

    ]
}