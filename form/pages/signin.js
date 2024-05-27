export const signinPage = {
    "tag": "div",
    "children": [
        {
            "tag": "header",
            "children": [
                {
                    "tag": "h1",
                    "content": "Sign In"
                },
                {
                    "tag": "nav",
                    "children": [
                        {
                            "tag": "ul",
                            "children": [
                                {
                                    "tag": "li",
                                    "children": [
                                        {
                                            "tag": "a",
                                            "attributes": {
                                                "href": "index.html"
                                            },
                                            "content": "Home"
                                        }
                                    ]
                                },
                                {
                                    "tag": "li",
                                    "children": [
                                        {
                                            "tag": "div",
                                            "attributes": {
                                                "click": "update-page",
                                                "href": "#/signup"
                                            },
                                            "content": "Register"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "tag": "section",
            "attributes": {
                "id": "signin-form"
            },
            "children": [
                {
                    "tag": "form",
                    "attributes": {
                        "submit": "loginUser-User"
                    },
                    "children": [
                        {
                            "tag": "label",
                            "attributes": {
                                "for": "username"
                            },
                            "content": "Username"
                        },
                        {
                            "tag": "input",
                            "attributes": {
                                "type": "text",
                                "id": "username",
                                "name": "username",
                                "required": "true"
                            }
                        },
                        {
                            "tag": "label",
                            "attributes": {
                                "for": "password"
                            },
                            "content": "Password"
                        },
                        {
                            "tag": "input",
                            "attributes": {
                                "type": "password",
                                "id": "password",
                                "name": "password",
                                "required": "true"
                            }
                        },
                        {
                            "tag": "button",
                            "attributes": {
                                "type": "submit"
                            },
                            "content": "Sign In"
                        }
                    ]
                }
            ]
        }
    ]
}