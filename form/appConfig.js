import { explorePage } from "./pages/explorer.js";

import { addProjectPage } from "./pages/add-project.js";
import { addStoryPage } from "./pages/add-story.js";
import { editStoryPage } from "./pages/edit-story.js";
import { shareStory } from "./pages/share-story.js";
import { shareStoryForm } from "./pages/shareStoryForm.js";
import { addFile } from "./pages/add-file.js";
import { landing } from "./pages/landing.js";
import { login } from "./pages/login.js";
import { Register } from "./pages/register.js";

import { dataTemplate } from "./pages/data-template.js";
import { addOrg } from "./pages/org/add-org.js";
import { editOrg } from "./pages/org/edit-org.js";
import { viewOrg } from "./pages/org/view-org.js";
import { viewProject } from "./pages/projects/view-Projects.js";
import { addProject } from "./pages/projects/add-project.js";
import { addProjectForm } from "./pages/projects/add-projectForm.js";
import { projectTable } from "./pages/projects/project-table.js";
import { viewTask } from "./pages/tasks/view-task.js";
import { taskTable } from "./pages/tasks/task-table.js";
import { addTaskFrom } from "./pages/tasks/add-taskFrom.js";
import { addTaskPage } from "./pages/tasks/add-task.js";
import { editProject } from "./pages/projects/edit-project.js";
import { editTaskForm } from "./pages/tasks/edit-task.js";

