export const homePage = {
    "tag": "div",
    "children": [
        {
            "tag": "header",
            "children": [
                {
                    "tag": "h1",
                    "content": "Welcome to ehh Framework"
                },
                {
                    "tag": "nav",
                    "children": [
                        {
                            "tag": "ul",
                            "children": [
                                {
                                    "tag": "li",
                                    "content": "ADD File",
                                    attributes: {
                                        href: "#/add-file",
                                        "click": "update-page"
                                    }
                                },
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
                                                "href": "#/signin"
                                            },
                                            "content": "Log In"
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
                                            "content": "Sign Up"
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
                "id": "hero"
            },
            "children": [
                {
                    "tag": "h2",
                    "content": "The Most Lightweight, Fastest, and Event-Driven Framework"
                },
                {
                    "tag": "p",
                    "content": "Start building powerful web applications with ehh."
                },
                {
                    "tag": "a",
                    "attributes": {
                        "href": "https://github.com/your-ehh-framework-repo",
                        "class": "button"
                    },
                    "content": "Get Started"
                }
            ]
        },
        {
            "tag": "section",
            "attributes": {
                "id": "features"
            },
            "children": [
                {
                    "tag": "h2",
                    "content": "Key Features of ehh Framework"
                },
                {
                    "tag": "ul",
                    "children": [
                        {
                            "tag": "li",
                            "content": "Ultra Lightweight"
                        },
                        {
                            "tag": "li",
                            "content": "Blazing Fast Performance"
                        },
                        {
                            "tag": "li",
                            "content": "Event-Driven Architecture"
                        }
                    ]
                }
            ]
        },
        {
            "tag": "section",
            "attributes": {
                "id": "about"
            },
            "children": [
                {
                    "tag": "h2",
                    "content": "About ehh Framework"
                },
                {
                    "tag": "p",
                    "content": "ehh is a cutting-edge JavaScript framework designed for building lightning-fast and highly interactive web applications. With its lightweight footprint and event-driven architecture, ehh empowers developers to create efficient and responsive web experiences."
                }
            ]
        },
        {
            "tag": "footer",
            "children": [
                {
                    "tag": "p",
                    "content": "© 2024 ehh Framework. All rights reserved."
                }
            ]
        },
    ]
}