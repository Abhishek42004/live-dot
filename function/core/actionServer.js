import { ActionEntity } from "./actionEntity.js";
// const ActionMongo = require("./helpers/actionMongo.js");

import { ActionLocalStorage } from "../helpers/actionLCStorage.js";

// const config = require("../form/config.js");

export class ActionServer {

    constructor(config) {
        this.app = null;
        // console.log(this.app);
        this.actionEntity = new ActionEntity();

        ''
        console.log("actinentity laoded");
    }
    async initialize(app) {
        this.app = app;
        if (typeof window === "undefined") {
            const { ActionMongo } = await import("../helpers/mongodb/actionMongo.js")
            const actionMongo = new ActionMongo(this.app.appConfig.database.mongoConfig);
            this.actionEntity.use(actionMongo)
        } else {
            this.actionEntity.use(new ActionLocalStorage())
        }
        this.actionEntity.initialize(app)

    }
    async handleRequest(req, res, file) {
        this.app.validator.validate(req, this.app.appConfig.schemas["customReq"])
        console.log("handle reqeust called");
        const { action, entity } = req.meta;
        let result
        console.log(req);
        if (!req.resources) {
            result = await this.actionEntity[action](
                req,
                entity
            );
        } else {
            if (req.resources.type === "http" && typeof window != "undefined") {
                console.log("Http route taken");
                let endpoint = this.actionEntity.constructURL(req);
                if (req.method === "GET") {
                    result = await this.app.httpService.request(endpoint, req.method)
                } else {
                    result = await this.app.httpService.request(endpoint, req.method, req.data.data)
                }

            } else {
                if (req)
                    if (req.meta.authurization) {
                        let authorize = await this.actionEntity.authorizeUser(req)
                        if (!authorize) {
                            return
                        }
                    }
                if (req.meta.entity === "file") {
                    // Try to use the original filenam
                    console.log("ActionFS Called");
                    result = await this.app.actionFs[req.meta.action](req.data.fileName, file)
                } else {
                    result = await this.actionEntity.performAction(
                        req
                    );
                }

            }

        }
        if (typeof window === 'undefined') {
            if (req.hooks && req.hooks.post) {
                let success = true; // Flag to track success of conditions
                if (
                    Array.isArray(req.hooks.post) &&
                    req.hooks.post.length > 0 &&
                    req.hooks.post[0] !== ""
                ) {
                    for (const postHook of req.hooks.post) {
                        // console.log("log result ", result);
                        result = await this.app.callbackHandler[postHook](result);
                        console.log(result);
                        if (!result.token) {
                            success = false; // Set flag to false if a condition fails
                            break; // Exit loop early if condition fails
                        }
                    }
                    if (success) {
                        this.sendResponse(res, result); // Send response only if all conditions pass
                    } else {
                        console.log("result : ", result);
                        this.sendResponse(res, { error: "Error in hooks" }); // Send error response if any condition fails
                    }
                }
            } else {
                this.sendResponse(res, result);
            }
        } else {
            req["response"] = result;
            this.sendResponse(req)
        }


    }
    sendResponse(res, result) {
        this.app.actionClient.receiveResponse(res, result);
    }
}


