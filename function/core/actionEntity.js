export class ActionEntity {
    /**
     * Create a new ActionEntity instance with a plugin.
     *
     * @param {object} plugin - The plugin for the database/resource.
     */
    constructor() {
        this.plugins = [];
        this.supportedActions = [
            "create", "insert", "insertOne", "get", "getOne", "update", "updateOne",
            "delete", "deleteOne", "append", "connect", "disconnect", "close", "patch",
            "upsert", "search", "find", "filter", "map", "getOneByID",
            "updateOneByID", "deleteOneByID", "read", "move", "rename", "copy", 'getAll', 'aggregate', 'login'
        ];
        this.app;
    }
    initialize(app) {
        this.app = app
    }
    use(newPlugin) {
        this.plugins.push(newPlugin);
    }

    /**
     * Check if a specific action is supported by the plugin.
     *
     * @param {string} action - The action to check for support.
     * @returns {boolean} - True if the action is supported, false otherwise.
     */
    isSupportedAction(action) {
        // Loop through each plugin and check if the action is supported by any of them
        for (const plugin of this.plugins) {
            if (typeof plugin.isSupportedAction === 'function' && plugin.isSupportedAction(action)) {
                return true;
            }
        }
        return false; // Action is not supported by any plugin
    }

    async performAction(req) {


        const compatiblePlugins = this.plugins.filter(plugin => plugin.supports(req.resources.name) && plugin[req.meta.action]);
        if (compatiblePlugins.length === 0) {
            throw new Error(`No plugin supports ${req.action} operation for ${req.resources.name} database`);
        }
        for (const plugin of compatiblePlugins) {

            try {
                let resources = req.resources || null;
                let data = req.data || null;
                let queries = req.query || null;
                const result = await plugin[req.meta.action](resources, data, queries);
                return result;
            } catch (error) {
                console.error(`Error creating entity with ${plugin.name} plugin:`, error);
            }
        }
        throw new Error(`Failed to create entity using any compatible plugin for ${req.resources.name} database`);
    }

    async get(req, entity) {
        switch (entity) {
            case "page":
                {
                    let url = await this.app.actionUri.getCurrentUrl();
                    let parsedUrl = await this.app.actionUri.extractComponentsFromUrl(url);
                    let path = ""
                    if (parsedUrl) {
                        let { path: extractedPath } = parsedUrl;
                        path = extractedPath;
                    }
                    // let decodedUrl = await this.app.actionUri.unbuildEncodedUrl(
                    //     url
                    // );
                    let datasets = this.app.appConfig.routes[`#/${path}`]
                        ? this.app.appConfig.routes[`#/${path}`]
                        : this.app.appConfig.routes["default"];
                    let page = datasets.components[0];
                    // this.cache.dom = page;

                    return datasets;
                }
                break;
            default: {
                let data = await this.app.idb.getAll(entity);
                if (!data) throw new Error(`No ${entity} found`);
                return data;
            }
        }
    }

    async update(req, entity) {

        switch (entity) {
            case "page":
                {

                    let url = req.queries.url;
                    let parsedUrl = await this.app.actionUri.extractComponentsFromUrl(url)
                    let path = ""
                    if (parsedUrl) {
                        let { path: extractedPath } = parsedUrl;
                        path = extractedPath;
                    }
                    this.app.actionUri.updateHash(url);
                    let datasets = this.app.appConfig.routes[`#/${path}`]
                        ? this.app.appConfig.routes[`#/${path}`]
                        : this.app.appConfig.routes["default"];
                    let page = datasets.components[0];
                    // this.cache.dom = page;

                    return datasets;
                }
                break;
            default: {
                let data = await this.app.idb.getAll(entity);
                if (!data) throw new Error(`No ${entity} found`);
                return data;
            }
        }
    }

    async insert(req, entity) {
        switch (entity) {
            case "element": {
                let element = req.body.queries.component;
                let datasets = this.app.appConfig.components[element]
                    ? this.app.appConfig.components[element]
                    : this.app.appConfig.components["default"];
                return datasets;
            }
        }
    }

    constructURL(request) {
        // Extract meta information from the request object
        var action = request.meta.action;
        var entity = request.meta.entity;

        // Construct the base URL
        var url = entity + '/' + action;
        console.log(request);
        // Check if there are any query parameters
        if (request.queries) {
            // Construct the query string
            var queryString = '';
            for (var key in request.queries) {
                if (request.queries.hasOwnProperty(key)) {
                    if (queryString !== '') {
                        queryString += '&';
                    }
                    queryString += encodeURIComponent(key) + '=' + encodeURIComponent(request.queries[key]);
                }
            }

            // Append the query string to the URL
            url += '?' + queryString;
        }

        // Return the constructed URL
        return url;
    }

    async aggregate(query, config) {
        return this.performAction("aggregate", query, config);
    }

    async authorizeUser() {
        const compatiblePlugins = this.plugins.filter(plugin => plugin.supports(req.resources.name) && plugin[req.meta.action]);
        if (compatiblePlugins.length === 0) {
            throw new Error(`No plugin supports ${req.action} operation for ${req.resources.name} database`);
        }
        for (const plugin of compatiblePlugins) {

            try {
                const result = await plugin.authorizeUser(req);
                return result;
            } catch (error) {
                console.error(`Error creating entity with ${plugin.name} plugin:`, error);
            }
        }
        throw new Error(`Failed to create entity using any compatible plugin for ${req.resources.name} database`);
    }

}