export const appConfig = {
  title: "Dia-v-0-0-1",
  ehhConfig: "./form/config.json",
  defaultRoute: "#/defualt",
  jwt: {
    secretKey: "DEVELOPMENT",
  },
  eventConfig: {
    global: [
      {
        Object2Listen: "Window",
        events: ["click", "submit", "change"],
        callback: "handleEvent",
      },
    ],
  },
  routes: {
    default: {
      path: "#/default",
      components: [{ template: landing, selector: "app" }],

    },
    "/": {
      components: [
        {
          template: landing,
          selector: "app"
        }
      ]
    },
    "#/explorer": {
      components: [
        {
          template: explorePage,
          selector: "app",
        }
      ],
      callback: [
        {
          name: "resendRequest", arg: {
            meta: {
              action: "getMine",
              entity: "org",
              callbackId: "orgs"
            },
            data: {},
            method: "GET"

          }
        }
      ]
    },
    "#/signup": {
      components: [
        {
          template: Register,
          selector: "app"
        }
      ]
    },
    "#/signin": {
      components: [
        {
          template: login,
          selector: "app"
        }
      ]
    },
    "#/add-org": {
      components: [
        {
          template: addOrg,
          selector: "app"
        }
      ]
    },
    "#/add-project": {
      components: [
        {
          template: addProjectPage,
          selector: "app"
        }
      ]
    },

    "#/add-story": {
      components: [
        {
          template: addStoryPage,
          selector: "app"
        }
      ]
    },
    "#/get-org": {
      components: [
        {
          template: explorePage,
          selector: "app",
        }
      ],
      callback: [
        {
          name: "resendRequest", arg: {
            meta: {
              action: "getMine",
              entity: "org",
              callbackId: "orgs"
            },
            data: {},
            method: "GET"

          }
        }
      ]
    },
    "#/share-org": {
      components: [
        {
          template: shareStory,
          selector: "app",
        }
      ],
      callback: [
        {
          name: "resendRequest", arg: {
            meta: {
              action: "getAll",
              entity: "User",
              callbackId:"access"
            },
            data: {}

          }
        }
      ]
    },
    "#/add-file": {
      components: [
        {
          template: addFile,
          selector: "app",
        }
      ]
    },
    "#/getOne-org": {
      components: [
        {
          template: viewProject,
          selector: "app"
        }
      ],
      callback: [
        {
          name: "resendRequest", arg: {
            meta: {
              action: "getMany",
              entity: "project",
              callbackId: "projectTable"
            },
            data: {},
            method: "GET"

          }
        }
      ]

    },
    "#/add-project": {
      components: [
        {
          template: addProject,
          selector: "app"
        }
      ],
      callback: [
        {
          name: "resendRequest", arg: {
            meta: {
              action: "getMine",
              entity: "org",
              callbackId: "orgSelect"
            },
            data: {},
            method: "GET"

          }
        }
      ]
    },
    "#/getOne-project": {
      components: [
        {
          template: viewTask,
          selector: "app"
        }
      ],
      callback: [
        {
          name: "resendRequest", arg: {
            meta: {
              action: "getMany",
              entity: "task",
              callbackId: "taskTable"
            },
            data: {},
            method: "GET"

          }
        }
      ]

    },
    "#/add-task": {
      components: [
        {
          template: addTaskPage,
          selector: "app"
        }
      ],
      callback: [
        {
          name: "resendRequest", arg: {
            meta: {
              action: "getMine",
              entity: "project",
              callbackId: "projectSelect"
            },
            data: {},
            method: "GET"

          }
        }
      ]
    },

  },
  components: {
    HelloWord: {
      template: "<h1>Thank you for clicking - Hello World!  </h1>",
      selector: "app",
    },
    UserList: {
      template: {
        "tag": "table",
        "attributes": {
          "id": "userTable"
        },
        "children": [
          {
            "tag": "thead",
            "children": [
              {
                "tag": "tr",
                "children": [
                  {
                    "tag": "th",
                    "content": "Username"
                  },
                  {
                    "tag": "th",
                    "content": "Password"
                  },
                  {
                    "tag": "th",
                    "content": "Actions"
                  }
                ]
              }
            ]
          },
          {
            "tag": "tbody",
            "children": [
              {
                "tag": "tr",
                "repeat": "users",
                "children": [
                  {
                    "tag": "td",
                    "content": "{{username}}"
                  },
                  {
                    "tag": "td",
                    "content": "{{password}}"
                  },
                  {
                    "tag": "td",
                    "children": [
                      {
                        "tag": "button",
                        "attributes": {
                          "class": "edit-button",
                          "click": "update-task"
                        },
                        "content": "Edit"
                      },
                      {
                        "tag": "button",
                        "attributes": {
                          "class": "delete-button",
                          "click": "delete-task"
                        },
                        "content": "Delete"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      selector: "userList"
    },
    ProjectList: {
      template: {
        "tag": "table",
        "attributes": {
          "id": "userTable"
        },
        "children": [
          {
            "tag": "thead",
            "children": [
              {
                "tag": "tr",

                "children": [
                  {
                    "tag": "th",
                    "content": "Name "
                  },
                  {
                    "tag": "th",
                    "content": "Description"
                  },
                  {
                    "tag": "th",
                    "content": "Actions"
                  }
                ]
              }
            ]
          },
          {
            "tag": "tbody",
            "children": [
              {
                "tag": "tr",
                "repeat": " ",
                "attributes": {
                  "data-id": "{{_id}}",
                  "click": "getOne-project"
                },

                "children": [
                  {
                    "tag": "td",
                    "attributes": {
                      "data-id": "{{_id}}",
                      "click": "getOne-project"
                    },
                    "content": "{{projectName}}"
                  },
                  {
                    "tag": "td",
                    "content": "{{projectDescription}}"
                  },
                  {
                    "tag": "td",
                    "children": [
                      {
                        "tag": "button",
                        "attributes": {
                          "class": "edit-button",
                          "click": "update-task"
                        },
                        "content": "Edit"
                      },
                      {
                        "tag": "button",
                        "attributes": {
                          "class": "delete-button",
                          "click": "delete-task"
                        },
                        "content": "Delete"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      selector: "userList"
    },
    "ProjectPage": {
      template: {
        "tag": "table",
        "attributes": {
          "id": "userTable"
        },
        "children": [
          {
            "tag": "thead",
            "children": [
              {
                "tag": "tr",
                "children": [
                  {
                    "tag": "th",
                    "content": "Name "
                  },
                  {
                    "tag": "th",
                    "content": "Description"
                  },
                  {
                    "tag": "th",
                    "content": "Actions"
                  }
                ]
              }
            ]
          },
          {
            "tag": "tbody",
            "children": [
              {
                "tag": "tr",
                "repeat": " ",

                "children": [
                  {
                    "tag": "td",

                    "content": "{{taskName}}"
                  },
                  {
                    "tag": "td",
                    "content": "{{taskDescription}}"
                  },
                  {
                    "tag": "td",
                    "children": [
                      {
                        "tag": "button",
                        "attributes": {
                          "class": "edit-button",
                          "click": "update-task"
                        },
                        "content": "Edit"
                      },
                      {
                        "tag": "button",
                        "attributes": {
                          "class": "delete-button",
                          "click": "delete-task"
                        },
                        "content": "Delete"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      selector: "userList"
    },
    StoryList: {
      template: {
        "tag": "table",
        "attributes": {
          "id": "userTable"
        },
        "children": [
          {
            "tag": "thead",
            "children": [
              {
                "tag": "tr",

                "children": [
                  {
                    "tag": "th",
                    "content": "Name "
                  },
                  {
                    "tag": "th",
                    "content": "Description"
                  },
                  {
                    "tag": "th",
                    "content": "Actions"
                  }
                ]
              }
            ]
          },
          {
            "tag": "tbody",
            "children": [
              {
                "tag": "tr",
                "repeat": " ",
                "attributes": {
                  "data-id": "{{_id}}",
                  "click": "getOne-story"
                },

                "children": [
                  {
                    "tag": "td",
                    "attributes": {
                      "data-id": "{{_id}}",
                      "click": "getOne-project"
                    },
                    "content": "{{storyTitle}}"
                  },
                  {
                    "tag": "td",
                    "content": "{{storyDescription}}"
                  },
                  {
                    "tag": "td",
                    "children": [
                      {
                        "tag": "button",
                        "attributes": {
                          "class": "edit-button",
                          "data-id": "{{_id}}",
                          "click": "getOne-story"
                        },
                        "content": "Edit"
                      },
                      {
                        "tag": "button",
                        "attributes": {
                          "class": "delete-button",
                          "click": "deleteOneByID-story",
                          "data-id": "{{_id}}",
                        },
                        "content": "Delete"
                      },
                      {
                        "tag": "button",
                        "attributes": {
                          "class": "delete-button",
                          "click": "update-page",
                          "href": "#/share-story?id={{_id}}",
                        },
                        "content": "Share"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      selector: "userList"
    },
    DataList: {
      template: viewOrg,
      selector: "appBody"
    },
    EditStoryForm: {
      template: editStoryPage,
      selector: "userList"
    },
    ShareStoryForm: {
      template: shareStoryForm,
      selector: "userList"
    },
    EditOrg: {
      template: editOrg,
      selector: "appBody"
    },
    AddProject: {
      template: addProject,
      selector: "appBody"

    },
    AddProjectForm: {
      template: addProjectForm,
      selector: "appBody"
    },
    ProjectTable: {
      template: projectTable,
      selector: "projectTable"
    },
    TaskTable: {
      template: taskTable,
      selector: "taskTable"
    },
    AddTaskForm: {
      template: addTaskFrom,
      selector: "appBody"
    },
    EditProject: {
      template: editProject,
      selector: "appBody"
    },
    EditTask: {
      template: editTaskForm,
      selector: "appBody"
    }
  },
  schemas: {
    customReq: {
      "type": "object",
      "properties": {
        "meta": {
          "type": "object",
          "properties": {
            "action": {
              "type": "string"
            },
            "entity": {
              "type": "string"
            }
          },
          "required": ["action", "entity"]
        },
        "queries": {
          "type": "object"
          // Additional validation for queries can be added if needed
        },
        "data": {
          "type": "object"
          // Additional validation for data can be added if needed
        },
        "resources": {
          "type": "object"
          // Additional validation for resources can be added if needed
        }
      },
      "required": ["meta", "data", "resources"]
    },
  },
  entity: {
    "page": {
      actions: {
        get: {
        },
        update: {
          input: {
            queries: {
              url: { source: 'target.attributes.href', defaultValue: {} }
            },

          },
          preventDefault: true
        }
      }
    },
    "element": {
      actions: {
        insert: {
          input: {
            queries: {
              url: { source: 'target.attributes.href', defaultValue: {} }
            },

          },
          preventDefault: true
        }
      }
    },
    "User": {
      actions: {
        "insertOne": {
          "method": "POST",
          "input": {
            queries: {
            },
            data: {
              data: { source: 'formData', defaultValue: {} }
            }
          },
          callbacks: [
            {
              id: "login",
              callback: [
                { name: "navigate", arg: "#/signin" }
              ]
            },
          ],

          schema: {
            data: {
              properties: {
                "username": {
                  "type": "string",
                },
                "password": {
                  "type": "string",
                },
              },
              required: ["username", "password"]

            }

          },

        },
        "getAll": {
          "method": "GET",
          input: {
            queries: {

            },
            data: {}
          },
          callbacks: [
            {
              id: "access",
              callback: [
                {
                  name: "addDynamicElement", arg: "ShareStoryForm"
                }
              ]

            }
          ]

        },
        "loginUser": {
          "method": "POST",
          "input": {
            queries: {
            },
            data: {
              data: { source: 'formData', defaultValue: {} }
            }
          },
          hooks: {
            post: ["generateJwtToken"]
          },
          callbacks: [
            {
              id: "explorer",
              callback: [
                { name: "loginHandler", arg: "#/explorer" }
              ]
            }

          ],
          schema: {
            data: {
              properties: {
                "username": {
                  "type": "string",
                },
                "password": {
                  "type": "string",
                },
              },
              required: ["username", "password"]

            }

          },

        },
        "updateOneByID": {

        },
        "deleteOneByID": {

        },
      },

      resources: {
        name: "mongoDb",
        store: "Users",
        type: "http"
      }
    },
    "project": {
      actions: {
        "insertOne": {
          "method": "POST",
          "activity": "create-project",
          input: {
            data: {
              data: { source: 'formData', defaultValue: {} }
            }
          },
          schema: {
            data: {
              "properties": {
                "projectName": {
                  "type": "string"
                },
                "projectDescription": {
                  "type": "string"
                },
                "createdBy": {
                  "type": "string",
                  "source": "middleware",
                  "prop": "_id"
                },

              },
              "required": [
                "projectName",
                "projectDescription",
                "createdBy",

              ]
            }
          },
          hooks: {
            pre: ["authToken"]
          },
        },
        "getMine": {
          method: "GET",
          schema: {
            query: {
              "properties": {

                "userId": {
                  "type": "string",
                  "source": "middleware",
                  "prop": "_id"
                },

              },
              "required": [


                "userId",

              ]
            }
          },
          hooks: {
            pre: ["authToken"]
          },
          callback: [
            {
              name: "addDynamicElement", arg: "ProjectList"
            }
          ],
        },
        "getOne": {
          method: "GET",
          input: {
            queries: {
              _id: { source: 'target.attributes.data-id', defaultValue: {} },

            },
          },
          authorize: true,
          hooks: {
            pre: ["authToken"]
          },
          callback: [
            {
              name: "addDynamicElement", arg: "ProjectPage"
            }
          ],
        }
      },
      resources: {
        name: "mongoDb",
        store: "projects",
        type: "http"
      }
    },
    "story": {
      actions: {
        "insertOne": {
          "method": "POST",
          "activity": "create-story",
          input: {
            data: {
              data: { source: 'formData', defaultValue: {} }
            }
          },
          schema: {
            data: {
              "properties": {
                "storyTitle": {
                  "type": "string"
                },
                "storyDescription": {
                  "type": "string"
                },
                "createdBy": {
                  "type": "string",
                  "source": "middleware",
                  "prop": "_id"
                },

              },
              "required": [
                "storyTitle",
                "storyDescription",
                "createdBy",
              ]
            }
          },
          hooks: {
            pre: ["authToken"]
          },
        },
        "getMine": {
          method: "GET",
          schema: {
            query: {
              "properties": {

                "userId": {
                  "type": "string",
                  "source": "middleware",
                  "prop": "_id"
                },

              },
              "required": [
                "userId",
              ]
            }
          },
          hooks: {
            pre: ["authToken"]
          },
          callback: [
            {
              name: "addDynamicElement", arg: "StoryList"
            }
          ],
        },
        "getOne": {
          method: "GET",
          input: {
            queries: {
              _id: { source: 'target.attributes.data-id', defaultValue: {} },

            },
          },
          authorize: true,
          hooks: {
            pre: ["authToken"]
          },
          callback: [
            {
              name: "addDynamicElement", arg: "EditStoryForm"
            }
          ],
        },
        "updateOneByID": {
          method: "PUT",
          input: {
            queries: {
              _id: { source: 'target.attributes.data-id', defaultValue: {} },

            },
            data: {
              data: { source: 'formData', defaultValue: {} }
            }
          },
          authorize: true,
          hooks: {
            pre: ["authToken"]
          },
          callback: [
            { name: "navigate", arg: "#/get-story" }
          ],
          schema: {
            data: {
              "properties": {
                "storyTitle": {
                  "type": "string"
                },
                "storyDescription": {
                  "type": "string"
                },


              },
              "required": [
                "storyTitle",
                "storyDescription",

              ]
            }
          },
        },
        "deleteOneByID": {
          method: "DELETE",
          input: {
            queries: {
              _id: { source: 'target.attributes.data-id', defaultValue: {} },

            },
            data: {}
          },
          authorize: true,
          hooks: {
            pre: ["authToken"]
          },
          callback: [
            { name: "navigate", arg: "#/get-story" }
          ],
        },
        "share": {
          method: "PUT",
          input: {
            queries: {
              _id: { source: 'url', prop: "id", defaultValue: {} },
            },
            data: {
              data: { source: 'formData', defaultValue: {} }
            }
          },
          authorize: true,
          hooks: {
            pre: ["authToken"]
          },

          schema: {
            data: {
              "properties": {
                "collaborator": {
                  "type": "string"
                },
                "permission": {
                  "type": "string"
                },
              },
              "required": [
                "collaborator",
                "permission"
              ]
            }
          },
        },

      },
      resources: {
        name: "mongoDb",
        store: "story",
        type: "http"
      }
    },
    "file": {
      actions: {
        "create": {
          "method": "POST",
          input: {
            data: {
              data: { source: 'file', defaultValue: {} },

            }
          },
          schema: {
            data: {
              "properties": {
                "fileName": {
                  "type": "string"
                },

              },
              "required": [
                "fileName",


              ]
            }
          },

        }
      },
      resources: {
        name: "mongoDb",
        store: "file",
        type: "http"
      }
    },
    "org": {
      actions: {
        "insertOne": {
          "method": "POST",
          "activity": "create-org",
          input: {
            data: {
              data: { source: 'formData', defaultValue: {} }
            }
          },
          schema: {
            data: {
              "properties": {
                "name": {
                  "type": "string"
                },
                "desc": {
                  "type": "string"
                },
                "createdBy": {
                  "type": "string",
                  "source": "middleware",
                  "prop": "_id"
                },

              },
              "required": [
                "name",
                "desc",
                "createdBy",
              ]
            }
          },
          hooks: {
            pre: ["authToken"]
          },
        },
        "getMine": {
          method: "GET",
          schema: {
            query: {
              "properties": {
                "userId": {
                  "type": "string",
                  "source": "middleware",
                  "prop": "_id"
                },

              },
              "required": [
                "userId",
              ]
            }
          },
          hooks: {
            pre: ["authToken"]
          },
          callbacks: [
            {
              id: "orgs", callback: [
                {
                  name: "addDynamicElement", arg: "DataList"
                }
              ],
            },
            {
              id: "orgSelect", callback: [
                {
                  name: "addDynamicElement", arg: "AddProjectForm"
                }
              ]
            }
          ]

        },
        "getOne": {
          method: "GET",
          input: {
            queries: {
              _id: { source: 'target.attributes.data-id', defaultValue: {} },

            },
          },
          authorize: true,
          hooks: {
            pre: ["authToken"]
          },
          callbacks: [
            {
              id: "editOrg",
              callback: [
                {
                  name: "addDynamicElement", arg: "EditOrg"
                }
              ],
            }
          ]

        },
        "updateOneByID": {
          method: "PUT",
          input: {
            queries: {
              _id: { source: 'target.attributes.data-id', defaultValue: {} },

            },
            data: {
              data: { source: 'formData', defaultValue: {} }
            }
          },
          authorize: true,
          hooks: {
            pre: ["authToken"]
          },
          callbacks: [
            {
              id: "orgList", callback: [
                { name: "navigate", arg: "#/get-org" }
              ]
            }
          ],
          schema: {
            data: {
              "properties": {
                "name": {
                  "type": "string"
                },
                "desc": {
                  "type": "string"
                },


              },
              "required": [
                "name",
                "desc",

              ]
            }
          },
        },
        "deleteOneByID": {
          method: "DELETE",
          input: {
            queries: {
              _id: { source: 'target.attributes.data-id', defaultValue: {} },

            },
            data: {}
          },
          authorize: true,
          hooks: {
            pre: ["authToken"]
          },
          callbacks: [
            {
              id: "orgList", callback: [
                { name: "navigate", arg: "#/get-org" }
              ]
            }
          ],
        },
        "share": {
          method: "PUT",
          input: {
            queries: {
              _id: { source: 'url', prop: "id", defaultValue: {} },
            },
            data: {
              data: { source: 'formData', defaultValue: {} }
            }
          },
          authorize: true,
          hooks: {
            pre: ["authToken"]
          },
          schema: {
            data: {
              "properties": {
                "collaborator": {
                  "type": "string"
                },
                "permission": {
                  "type": "string"
                },
              },
              "required": [
                "collaborator",
                "permission"
              ]
            }
          },
          callbacks: [
            {
              id: "orgList", callback: [
                { name: "navigate", arg: "#/get-org" }
              ]
            }
          ],
        },

      },
      resources: {
        name: "mongoDb",
        store: "org",
        type: "http"
      }
    },
    "project": {
      actions: {
        "insertOne": {
          "method": "POST",
          "activity": "create-project",
          input: {
            data: {
              data: { source: 'formData', defaultValue: {} }
            }
          },
          schema: {
            data: {
              "properties": {
                "name": {
                  "type": "string"
                },
                "desc": {
                  "type": "string"
                },
                "orgId": {
                  "type": "string"
                },
                "createdBy": {
                  "type": "string",
                  "source": "middleware",
                  "prop": "_id"
                },

              },
              "required": [
                "name",
                "desc",
                "createdBy",
              ]
            }
          },
          hooks: {
            pre: ["authToken"]
          },
        },
        "getMany": {
          method: "GET",
          input: {
            queries: {
              orgId: { source: 'url', prop: "orgId", defaultValue: {} },
            },
          },
          schema: {
          },
          hooks: {
            pre: ["authToken"]
          },
          callbacks: [
            {
              id: "projectTable", callback: [{
                name: "addDynamicElement", arg: "ProjectTable"
              }]
            }

          ],
        },
        "getMine": {
          method: "GET",
          schema: {
            query: {
              "properties": {
                "userId": {
                  "type": "string",
                  "source": "middleware",
                  "prop": "_id"
                },

              },
              "required": [
                "userId",
              ]
            }
          },
          hooks: {
            pre: ["authToken"]
          },
          callbacks: [

            {
              id: "projectSelect", callback: [
                {
                  name: "addDynamicElement", arg: "AddTaskForm"
                }
              ]
            }
          ]

        },
        "updateOneByID": {
          method: "PUT",
          input: {
            queries: {
              _id: { source: 'target.attributes.data-id', defaultValue: {} },
            },
            data: {
              data: { source: 'formData', defaultValue: {} }
            }
          },
          authorize: true,
          hooks: {
            pre: ["authToken"]
          },
          callbacks: [
            {
              id: "projectList", callback: [
                { name: "navigate", arg: "#/get-org" }
              ]
            }
          ],
          schema: {
            data: {
              "properties": {
                "name": {
                  "type": "string"
                },
                "desc": {
                  "type": "string"
                },


              },
              "required": [
                "name",
                "desc",

              ]
            }
          },
        },
        "getOne": {
          method: "GET",
          input: {
            queries: {
              _id: { source: 'target.attributes.data-id', defaultValue: {} },

            },
          },
          authorize: true,
          hooks: {
            pre: ["authToken"]
          },
          callbacks: [
            {
              id: "editProject",
              callback: [
                {
                  name: "addDynamicElement", arg: "EditProject"
                }
              ],
            }
          ]

        },
        "deleteOneByID": {
          method: "DELETE",
          input: {
            queries: {
              _id: { source: 'target.attributes.data-id', defaultValue: {} },

            },
            data: {}
          },
          authorize: true,
          hooks: {
            pre: ["authToken"]
          },
          callbacks: [
            {
              id: "orgList", callback: [
                { name: "navigate", arg: "#/get-org" }
              ]
            }
          ],
        },
      },
      resources: {
        name: "mongoDb",
        store: "project",
        type: "http"
      }

    },
    "task": {
      actions: {
        "insertOne": {
          "method": "POST",
          "activity": "create-project",
          input: {
            data: {
              data: { source: 'formData', defaultValue: {} }
            }
          },
          schema: {
            data: {
              "properties": {
                "name": {
                  "type": "string"
                },
                "desc": {
                  "type": "string"
                },
                "projectId": {
                  "type": "string"
                },
                "createdBy": {
                  "type": "string",
                  "source": "middleware",
                  "prop": "_id"
                },

              },
              "required": [
                "name",
                "desc",
                "createdBy",
                "projectId"
              ]
            }
          },
          hooks: {
            pre: ["authToken"]
          },
        },
        "getMany": {
          method: "GET",
          input: {
            queries: {
              projectId: { source: 'url', prop: "projectId", defaultValue: {} },
            },
          },
          schema: {
          },
          hooks: {
            pre: ["authToken"]
          },
          callbacks: [
            {
              id: "taskTable", callback: [{
                name: "addDynamicElement", arg: "TaskTable"
              }]
            }

          ],
        },
        "updateOneByID": {
          method: "PUT",
          input: {
            queries: {
              _id: { source: 'target.attributes.data-id', defaultValue: {} },
            },
            data: {
              data: { source: 'formData', defaultValue: {} }
            }
          },
          authorize: true,
          hooks: {
            pre: ["authToken"]
          },
          callbacks: [
            {
              id: "orgList", callback: [
                { name: "navigate", arg: "#/get-org" }
              ]
            }
          ],
          schema: {
            data: {
              "properties": {
                "name": {
                  "type": "string"
                },
                "desc": {
                  "type": "string"
                },


              },
              "required": [
                "name",
                "desc",

              ]
            }
          },
        },
        "getOne": {
          method: "GET",
          input: {
            queries: {
              _id: { source: 'target.attributes.data-id', defaultValue: {} },

            },
          },
          authorize: true,
          hooks: {
            pre: ["authToken"]
          },
          callbacks: [
            {
              id: "editTask",
              callback: [
                {
                  name: "addDynamicElement", arg: "EditTask"
                }
              ],
            }
          ]

        },
        "deleteOneByID": {
          method: "DELETE",
          input: {
            queries: {
              _id: { source: 'target.attributes.data-id', defaultValue: {} },

            },
            data: {}
          },
          authorize: true,
          hooks: {
            pre: ["authToken"]
          },
          callbacks: [
            {
              id: "orgList", callback: [
                { name: "navigate", arg: "#/get-org" }
              ]
            }
          ],
        },
      },
      resources: {
        name: "mongoDb",
        store: "task",
        type: "http"
      }

    }
  },
  database: {
    mongoConfig: {
      uri: "mongodb+srv://ash:YxohToypXHw4CANq@cluster0.re3rzqw.mongodb.net/",
      // uri: "mongodb://localhost:27017",
      databaseName: "ehh",
    },
  },
};


