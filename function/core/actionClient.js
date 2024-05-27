
export class ActionClient {
    constructor() { this.app = null }
    initialize(app) {
        this.app = app;
    }
    async sendRequest(req, res, urlInfo, entitySchema) {
        if (typeof window === 'undefined') {
            let { action, entity, queries } = urlInfo
            let actionSchema = entitySchema.actions[action];
            let user;
            let query
            let entityData = {};


            if (actionSchema.hooks) {
                let hooks = actionSchema.hooks
                if (
                    Array.isArray(hooks.pre) &&
                    hooks.pre.length > 0 &&
                    hooks.pre[0] !== ""
                ) {
                    for (const preHook of hooks.pre) {
                        // console.log("log result ", result);
                        user = await this.app.callbackHandler[preHook](req.headers.authorization);
                    }
                }
            }
            if (actionSchema.schema) {
                console.log("Schema found");
                if (actionSchema.schema.data) {
                    let schema = actionSchema.schema.data;
                    entityData = this.createEntityData(schema, req.body, user)
                }
                if (actionSchema.schema.query) {
                    let schema = actionSchema.schema.query;
                    query = this.createEntityData(schema, req.body, user)
                }


                // for (const key in schema) {
                //     if (schema.hasOwnProperty(key)) {
                //         const { type, source, prop } = schema[key];
                //         let value;

                //         if (source === "middleware") {
                //             value = user[prop]; // Extract value from middleware
                //         } else {
                //             value = req.body[key]; // Extract value from request body
                //         }

                //         // Handle array type
                //         if (type === "array") {
                //             // Check if value is an array
                //             if (Array.isArray(value)) {
                //                 // If array, directly assign it
                //                 entityData[key] = value;
                //             } else {
                //                 // If not an array, convert to array
                //                 entityData[key] = [value];
                //             }
                //         } else {
                //             entityData[key] = value; // Assign value to the entity object
                //         }
                //     }
                // }
            }
            console.log(entityData);
            let customReq = {
                meta: {
                    action: action,
                    entity: entity,
                    authorization: actionSchema.authorize || null,
                    headers: user || null
                },
                query: query || queries || {},
                data: entityData || {},
                resources: entitySchema.resources,
                hooks: actionSchema.hooks,
                method: actionSchema.method
            }
            console.log(customReq);
            if (entity === "file") {
                this.app.actionServer.handleRequest(customReq, res, req)
            } else {
                this.app.actionServer.handleRequest(customReq, res)
            }

        }
        else {
            let request
            let requestSchema;
            if (req instanceof Event) {
                let { action, entity, callbackId } = req
                if (action && entity) {
                    console.log(entity);
                    let entitySchema = this.app.appConfig.entity[entity];
                    let actionSchema = entitySchema.actions[action];
                    // console.log(actionSchema);
                    let detailsFromEvent = this.extractEventDetails(req);
                    let queries = actionSchema.input.queries ? this.generateJsonFromSchema(actionSchema.input.queries, detailsFromEvent) : null;
                    let data = actionSchema.input.data ? this.generateJsonFromSchema(actionSchema.input.data, detailsFromEvent) : null;
                    let method = actionSchema.method ? actionSchema.method : null
                    request = {
                        meta: {
                            action: action,
                            entity: entity,
                            callbackId: callbackId
                        },

                        method: method,
                        queries: queries,
                        data: data
                    }
                } else {
                    return console.log("Either Action or Entity is is not present in the Element")
                }
            } else if (typeof req === "string") {
                if (this.app.appConfig.flows[input]) {
                    requestSchema = this.app.appConfig.flows[input];
                    request = requestSchema;
                }
            } else if (typeof req === 'object' && !(req instanceof Event) && req !== null) {
                let entitySchema = this.app.appConfig.entity[req.meta.entity];
                let actionSchema = entitySchema.actions[req.meta.action];
                if (req.meta.entity != "page") {
                    if (actionSchema.input) {
                        let queries = null;
                        queries = actionSchema.input.queries ? this.generateJsonFromSchema(actionSchema.input.queries, {}) : null;
                        console.log(queries);
                        if (queries) {
                            req["queries"] = queries
                        }
                    }
                }
                request = req;
            }
            // adding action and entity in req obejct
            // Check if entitySchema.resources exists before adding to request
            let entitySchema = this.app.appConfig.entity[request.meta.entity];
            console.log(entitySchema);
            if (entitySchema.resources) {
                request.resources = entitySchema.resources;
            }
            this.app.actionServer.handleRequest(request);
        }

    }
    createEntityData(schema, rawData, middlewareData) {
        console.log(schema, rawData);
        // Create a new object to hold the entity data
        let entity = {};

        // Iterate over each property defined in the schema
        for (let property in schema.properties) {
            // Get the type of the property from the schema
            let type = schema.properties[property].type;

            // Check if the property exists in the raw data or middleware data
            if (rawData && property in rawData) {
                // If the property exists in rawData, assign its value to the entity object
                if (type === "array" && Array.isArray(rawData[property])) {
                    // Handle array types
                    entity[property] = rawData[property].map(item => createEntity(schema.properties[property].items[0], item, middlewareData));
                } else if (type === "object") {
                    // Handle nested object types
                    entity[property] = createEntity(schema.properties[property], rawData[property], middlewareData);
                } else {
                    // Otherwise, assign the value directly
                    entity[property] = rawData[property];
                }
            } else if (schema.properties[property].source && schema.properties[property].prop) {
                // If the property doesn't exist in rawData but has a source and prop defined in the schema,
                // retrieve the value from the middlewareData
                let source = schema.properties[property].source;
                let prop = schema.properties[property].prop;

                if (prop in middlewareData) {
                    entity[property] = middlewareData[prop];
                } else {
                    throw new Error(`Property "${property}" is missing in the middleware data.`);
                }
            } else {
                // If the property is required but missing in the rawData and no source and prop defined, throw an error
                if (schema.required.includes(property)) {
                    throw new Error(`Property "${property}" is required but missing in the raw data.`);
                }
            }
        }
        if (schema.required) {
            // Check if any required properties are missing in the entity
            for (let requiredProperty of schema.required) {
                if (!(requiredProperty in entity)) {
                    throw new Error(`Required property "${requiredProperty}" is missing in the entity.`);
                }
            }
        }


        return entity;
    }
    extractEventDetails(event) {
        try {
            const details = {
                type: event.type,
                currentTarget: event.currentTarget.tagName,
                timeStamp: event.timeStamp,
                isTrusted: event.isTrusted
            };

            if (event.target) {
                const element = event.target;
                details.target = {
                    tagName: element.tagName,
                    id: element.id,
                    classList: Array.from(element.classList),
                    attributes: {}
                };

                if (element.attributes) {
                    const attrs = element.attributes;
                    for (let i = 0; i < attrs.length; i++) {
                        const attr = attrs[i];
                        details.target.attributes[attr.nodeName] = attr.nodeValue;
                    }
                }

                const dataset = element.dataset;
                details.target.dataset = {};
                for (const key in dataset) {
                    if (Object.prototype.hasOwnProperty.call(dataset, key)) {
                        details.target.dataset[`data-${key}`] = dataset[key];
                    }
                }
            }

            // Check if the target is an input element with type="file"
            if (event.target.tagName.toLowerCase() === 'input' && event.target.type.toLowerCase() === 'file') {
                // Extract file information
                const file = event.target.files[0];
                details.file = {
                    file: file,
                    fileName: file.name
                };
                // for (let i = 0; i < files.length; i++) {
                //     const file = files[i];
                //     details.files.push({
                //         name: file.name,
                //         type: file.type,
                //         size: file.size,
                //         lastModified: file.lastModified
                //         // Add more properties as needed
                //     });
                // }
            }


            // Extract form data if the event occurs on a form element
            if (event.target.tagName.toLowerCase() === 'form') {
                const formData = new FormData(event.target);

                event.target.reset()
                details.formData = {};
                for (const [key, value] of formData.entries()) {
                    details.formData[key] = value;
                }
            }
            if (event.keyCode) {
                details.keyCode = event.keyCode;
            }

            if (event.clientX || event.clientY) {
                details.mousePosition = {
                    clientX: event.clientX,
                    clientY: event.clientY,
                    pageX: event.pageX,
                    pageY: event.pageY
                };
            }

            if (event.touches) {
                details.touches = event.touches.length;
            }

            return details;
        } catch (error) {
            console.error('Error occurred while extracting event details:', error);
            return null;
        }
    }
    generateJsonFromSchema(schema, details) {
        const result = {};


        // Iterate over schema properties
        for (const key in schema) {
            console.log(key, schema);

            if (Object.prototype.hasOwnProperty.call(schema, key)) {
                const property = schema[key];
                let refData = details;

                if (property.source === "url") {
                    let parsedUrl = this.app.actionUri.extractComponentsFromUrl(window.location.href);

                    result[key] = parsedUrl.params[property.prop]
                    return result
                }

                const refParts = property.source.split('.');

                for (const part of refParts) {
                    if (refData[part] !== undefined) {
                        refData = refData[part];
                        if (typeof refData === 'string' && refData.startsWith('{') && refData.endsWith('}')) {
                            refData = JSON.parse(refData);
                        }
                    } else {
                        refData = undefined;
                        break;
                    }
                }
                console.log(refData);

                if (property.hasOwnProperty('source') && refData) {
                    // If the source property is present in the details object, extract its value
                    result[key] = refData;
                } else if (property.hasOwnProperty('defaultValue')) {
                    // If a default value is provided in the schema, use it
                    result[key] = property.defaultValue;
                } else {
                    // If neither source nor defaultValue is provided, set the property to null
                    result[key] = null;
                }
            }
        }

        return result;
    }
    generateEntityFromSchema(schema, dataSources) {
        const entity = {};

        // Recursive function to search for property within nested objects
        const searchProperty = (path, data) => {
            const keys = path.split('.');
            if (keys.length > 1) {
                let value = data;
                for (const key of keys) {
                    if (value && typeof value === 'object' && key in value) {
                        value = value[key];
                    } else {
                        return undefined;
                    }
                }
                return value;
            } else if (keys.length === 1 && keys[0] !== '') {
                return data[keys[0]];
            } else {
                return undefined;
            }
        };

        // Function to parse string values to their corresponding types
        const parseValue = (value) => {
            if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
                // If the string value is JSON, parse it
                try {
                    return JSON.parse(value);
                } catch (error) {
                    // If parsing fails, return the original string value
                    return value;
                }
            }
            // If the value is not a string or not JSON, return it as is
            return value;
        };

