export const landing = {
    "tag": "div",
    "children": [
        {
            "tag": "nav",
            "children": [
                {
                    "tag": "header",
                    "children": [
                        {
                            "tag": "h2",
                            "content": "Dia "
                        }
                    ]
                },
                {
                    "tag": "input",
                    "attributes": {
                        "type": "checkbox",
                        "id": "nav-check"
                    }
                },
                {
                    "tag": "div",
                    "attributes": {
                        "class": "nav-btn"
                    },
                    "children": [
                        {
                            "tag": "label",
                            "attributes": {
                                "for": "nav-check"
                            },
                            "children": [
                                { "tag": "span" },
                                { "tag": "span" },
                                { "tag": "span" }
                            ]
                        }
                    ]
                },
                {
                    "tag": "ul",
                    "children": [
                        {
                            "tag": "li",
                            "attributes": {
                                "click": "update-page",
                                "href": "#/signin"
                            },
                            "children": [{
                                "tag": "a", "attributes": {
                                    "click": "update-page",
                                    "href": "#/signin"
                                },
                                "content": "Login"
                            }]
                        },
                        {
                            "tag": "li",

                            "children": [{
                                "tag": "button", "attributes": {
                                    "class": "primary-btn", "click": "update-page",
                                    "href": "#/signup"
                                }, "content": "Get Started"
                            }]
                        }
                    ]
                }
            ]
        },
        { "tag": "br" },


        { "tag": "br" },
        {
            "tag": "div",
            "attributes": {
                "class": "container"
            },
            "children": [
                {
                    "tag": "section",
                    "attributes": {
                        "class": "display-flex-2x2-wrap"
                    },
                    "children": [
                        {
                            "tag": "article",
                            "attributes": {
                                "style": "flex: 1;"
                            },
                            "children": [
                                {
                                    "tag": "h4",
                                    "attributes": {
                                        "style": "font-weight: lighter;"
                                    },
                                    "content": "#1 Project Management System for Teams"
                                },
                                {
                                    "tag": "h2",
                                    "children": [
                                        { "tag": "span", "attributes": { "style": "color:rgb(43, 146, 43)" }, "content": "Dia Project Management System:" },


                                        { "tag": "span", "content": "Empower your team to collaborate," },


                                        { "tag": "span", "content": "plan, and execute projects effectively" },

                                    ]
                                },
                                { "tag": "button", "attributes": { "class": "basic-btn" }, "content": "Get Started" }
                            ]
                        },
                        {
                            "tag": "article",
                            "children": [
                                {
                                    "tag": "img",
                                    "attributes": {
                                        "src": "https://images.unsplash.com/photo-1600195077909-46e573870d99?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                                        "alt": "Project Management System"
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
