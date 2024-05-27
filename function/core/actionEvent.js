// Router.js
export class ActionEvent {
    constructor(config) {
        this.config = config;
        this.routes = [];
        this.middleware = [];
        this.errorHandler = this.defaultErrorHandler.bind(this);
        if (typeof window != 'undefined') {
            this.createListeners(config.eventConfig);
        }

    }
    initialize(app) {
        this.app = app
    }

    createListeners(config) {
        // Iterate over each key in the config object
        Object.keys(config).forEach((key) => {
            const group = config[key]; // Access the configuration group (e.g., global, specific)
            group.forEach((setting) => {
                // Determine the object to which the listener should be attached
                const objectToListenOn = this.getObjectToListenOn(
                    setting.Object2Listen
                );
                // Check if the 'All' keyword is used to listen to all events
                if (setting.events.includes("All")) {
                    // If 'All', add listeners for all supported event types
                    const allEvents = ["click", "mouseover", "input"]; // Placeholder for all event types
                    allEvents.forEach((event) => {
                        objectToListenOn.addEventListener(
                            event,
                            this.handleEvent.bind(this)
                        );
                    });
                } else {
                    // Otherwise, add listeners for specified events in the configuration
                    setting.events.forEach((eventName) => {
                        objectToListenOn.addEventListener(
                            eventName,
                            this[setting.callback].bind(this)
                        );
                    });
                }
            });
        });
        console.log("Activated : Listeners");
    }

    // Helper method to determine the actual object to listen on based on the provided name
    // objectName: name of the object (e.g., 'Window', '#elementId', etc.)
    getObjectToListenOn(objectName) {
        // Check if the name is 'window'; otherwise, use querySelector to find the DOM element
        return objectName.toLowerCase() === "window"
            ? window
            : document.querySelector(objectName);
    }

    /**
     * Route incoming requests to the appropriate handler.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    handleEvent(req, res) {
        console.log("Checkpoint - 1");
        if (typeof window === 'undefined') {

            const urlParts = req.url.split('?'); // Split the URL into path and query parts
            const pathSegments = urlParts[0].split('/'); // Split the path into segments
            const entity = pathSegments[1]; // Extract the entity from the URL
            const action = pathSegments[2]; // Extract the action from the URL

            const queries = {}; // Initialize an empty object to store queries

            // If there are query parameters, parse them
            if (urlParts.length > 1) {
                const queryString = urlParts[1];
                const queryPairs = queryString.split('&');

                // Loop through query pairs and parse them
                for (const pair of queryPairs) {
                    const [key, value] = pair.split('=');
                    queries[key] = decodeURIComponent(value);
                }
            }

            let urlInfo = {

                action: action,
                entity: entity,
                queries: queries
            }
            // Route the request to the appropriate handler
            const entitySchema = this.findEntitySchema(entity);

            if (entitySchema && entitySchema.actions[action]) {
                try {
                    // Execute route handler or action
                    if (entitySchema.handler) {
                        //   route.handler(req, res);
                    } else {
                        console.log("ActionEvent catch request");
                        this.app.actionClient.sendRequest(req, res, urlInfo, entitySchema);
                    }
                } catch (error) {
                    this.errorHandler(req, res, 500, 'Internal Server Error', error);
                }
            } else {
                this.errorHandler(req, res, 404, 'Not Found');
            }
        } else {
            if (req.type === "submit") {
                req.preventDefault();
            }
            console.log(`Event triggered - ${req.type}`); // Log the event type for debugging
            // Create a JSON object containing event information
            // Extract the data-events attribute
            const trigger = req.target.getAttribute(req.type);
            // Extract action and entity
            if (trigger) {
                const triggerArray = trigger.split("-");
                const action = triggerArray[0];
                const entity = triggerArray[1];
                const callbackId = triggerArray[2]
                req["action"] = action;
                req["entity"] = entity;
                req["callbackId"] = callbackId
                this.app.actionClient.sendRequest(req);
            }

        }

    }

    findEntitySchema(entity) {
        return this.config.entity[entity]
    }
    defaultErrorHandler(req, res, statusCode, message, error) {
        console.error(`Error (${statusCode}): ${message}`, error);
        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: message }));
    }
}