        // Iterate over each property defined in the schema
        for (const property in schema.properties) {
            const propertySchema = schema.properties[property];
            const { source, prop, defaultValue } = propertySchema;

            // Check if the property exists in the data sources
            let value = undefined;
            if (source) {
                // If source is specified, search only within the corresponding data source
                value = searchProperty(source, dataSources[source]);
            } else {
                // If source is not specified, search within all passed data sources
                for (const sourceKey in dataSources) {
                    const sourceValue = dataSources[sourceKey];
                    if (value === undefined) {
                        value = searchProperty(property, sourceValue);
                    }
                }
            }

            // If the value is found, assign it to the entity, otherwise use the defaultValue
            entity[property] = value !== undefined ? parseValue(value) : (prop && prop in dataSources ? dataSources[prop] : (defaultValue !== undefined ? defaultValue : null));
        }

        // Check if any required properties are missing in the entity
        if (schema.required) {
            for (const requiredProperty of schema.required) {
                if (!(requiredProperty in entity)) {
                    throw new Error(`Required property "${requiredProperty}" is missing in the entity.`);
                }
            }
        }

        return entity;
    }
    async receiveResponse(res, result) {
        console.log(res);
        if (typeof window === 'undefined') {
            res.end(JSON.stringify({ "message": "Operation Successful", result }));
        } else {
            switch (res.meta.entity) {
                case 'page':
                    let pageArray = res.response.components[0];
                    // let pageJson = await this.app.actionEvent.emit("populate", pageArray, "callback");
                    // let page = await this.app.actionEvent.emit("jsonToHtml", pageJson, "callback")
                    // this.app.actionEvent.emit("pushToDom", page)
                    console.log(pageArray);
                    let html = await this.app.jsonToHtml.convert(pageArray.template)


                    this.app.actionView.updateDom(pageArray.selector, html);

                    if (res.response.callback) {
                        let callbacks = res.response.callback
                        for (let i = 0; i < callbacks.length; i++) {
                            // Extract properties from the current callback object
                            const { name, arg } = callbacks[i];
                            this.app.callbackHandler[name](arg)
                        }
                    }
                    break
                case 'element':
                    this.app.responseHandler.handleElement(res)
                    break
                default:
                    let entitySchema = this.app.appConfig.entity[res.meta.entity];
                    let actionSchema = entitySchema.actions[res.meta.action];

                    if (res.meta.callbackId) {
                        let callbackId = res.meta.callbackId;
                        let callbackArray = actionSchema.callbacks;
                        let callbacks;
                        for (let i = 0; i < callbackArray.length; i++) {
                            if (callbackArray[i].id === callbackId) {
                                callbacks = callbackArray[i].callback;
                            }
                        }
                        console.log(callbacks);
                        let callbackType = typeof callbacks
                        switch (callbackType) {
                            case "string":
                                this.app.responseHandler[callbacks](res)
                                break;
                            default:
                                for (let i = 0; i < callbacks.length; i++) {
                                    // Extract properties from the current callback object
                                    const { name, arg } = callbacks[i];
                                    this.app.callbackHandler[name](arg, res)
                                }
                                break;
                        }
                    }

            }
        }

    }
}
